# Guia de Arquitetura - System Ghz.Life

## 1. Visão Geral
Este projeto utiliza uma arquitetura baseada em Features (Funcionalidades) com princípios de DDD (Domain-Driven Design) adaptados para Frontend. O objetivo é desacoplar a interface do usuário das regras de negócio, facilitando a escalabilidade.

Sempre que possivel reutilizar alguma funcionalidade ou componente que ja existe no projeto afim de diminuir informacoes repetidas sem a necessidade.

Foque tambem em sempre desenvolver alguma coisa com um belo visual e que instigue o usuario a querer usar mais ou ficar mais na aplicacao.
onde fasa realmente o usuario quere utilizar o software.


## 2. Estrutura de Diretórios

### `src/components/` (UI Library)
- **Definição:** Componentes "burros" (Dumb/Presentational).
- **Responsabilidade:** Apenas renderizar dados recebidos via props e emitir eventos.
- **Regras:**
  - Inclua
  - Não devem conter lógica de negócio complexa.
  - Não devem fazer chamadas diretas a APIs.
  - Devem ser agnósticos ao domínio sempre que possível.
  - **Exemplos:** `Button`, `FormInput`, `Card`, `Modal`, `StatCard`, `ModuleCard`, `SectionHeader`.

### `src/features/` (Domain Logic)
- **Definição:** Módulos que representam domínios do negócio (ex: Finance, Health, Auth, Dashboard, Tasks, Settings).
- **Responsabilidade:** Conter a lógica, estado e componentes container de cada funcionalidade.
- **Estrutura Interna de uma Feature:**
    - `components/`: Componentes visuais específicos da feature.
    - `hooks/`: Lógica de estado e regras de negócio (`useAuth`, `useFinance`, `useTasks`, `useHealth`, `useSettings`).
    - `services/`: Comunicação com APIs ou simuladores.
    - `[feature].data.ts`: Dados estáticos ou metadados da feature (substituindo JSONs).
    - `[feature].types.ts`: Tipos TypeScript específicos.
    - `[feature].utils.ts`: Funções puras auxiliares.

### `src/domain/` (Core Types)
- **Definição:** Definições de tipos, interfaces e constantes compartilhadas, segregadas por contexto.
- **Arquivos:**
  - `finance.types.ts`: Transações e estatísticas financeiras.
  - `tasks.types.ts`: Tarefas, metas, prioridades e recorrências.
  - `health.types.ts`: Dados de saúde e monitoramento.

## 3. Padrões de Código

### Idioma
Sempre que gerar um comentario, gerar em pt-br.

### Assinatura da IA
Todo novo arquivo criado ou bloco de documentação significativa gerado pela IA deve conter a seguinte assinatura JSDoc no topo ou antes da definição principal:

```typescript
/**
 * @author HallTech AI
 */
```
### Comentario
Faca comentarios apenas no head da funcao ou componente, exemplo:

```typescript
/**
 * @author HallTech AI
 * 
 * @description Esse e um caso de exemplo 
 */
```

Explicando brevemente o que esta abaixo, considerando que ate um leigo consiga olhar e entender.
Paragrafos curtos, caso veja que esta ficando muito grande a descricao quebre em outra funcao.



### Nomenclatura
- **Componentes:** PascalCase (ex: `MobileHeader.tsx`).
- **Funções/Hooks:** camelCase (ex: `handleFabClick`, `useFinanceData`).
- **Interfaces:** PascalCase (ex: `Transaction`).
- **Arquivos de Tipo:** `[contexto].types.ts`.

## 4. Informacoes mockadas para agilizar o gerenciamento
 As informacoes precisam ficar em algum arquivo do tipo nome.data.ts, ja estruturado para que seja desaclopado futuramente caso precise para trazer as informacoes de um banco de dados ou estruturas de fora.

## 5. Histórico de Mudanças de Domínio

sempre gere uma pasta do tipo docs/ia e um arquivo onde vc vai utilizar ele para montar sua estrutura de pensamento e logica, historio... exatamente como o exemplo abaixo:

### v1.6.0 - Refatoração Settings (Feature-Based)
- **Migração:** `modules/Settings.tsx` refatorado para `features/settings`.
- **Componentização:** `UserProfileCard`, `SettingsMenu`, `LogoutSection`.
- **Hooks:** `useSettings` gerencia tema e dados de usuário.

### v1.5.0 - Refatoração Health (Feature-Based)
- **Migração:** `modules/Health.tsx` refatorado para `features/health`.
- **Componentização:** UI dividida em `WaterTracker`, `MedicineList` e `AppointmentCard`.
- **Lógica:** Hook `useHealth` controla consumo de água e status de remédios.

### v1.4.1 - Refatoração Task Creator (Feature-Based)
- **Migração:** `modules/TaskCreator.tsx` refatorado e integrado a `features/tasks`.

### v1.4.0 - Refatoração Tasks (Feature-Based)
- **Migração:** `modules/Tasks.tsx` refatorado para `features/tasks`.

### v1.3.0 - Refatoração Finance (Feature-Based)
- **Migração:** `modules/Finance.tsx` refatorado para `features/finance`.

### v1.2.0 - Refatoração Dashboard (Feature-Based)
- **Migração:** O antigo `modules/Dashboard.tsx` foi decomposto para a estrutura `features/dashboard`.
