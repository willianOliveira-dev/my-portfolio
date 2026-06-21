# Diretrizes para Agentes

Este arquivo e a porta de entrada obrigatoria para qualquer alteracao neste
repositorio. Antes de implementar, leia tambem `CONTEXT.md` e as specs em
`.agents/specs/`.

## Ordem de Leitura Obrigatoria

1. `AGENTS.md`
2. `CONTEXT.md`
3. `.agents/specs/architecture/system-architecture.md`
4. `.agents/specs/engineering/frontend-standards.md`
5. Specs especializadas relacionadas a mudanca
6. ADRs relevantes em `.agents/specs/decisions/`

## Arquitetura do Projeto

O app e um monolito modular feature-first com Ports & Adapters incremental.
`src/app` e o adapter de entrega e composition root do Next.js. Conceitos do
portfolio vivem em `src/features/<feature>`. Primitives visuais reutilizaveis
vivem em `src/components/ui`; modules compartilhados sem dominio vivem em
`src/components`; utilitarios genericos vivem em `src/lib` ou `src/shared`.

Crie `domain`, `application`, `adapters` e `composition` somente quando houver
responsabilidade concreta. Features puramente apresentacionais podem ter apenas
`presentation`, dados, tipos e uma interface publica por `index.ts`.

## Regras de Module

- Cada module deve expor uma interface publica pequena por `index.ts`.
- Imports entre features devem usar somente a interface publica da feature.
- Uma feature nao deve importar arquivos internos de outra feature.
- `domain` nao importa React, Next.js, SDKs, ambiente, storage ou transporte.
- `application` orquestra casos de uso e depende de `domain` e ports proprios.
- `adapters` traduzem SDKs, APIs externas, storage, email, IA e infraestrutura.
- `presentation` pode usar React e UI primitives, mas nao concentra regras de
  dominio nem SDKs externos.
- `app/api` deve ser fino: validar entrada, chamar composition/use case e
  traduzir resposta HTTP.

## Components e UI

- Todo arquivo `.tsx` de component declara exatamente um React component.
- Components auxiliares ficam em arquivos proprios.
- Tipos compartilhados ficam em `types.ts`; constantes em `constants.ts`;
  schemas em `*.schema.ts`; hooks em `use-*.ts`.
- Preferir Server Components; isolar `"use client"` em folhas interativas.
- Priorizar shadcn/ui e primitives existentes antes de criar UI do zero.
- Nao introduzir classes Tailwind arbitrarias. Use classes estaticas, tokens em
  `src/app/globals.css` ou utilities nomeadas.
- Textos visiveis, `aria-label`, `alt`, estados e metadata devem usar message
  functions do Paraglide, salvo excecoes editoriais intencionais.

## Internacionalizacao

- Paraglide JS e a unica solucao de i18n permitida.
- Locales publicos: `pt-br`, `en` e `es`; fallback: `pt-br`.
- Nuqs gerencia somente query state. Nunca usar Nuqs para locale.
- Locale routing pertence ao Paraglide e ao path da URL.
- Ao adicionar texto, atualize catalogos em todos os locales e regenere os
  arquivos do Paraglide quando necessario.

## Dados, Efeitos Externos e Ports

- Dados editoriais de Perfil, Projeto, Experiencia e Trajetoria devem ficar
  independentes de React e Next.js.
- Formulario de Contato e Assistente de Chat sao fluxos com efeitos externos.
  Email, rate limit, Redis e IA devem ficar atras de adapters ou route handlers.
- Crie um port quando houver efeito externo, teste relevante com adapter
  in-memory ou variacao real/provavel de implementacao.
- Nao crie ports para dados estaticos, funcoes puras ou abstracoes sem
  leverage.

## TypeScript

- Use TypeScript estrito, props explicitas e tipos estreitos.
- Nao usar `any`, `as any`, `@ts-ignore` ou casts para contornar erros.
- Preferir unions discriminadas a flags booleanas ambiguas.
- Usar `satisfies` quando precisar validar estrutura preservando inferencia.
- Nao duplicar tipos gerados pelo Paraglide ou por bibliotecas oficiais.

## Definition of Done

- Mudanca respeita `CONTEXT.md`, specs e ADRs aceitos.
- Direcao de dependencias foi preservada.
- Interface publica do module foi mantida pequena.
- Textos e acessibilidade foram internacionalizados.
- Nenhuma classe Tailwind arbitraria foi adicionada.
- `npm run lint`, `npm run typecheck` e build relevante passam, ou a razao de
  nao executar fica registrada no resumo.
- Se uma decisao duradoura mudar arquitetura, i18n ou padrao de engenharia,
  crie ou atualize um ADR em `.agents/specs/decisions/`.
