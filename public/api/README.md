# Ghz.Life BFF (PHP)

API BFF em PHP + MySQL com estrutura modular e DDD leve.

## Como rodar

```bash
php -S localhost:3333 -t public
```

## Swagger

A especificação OpenAPI está em `docs/api/openapi.yaml`.

## Observações

- O schema do banco será revisado posteriormente.
- As respostas seguem o envelope `{ success, data, message, errors }`.
