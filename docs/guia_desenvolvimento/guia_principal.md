# 🏛️ Guia de Arquitetura e Padrões de Projeto (System‑Ghz Web/Mobile)

## 📌 Objetivo deste Documento
Este é o **documento de verdade** para frontend Web (e futuro Mobile) do projeto.
Ele define **arquitetura, padrões de código, regras de negócio e fluxo de trabalho para agentes de IA**.
Sempre que iniciar um trabalho novo, humano ou IA, leia este guia por completo e siga‑o à risca.

> **Regra Zero para IAs:**
> Nunca gere código fora dos padrões descritos aqui.
> Não invente pacotes, estruturas ou APIs diferentes.

---

## 🚀 1. Visão Geral da Arquitetura
Esta aplicação adota uma arquitetura **Feature‑Sliced Design (FSD)** (ou funcionalidades) alinhada aos princípios de **Domain‑Driven Design (DDD)**, pensada desde o início para permitir escalabilidade e portabilidade.
O código é organizado em domínios independentes que podem ser reutilizados e estendidos sem duplicação. Sempre que possível, reutilize componentes, serviços ou lógica já existentes em vez de reescrever.

O objetivo central é desacoplar completamente a lógica de negócio e os modelos de dados (o “cérebro”) da camada de apresentação (a “casca”).
Isso permite rodar a mesma base de domínio na Web (React + Vite) hoje e, no futuro, em um aplicativo móvel (React Native/Expo) com o mínimo de esforço adicional.

A experiência do usuário também é prioridade: desenvolva telas com visual atraente e atenção à usabilidade para que o sistema seja agradável e engajador.

---

## 🏗️ Estrutura de Diretórios
A organização das pastas segue a filosofia de separar **código compartilhado/infraestrutura** de **domínios específicos**. Essa clareza ajuda desenvolvedores a localizar funcionalidades rapidamente, facilita manutenção e torna o projeto mais amigável para agentes de IA.

- **`docs/`**: documentação, incluindo guias e templates para geração automática.
  * **Responsabilidade:** manter instruções, exemplos e histórico para desenvolvedores e agentes de IA; servir como fonte de verdade.
  * **Regras:** somente Markdown, imagens e arquivos de apoio; não coloque código fonte executável ou assets que não sejam de referência.
- **`shared/`**: código global, agnóstico ao domínio e reutilizável entre Web e Mobile.
  * **Responsabilidade:** prover infraestrutura (API client, armazenamento, UI genérica, helpers, store) e abstrações cross‑platform.
  * **Regras:** não depender de features específicas; ter baixa acoplamento para facilitar extração para versão mobile.
  * **Arquivos típicos em `shared/router/`**
    - `index.ts` – monta o router (React Router v7) e injeta as rotas provenientes dos módulos.
    - `guards.ts` – conjunto de funções que validam acesso (ex.: `canActivate(route, user)`).
    - `types.ts` – definições de tipos de rota/permissões usados pelo guard e orquestrador.
    
    **Regra para guards:** nenhuma lógica de negócio complexa; apenas leitura de estado/autenticação
    e comparação de permissões. Mantenha‑os testáveis e isolados.
- **`modules/`**: cada módulo corresponde a um grande contexto de negócio.
  * **Responsabilidade:** agrupar funcionalidades relacionadas, isolando regras de negócio e dados do usuário.
  * **Regras:** interfaces públicas devem estar apenas no `index.ts`; código interno não pode ser importado diretamente por outros módulos ou pelo shared.

```text

/
├── docs/
│   ├── ia/
│   │   └── historico_mudancas.md   # 📝 Obrigatório registrar alterações feitas por IAs aqui!
│   └── _template_module/          # 🤖 Molde estrutural para criação de novos módulos
│
├── shared/                        # 🌍 Código Global e Agnóstico (UI Genérica, Infraestrutura)
│   ├── api/                       # apiClient.ts e endpoints.ts (Dicionário de URLs do BFF)
│   ├── services/                  # Adapters globais (ex: storage.ts que abstrai localStorage)
│   │   └── storage.ts             # get/set/remove wrapper
│   ├── store/                     # 📦 Estado Global usando Zustand (Context API está depreciada)
│   ├── router/                    # 🔀 Orquestrador dinâmico de rotas
│   ├── ui/                        # 🧩 Componentes "Burros" (Buttons, Inputs, Cards genéricos)
│   └── utils/                     # 🧰 Helpers globais reutilizáveis (formatDate, formatMoney...)
│       ├── date.utils.ts          # export const formatDate = ...
│       ├── currency.utils.ts      # export const formatMoney = ...
│       ├── string.utils.ts        # export const capitalize = ...
│       ├── array.utils.ts         # export const unique = ...
│       └── validation.utils.ts    # export const isEmail = ...
│
└── modules/                       # 📦 O Coração do Sistema (Agrupamento por Domínio)
    └── tasks/                     # Exemplo: Módulo de Tarefas
        ├── features/              # ⚙️ Funcionalidades que compõem este módulo
        │   ├── Tarefa/            # Feature 1 (Tarefas Comuns)
        │   │   ├── domain/        # 🧠 Tipos, Interfaces e Regras Puras (TS Puro, sem React)
        │   │   │   ├── tasks.types.ts
        │   │   │   └── tasks.utils.ts
        │   │   ├── data/          # 🔌 Serviços HTTP e comunicação com API
        │   │   │   └── tasks.service.ts
        │   │   ├── hooks/         # 🪝 Casos de uso (useCreateTask, useFetchTasks)
        │   │   │   └── useTasks.ts
        │   │   └── ui/            # 🎨 Componentes visuais ESPECÍFICOS desta feature
        │   │       └── TasksList.tsx
        │   └── Notas/             # Feature 2 (Notas)
        │       ├── domain/
        │       │   ├── notes.types.ts
        │       │   └── notes.utils.ts
        │       ├── data/
        │       │   └── notes.service.ts
        │       ├── hooks/
        │       │   └── useNotes.ts
        │       └── ui/
        │           └── NotesList.tsx
        ├── pages/                # 📄 Telas completas que importam e unem as diversas Features
        │   ├── TasksPage.tsx
        │   ├── TaskDetailPage.tsx
        │   ├── TaskCreatePage.tsx
        │   └── NotesPage.tsx
        └── index.ts              # 🚪 Contrato de exportação (Public API do Módulo)
```

>*Nota:* A distinção entre "modules" e "features" permite agrupar funcionalidades relacionadas sob um mesmo domínio maior, facilitando escalabilidade e organização para equipes e IAs.

---

## 📜 2. Regras de Ouro (multiplataforma)

1. **PROIBIDO uso direto de `localStorage` ou `sessionStorage`.**
   - Todo acesso local vai por `shared/services/storage.ts`.
   - A implementação troca `localStorage` por `AsyncStorage`, o resto não muda.
2. **Isolamento do domínio (`domain/`).**
   - Somente `.ts` puros, sem React, sem imports de UI ou hooks.
   - Aqui vivem interfaces, classes de negócio e funções utilitárias.
3. **Isolamento entre módulos/features.**
   - Um feature de um módulo importa outro módulo apenas pela sua fachada:
     `import { useAuth } from '@/modules/auth'` ou, internamente, entre features
     do mesmo módulo use `@/modules/tasks/features/Tarefa`.
   - Não há importação de arquivos privados de outro módulo/feature.
4. **State management com Zustand.**
   - Stores globais em `shared/store/`.
   - Use middleware `persist` com o adapter de storage.
   - States locais de feature podem ficar dentro dos próprios hooks.
5. **Rotas dinâmicas/híbridas.**
   - Backend devolve permissões no login.
   - O orquestrador injeta páginas exportadas pelos módulos no router.
   - Um *guard* (função de verificação) intercepta cada navegação e valida se o usuário tem permissão para acessar a rota;
     ele fica em `shared/router/` (ex.: `guards.ts`) e é chamado pelo próprio orquestrador.
   - Rotas públicas (login/404) permanecem estáticas.
6. **TypeScript estrito (`tsconfig.json: strict: true`).**
   - Nenhum `any` sem justificativa.
   - Use ESLint com regras `@typescript-eslint` recomendadas.
7. **Estilo usando Tailwind CSS.**
   - Classes utilitárias, mobile‑first, `w-full`, `p-4`, etc.
8. **Cabeçalho padrão nos arquivos gerados:**
   ```ts
   /**
    * @author HallTech AI
    */
   ```
   - Cada arquivo novo deve conter essa assinatura no topo; aplica-se também a docs/commits gerados por IA.
9. **Comentários:**
   - Breves (2–3 frases) e sempre no cabeçalho da função/componente, nunca dentro da lógica.
   - Explique **o que** o bloco faz e **por que**; use parágrafos curtos e, se necessário, divida em mais de um comentário.  
     *Importante:* não faça comentários explicativos no meio do código (ex.: `// ESTA PEGANDO UM VALOR X...`).
   - O texto deve estar em **pt‑BR** de forma que até um leigo consiga entender.
   - Seguindo o exemplo abaixo:
   ```typescript
    /**
    * @author HallTech AI
    * @file ModuleConfigCard.tsx
    * @description Componente visual para gerenciamento individual de um Módulo e suas Funcionalidades.
    * @architecture Diretrizes do Guia de Arquitetura (System Ghz.Life):
    * - Feature-Based: Pertence ao domínio 'modules', focando apenas na renderização (Presentational).
    * - Dumb Component: Recebe dados e callbacks via props (onToggleModule, onToggleFeature).
    * - Performance: Constantes e dicionários de domínio são declarados fora do ciclo de renderização.
    */
    ```

10. **Idioma & nomenclatura:**
   - Todos os comentários e documentações são em **português (pt-BR)**.
   - **Componentes** usam PascalCase (`MyComponent.tsx`).
   - **Funções** e **hooks** usam camelCase (`useFetchData`, `handleClick`).
   - **Interfaces** usam PascalCase (`User`, `Transaction`).
   - **Arquivos de tipo** seguem `[contexto].types.ts`.

---

## 🛠️ 3. Decisões Técnicas Oficiais

### 🔧 Gerenciamento de Estado
- **Zustand** por ser leve e sem provider.
- Estados que atravessam módulos (usuário logado, configurações) são globais.
- Use `persist` junto a `shared/services/storage` para manter dados entre sessões.

### 🔌 Comunicação com API
- **EndPoints centralizados** em `shared/api/endpoints.ts` como objeto ou enum.
- **apiClient.ts** cuida de tokens, timeouts e interceptors.
- Cada módulo/feature consome via seu `data/[nome].service.ts`.

### 🎨 UI
- Components “burros” genéricos: `shared/ui/`
- Components específicos → `modules/[módulo]/features/[feature]/ui/`
- Evite lógica nos components: faça hooks.

### 🧩 Tipos Publicados
- Interfaces globais (finanças, tarefas, saúde) ficam em `public/web/domain/`.
- Cada módulo e cada feature define seus próprios tipos em `domain/`.

### 🔀 Roteamento
- O router lê um array de rotas exportado por cada módulo.
- Um *guard* dentro de `shared/router` valida permissões antes de cada transição e decide se a rota pode ser ativada.
- Permissões são consultadas no login e aplicadas no cliente.
- Exemplo de orquestrador: `shared/router/index.ts`.

### 🧪 Testes
- Estrutura pensada para facilitar Jest + React Testing Library.
- Serviços e hooks devem ser exportáveis para mocking.
- Arquivos de teste acompanhando cada módulo/feature (`*.spec.ts`).

### 🚀 CI/CD
- GitHub Actions já executa lint, build e deploy (`docs/build/deploy.md`).
- Futuramente incluir testes no pipeline.
- Documentar como adicionar novas etapas ao workflow.

---

## 🤖 4. Como um Agente de IA deve criar um novo Feature

1. **Adicionar rotas no `shared/api/endpoints.ts`.**
2. **Criar pasta `modules/[nome]/features/[NomeFeature]/domain/`**
   - Tipos (`[nome].types.ts`)
   - Regras puras e validações.
3. **Criar `modules/[nome]/features/[NomeFeature]/data/[NomeFeature].service.ts`**
   - Importar `apiClient` e `endpoints`.
   - Métodos async retornando Tipos do domínio.
4. **Criar hooks em `modules/[nome]/features/[NomeFeature]/hooks/`**
   - Exemplos: `useFetch[NomeFeature]`, `useCreate[NomeFeature]`.
   - Gerenciar loading, erro e dados.
5. **Construir UI em `modules/[nome]/features/[NomeFeature]/ui/`**
   - Componentes visuais isolados, usando `shared/ui` sempre que possível.
6. **Montar páginas em `modules/[nome]/pages/`**
   - Conectar hooks à UI.
7. **Exportar no `modules/[nome]/index.ts`**
   - Só o essencial (pages, hooks, tipos públicos).
8. **Atualizar o orquestrador de rotas.**
9. **Adicionar testes unitários e de integração** (quando disponível).
10. **Registrar a alteração em `docs/ia/historico_mudancas.md`**
    e assinar todos os arquivos gerados com `@author HallTech AI`.

> O documento `docs/guia_desenvolvimento/criando_novos_modulos.md` também detalha esse processo com exemplos práticos; consulte-o como um passo‑a‑passo rápido.

---

## 📚 6. Histórico e Documentação

Mantenha a pasta `docs/ia/` com os históricos de refatoração, decisões e logs usados pela IA.
Cada mudança significativa de domínio deve gerar um arquivo de log (`vX.Y.Z‑descricao.md`) com o que foi modificado e por quê.


