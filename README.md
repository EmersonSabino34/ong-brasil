<div align="center">

# Infinita Esperança ONG

**Site institucional, doações, voluntariado e painel administrativo de uma ONG que atua no Brasil e está em expansão para Portugal e Bélgica.**

Português · Français · Nederlands

![Next.js](https://img.shields.io/badge/Next.js-16-000000?logo=nextdotjs)
![React](https://img.shields.io/badge/React-19-149eca?logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178c6?logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-38bdf8?logo=tailwindcss&logoColor=white)
![Postgres](https://img.shields.io/badge/Postgres-Neon-00e599?logo=postgresql&logoColor=white)
![Vercel](https://img.shields.io/badge/Deploy-Vercel-000000?logo=vercel)

<img src="docs/screenshots/site-inicio.webp" alt="Página inicial do site da Infinita Esperança" width="100%">

</div>

## Sumário

- [O que o projeto faz](#o-que-o-projeto-faz)
- [Telas](#telas)
- [Estrutura do projeto](#estrutura-do-projeto)
- [Rodar no computador](#rodar-no-computador)
- [Publicar na Vercel](#publicar-na-vercel)
- [Variáveis de ambiente](#variáveis-de-ambiente)
- [Painel administrativo](#painel-administrativo)
- [Onde trocar textos e dados da ONG](#onde-trocar-textos-e-dados-da-ong)

## O que o projeto faz

**Site público (3 idiomas)**
- Páginas: Início, Quem Somos, O Que Fazemos, Projetos, Como Ajudar, Transparência, Notícias, Galeria e Contato.
- O idioma é escolhido sozinho pelo navegador do visitante (PT, FR ou NL) e pode ser trocado no topo.
- **Doações** em real ou euro, únicas ou mensais: PIX com QR Code gerado na hora, transferência bancária e MB WAY.
- Formulários de **voluntariado**, **parcerias** e **contato**, cada envio com um protocolo (ex.: `DO-7K4P2X`).
- **WhatsApp** da ONG (+32 499 24 54 66) num botão fixo em todas as páginas e na página de contato.

**Área do apoiador**
- Cadastro, login, “esqueci minha senha” e a página **Minha conta**, com o histórico de doações e inscrições da pessoa.
- Senhas guardadas com `scrypt`, sessões em cookie assinado, limite de tentativas de login.

**Painel administrativo** (`/admin`)
- Visão geral com números (doações em R$ e €, doadores mensais, voluntários, parcerias, mensagens, apoiadores) e gráfico dos envios dos últimos 30 dias.
- Listas com busca, filtro por andamento (**Novo → Em andamento → Concluído → Arquivado**) e anotações internas.
- Atalhos para responder por **e-mail**, **WhatsApp** ou **ligar** para a pessoa.
- Exportação de cada lista em **planilha** (CSV que abre direto no Excel / Google Planilhas).
- Página **Configuração** que mostra o que já está pronto e o que falta para o site funcionar 100% na internet.
- Aviso por e-mail para a equipe a cada formulário novo (quando o e-mail estiver configurado).

## Telas

> Os prints do painel usam **dados fictícios** de demonstração.

### Site — computador

<table>
  <tr>
    <td width="50%"><img src="docs/screenshots/site-quem-somos.webp" alt="Quem Somos"><p align="center"><b>Quem Somos</b></p></td>
    <td width="50%"><img src="docs/screenshots/site-projetos.webp" alt="Projetos"><p align="center"><b>Projetos</b></p></td>
  </tr>
  <tr>
    <td><img src="docs/screenshots/site-doe.webp" alt="Doe Agora"><p align="center"><b>Doe Agora</b></p></td>
    <td><img src="docs/screenshots/site-transparencia.webp" alt="Transparência"><p align="center"><b>Transparência</b></p></td>
  </tr>
  <tr>
    <td><img src="docs/screenshots/site-contato.webp" alt="Contato com WhatsApp"><p align="center"><b>Contato (com WhatsApp)</b></p></td>
    <td><img src="docs/screenshots/painel-entrar.webp" alt="Entrada do painel"><p align="center"><b>Entrada do painel</b></p></td>
  </tr>
</table>

<details>
<summary><b>Ver a página inicial inteira</b></summary>
<br>
<img src="docs/screenshots/site-inicio-completa.webp" alt="Página inicial completa" width="100%">
</details>

### Site e painel — celular

<table>
  <tr>
    <td width="33%"><img src="docs/screenshots/celular-inicio.webp" alt="Início no celular"><p align="center"><b>Início</b></p></td>
    <td width="33%"><img src="docs/screenshots/celular-doe.webp" alt="Doação no celular"><p align="center"><b>Doe Agora</b></p></td>
    <td width="33%"><img src="docs/screenshots/celular-painel.webp" alt="Painel no celular"><p align="center"><b>Painel</b></p></td>
  </tr>
</table>

### Painel administrativo

<img src="docs/screenshots/painel-visao-geral.webp" alt="Painel – visão geral" width="100%">

<table>
  <tr>
    <td width="50%"><img src="docs/screenshots/painel-doacoes.webp" alt="Lista de doações"><p align="center"><b>Doações</b></p></td>
    <td width="50%"><img src="docs/screenshots/painel-detalhe.webp" alt="Detalhe de uma doação"><p align="center"><b>Detalhe e acompanhamento</b></p></td>
  </tr>
  <tr>
    <td><img src="docs/screenshots/painel-voluntarios-filtro.webp" alt="Voluntários filtrados"><p align="center"><b>Voluntários (filtro “Novo”)</b></p></td>
    <td><img src="docs/screenshots/painel-apoiadores.webp" alt="Apoiadores"><p align="center"><b>Apoiadores</b></p></td>
  </tr>
</table>

<img src="docs/screenshots/painel-configuracao.webp" alt="Painel – configuração" width="100%">

## Estrutura do projeto

```text
ong-brasil/
├── app/
│   ├── [lang]/                páginas públicas em PT, FR e NL (/pt, /fr, /nl)
│   │   ├── page.tsx           início
│   │   ├── doe/               doações (PIX, transferência, MB WAY)
│   │   ├── contato/  como-ajudar/  projetos/  noticias/  …
│   │   └── entrar/  cadastro/  minha-conta/  …   área do apoiador
│   ├── admin/                 painel administrativo (/admin, só em português)
│   │   ├── entrar/            tela de login
│   │   ├── (painel)/          visão geral, listas, detalhe, apoiadores, configuração
│   │   ├── exportar/[tipo]/   download das planilhas CSV
│   │   └── actions.ts         login, sair e salvar andamento
│   ├── actions.ts             recebe os formulários do site
│   └── auth-actions.ts        cadastro, login e senha dos apoiadores
├── components/                cabeçalho, rodapé, formulários, botão do WhatsApp, peças do painel
├── lib/
│   ├── site.ts                dados da ONG: e-mail, WhatsApp, PIX, banco, redes sociais
│   ├── content/               todos os textos do site nos 3 idiomas
│   ├── db.ts                  banco Postgres (Neon) — ou a pasta .data no computador
│   ├── submissions.ts         doações, voluntários, parcerias e mensagens
│   ├── auth/                  contas, sessões e senhas dos apoiadores
│   ├── admin/                 login do painel, números, rótulos e checagem de configuração
│   └── email.ts               envio de e-mails (Resend)
├── public/images/             fotos do site
├── proxy.ts                   escolhe o idioma e protege as áreas com login
├── docs/screenshots/          prints usados neste README
└── .env.example               modelo das variáveis de ambiente
```

**Onde os dados ficam guardados:** com a variável `DATABASE_URL` definida (Vercel), tudo vai para um banco **Postgres da Neon** — as tabelas são criadas sozinhas no primeiro acesso. Sem ela (no computador), tudo fica na pasta `.data/`, que **não** vai para o GitHub.

## Rodar no computador

Precisa do [Node.js](https://nodejs.org) 20 ou mais novo.

```bash
npm install
cp .env.example .env.local   # depois preencha AUTH_SECRET, ADMIN_EMAIL e ADMIN_PASSWORD
npm run dev
```

- Site: <http://localhost:3000>
- Painel: <http://localhost:3000/admin>

## Publicar na Vercel

1. **Importar o projeto** — em [vercel.com](https://vercel.com), entre com a conta do GitHub, clique em **Add New → Project**, escolha o repositório `ong-brasil` e clique em **Deploy** (a Vercel reconhece o Next.js sozinha).
2. **Criar o banco de dados** — no projeto, abra **Storage → Create Database → Neon (Serverless Postgres)**, mantenha a região sugerida e clique em **Connect**. Isso cria a variável `DATABASE_URL` automaticamente.
3. **Configurar as variáveis** — em **Settings → Environment Variables**, adicione:
   - `AUTH_SECRET` — 40+ caracteres aleatórios. Para gerar, rode no terminal:
     `node -e "console.log(require('crypto').randomBytes(48).toString('base64url'))"`
   - `ADMIN_EMAIL` — o e-mail da ONG que vai entrar no painel.
   - `ADMIN_PASSWORD` — uma senha forte (10+ caracteres).
4. **Publicar de novo** — em **Deployments**, clique nos três pontinhos do último deploy → **Redeploy** (variáveis novas só valem depois disso).
5. **Conferir** — abra `https://SEU-PROJETO.vercel.app/admin`, entre com o e-mail e a senha e veja a página **Configuração**: tudo que for obrigatório deve estar como **Pronto**.
6. **Domínio próprio (opcional)** — em **Settings → Domains**, adicione o domínio da ONG e depois defina `SITE_URL` com ele.

**E-mails (opcional, recomendado):** crie uma conta na [Resend](https://resend.com), verifique o domínio do e-mail da ONG, gere uma API key e defina `RESEND_API_KEY` e `EMAIL_FROM`. A partir daí funcionam a recuperação de senha dos apoiadores e os avisos de novos formulários para a equipe.

A cada `git push` na branch principal, a Vercel publica a nova versão sozinha.

## Variáveis de ambiente

| Variável | Obrigatória na Vercel | Para que serve |
| --- | :---: | --- |
| `DATABASE_URL` | ✅ | Banco Postgres (Neon). Criada sozinha ao conectar o Neon. |
| `AUTH_SECRET` | ✅ | Assina os cookies de login. Sem ela os logins caem sozinhos. |
| `ADMIN_EMAIL` | ✅ | E-mail de acesso ao painel `/admin`. |
| `ADMIN_PASSWORD` | ✅ | Senha do painel (10+ caracteres). |
| `RESEND_API_KEY` | — | Chave da Resend para enviar e-mails. |
| `EMAIL_FROM` | — | Remetente, ex.: `Infinita Esperança <contato@seudominio.org>`. |
| `NOTIFY_EMAIL` | — | Quem recebe os avisos de novos formulários (padrão: `ADMIN_EMAIL`). |
| `SITE_URL` | — | Endereço oficial, quando houver domínio próprio. |

O modelo completo está em [`.env.example`](.env.example).

## Painel administrativo

- Endereço: **`/admin`** (não aparece no menu do site nem no Google).
- O login vem das variáveis `ADMIN_EMAIL` e `ADMIN_PASSWORD` — para trocar a senha, mude a variável na Vercel e faça **Redeploy**; quem estava conectado com a senha antiga é desconectado.
- A sessão dura 8 horas. Depois de 5 senhas erradas, o acesso fica bloqueado por 15 minutos.
- As doações são **intenções registradas** (ainda não há gateway de cartão): confira o pagamento no banco/PIX antes de marcar como **Concluído**.

## Onde trocar textos e dados da ONG

| O quê | Arquivo |
| --- | --- |
| E-mail, WhatsApp, telefones, endereço, redes sociais | `lib/site.ts` |
| Chave PIX, conta bancária, IBAN, MB WAY | `lib/site.ts` |
| Textos das páginas (PT, FR, NL) | `lib/content/*.ts` |
| Projetos, notícias, galeria | `lib/content/projects.ts`, `news.ts`, `gallery.ts` |
| Fotos | `public/images/` |

Ainda são **fictícios** e precisam dos dados reais antes do lançamento: chave PIX, conta bancária, IBAN, MB WAY, telefones de Portugal e do Brasil e links das redes sociais. A página **Configuração** do painel lista o que falta.
