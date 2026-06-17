# Willian Oliveira — Portfólio Pessoal

> Portfólio profissional desenvolvido de ponta a ponta por **Willian Oliveira** — do design ao código — para apresentar sua identidade como desenvolvedor Full Stack com foco em Backend.

---

## Visão Geral

Este projeto é uma aplicação web moderna e de alta performance, construída com Next.js 16 e React 19. Vai além de um portfólio estático: conta com um **chat interativo com IA**, formulário de contato com **envio de e-mail real**, **banco de dados em memória na nuvem** para proteção anti-spam e suporte completo a **três idiomas** (Português, Inglês e Espanhol).

Todo o design — da tipografia às animações — foi criado e implementado pelo próprio Willian, sem uso de templates prontos.

---

## Funcionalidades

- **Hero Section** — Apresentação com animação de partículas interativas e tipagem dinâmica.
- **About** — Resumo da identidade e proposta de valor profissional.
- **Projects** — Grid de cards com os principais projetos, suporte a imagens e tecnologias utilizadas em cada um.
- **Journey (Trajetória)** — Linha do tempo com marcos de aprendizado e evolução profissional.
- **Contact Form** — Formulário funcional com envio de e-mail real via **Resend** e template HTML profissional construído com **React Email**.
- **Chat com IA** — Widget flutuante com um assistente inteligente alimentado por **Groq** (`llama-3`), com streaming de texto em tempo real via **Vercel AI SDK** e renderização de Markdown.
- **FAQ** — Seção de perguntas frequentes com accordion animado no estilo Aceternity UI.
- **Rate Limiting** — Proteção anti-spam no formulário de contato: cada IP pode enviar no máximo **3 mensagens a cada 30 minutos**, usando **Upstash Redis** (banco de dados em memória na nuvem).
- **Suporte i18n** — Interface disponível em Português (PT-BR), Inglês (EN) e Espanhol (ES), usando **Paraglide JS**.
- **Tema Dark/Light** — Alternância de tema sem flash de conteúdo (SSR-safe).

---

## Stack de Tecnologias

| Camada | Tecnologia |
|---|---|
| Framework | [Next.js 16](https://nextjs.org/) (App Router) |
| UI Library | [React 19](https://react.dev/) |
| Linguagem | [TypeScript 5](https://www.typescriptlang.org/) |
| Estilização | [Tailwind CSS v4](https://tailwindcss.com/) |
| Componentes UI | [shadcn/ui](https://ui.shadcn.com/) + [Radix UI](https://www.radix-ui.com/) |
| Animações | [Motion (Framer Motion)](https://motion.dev/) |
| Partículas | [tsParticles](https://particles.js.org/) |
| Ícones | [Lucide React](https://lucide.dev/) + [Tabler Icons](https://tabler.io/icons) |
| Formulários | [React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/) |
| IA / Chat | [Groq](https://groq.com/) via [Vercel AI SDK](https://sdk.vercel.ai/) |
| Streaming Markdown | [Streamdown](https://github.com/nicholasgasior/streamdown) |
| Envio de E-mail | [Resend](https://resend.com/) + [React Email](https://react.email/) |
| Anti-Spam / Rate Limit | [Upstash Redis](https://upstash.com/) (banco em memória na nuvem) |
| Internacionalização | [Paraglide JS](https://inlang.com/m/gerre34r/library-inlang-paraglideJs) |
| URL State | [nuqs](https://nuqs.47ng.com/) |
| Tipografia | Lufga (fonte local autohospedada) |
| Package Manager | [pnpm](https://pnpm.io/) |

---

## Arquitetura

O projeto segue uma arquitetura orientada a **domínios/features**, inspirada nos princípios de Clean Architecture. Cada feature é isolada e autocontida.

```
src/
├── app/                    # Roteamento Next.js (App Router)
│   ├── api/
│   │   ├── chat/           # Endpoint SSE do chat com IA
│   │   └── contact/        # Endpoint de envio de e-mail + rate limiting
│   ├── layout.tsx
│   └── page.tsx
├── features/               # Módulos por domínio de negócio
│   ├── about/
│   ├── chat/               # Chat widget (adapters, application, hooks, presentation)
│   ├── contact/            # Formulário de contato (schema, form, section)
│   ├── faq/
│   ├── hero/
│   ├── journey/
│   └── projects/
├── components/             # Componentes globais reutilizáveis
│   ├── site-header/
│   ├── site-footer/
│   ├── theme/
│   ├── ui/                 # Primitivos shadcn/ui
│   └── i18n/
├── emails/                 # Templates de e-mail (React Email)
│   └── contact-email.tsx
├── messages/               # Strings de internacionalização
│   ├── pt-br.json
│   ├── en.json
│   └── es.json
└── shared/                 # Utilitários, hooks e tipos compartilhados
```

---

## Variáveis de Ambiente

Crie um arquivo `.env.local` na raiz do projeto com as seguintes variáveis:

```env
# IA / Chat
GROQ_API_KEY=

# Envio de e-mail (Resend)
RESEND_API_KEY=
CONTACT_EMAIL_TO=
CONTACT_EMAIL_FROM=

# Anti-Spam (Upstash Redis)
UPSTASH_REDIS_REST_URL=
UPSTASH_REDIS_REST_TOKEN=
```

> [!NOTE]
> O Resend e o Upstash oferecem planos gratuitos generosos, suficientes para uso em portfólio.

---

## Como Rodar Localmente

**Pré-requisitos:** Node.js 20+, pnpm 8+

```bash
# 1. Clone o repositório
git clone https://github.com/willian-oliveira/willian-portfolio.git
cd willian-portfolio

# 2. Instale as dependências
pnpm install

# 3. Configure as variáveis de ambiente
cp .env.example .env.local
# Edite o arquivo .env.local com suas chaves

# 4. Inicie o servidor de desenvolvimento
pnpm dev
```

Abra [http://localhost:3000](http://localhost:3000) no seu navegador.

---

## Como o Rate Limiting Funciona

O formulário de contato é protegido por um limite de **3 requisições por IP a cada 30 minutos**, implementado com o algoritmo de **Sliding Window** do Upstash Ratelimit. Caso o limite seja excedido, a API retorna `429 Too Many Requests` e o frontend exibe uma mensagem de erro amigável ao usuário — sem que nenhuma mensagem indesejada chegue à caixa de entrada.

---

## Direitos Autorais e Uso

**© 2025 Willian Oliveira. Todos os direitos reservados.**

Este projeto — incluindo seu design, código-fonte, estrutura, textos e componentes — é obra original de Willian Oliveira. **A cópia total ou parcial deste projeto, sua identidade visual, estrutura de componentes ou qualquer ativo sem autorização expressa e por escrito do autor é estritamente proibida e sujeita às penalidades previstas na Lei de Direitos Autorais (Lei nº 9.610/98) e na legislação aplicável.**

Uso permitido apenas para fins de referência e aprendizado, desde que devidamente atribuído ao autor original.
