/**
 * Todas as fotos do site. Importação estática = tamanho e "blur" automáticos no next/image.
 * Para trocar uma foto, substitua o arquivo em /public/images mantendo o mesmo nome.
 *
 * - /images/layout: recortes do layout original.
 * - /images/fotos: fotos do Unsplash (licença Unsplash: uso livre, sem necessidade de atribuição).
 */
import hero from "@/public/images/layout/hero.jpg";
import alimentacao from "@/public/images/layout/alimentacao.jpg";
import roupas from "@/public/images/layout/roupas.jpg";
import oficinas from "@/public/images/layout/oficinas.jpg";
import futebol from "@/public/images/layout/futebol.jpg";

import criancasSorrindo from "@/public/images/fotos/criancas-sorrindo.jpg";
import criancasGrupo from "@/public/images/fotos/criancas-grupo.jpg";
import meninaPintura from "@/public/images/fotos/menina-pintura.jpg";
import criancasAlegria from "@/public/images/fotos/criancas-alegria.jpg";
import reforcoEscolar from "@/public/images/fotos/reforco-escolar.jpg";
import doacaoMaos from "@/public/images/fotos/doacao-maos.jpg";
import rodaDeConversa from "@/public/images/fotos/roda-de-conversa.jpg";
import voluntario from "@/public/images/fotos/voluntario.jpg";
import futebolBola from "@/public/images/fotos/futebol-bola.jpg";
import maosUnidas from "@/public/images/fotos/maos-unidas.jpg";
import voluntariosCaixas from "@/public/images/fotos/voluntarios-caixas.jpg";
import irmaosAbraco from "@/public/images/fotos/irmaos-abraco.jpg";
import roupasArara from "@/public/images/fotos/roupas-arara.jpg";
import alimentos from "@/public/images/fotos/alimentos.jpg";
import coracaoMaos from "@/public/images/fotos/coracao-maos.jpg";
import equipeVoluntarios from "@/public/images/fotos/equipe-voluntarios.jpg";
import parceriaAperto from "@/public/images/fotos/parceria-aperto.jpg";
import parceriaReuniao from "@/public/images/fotos/parceria-reuniao.jpg";
import amigosPorDoSol from "@/public/images/fotos/amigos-por-do-sol.jpg";
import pinceisTinta from "@/public/images/fotos/pinceis-tinta.jpg";
import livrosEducacao from "@/public/images/fotos/livros-educacao.jpg";
import palestra from "@/public/images/fotos/palestra.jpg";
import futebolNoite from "@/public/images/fotos/futebol-noite.jpg";

export const img = {
  hero,
  alimentacao,
  roupas,
  oficinas,
  futebol,
  criancasSorrindo,
  criancasGrupo,
  meninaPintura,
  criancasAlegria,
  reforcoEscolar,
  doacaoMaos,
  rodaDeConversa,
  voluntario,
  futebolBola,
  maosUnidas,
  voluntariosCaixas,
  irmaosAbraco,
  roupasArara,
  alimentos,
  coracaoMaos,
  equipeVoluntarios,
  parceriaAperto,
  parceriaReuniao,
  amigosPorDoSol,
  pinceisTinta,
  livrosEducacao,
  palestra,
  futebolNoite,
};

export type ImageKey = keyof typeof img;
