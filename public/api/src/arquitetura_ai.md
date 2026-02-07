# Arquitetura da API BFF - System Ghz.Life

> Este arquivo registra as decisões técnicas e deve ser atualizado a cada alteração relevante.

## Stack
- Node.js + TypeScript.
- Express como framework HTTP.
- MySQL com mysql2/promise.
- Swagger via swagger-jsdoc + swagger-ui-express.

## Estrutura de Pastas
```
src/
├── @types/             # Tipos globais (reservado)
├── config/             # Configurações de ambiente, DB e Swagger
├── modules/            # Domínios (DDD)
│   └── tasks/          # Módulo inicial de tarefas
│       ├── dtos/       # Schemas e validação de entrada
│       ├── entities/   # Entidades de domínio
│       ├── repositories/ # Interfaces + implementação MySQL
│       ├── services/   # Regras de negócio
│       └── controllers/ # Rotas e controllers
├── shared/
│   ├── errors/         # Erros customizados
│   ├── infra/          # HTTP, middlewares e rotas
│   └── utils/          # Utilitários
└── server.ts           # Bootstrap da aplicação
```

## Padrões adotados
- Respostas seguem envelope `{ success, data, message, errors }`.
- Nomenclatura: camelCase para funções/variáveis e PascalCase para classes.
- Validação de entrada com Zod.

## Decisões recentes
- Implementado módulo inicial `tasks` com rotas REST e regras de negócio básicas.
- Swagger publicado em `/docs`.
- Tabela `app_tasks` assumida conforme especificação existente (schema será revisado depois).
