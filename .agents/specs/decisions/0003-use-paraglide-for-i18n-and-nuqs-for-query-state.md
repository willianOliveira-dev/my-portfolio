# ADR-0003: Paraglide para i18n e Nuqs para query state

## Status

Accepted

## Data

2026-06-10

## Contexto

O portfolio precisa publicar conteudo em Portugues do Brasil, Ingles e
Espanhol, com URLs, metadata e indexacao independentes. A solucao deve manter
tipagem forte e evitar sistemas paralelos de traducao.

Estados compartilháveis como filtros, tabs e paginacao tambem precisam ser
sincronizados com query parameters sem misturar essa responsabilidade com a
resolucao de idioma.

## Direcionadores

- Message functions geradas e tipadas.
- Locale como parte explicita da URL.
- SEO internacional completo.
- Uma unica fonte de verdade para internacionalizacao.
- Query state tipado e separado de locale routing.
- Compatibilidade com Next.js App Router.

## Opcoes Consideradas

### Paraglide JS

- Vantagens: geracao de message functions, tipagem forte, tree shaking e
  runtime/strategies de locale.
- Desvantagens: exige etapa de geracao e integracao cuidadosa com SSR.

### next-intl e familia i18next

- Vantagens: ecossistemas conhecidos.
- Desvantagens: criariam outra interface de traducao e nao atendem a decisao
  de padronizar message functions do Paraglide.

### Solucao customizada

- Vantagens: controle total.
- Desvantagens: duplica routing, fallback, tipagem, deteccao e persistencia.

## Decisao

Adotar exclusivamente Paraglide JS para internacionalizacao.

Locales suportados:

- `pt-br`;
- `en`;
- `es`.

O fallback e `pt-br`, pois o Brasil e o mercado principal do site. Toda pagina
publica usa locale routing e slugs localizados. Textos visiveis, acessibilidade
e metadata usam message functions geradas.

Adotar Nuqs somente para query state tipado, como filtros, paginacao,
ordenacao, tabs e busca. Nuqs nao gerencia locale.

A instalacao deve consultar o Context7 e a documentacao oficial das versoes
selecionadas. A implementacao deve usar as APIs oficiais atuais de middleware,
runtime, adapter e parsers, sem copiar workarounds de versoes antigas.

## Consequencias

### Positivas

- Traducoes tipadas em compile time.
- SEO e URLs coerentes com o idioma.
- Menos duplicacao de infraestrutura de i18n.
- Query state separado de path locale routing.

### Negativas

- Catalogos e rotas precisam permanecer sincronizados.
- Slugs localizados exigem mapa de rotas.
- A geracao do Paraglide passa a fazer parte do build.
- SSR e metadata exigem testes por locale.

### Riscos e Mitigacoes

- Risco: usar documentacao de uma versao diferente. Mitigacao: Context7
  obrigatorio e comparacao com lockfile.
- Risco: textos hardcoded. Mitigacao: revisao e verificacao automatizada quando
  a fatia de i18n for implementada.
- Risco: troca de idioma perder query params. Mitigacao: helper tipado de rotas
  localizadas com preservacao explicita de search params e hash.
- Risco: Nuqs assumir locale. Mitigacao: locale permanece exclusivamente no
  path e runtime do Paraglide.

## Referencias

- [Spec de internacionalizacao](../internationalization/paraglide-and-url-state.md)
- [Padroes de engenharia](../engineering/frontend-standards.md)
- [Arquitetura](../architecture/system-architecture.md)
