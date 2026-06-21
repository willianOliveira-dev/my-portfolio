# Contexto do Dominio

Este arquivo define a linguagem compartilhada do portfolio. Os termos devem ser
usados em nomes de pastas, tipos, dados, textos e testes quando representarem o
mesmo conceito.

## Objetivo

O portfolio apresenta a identidade profissional de Willian, evidencia trabalho
real, oferece caminhos claros para contato e ajuda visitantes a encontrarem
informacoes relevantes por navegacao, formulario e assistente de chat.

## Termos

### Perfil

Resumo da identidade profissional exibida pelo portfolio. Inclui nome, titulo,
apresentacao, localizacao e links profissionais.

### Projeto

Trabalho selecionado para demonstrar capacidade tecnica e impacto. Um Projeto
pode conter resumo, contexto, responsabilidades, tecnologias, resultados,
imagens e links externos.

### Experiencia

Periodo de atuacao profissional com organizacao, funcao, intervalo de tempo e
realizacoes relevantes.

### Trajetoria

Sequencia temporal de marcos de aprendizado e evolucao profissional. Uma
Trajetoria conecta Competencias adquiridas, mudancas de foco e o amadurecimento
do Perfil ao longo do tempo.

### Competencia

Conhecimento tecnico ou pratica profissional que ajuda a descrever a atuacao.
Competencias podem ser associadas a Projetos e Experiencias.

### Contato

Canal pelo qual uma pessoa pode iniciar uma conversa profissional. Exemplos:
email, LinkedIn e formulario.

### Mensagem de Contato

Conteudo enviado por uma pessoa interessada em oportunidade, consultoria,
projeto ou conversa profissional. Inclui nome, email, telefone opcional e texto
da mensagem.

### Assistente

Interface conversacional que orienta visitantes pelo portfolio, responde sobre
Perfil, Projetos, Trajetoria, Competencias e Contato, e direciona para a Secao
mais adequada. O Assistente pode usar um provedor externo de IA por adapter.

### Mensagem de Chat

Entrada ou resposta dentro do Assistente. Mensagens de Chat pertencem ao fluxo
conversacional e nao devem ser confundidas com Mensagens de Contato.

### Modelo de Chat

Opcao de modelo de IA disponivel para o Assistente. A escolha de Modelo de Chat
e uma configuracao do fluxo de chat, nao um conceito editorial do portfolio.

### Locale

Idioma/regiao usados para entregar conteudo, metadata e acessibilidade. Os
locales publicos atuais sao `pt-br`, `en` e `es`; `pt-br` e o fallback.

### Secao

Parte navegavel de uma pagina do portfolio que apresenta um conceito, como
Perfil, Projetos, Experiencias, Trajetoria, FAQ ou Contato. Secao e um termo de
apresentacao, nao um conceito de negocio independente.

## Regras Atuais

- Projetos exibidos sao selecionados, nao um catalogo irrestrito.
- Links externos devem identificar claramente o destino.
- Dados de Perfil, Projeto, Experiencia e Trajetoria devem permanecer
  independentes da tecnologia usada para renderiza-los.
- Textos visiveis, metadata e acessibilidade devem ser internacionalizaveis por
  message functions do Paraglide.
- Contato por formulario e Assistente sao fluxos com efeitos externos; eles
  devem manter validacao, rate limit, provedores e SDKs fora de `presentation`.
- Provedores externos, como email, rate limit, Redis e IA, pertencem a adapters
  ou route handlers de entrega, nunca a `domain`.
- Mensagens de Contato e Mensagens de Chat possuem intencoes diferentes e nao
  devem compartilhar tipos apenas por terem campos parecidos.
- Novos termos devem ser adicionados aqui antes de virarem nomes arquiteturais.

## Fora do Escopo Atual

- Autenticacao e area administrativa.
- Persistencia propria para o conteudo.
- Regras de autorizacao ou fluxos transacionais.
- CMS para Projetos, Experiencias ou Trajetoria.
- Historico persistente de conversas do Assistente.
- Multitenancy, contas de usuario e dashboards privados.

Esses itens podem entrar no escopo depois. Quando isso acontecer, o vocabulario
e as decisoes arquiteturais devem ser atualizados antes da implementacao.
