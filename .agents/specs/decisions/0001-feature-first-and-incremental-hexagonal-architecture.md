# ADR-0001: Feature-first e arquitetura hexagonal incremental

## Status

Accepted

## Data

2026-06-10

## Contexto

O projeto e um portfolio em Next.js ainda no estado de scaffold. Nao existem
regras de negocio, persistencia, integracoes externas ou casos de uso que
justifiquem uma arquitetura hexagonal completa.

Ao mesmo tempo, o projeto tende a crescer por conceitos do portfolio, como
Perfil, Projeto, Experiencia e Contato. Organizar tudo por tipo tecnico
espalharia o conhecimento de cada conceito. Criar ports e adapters agora
adicionaria interfaces sem variacao real e modulos shallow.

## Direcionadores

- Preservar Server Components e convencoes do App Router.
- Concentrar mudancas de cada conceito para obter locality.
- Manter regras futuras independentes de React, Next.js e fornecedores.
- Evitar abstracoes especulativas.
- Permitir testes de casos de uso sem infraestrutura quando eles surgirem.

## Opcoes Consideradas

### Organizacao apenas por tipo tecnico

- Vantagens: corresponde ao scaffold inicial e exige poucas decisoes.
- Desvantagens: espalha cada feature entre pastas globais e reduz locality.

### Arquitetura hexagonal completa desde o inicio

- Vantagens: define ports, adapters e composition roots desde o primeiro dia.
- Desvantagens: cria seams hipoteticas e interfaces sem leverage no estado
  atual.

### Feature-first com arquitetura hexagonal incremental

- Vantagens: concentra cada feature e introduz ports somente para efeitos
  externos ou variacao real.
- Desvantagens: exige criterio para decidir quando uma pasta ou seam passa a
  existir.

## Decisao

Adotar organizacao feature-first. `src/app/` permanece como adapter de entrega
e composition root do Next.js; `src/components/ui/` contem primitives visuais;
conceitos do portfolio ficam em `src/features/<feature>/`.

Dentro de uma feature, `domain`, `application`, `adapters` e `presentation`
serao criados sob demanda. Ports & Adapters serao adotados por fatia vertical
quando surgir orquestracao de caso de uso ou dependencia externa concreta.

Um port deve modelar capacidade do dominio/aplicacao, nunca uma tecnologia.
Adapters concretos dependem do port; dominio e aplicacao nao dependem do
framework.

## Consequencias

### Positivas

- Locality por feature.
- Regras futuras permanecem testaveis sem Next.js.
- Menos interfaces e modulos shallow.
- Migracao gradual sem reescrita ampla.

### Negativas

- A estrutura interna pode variar entre features simples e complexas.
- Revisoes precisam impedir imports indevidos entre features.
- O primeiro fluxo com efeito externo exigira estabelecer testes de contrato e
  composicao.

### Riscos e Mitigacoes

- Risco: usar feature-first apenas como agrupamento visual. Mitigacao: seguir a
  direcao de dependencias em
  `.agents/specs/architecture/system-architecture.md`.
- Risco: adiar uma seam necessaria. Mitigacao: introduzir um port quando houver
  duas implementacoes, efeito externo ou dificuldade real de teste.
- Risco: generalizar cedo apos a primeira feature. Mitigacao: repetir o padrao
  apenas quando a segunda feature demonstrar a mesma necessidade.

## Referencias

- [Guia de arquitetura](../architecture/system-architecture.md)
- [Linguagem do dominio](../../../CONTEXT.md)
