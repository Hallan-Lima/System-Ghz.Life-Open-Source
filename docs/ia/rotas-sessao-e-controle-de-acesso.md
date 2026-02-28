# Rotas, Sessão e Controle de Acesso – Estado Atual e Análise

**Objetivo:** Documentar como funcionam hoje as rotas, a sessão do usuário e o controle de acesso no frontend (React/Vite), apontando correções, problemas, melhorias e falhas de segurança. Inclui análise da causa provável do problema de "acesso indevido" a funcionalidades em que o usuário tem permissão mas não consegue acessar.

---

## 1. Visão geral da estrutura atual

### 1.1 Rotas (`App.tsx`)

- **Router:** `HashRouter` (React Router).
- **Rotas públicas (sem guarda):**
  - `/` → `LoginPage`
  - `/auth` → `LoginPage`
  - `/register` → `RegisterPage`
- **Rotas protegidas:** Envolvidas por `<Route element={<AuthGuard />}>`:
  - `/dashboard`, `/finance`, `/health`, `/tasks`, `/tasks/new`, `/modules`, `/modules/order`, `/ia`, `/settings`, `/settings/profile`, `/notifications`
  - Fallback: `path="*"` → `<Navigate to="/dashboard" />`.

Não há proteção por perfil/role; apenas “autenticado ou não”.

### 1.2 Guarda de autenticação (`AuthGuard.tsx`)

- Usa `authService.isAuthenticated()` para decidir se o usuário está logado.
- **Critério de “autenticado”:** existência de valor no storage na chave do token (`config.tokenStorageKey` → `ghz_user_token_v1`).
- Se não autenticado: `navigate('/auth', { replace: true })`.
- Enquanto `checkingAuth === true`, exibe um spinner e só depois renderiza `<Outlet />` (rotas filhas).

**Problemas / limitações:**

- A verificação é **somente local** (storage). Não há validação do token com o backend (ex.: endpoint de “me” ou “validate”).
- Token expirado ou revogado no servidor continua considerado “válido” até alguém limpar o storage ou até uma chamada de API retornar 401.
- Não há tratamento de 401 no cliente para redirecionar para login (logout por expiração).

### 1.3 Guarda por módulo (`ModuleGuard.tsx`)

- Usado nas páginas: **TasksPage** (`productivity`), **FinancePage** (`finance`), **HealthPage** (`health`), **AiPage** (`ai_assistant`), **TaskCreatorPage** (`productivity`).
- Recebe `moduleId` como string (ex.: `"productivity"`, `"finance"`, `"ai_assistant"`).
- Usa `useModules()` e busca o módulo com `modules.find(m => String(m.id) === String(moduleId))`.
- Se **não encontrar** o módulo ou o módulo **não estiver** `isEnabled`:
  - Chama `localStorage.clear()` (limpa todo o storage).
  - Redireciona para `/login` (no app as rotas de login são `/` e `/auth`; `/login` não existe, gerando inconsistência).
- Enquanto `loading`, exibe spinner; depois faz uma validação final antes de renderizar os filhos.

**Problemas críticos (causa do “acesso indevido”):**

- A API **GET /api/modules?user_id=...** (ModuleService no backend) retorna módulos com **`id` numérico em string**: `"1"`, `"2"`, `"3"`, `"4"`, `"5"` (via `formatModulesMap`: `'id' => (string) $moduleId`).
- O **ModuleGuard** e parte do **Layout** usam **IDs em formato “slug”**: `"productivity"`, `"finance"`, `"health"`, `"ai_assistant"`, `"social"`.
- Resultado: `modules.find(m => String(m.id) === 'productivity')` **nunca encontra** (o array tem `id: "1"`, não `"productivity"`). O guard interpreta como “sem permissão” e:
  - Limpa todo o storage.
  - Redireciona para `/login`.
- Ou seja: **usuário com permissão é expulso** porque o front espera slug e a API devolve número.

**Inconsistência de rota:**

- ModuleGuard e ModulesContext usam `navigate('/login')` ou `window.location.href = '/login'`, enquanto as rotas de login definidas no app são `/` e `/auth`. O correto seria `/auth` (ou `/`).

### 1.4 Menu lateral e ordenação (`Layout.tsx`)

- Itens do menu usam `moduleId` **numérico em string**: `'1'` (Tarefas), `'2'` (Finanças), `'3'` (Saúde), `'4'` (IA), `'5'` (Social), além de `'core'` para Dashboard, Módulos e Ajustes.
- `isModuleEnabled(moduleId)` usa `modules.find(m => String(m.id) === String(moduleId))` → para `'1'`,`'2'`,`'3'`,`'4'`,`'5'` funciona, pois a API retorna esses IDs.
- **Exceção:** `QuickActionMenu` recebe `enableAi={isModuleEnabled('ai_assistant')}`. Como a API retorna `id: "4"` e não `"ai_assistant"`, `isModuleEnabled('ai_assistant')` é sempre `false` e o atalho de IA no menu rápido nunca fica habilitado mesmo com o módulo ativo.

Resumo da inconsistência de IDs:

| Onde              | ID usado        | Fonte dos dados   |
|-------------------|-----------------|-------------------|
| Layout (sidebar)  | `'1'`–`'5'`     | GET /api/modules  |
| ModuleGuard       | `'productivity'`, `'finance'`, etc. | GET /api/modules (ids `"1"`–`"5"`) |
| QuickActionMenu   | `'ai_assistant'`| GET /api/modules  |

O login (AuthService no backend) devolve `modulesConfig` com IDs em slug (`idMap`: 1→productivity, 2→finance, etc.). Já o **GET /api/modules** usa outra camada (ModuleService + procedure/view) e devolve **só numérico**. Daí a divergência.

---

## 2. Sessão e armazenamento

### 2.1 O que é persistido

- **Token de sessão:** chave `config.tokenStorageKey` (`VITE_STORAGE_TOKEN` → `ghz_user_token_v1`). Valor vem do login (`responseData.refresh_token`).
- **Config do usuário:** chave `config.configStorageKey` (`ghz_user_config_v1`). Inclui `user_id` (UUID), nome, email, etc. Usado para:
  - `modules.service` enviar `user_id` em `GET /api/modules?user_id=...` e no payload de `POST /api/modules/toggle`.
- **Módulos (cache):** chave `config.modulesStorageKey` (`ghz_modules_config_v1`). Preenchido após sucesso de GET /api/modules e no login (`responseData.modulesConfig`).
- **Ordem do menu:** chave `config.modulesOrderKey` (`ghz_modules_order_v1`).

### 2.2 Fluxo de login

1. `authService.login()` → POST `/api/auth/login`.
2. Resposta: `userConfig`, `refresh_token`, `modulesConfig`.
3. Front grava em storage: `configStorageKey`, `tokenStorageKey`, `modulesStorageKey`.
4. Nenhum redirecionamento explícito no serviço; a UI normalmente redireciona para dashboard após sucesso.

### 2.3 Fluxo ao carregar a aplicação (usuário já “logado”)

1. **AuthGuard** checa `isAuthenticated()` (existência de valor em `tokenStorageKey`). Se sim, renderiza as rotas protegidas.
2. **ModulesProvider** monta e dispara `modulesService.getModules()`:
   - Lê `user_id` de `config.configStorageKey`.
   - Chama GET `modules?user_id=<uuid>`.
   - Se a resposta for array vazio ou falha: remove config, token, `'token'`, STORAGE_KEY e redireciona para `/login`.
   - Se sucesso: preenche estado e (se `moduleOrder` vazio) inicializa ordem com os IDs retornados.

Ou seja: se **GET /api/modules** retornar vazio (erro de rede, 401, ou backend retornando []), o usuário é deslogado e mandado para `/login`.

### 2.4 Envio do token nas requisições

- **`services/api.ts`:** interceptor de request usa `localStorage.getItem('auth_token')` para montar `Authorization: Bearer <token>`.
- O token é salvo na chave **`config.tokenStorageKey`** (`ghz_user_token_v1`), **não** em `'auth_token'`.
- Consequência: **nenhuma requisição HTTP envia o Bearer token**. Qualquer endpoint que exija autenticação (hoje ou no futuro) vai falhar ou retornar 401, e o fluxo de “módulos vazios” pode derrubar a sessão.

---

## 3. Controle de acesso por módulo/funcionalidade

- **Fonte da verdade no front:** estado em `ModulesContext`, alimentado por GET /api/modules (e no login por `modulesConfig`).
- **Layout:** esconde itens do menu conforme `isModuleEnabled(moduleId)` (IDs `'1'`–`'5'` e `'core'`).
- **ModuleGuard:** bloqueia páginas conforme o mesmo contexto, mas usando slugs (`productivity`, `finance`, etc.), que não batem com os IDs retornados pela API → gera o “acesso indevido” (expulsão indevida).
- **Backend:** GET /api/modules e POST /api/modules/toggle **não validam** o token; usam apenas `user_id` (query ou body). Qualquer um que saiba o UUID pode listar/alterar módulos daquele usuário.

---

## 4. Resumo de problemas e melhorias

### 4.1 Crítico – “Acesso indevido” (usuário com permissão não acessa)

- **Causa:** Incompatibilidade de **ID de módulo** entre:
  - **ModuleGuard (e QuickActionMenu):** slugs `productivity`, `finance`, `health`, `ai_assistant`, `social`.
  - **Resposta de GET /api/modules:** IDs `"1"`, `"2"`, `"3"`, `"4"`, `"5"`.
- **Efeito:** O guard não encontra o módulo, considera “sem permissão”, limpa o storage e manda para `/login`. O atalho de IA nunca fica habilitado.

**Correção recomendada (escolher uma linha e padronizar):**

- **Opção A (frontend):** Trocar todos os usos de slug no guard e no Layout para o ID numérico em string:
  - TasksPage / TaskCreatorPage: `moduleId="1"` (produtividade).
  - FinancePage: `moduleId="2"`.
  - HealthPage: `moduleId="3"`.
  - AiPage: `moduleId="4"`.
  - QuickActionMenu: `enableAi={isModuleEnabled('4')}`.
- **Opção B (backend):** Fazer GET /api/modules (e, se existir, o formato usado no login) retornar o mesmo esquema de IDs do login (slug), e o front manter slugs em todo lugar. Exige alterar `ModuleService.formatModulesMap()` (ou equivalente) para usar o mesmo `idMap` (1→productivity, 2→finance, etc.).

Além disso: **unificar rota de login** – usar `/auth` (ou `/`) em todos os pontos que redirecionam para login (ModuleGuard, ModulesContext), removendo referências a `/login`.

### 4.2 Crítico – Token não enviado nas requisições

- **Problema:** Api interceptor lê `'auth_token'`; o app grava o token em `config.tokenStorageKey` (`ghz_user_token_v1`).
- **Correção:** No interceptor de `api.ts`, usar a mesma chave do restante do app, por exemplo:
  - `import config from '@/src/config';`
  - `const token = storage.getItem(config.tokenStorageKey);` (ou `localStorage.getItem(config.tokenStorageKey)`), e, se o backend enviar o token como JSON, usar `storage.getJson(config.tokenStorageKey)` e enviar o valor correto (ex.: string do refresh_token) no header `Authorization: Bearer ...`.

### 4.3 Segurança

- **API sem validação de token:** GET /api/modules e POST /api/modules/toggle aceitam apenas `user_id`. Qualquer cliente que conheça o UUID pode listar/alterar módulos. Recomendação: middleware de autenticação que valide o token (ou cookie) e associe o `user_id` ao token; não confiar em `user_id` vindo sozinho no body/query.
- **Logout forçado muito agressivo:** ModuleGuard chama `localStorage.clear()`, apagando todas as chaves (incluindo as de outros apps no mesmo domínio, se houver). Preferível: remover apenas as chaves do app (config, token, módulos, ordem).
- **Rota de login:** Trocar `/login` por `/auth` (ou `/`) em ModuleGuard e ModulesContext para não depender de rota inexistente.

### 4.4 Melhorias de comportamento e UX

- **Validar sessão no backend:** Após carregar a app, chamar um endpoint “me” ou “validate” com o token; em 401, limpar storage e redirecionar para login. Assim token expirado ou revogado é tratado.
- **Interceptor 401:** No axios, em `response.interceptors.response`, em caso de 401, limpar storage (ou apenas token/config) e redirecionar para `/auth` (ou `/`).
- **AuthGuard:** Evitar “piscar” da tela: só mostrar spinner enquanto a primeira checagem de auth; depois, se quiser, pode haver uma checagem em background sem bloquear a UI.
- **ModuleGuard:** Em vez de `localStorage.clear()`, remover apenas as chaves conhecidas do app (usar `config.*` e chaves explícitas). Redirecionar para `/auth` em vez de `/login`.

### 4.5 Documentação e manutenção

- **Mapa de IDs:** Manter um único lugar (const ou config) que defina a relação módulo ↔ rota ↔ ID (numérico e/ou slug), usado tanto no Layout quanto no ModuleGuard e no backend, para evitar nova divergência.
- **Variáveis de ambiente:** Já existe uso de `VITE_STORAGE_*` e `config`; garantir que nenhum código use chaves fixas como `'auth_token'` ou `'userConfig'` para token/config.

---

## 5. Checklist de correções sugeridas

- [ ] **Unificar ID de módulo:** Ou front 100% numérico (`"1"`–`"5"`) em guard e QuickAction, ou backend retornando slug em GET /api/modules (e consistente com login).
- [ ] **Rota de login:** Substituir `/login` por `/auth` (ou `/`) em ModuleGuard e ModulesContext.
- [ ] **Token no axios:** Usar `config.tokenStorageKey` (e formato correto do valor) no interceptor de `api.ts` para o header `Authorization`.
- [ ] **API:** Proteger GET /api/modules e POST /api/modules/toggle com middleware de autenticação; não confiar em `user_id` sozinho.
- [ ] **Logout forçado:** Remover apenas chaves do app em ModuleGuard/ModulesContext, em vez de `localStorage.clear()`.
- [ ] **401 global:** Interceptor de resposta para 401 → limpar sessão e redirecionar para login.
- [ ] **Validação opcional de token:** Endpoint “me”/“validate” + uso no AuthGuard ou no bootstrap da app.

---

*Documento gerado para revisão de código e implementação das correções no frontend e na API.*
