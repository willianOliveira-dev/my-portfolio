# Internacionalizacao e Estado da URL

## Decisao

Paraglide JS e a unica solucao de internacionalizacao permitida. Nuqs e a
solucao para estados compartilháveis em query parameters, mas nao participa da
resolucao de idioma.

Esta spec define o comportamento esperado. A instalacao e a configuracao devem
ser implementadas como uma fatia vertical propria, consultando o Context7 e a
documentacao oficial das versoes escolhidas.

## Tecnologias

### Internacionalizacao

- Permitido: Paraglide JS.
- Proibido: `next-intl`, `i18next`, `react-i18next`, `next-i18next` e
  implementacoes customizadas de traducao.
- Mensagens devem ser consumidas pelas message functions geradas:

```ts
import { m } from "@/paraglide/messages"

m.hero_title()
m.greeting({ name })
```

Nao usar chaves dinamicas ou objetos de traducao:

```ts
t("hero.title")
translations.hero.title
```

### Estado da URL

Nuqs pode ser usado exclusivamente para:

- filtros;
- paginacao;
- ordenacao;
- tabs;
- busca;
- estados compartilháveis por query parameters.

Nuqs nao gerencia idioma, path locale routing ou traducoes.

No App Router, a configuracao deve usar o adapter oficial da versao instalada.
Parsers compartilhados com Server Components devem usar a entrada server-side
recomendada pelo Nuqs.

## Locales

```ts
export const supportedLocales = ["pt-br", "en", "es"] as const
export type SupportedLocale = (typeof supportedLocales)[number]
```

| Locale | Idioma |
| --- | --- |
| `pt-br` | Portugues do Brasil |
| `en` | Ingles |
| `es` | Espanhol |

O fallback seguro e `pt-br`, pois o Brasil e o mercado principal do site.

Novos idiomas exigem:

1. inclusao na configuracao do Paraglide;
2. catalogo completo ou fallback documentado;
3. rotas e metadata localizadas;
4. cobertura dos alternates SEO;
5. atualizacao desta spec.

## Locale Routing

Toda pagina publica usa prefixo de locale:

```text
/pt-br
/en
/es
```

Slugs publicos tambem sao localizados:

```text
/pt-br/projetos
/en/projects
/es/proyectos
```

O locale da URL e a fonte de verdade para o idioma do conteudo entregue.

Estrutura esperada:

```text
src/app/
  [locale]/
    layout.tsx
    page.tsx
```

O middleware e o runtime devem usar exclusivamente as APIs oficiais do
Paraglide para a versao instalada.

## Troca de Idioma

Ao trocar o idioma:

1. identificar o locale e a rota semantica atuais;
2. resolver a rota equivalente no locale de destino;
3. preservar query parameters relevantes e hash;
4. navegar pela API do Next.js/Paraglide sem reload completo quando suportado;
5. persistir a preferencia usando a estrategia oficial configurada;
6. manter Nuqs fora da resolucao do locale.

Nao substituir apenas o primeiro segmento da URL quando os slugs forem
localizados. A troca deve usar um mapa de rotas tipado.

## Deteccao e Persistencia

Ordem de resolucao:

1. locale explicito na URL;
2. preferencia persistida pela estrategia oficial;
3. idioma compativel do navegador;
4. fallback `pt-br`.

Uma URL explicita nunca deve ser sobrescrita silenciosamente pela deteccao do
navegador.

## SEO Internacional

Cada pagina localizada deve gerar:

- `lang` correto no elemento `html`;
- canonical da versao atual;
- alternates `hreflang` para `pt-BR`, `en` e `es`;
- alternate `x-default` apontando para a estrategia de fallback definida;
- title e description localizados;
- Open Graph localizado;
- URL, slug e conteudo no mesmo idioma;
- indexacao independente por locale.

Metadata deve ser gerada no servidor e usar message functions do Paraglide.

## Components

Todo texto visivel ao usuario deve vir de message functions, incluindo:

- navegacao;
- botoes e links;
- headings;
- labels e placeholders;
- mensagens de validacao;
- estados vazios, erros e loading;
- `aria-label`, `alt` e textos de acessibilidade;
- metadata e textos Open Graph.

Excecoes:

- nomes de marcas;
- identificadores tecnicos;
- conteudo externo que nao deve ser traduzido;
- dados editoriais explicitamente independentes de locale.

Essas excecoes devem ser intencionais, nao atalhos.

## TypeScript

- Preservar os tipos gerados pelo Paraglide.
- Nao usar `any`, `as any`, `@ts-ignore` ou casts para contornar locale ou
  message params.
- Nao duplicar manualmente tipos que o Paraglide gera.
- Message params devem ser validados em compile time.
- Mapas de rotas e locales devem usar `as const` e `satisfies` quando
  apropriado.

## Nuqs

- Usar `NuqsAdapter` oficial no ponto de composicao recomendado para App
  Router.
- Usar parsers tipados.
- Em Server Components, usar cache/loader server-side oficial quando a pagina
  depende de query parameters.
- O comportamento `shallow` deve ser escolhido conscientemente:
  - `true` quando o estado e somente client-side;
  - `false` quando a alteracao precisa atualizar Server Components.
- Query parameters devem permanecer estaveis durante troca de idioma quando
  forem relevantes na rota de destino.

## Criterios de Aceite

- Nenhuma biblioteca de i18n paralela instalada.
- Nenhum texto visivel hardcoded sem excecao documentada.
- Message functions tipadas usadas em toda apresentacao.
- URLs possuem locale e slugs localizados.
- Troca de idioma preserva pagina, query parameters e hash relevantes.
- Metadata, canonical, hreflang e Open Graph sao localizados.
- Fallback `pt-br` funciona de forma deterministica.
- Nuqs nao gerencia locale.
- Lint, TypeScript, build e testes de navegacao localizada passam.
