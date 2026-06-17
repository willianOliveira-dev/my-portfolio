# Padroes de Engenharia Frontend

## Fluxo Obrigatorio

1. Ler `CONTEXT.md`, `.agents/specs/architecture/system-architecture.md` e
   ADRs relacionados.
2. Aplicar as skills de arquitetura adequadas ao tamanho da mudanca.
3. Consultar obrigatoriamente o Context7 para toda tecnologia, biblioteca,
   framework, SDK, CLI ou API envolvida.
4. Procurar uma primitive ou composicao shadcn antes de criar um component
   visual do zero.
5. Implementar com TypeScript estrito e as convencoes do App Router.
6. Validar lint, tipos, build e comportamento responsivo.

## Skills por Responsabilidade

| Responsabilidade | Skills |
| --- | --- |
| Arquitetura | `improve-codebase-architecture`, `hexagonal-architecture`, `architecture-decision-records` |
| Components | `shadcn` |
| TypeScript | `typescript-expert` |
| Next.js | `nextjs-best-practices` |
| Interface e UX | `frontend-design`, `ui-ux-pro-max` |
| App Router avancado | `nextjs-app-router-patterns` |

## Arquitetura Adotada

O sistema usa um **monolito modular feature-first**, organizado em fatias
verticais. Essa abordagem combina:

- modularidade por conceito de dominio;
- Server Components e App Router como adapter de entrega;
- Ports & Adapters incremental para regras e efeitos externos;
- composition roots explicitos;
- primitives shadcn como base do design system.

Nao usamos microfrontends. O portfolio e uma unica aplicacao implantavel e nao
possui equipes ou ciclos de deploy independentes que justifiquem esse custo.

Nao usamos uma arquitetura hexagonal completa para paginas puramente
apresentacionais. As pastas `domain`, `application` e `adapters` surgem quando
uma feature possui comportamento que precisa dessa separacao.

## Context7 e Versoes

- Consultar o Context7 antes de escrever codigo dependente de tecnologia.
- Buscar a documentacao mais recente da fonte oficial disponivel.
- Comparar a documentacao atual com a versao instalada em `package.json` ou
  no lockfile.
- Se houver versao mais recente, avaliar changelog, breaking changes,
  compatibilidade e impacto antes de propor ou executar upgrade.
- Implementar contra a versao instalada, salvo quando o upgrade fizer parte do
  escopo aprovado.
- Registrar no resumo da tarefa qualquer incompatibilidade relevante entre a
  versao instalada e a documentacao atual.

## Internacionalizacao

- Usar exclusivamente Paraglide JS.
- Importar e chamar message functions geradas.
- Nao usar `next-intl`, `i18next`, `react-i18next`, `next-i18next` ou traducao
  customizada.
- Locales suportados: `pt-br`, `en` e `es`; fallback: `pt-br`.
- Todo texto visivel, metadata e texto de acessibilidade deve ser
  internacionalizavel.
- Locale routing pertence ao Paraglide e ao path da URL.
- Nuqs e permitido somente para query state compartilhável.
- Seguir
  `.agents/specs/internationalization/paraglide-and-url-state.md`.

## Next.js e TypeScript

- Preferir Server Components.
- Isolar interatividade em Client Components pequenos.
- Nao transportar tipos de framework para `domain` ou `application`.
- Modelar props com tipos explicitos e estreitos.
- Preferir unions discriminadas a estados booleanos ambiguos.
- Evitar `any`, assertions desnecessarias e tipos duplicados.
- Usar `satisfies` quando for necessario validar estrutura preservando
  inferencia.
- Usar `next/link`, `next/image`, metadata e outras primitives do framework
  quando correspondem ao caso de uso.

## shadcn

- Verificar `components.json` e os components instalados.
- Consultar a documentacao do component antes de adicionar ou modificar.
- Usar variantes e tokens semanticos existentes.
- Nao sobrescrever estilo interno de primitives via `className` quando uma
  variante apropriada puder representar o caso.
- Manter acessibilidade exigida por Dialog, Sheet, Drawer, Avatar e demais
  primitives.

## Tailwind CSS

### Regra

Classes com valores arbitrarios sao proibidas:

```text
text-[450px]
bg-[#ffffff]
w-[307px]
tracking-[-0.015em]
top-[calc(100%+0.5rem)]
min-[1362px]:flex
```

### Ordem de Decisao

1. Usar uma classe estatica existente, como `text-4xl`, `w-80` ou
   `tracking-tight`.
2. Usar um token semantico existente, como `bg-primary`.
3. Adicionar um token ao `@theme` ou `@theme inline` em
   `src/app/globals.css`.
4. Para comportamento que nao cabe em um token, criar uma `@utility` nomeada
   e reutilizavel em `src/app/globals.css`.

### Exemplo

```css
@theme {
  --color-header: oklch(0.205 0 0);
  --breakpoint-navigation: 85.125rem;
}

@utility top-navigation-menu {
  top: calc(100% + var(--spacing) * 2);
}
```

```tsx
<div className="bg-header navigation:flex top-navigation-menu" />
```

O nome do token deve explicar a funcao no sistema, nao reproduzir o valor.

## Arquitetura de Components

- `app`: entrega, rotas, layouts e composition roots.
- `src/features/<feature>/presentation`: components que conhecem o dominio.
- `src/components/ui`: primitives shadcn reutilizaveis.
- `components`: modules compartilhados de apresentacao sem regra de dominio.
- `lib`: utilitarios genericos, sem conceitos do portfolio.

Nao criar ports, adapters ou pastas vazias sem uma variacao ou responsabilidade
real.

### Um Component por Arquivo

- Todo arquivo `.tsx` de component declara exatamente um React component.
- Um arquivo nao pode conter components auxiliares privados.
- Extrair logo, item de navegacao, menu, card, section e outros elementos
  semanticamente independentes para arquivos proprios.
- Tipos compartilhados ficam em `types.ts`.
- Constantes e configuracoes ficam em `constants.ts`.
- Hooks ficam em `src/hooks/` ou em arquivos `use-*.ts`.
- `index.ts` pode apenas reexportar a interface publica do module.
- Arquivos de rota do Next.js (`page.tsx`, `layout.tsx`, `loading.tsx`,
  `error.tsx`) declaram somente o component exigido pela convencao.

Essa regra nao significa criar components para cada `div`. A extracao deve
seguir responsabilidade, reutilizacao, testabilidade e legibilidade.

### Interface Publica dos Modules

- Cada feature expoe apenas o necessario por um `index.ts`.
- Callers nao importam caminhos internos de outra feature.
- Props sao a interface do component e devem esconder detalhes da
  implementacao.
- Components interativos ficam nas folhas da arvore para reduzir o alcance de
  `"use client"`.

## Definition of Done

- A implementacao respeita a direcao de dependencias.
- O Context7 foi consultado para as tecnologias envolvidas.
- Textos visiveis usam message functions do Paraglide.
- Locale routing, metadata e SEO respeitam a spec de internacionalizacao.
- Nuqs nao gerencia idioma.
- Components shadcn foram priorizados.
- Cada arquivo de component declara somente um component.
- Props e estados possuem tipagem explicita.
- Nenhuma classe Tailwind arbitraria foi introduzida.
- Tokens novos estao no CSS global e possuem nomes semanticos.
- `npm run lint` passou.
- `npm run typecheck` passou.
- Lint e build/type checking relevantes passaram.
