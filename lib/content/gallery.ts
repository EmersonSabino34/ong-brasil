import type { StaticImageData } from "next/image";
import type { T } from "@/lib/i18n";
import { img } from "@/lib/images";

export const galleryCategories = {
  alimentacao: { pt: "Alimentação", fr: "Alimentation", nl: "Voeding" },
  roupas: { pt: "Roupas", fr: "Vêtements", nl: "Kleding" },
  oficinas: { pt: "Oficinas", fr: "Ateliers", nl: "Workshops" },
  futebol: { pt: "Futebol", fr: "Football", nl: "Voetbal" },
  educacao: { pt: "Educação", fr: "Éducation", nl: "Onderwijs" },
  comunidade: { pt: "Comunidade", fr: "Communauté", nl: "Gemeenschap" },
} satisfies Record<string, T>;

export type GalleryCategory = keyof typeof galleryCategories;
export type GalleryItem = { image: StaticImageData; category: GalleryCategory; alt: T };

export const gallery: GalleryItem[] = [
  { image: img.hero, category: "comunidade", alt: { pt: "Crianças sorrindo ao ar livre", fr: "Enfants souriants en plein air", nl: "Lachende kinderen buiten" } },
  { image: img.alimentacao, category: "alimentacao", alt: { pt: "Voluntária servindo refeição a um menino", fr: "Bénévole servant un repas à un garçon", nl: "Vrijwilliger serveert een maaltijd aan een jongen" } },
  { image: img.roupas, category: "roupas", alt: { pt: "Menina escolhendo um casaco na loja solidária", fr: "Fillette choisissant un pull à la boutique solidaire", nl: "Meisje kiest een trui in de solidaire winkel" } },
  { image: img.oficinas, category: "oficinas", alt: { pt: "Menina pintando um vaso na oficina", fr: "Fillette peignant un pot à l’atelier", nl: "Meisje beschildert een pot in de workshop" } },
  { image: img.futebol, category: "futebol", alt: { pt: "Treinador conversando com o time de futebol", fr: "Entraîneur parlant avec l’équipe de football", nl: "Trainer praat met het voetbalteam" } },
  { image: img.criancasSorrindo, category: "comunidade", alt: { pt: "Grupo de crianças fazendo sinal de paz", fr: "Groupe d’enfants faisant le signe de la paix", nl: "Groep kinderen maakt het vredesteken" } },
  { image: img.voluntariosCaixas, category: "alimentacao", alt: { pt: "Voluntários organizando caixas de doação", fr: "Bénévoles organisant des cartons de dons", nl: "Vrijwilligers ordenen dozen met giften" } },
  { image: img.reforcoEscolar, category: "educacao", alt: { pt: "Crianças estudando no reforço escolar", fr: "Enfants étudiant au soutien scolaire", nl: "Kinderen studeren tijdens de bijles" } },
  { image: img.meninaPintura, category: "oficinas", alt: { pt: "Menina com o rosto pintado de tinta", fr: "Fillette au visage couvert de peinture", nl: "Meisje met verf op het gezicht" } },
  { image: img.futebolBola, category: "futebol", alt: { pt: "Bola de futebol no gramado", fr: "Ballon de football sur la pelouse", nl: "Voetbal op het gras" } },
  { image: img.roupasArara, category: "roupas", alt: { pt: "Arara com camisetas doadas", fr: "Portant avec des t-shirts donnés", nl: "Rek met geschonken T-shirts" } },
  { image: img.criancasGrupo, category: "comunidade", alt: { pt: "Crianças reunidas e sorrindo", fr: "Enfants réunis et souriants", nl: "Kinderen samen en lachend" } },
  { image: img.rodaDeConversa, category: "educacao", alt: { pt: "Crianças sentadas em roda de conversa", fr: "Enfants assis en cercle de parole", nl: "Kinderen zitten in een kring" } },
  { image: img.alimentos, category: "alimentacao", alt: { pt: "Frutas e verduras frescas", fr: "Fruits et légumes frais", nl: "Vers fruit en groenten" } },
  { image: img.pinceisTinta, category: "oficinas", alt: { pt: "Pincel com tinta laranja", fr: "Pinceau avec de la peinture orange", nl: "Penseel met oranje verf" } },
  { image: img.irmaosAbraco, category: "comunidade", alt: { pt: "Três crianças abraçadas", fr: "Trois enfants enlacés", nl: "Drie kinderen in een knuffel" } },
  { image: img.livrosEducacao, category: "educacao", alt: { pt: "Livros, maçã e blocos do alfabeto", fr: "Livres, pomme et cubes alphabet", nl: "Boeken, appel en alfabetblokken" } },
  { image: img.futebolNoite, category: "futebol", alt: { pt: "Jogo de futebol à noite", fr: "Match de football en soirée", nl: "Voetbalwedstrijd ’s avonds" } },
  { image: img.criancasAlegria, category: "comunidade", alt: { pt: "Crianças rindo juntas", fr: "Enfants riant ensemble", nl: "Kinderen lachen samen" } },
  { image: img.doacaoMaos, category: "roupas", alt: { pt: "Mãos segurando moedas de doação", fr: "Mains tenant des pièces de don", nl: "Handen met muntjes voor een gift" } },
  { image: img.palestra, category: "educacao", alt: { pt: "Palestra sobre cidadania", fr: "Conférence sur la citoyenneté", nl: "Lezing over burgerschap" } },
  { image: img.maosUnidas, category: "comunidade", alt: { pt: "Mãos unidas no centro de uma roda", fr: "Mains réunies au centre d’un cercle", nl: "Handen samen in het midden van een kring" } },
  { image: img.voluntario, category: "comunidade", alt: { pt: "Voluntário com camiseta da ação", fr: "Bénévole portant le t-shirt de l’action", nl: "Vrijwilliger in actie-T-shirt" } },
  { image: img.coracaoMaos, category: "comunidade", alt: { pt: "Mãos formando um coração vermelho", fr: "Mains formant un cœur rouge", nl: "Handen vormen een rood hart" } },
];
