# Ghz.Life BFF (PHP)

API BFF em PHP + MySQL com estrutura modular e DDD leve.

## Como rodar

```bash
php -S localhost:3333 -t public
```

## Test

e preciso instalar o xdebug, subir a aplicacao e acompanhar alguma requisicao realizada, tipo:

```bash
curl http://localhost:3333/health
Resposta esperada (envelope padrão):
```

{"success":true,"data":{"status":"ok"},"message":"","errors":[]}
O endpoint /health está mapeado no public/index.php.

## Swagger

A especificação OpenAPI está em `docs/api/openapi.yaml`.

## Observações

- O schema do banco será revisado posteriormente.
- As respostas seguem o envelope `{ success, data, message, errors }`.
