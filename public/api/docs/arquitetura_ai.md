# Arquitetura da API BFF (PHP)

> Este arquivo registra decisões técnicas e deve ser atualizado a cada alteração relevante.

## Stack
- PHP 8+ com servidor embutido para desenvolvimento.
- MySQL via PDO.
- Documentação OpenAPI em `docs/api/openapi.yaml`.

## Estrutura de Pastas
```
public/api/
├── app/                # Controllers e DTOs
├── domain/             # Entidades e serviços de domínio
├── docs/               # Documentação técnica
├── infrastructure/     # Banco de dados e integrações
├── public/             # index.php (entrada HTTP)
└── tests/              # Testes automatizados
```

## Padrões adotados
- Respostas seguem envelope `{ success, data, message, errors }`.
- camelCase para variáveis e PascalCase para classes.

## Decisões recentes
- Iniciado módulo base de tasks com rotas REST no `public/index.php`.
- DTOs básicos e validação mínima no controller.
