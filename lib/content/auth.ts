import type { T } from "@/lib/i18n";

/** Textos das páginas de conta: entrar, criar conta, recuperar senha e "Minha conta". */
export const auth = {
  areaName: { pt: "Área do Apoiador", fr: "Espace sympathisant", nl: "Sympathisantenruimte" },
  signIn: { pt: "Entrar", fr: "Se connecter", nl: "Aanmelden" },
  myAccount: { pt: "Minha conta", fr: "Mon compte", nl: "Mijn account" },
  hello: { pt: "Olá", fr: "Bonjour", nl: "Hallo" },
  password: { pt: "Senha", fr: "Mot de passe", nl: "Wachtwoord" },
  showPassword: { pt: "Mostrar senha", fr: "Afficher le mot de passe", nl: "Wachtwoord tonen" },
  hidePassword: { pt: "Ocultar senha", fr: "Masquer le mot de passe", nl: "Wachtwoord verbergen" },
  or: { pt: "ou", fr: "ou", nl: "of" },

  aside: {
    title: { pt: "Sua ajuda, sempre por perto", fr: "Votre aide, toujours à portée de main", nl: "Uw steun, altijd binnen handbereik" },
    text: {
      pt: "Na Área do Apoiador você acompanha tudo o que construímos juntos.",
      fr: "Dans votre espace, suivez tout ce que nous construisons ensemble.",
      nl: "In uw ruimte volgt u alles wat we samen opbouwen.",
    },
    benefits: [
      { pt: "Histórico das suas doações", fr: "L’historique de vos dons", nl: "Een overzicht van uw giften" },
      {
        pt: "Acompanhe suas inscrições de voluntariado e parcerias",
        fr: "Le suivi de vos inscriptions de bénévolat et de partenariat",
        nl: "De opvolging van uw inschrijvingen als vrijwilliger of partner",
      },
      {
        pt: "Novidades e relatórios de impacto dos projetos",
        fr: "Des nouvelles et des rapports d’impact des projets",
        nl: "Nieuws en impactverslagen van de projecten",
      },
      {
        pt: "Seus dados protegidos, conforme a LGPD e o RGPD",
        fr: "Vos données protégées, conformément au RGPD",
        nl: "Uw gegevens beschermd volgens de AVG (GDPR)",
      },
    ] as T[],
    quote: { pt: "Juntos, somos infinitos.", fr: "Ensemble, nous sommes infinis.", nl: "Samen zijn we oneindig." },
  },

  login: {
    title: { pt: "Entrar", fr: "Se connecter", nl: "Aanmelden" },
    heading: { pt: "Bem-vindo de volta!", fr: "Bon retour parmi nous !", nl: "Welkom terug!" },
    subtitle: {
      pt: "Acesse sua conta para acompanhar suas doações e inscrições.",
      fr: "Accédez à votre compte pour suivre vos dons et vos inscriptions.",
      nl: "Meld u aan om uw giften en inschrijvingen op te volgen.",
    },
    remember: { pt: "Manter conectado", fr: "Rester connecté", nl: "Aangemeld blijven" },
    forgot: { pt: "Esqueci minha senha", fr: "Mot de passe oublié ?", nl: "Wachtwoord vergeten?" },
    submit: { pt: "Entrar", fr: "Se connecter", nl: "Aanmelden" },
    pending: { pt: "Entrando…", fr: "Connexion…", nl: "Bezig met aanmelden…" },
    noAccount: { pt: "Ainda não tem conta?", fr: "Pas encore de compte ?", nl: "Nog geen account?" },
    passwordChanged: {
      pt: "Senha alterada. Entre com a nova senha.",
      fr: "Mot de passe modifié. Connectez-vous avec le nouveau.",
      nl: "Wachtwoord gewijzigd. Meld u aan met het nieuwe wachtwoord.",
    },
    loggedOut: { pt: "Você saiu da sua conta.", fr: "Vous êtes déconnecté.", nl: "U bent afgemeld." },
  },

  signup: {
    title: { pt: "Criar conta", fr: "Créer un compte", nl: "Account aanmaken" },
    heading: { pt: "Faça parte da nossa rede", fr: "Rejoignez notre réseau", nl: "Word deel van ons netwerk" },
    subtitle: {
      pt: "Crie sua conta gratuita em menos de um minuto.",
      fr: "Créez votre compte gratuit en moins d’une minute.",
      nl: "Maak in minder dan een minuut uw gratis account aan.",
    },
    confirm: { pt: "Confirmar senha", fr: "Confirmer le mot de passe", nl: "Wachtwoord bevestigen" },
    hint: {
      pt: "Mínimo de 8 caracteres, com letras e números.",
      fr: "8 caractères minimum, avec des lettres et des chiffres.",
      nl: "Minstens 8 tekens, met letters en cijfers.",
    },
    strength: { pt: "Força da senha", fr: "Robustesse", nl: "Sterkte" },
    levels: [
      { pt: "Fraca", fr: "Faible", nl: "Zwak" },
      { pt: "Média", fr: "Moyenne", nl: "Gemiddeld" },
      { pt: "Forte", fr: "Forte", nl: "Sterk" },
    ] as T[],
    newsletter: {
      pt: "Quero receber notícias e relatórios de impacto por e-mail.",
      fr: "Je souhaite recevoir des nouvelles et des rapports d’impact par e-mail.",
      nl: "Ik ontvang graag nieuws en impactverslagen per e-mail.",
    },
    consent: { pt: "Li e concordo com a", fr: "J’ai lu et j’accepte la", nl: "Ik ga akkoord met het" },
    submit: { pt: "Criar minha conta", fr: "Créer mon compte", nl: "Mijn account aanmaken" },
    pending: { pt: "Criando conta…", fr: "Création du compte…", nl: "Bezig met aanmaken…" },
    haveAccount: { pt: "Já tem conta?", fr: "Déjà un compte ?", nl: "Al een account?" },
  },

  forgot: {
    title: { pt: "Recuperar senha", fr: "Mot de passe oublié", nl: "Wachtwoord vergeten" },
    subtitle: {
      pt: "Informe o e-mail da sua conta e enviaremos um link para você criar uma nova senha.",
      fr: "Indiquez l’adresse e-mail de votre compte : nous vous enverrons un lien pour créer un nouveau mot de passe.",
      nl: "Vul het e-mailadres van uw account in. We sturen u een link om een nieuw wachtwoord te kiezen.",
    },
    submit: { pt: "Enviar link", fr: "Envoyer le lien", nl: "Link versturen" },
    pending: { pt: "Enviando…", fr: "Envoi…", nl: "Bezig met verzenden…" },
    sent: {
      pt: "Se houver uma conta com esse e-mail, você receberá um link em instantes. Ele vale por 1 hora.",
      fr: "Si un compte existe avec cette adresse, vous recevrez un lien dans un instant. Il est valable 1 heure.",
      nl: "Als er een account met dit e-mailadres bestaat, ontvangt u zo meteen een link. Die is 1 uur geldig.",
    },
    spam: { pt: "Não chegou? Confira a caixa de spam.", fr: "Rien reçu ? Vérifiez vos courriers indésirables.", nl: "Niets ontvangen? Kijk in uw spammap." },
    devNote: {
      pt: "Modo de desenvolvimento: o envio de e-mails ainda não está configurado. Use este link:",
      fr: "Mode développement : l’envoi d’e-mails n’est pas encore configuré. Utilisez ce lien :",
      nl: "Ontwikkelmodus: het versturen van e-mails is nog niet ingesteld. Gebruik deze link:",
    },
    back: { pt: "Voltar para o login", fr: "Retour à la connexion", nl: "Terug naar aanmelden" },
    emailSubject: {
      pt: "Recuperação de senha – Infinita Esperança",
      fr: "Réinitialisation du mot de passe – Infinita Esperança",
      nl: "Wachtwoord herstellen – Infinita Esperança",
    },
    emailBody: {
      pt: "Olá! Recebemos um pedido para criar uma nova senha. Abra o link abaixo (vale por 1 hora):",
      fr: "Bonjour ! Nous avons reçu une demande de nouveau mot de passe. Ouvrez le lien ci-dessous (valable 1 heure) :",
      nl: "Hallo! We kregen een aanvraag voor een nieuw wachtwoord. Open de link hieronder (1 uur geldig):",
    },
    emailIgnore: {
      pt: "Se não foi você, ignore este e-mail: sua senha continua a mesma.",
      fr: "Si vous n’êtes pas à l’origine de cette demande, ignorez cet e-mail : votre mot de passe reste inchangé.",
      nl: "Hebt u dit niet aangevraagd? Negeer dan deze e-mail: uw wachtwoord blijft ongewijzigd.",
    },
  },

  reset: {
    title: { pt: "Criar nova senha", fr: "Nouveau mot de passe", nl: "Nieuw wachtwoord" },
    subtitle: { pt: "Escolha uma nova senha para sua conta.", fr: "Choisissez un nouveau mot de passe pour votre compte.", nl: "Kies een nieuw wachtwoord voor uw account." },
    newPassword: { pt: "Nova senha", fr: "Nouveau mot de passe", nl: "Nieuw wachtwoord" },
    submit: { pt: "Salvar nova senha", fr: "Enregistrer le mot de passe", nl: "Wachtwoord opslaan" },
    pending: { pt: "Salvando…", fr: "Enregistrement…", nl: "Bezig met opslaan…" },
    invalid: { pt: "Este link é inválido ou expirou.", fr: "Ce lien est invalide ou a expiré.", nl: "Deze link is ongeldig of verlopen." },
    invalidText: {
      pt: "Por segurança, os links de recuperação valem por 1 hora e só podem ser usados uma vez.",
      fr: "Pour votre sécurité, les liens de récupération sont valables 1 heure et ne servent qu’une fois.",
      nl: "Voor uw veiligheid zijn herstellinks 1 uur geldig en maar één keer bruikbaar.",
    },
    requestNew: { pt: "Pedir um novo link", fr: "Demander un nouveau lien", nl: "Nieuwe link aanvragen" },
  },

  account: {
    subtitle: {
      pt: "Acompanhe suas doações, inscrições e dados de cadastro.",
      fr: "Suivez vos dons, vos inscriptions et vos coordonnées.",
      nl: "Volg uw giften, inschrijvingen en gegevens.",
    },
    welcome: {
      pt: "Conta criada com sucesso! Seja bem-vindo(a) à rede Infinita Esperança.",
      fr: "Compte créé avec succès ! Bienvenue dans le réseau Infinita Esperança.",
      nl: "Account aangemaakt! Welkom in het netwerk van Infinita Esperança.",
    },
    passwordChanged: { pt: "Senha alterada com sucesso.", fr: "Mot de passe modifié avec succès.", nl: "Wachtwoord gewijzigd." },
    memberSince: { pt: "Apoiador desde", fr: "Sympathisant depuis", nl: "Sympathisant sinds" },
    myData: { pt: "Meus dados", fr: "Mes coordonnées", nl: "Mijn gegevens" },
    newsletterLabel: { pt: "Novidades por e-mail", fr: "Nouvelles par e-mail", nl: "Nieuws per e-mail" },
    yes: { pt: "Sim", fr: "Oui", nl: "Ja" },
    no: { pt: "Não", fr: "Non", nl: "Nee" },
    notInformed: { pt: "Não informado", fr: "Non renseigné", nl: "Niet ingevuld" },
    changePassword: { pt: "Alterar senha", fr: "Changer de mot de passe", nl: "Wachtwoord wijzigen" },
    logout: { pt: "Sair da conta", fr: "Se déconnecter", nl: "Afmelden" },
    stats: {
      donations: { pt: "Doações registradas", fr: "Dons enregistrés", nl: "Geregistreerde giften" },
      total: { pt: "Total doado", fr: "Total donné", nl: "Totaal geschonken" },
      applications: { pt: "Inscrições", fr: "Inscriptions", nl: "Inschrijvingen" },
    },
    donations: { pt: "Minhas doações", fr: "Mes dons", nl: "Mijn giften" },
    donationsNote: {
      pt: "As doações feitas enquanto você está conectado aparecem aqui.",
      fr: "Les dons effectués lorsque vous êtes connecté apparaissent ici.",
      nl: "Giften die u doet terwijl u aangemeld bent, verschijnen hier.",
    },
    noDonations: {
      pt: "Você ainda não registrou nenhuma doação com esta conta.",
      fr: "Vous n’avez encore enregistré aucun don avec ce compte.",
      nl: "U hebt met dit account nog geen gift geregistreerd.",
    },
    applications: { pt: "Minhas inscrições", fr: "Mes inscriptions", nl: "Mijn inschrijvingen" },
    noApplications: {
      pt: "Nenhuma inscrição de voluntariado ou proposta de parceria por enquanto.",
      fr: "Aucune inscription de bénévole ni proposition de partenariat pour l’instant.",
      nl: "Nog geen inschrijving als vrijwilliger of partnerschapsvoorstel.",
    },
    volunteer: { pt: "Voluntariado", fr: "Bénévolat", nl: "Vrijwilligerswerk" },
    partner: { pt: "Parceria", fr: "Partenariat", nl: "Partnerschap" },
    pending: { pt: "Aguardando confirmação", fr: "En attente de confirmation", nl: "Wacht op bevestiging" },
    received: { pt: "Recebida – em análise", fr: "Reçue – en cours d’examen", nl: "Ontvangen – in behandeling" },
    protocol: { pt: "Protocolo", fr: "Référence", nl: "Referentie" },
    shortcuts: { pt: "Como você quer ajudar hoje?", fr: "Comment souhaitez-vous aider aujourd’hui ?", nl: "Hoe wilt u vandaag helpen?" },
    donateNow: { pt: "Fazer uma doação", fr: "Faire un don", nl: "Een gift doen" },
    beVolunteer: { pt: "Ser voluntário", fr: "Devenir bénévole", nl: "Vrijwilliger worden" },
    bePartner: { pt: "Propor parceria", fr: "Proposer un partenariat", nl: "Partner worden" },
    talkToUs: { pt: "Falar com a equipe", fr: "Contacter l’équipe", nl: "Contact opnemen" },
  },

  errors: {
    invalidCredentials: { pt: "E-mail ou senha incorretos.", fr: "E-mail ou mot de passe incorrect.", nl: "Onjuist e-mailadres of wachtwoord." },
    tooMany: {
      pt: "Muitas tentativas. Aguarde 15 minutos e tente novamente.",
      fr: "Trop de tentatives. Patientez 15 minutes puis réessayez.",
      nl: "Te veel pogingen. Wacht 15 minuten en probeer het opnieuw.",
    },
    emailTaken: {
      pt: "Já existe uma conta com este e-mail. Entre ou recupere sua senha.",
      fr: "Un compte existe déjà avec cette adresse. Connectez-vous ou récupérez votre mot de passe.",
      nl: "Er bestaat al een account met dit e-mailadres. Meld u aan of herstel uw wachtwoord.",
    },
    weakPassword: {
      pt: "Use pelo menos 8 caracteres, com letras e números.",
      fr: "Utilisez au moins 8 caractères, avec des lettres et des chiffres.",
      nl: "Gebruik minstens 8 tekens, met letters en cijfers.",
    },
    mismatch: { pt: "As senhas não coincidem.", fr: "Les mots de passe ne correspondent pas.", nl: "De wachtwoorden komen niet overeen." },
  },
};
