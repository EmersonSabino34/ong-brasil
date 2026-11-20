/**
 * Gera o "PIX copia e cola" (BR Code estático) no padrão EMV do Banco Central.
 * Funciona em qualquer app de banco quando `key` é uma chave PIX válida.
 */
function field(id: string, value: string) {
  return `${id}${value.length.toString().padStart(2, "0")}${value}`;
}

/** CRC16-CCITT (polinômio 0x1021, valor inicial 0xFFFF), exigido pelo BR Code. */
function crc16(payload: string) {
  let crc = 0xffff;
  for (let i = 0; i < payload.length; i++) {
    crc ^= payload.charCodeAt(i) << 8;
    for (let b = 0; b < 8; b++) {
      crc = crc & 0x8000 ? (crc << 1) ^ 0x1021 : crc << 1;
      crc &= 0xffff;
    }
  }
  return crc.toString(16).toUpperCase().padStart(4, "0");
}

function clean(text: string, max: number) {
  return text
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^A-Za-z0-9 ]/g, "")
    .toUpperCase()
    .slice(0, max)
    .trim();
}

export function pixPayload(opts: { key: string; name: string; city: string; amount?: number; txid?: string }) {
  const account = field("00", "br.gov.bcb.pix") + field("01", opts.key);
  const txid = (opts.txid ?? "***").replace(/[^A-Za-z0-9]/g, "").slice(0, 25) || "***";
  const parts = [
    field("00", "01"),
    field("26", account),
    field("52", "0000"),
    field("53", "986"),
    opts.amount ? field("54", opts.amount.toFixed(2)) : "",
    field("58", "BR"),
    field("59", clean(opts.name, 25)),
    field("60", clean(opts.city, 15)),
    field("62", field("05", txid)),
  ].join("");
  const withCrcId = `${parts}6304`;
  return withCrcId + crc16(withCrcId);
}
