# Especificacoes do Projeto

Esta pasta concentra as especificacoes que orientam agentes e implementacoes
no repositorio.

## Estrutura

| Area | Conteudo |
| --- | --- |
| [architecture](architecture/system-architecture.md) | Arquitetura adotada, modules e direcao de dependencias |
| [engineering](engineering/frontend-standards.md) | Regras de TypeScript, Next.js, shadcn, Tailwind CSS e verificacao |
| [internationalization](internationalization/paraglide-and-url-state.md) | Paraglide, locale routing, SEO internacional e Nuqs |
| [decisions](decisions/README.md) | Architecture Decision Records e historico de decisoes |

## Ordem de Leitura

1. `AGENTS.md`
2. `CONTEXT.md`
3. `architecture/system-architecture.md`
4. `engineering/frontend-standards.md`
5. Specs especializadas, como `internationalization/`
6. ADRs relacionados em `decisions/`

## Responsabilidade

As specs definem como o sistema deve ser construido. Skills e ferramentas
permanecem em `.agents/skills/`; elas descrevem capacidades e processos
reutilizaveis, nao decisoes especificas deste projeto.
