# ADR-0002: Modularizacao de components e documentacao atual

## Status

Accepted

## Data

2026-06-10

## Contexto

ADR-0001 adotou feature-first e arquitetura hexagonal incremental. O projeto
tambem precisa de regras operacionais para continuar modular conforme a
interface cresce.

Components grandes com subcomponents internos concentram responsabilidades,
ampliam Client Component boundaries e dificultam reutilizacao e testes.
Implementacoes baseadas em memoria sobre frameworks e bibliotecas tambem
correm risco de usar APIs desatualizadas.

## Direcionadores

- Modules pequenos com interfaces explicitas.
- Alta locality sem arquivos monoliticos.
- Client Components limitados a folhas interativas.
- Consistencia entre a versao instalada e a documentacao utilizada.
- Evolucao segura de dependencias.

## Opcoes Consideradas

### Components agrupados livremente por pagina

- Vantagens: menos arquivos no inicio.
- Desvantagens: responsabilidades misturadas e baixa reutilizacao.

### Um component por arquivo sem arquitetura de modules

- Vantagens: arquivos menores.
- Desvantagens: fragmentacao sem interface publica ou direcao de dependencias.

### Um component por arquivo dentro de modules feature-first

- Vantagens: responsabilidade clara, interface publica pequena e crescimento
  previsivel.
- Desvantagens: mais arquivos e necessidade de disciplina de naming.

## Decisao

Manter o monolito modular feature-first do ADR-0001 e exigir:

- exatamente um React component por arquivo de component;
- tipos, constantes, hooks e utilitarios em arquivos separados;
- `index.ts` como interface publica do module;
- imports entre features somente por interfaces publicas;
- Context7 como consulta obrigatoria para toda tecnologia, biblioteca,
  framework, SDK, CLI ou API;
- comparacao entre documentacao atual e versao instalada antes da
  implementacao ou atualizacao.

O Context7 informa a implementacao, mas nao autoriza upgrades automaticos.
Mudancas de versao continuam sujeitas a avaliacao de compatibilidade e escopo.

## Consequencias

### Positivas

- Modules mais navegaveis e testaveis.
- Menor alcance de `"use client"`.
- Menos acoplamento entre features.
- Decisoes tecnicas baseadas em documentacao atual.

### Negativas

- Maior quantidade de arquivos.
- Components existentes podem exigir extracao gradual.
- A consulta de documentacao adiciona uma etapa ao fluxo.

### Riscos e Mitigacoes

- Risco: extrair cada elemento visual em um component. Mitigacao: extrair por
  responsabilidade, interface e reutilizacao, nao por quantidade de markup.
- Risco: seguir a documentacao mais recente incompativel com a versao
  instalada. Mitigacao: comparar versoes e implementar contra a versao
  instalada ate que um upgrade seja aprovado.
- Risco: barrels criarem ciclos. Mitigacao: `index.ts` apenas na interface
  publica e imports internos por caminhos diretos.

## Referencias

- [ADR-0001](0001-feature-first-and-incremental-hexagonal-architecture.md)
- [Guia de arquitetura](../architecture/system-architecture.md)
- [Padroes de engenharia](../engineering/frontend-standards.md)
