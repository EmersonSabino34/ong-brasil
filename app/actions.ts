"use server";

import { after } from "next/server";
import QRCode from "qrcode";
import { notifyTeam } from "@/lib/admin/notify";
import { areas } from "@/lib/content/areas";
import {
  donation,
  formatMoney,
  methodsByCurrency,
  minAmount,
  type Currency,
  type Frequency,
  type Method,
} from "@/lib/content/donation";
import { getCurrentUser } from "@/lib/auth/current-user";
import { forms } from "@/lib/content/forms";
import { EMAIL, getLang, isBot, str, values } from "@/lib/form-data";
import type { Locale } from "@/lib/i18n";
import { pixPayload } from "@/lib/pix";
import { site } from "@/lib/site";
import { newProtocol, saveSubmission, type SubmissionKind } from "@/lib/submissions";

export type FieldErrors = Record<string, string>;

export type FormState = {
  ok: boolean | null;
  message?: string;
  protocol?: string;
  errors?: FieldErrors;
  values?: Record<string, string>;
};

export type DonationResult = {
  protocol: string;
  amountLabel: string;
  amount: number;
  currency: Currency;
  frequency: Frequency;
  method: Method;
  destination: string;
  pix?: { payload: string; qr: string };
};

export type DonationState = FormState & { result?: DonationResult };

/** Id do apoiador conectado (se houver), para o envio aparecer em "Minha conta". */
async function currentUserId() {
  try {
    return (await getCurrentUser())?.id;
  } catch {
    return undefined;
  }
}

/** Guarda o envio e, depois de responder à pessoa, avisa a equipe por e-mail. */
async function store(kind: SubmissionKind, data: Record<string, unknown> & { protocol: string }) {
  const record = await saveSubmission(kind, data);
  after(() => notifyTeam(kind, record).catch((error) => console.error("[aviso por e-mail]", error)));
}

/** Validações comuns: nome, e-mail, consentimento. */
function validateBase(data: FormData, lang: Locale, errors: FieldErrors) {
  if (str(data, "name").length < 2) errors.name = forms.errors.required[lang];
  const email = str(data, "email", 200);
  if (!email) errors.email = forms.errors.required[lang];
  else if (!EMAIL.test(email)) errors.email = forms.errors.email[lang];
  if (data.get("consent") !== "on") errors.consent = forms.errors.consent[lang];
}

/* ---------------- Contato ---------------- */
export async function sendContact(_prev: FormState, data: FormData): Promise<FormState> {
  const lang = getLang(data);
  const keys = ["name", "email", "phone", "subject", "message"];
  if (isBot(data)) return { ok: true, message: forms.success.contact[lang] };

  const errors: FieldErrors = {};
  validateBase(data, lang, errors);
  if (!(str(data, "subject") in forms.contactSubjects)) errors.subject = forms.errors.choose[lang];
  if (str(data, "message").length < 10) errors.message = forms.errors.short[lang];
  if (Object.keys(errors).length) return { ok: false, message: forms.errors.form[lang], errors, values: values(data, keys) };

  const protocol = newProtocol("contato");
  try {
    await store("contato", { protocol, lang, userId: await currentUserId(), ...values(data, keys) });
  } catch {
    return { ok: false, message: forms.errors.server[lang], values: values(data, keys) };
  }
  return { ok: true, protocol, message: forms.success.contact[lang] };
}

/* ---------------- Voluntariado ---------------- */
export async function sendVolunteer(_prev: FormState, data: FormData): Promise<FormState> {
  const lang = getLang(data);
  const keys = ["name", "email", "phone", "country", "city", "availability", "message"];
  if (isBot(data)) return { ok: true, message: forms.success.volunteer[lang] };

  const errors: FieldErrors = {};
  validateBase(data, lang, errors);
  if (!str(data, "phone")) errors.phone = forms.errors.required[lang];
  if (!(str(data, "country") in forms.countries)) errors.country = forms.errors.choose[lang];
  if (!str(data, "city")) errors.city = forms.errors.required[lang];
  if (!(str(data, "availability") in forms.availabilityOptions)) errors.availability = forms.errors.choose[lang];
  const interests = data.getAll("areas").map(String).filter((a) => a in forms.volunteerAreas);
  if (interests.length === 0) errors.areas = forms.errors.chooseArea[lang];
  if (Object.keys(errors).length)
    return { ok: false, message: forms.errors.form[lang], errors, values: { ...values(data, keys), areas: interests.join(",") } };

  const protocol = newProtocol("voluntario");
  try {
    await store("voluntario", { protocol, lang, userId: await currentUserId(), ...values(data, keys), areas: interests });
  } catch {
    return { ok: false, message: forms.errors.server[lang], values: values(data, keys) };
  }
  return { ok: true, protocol, message: forms.success.volunteer[lang] };
}

/* ---------------- Parcerias ---------------- */
export async function sendPartnership(_prev: FormState, data: FormData): Promise<FormState> {
  const lang = getLang(data);
  const keys = ["organization", "name", "email", "phone", "country", "type", "message"];
  if (isBot(data)) return { ok: true, message: forms.success.partner[lang] };

  const errors: FieldErrors = {};
  validateBase(data, lang, errors);
  if (str(data, "organization").length < 2) errors.organization = forms.errors.required[lang];
  if (!(str(data, "country") in forms.countries)) errors.country = forms.errors.choose[lang];
  if (!(str(data, "type") in forms.partnerTypes)) errors.type = forms.errors.choose[lang];
  if (str(data, "message").length < 10) errors.message = forms.errors.short[lang];
  if (Object.keys(errors).length) return { ok: false, message: forms.errors.form[lang], errors, values: values(data, keys) };

  const protocol = newProtocol("parceria");
  try {
    await store("parceria", { protocol, lang, userId: await currentUserId(), ...values(data, keys) });
  } catch {
    return { ok: false, message: forms.errors.server[lang], values: values(data, keys) };
  }
  return { ok: true, protocol, message: forms.success.partner[lang] };
}

/* ---------------- Doação ---------------- */
export async function registerDonation(_prev: DonationState, data: FormData): Promise<DonationState> {
  const lang = getLang(data);
  const keys = ["currency", "frequency", "amount", "destination", "name", "email", "phone", "document", "method"];
  const errors: FieldErrors = {};

  const currency = (str(data, "currency") === "EUR" ? "EUR" : "BRL") as Currency;
  const frequency = (str(data, "frequency") === "mensal" ? "mensal" : "unica") as Frequency;
  const amount = Math.round(Number(str(data, "amount").replace(",", ".")) * 100) / 100;
  const destination = str(data, "destination") || "geral";
  const method = str(data, "method") as Method;

  if (!Number.isFinite(amount) || amount < minAmount[currency])
    errors.amount = `${forms.errors.amountMin[lang]} ${formatMoney(minAmount[currency], currency, lang)}.`;
  else if (amount > 100000) errors.amount = forms.errors.amountMax[lang];
  if (destination !== "geral" && !areas.some((a) => a.slug === destination)) errors.destination = forms.errors.choose[lang];
  if (!methodsByCurrency[currency].includes(method)) errors.method = forms.errors.choose[lang];
  validateBase(data, lang, errors);

  if (isBot(data)) return { ok: false, message: forms.errors.server[lang] };
  if (Object.keys(errors).length) return { ok: false, message: forms.errors.form[lang], errors, values: values(data, keys) };

  const protocol = newProtocol("doacao");
  const area = areas.find((a) => a.slug === destination);
  const result: DonationResult = {
    protocol,
    amount,
    amountLabel: formatMoney(amount, currency, lang),
    currency,
    frequency,
    method,
    destination: area ? area.title[lang] : donation.destinationGeneral[lang],
  };

  if (method === "pix") {
    const payload = pixPayload({
      key: site.donation.pix.key,
      name: site.donation.pix.merchantName,
      city: site.donation.pix.merchantCity,
      amount,
      txid: protocol,
    });
    const qr = await QRCode.toDataURL(payload, { width: 280, margin: 1, color: { dark: "#0b2a4a", light: "#ffffff" } });
    result.pix = { payload, qr };
  }

  try {
    await store("doacao", {
      protocol,
      lang,
      userId: await currentUserId(),
      ...values(data, keys),
      amount,
      anonymous: data.get("anonymous") === "on",
    });
  } catch {
    return { ok: false, message: forms.errors.server[lang], values: values(data, keys) };
  }

  return { ok: true, protocol, result };
}
