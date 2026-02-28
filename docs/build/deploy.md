
---

```markdown
# 🚀 Guia de Deploy e Versionamento

Este documento serve como referência rápida para o processo de publicação (deploy) da API (PHP) e do Frontend (React/Vite), utilizando o GitHub Actions.

---

## 📦 1. Padrão de Versionamento (SemVer)
Utilizamos o Versionamento Semântico para gerenciar os lançamentos. O pipeline é engatilhado automaticamente **sempre que uma Tag começando com `v` é enviada ao GitHub**.

**Sufixos de Estágio:**
- `v1.0.0-alpha.1` ➔ **Alpha:** Primeira versão de teste. Pode conter bugs. Teste interno.
- `v1.0.0-beta.1` ➔ **Beta:** Funcionalidades prontas. Liberado para homologação/lançamento.
- `v1.0.0` ➔ **Produção/Estável:** Versão final, sem bugs conhecidos.

---
```

## 🛠️ 2. Como Subir uma Nova Versão (Passo a Passo)

Sempre que finalizar uma nova funcionalidade ou correção, siga estes passos no terminal (certifique-se de estar na branch `main`):

1. **Adicione e comite suas alterações:**
```bash
   git add .
   git commit -m "feat/x.x.x - Adiciona nova funcionalidade X"
   git push origin main

```

2. **Crie a Tag da nova versão:**
```bash
git tag v1.0.0-alpha

```


3. **Envie a Tag para o GitHub (Isso inicia o Deploy!):**
```bash
git push origin v1.0.0-alpha

```


4. **Acompanhe o processo:**
* Acesse o repositório no GitHub.
* Vá na aba **Actions**.
* Clique no workflow em andamento para ver o robô gerando o `.env`, compilando o Vite e enviando os arquivos via FTP.



---

## 🔐 3. Variáveis e Segredos (GitHub Secrets)

O arquivo `.env` de produção **NUNCA** deve ser comitado. O GitHub Actions fabrica o `.env` na hora do deploy usando as variáveis cadastradas em `Settings > Secrets and variables > Actions`.

**Lista de Secrets Obrigatórios:**

* `FTP_SERVER_BFF`: IP puro do servidor Hostinger (ex: `82.25.67.212` - sem `ftp://`).
* `FTP_USERNAME_BFF`: Usuário FTP exclusivo para a pasta da API.
* `FTP_PASSWORD_BFF`: Senha do FTP da API.
* `FTP_USERNAME_GHZLIFE`: Usuário FTP exclusivo para a pasta do Frontend.
* `FTP_PASSWORD_GHZLIFE`: Senha do FTP do Frontend.
* `DB_HOST_BFF`: Host do banco (geralmente `localhost`).
* `DB_NAME_PROD`: Nome do banco de dados na Hostinger.
* `DB_USER`: Usuário do banco de dados.
* `DB_PASSWORD`: Senha do banco de dados.
* `VITE_API_URL`: URL pública da API (ex: `https://bff.halltech.site`).

---

## 🚑 4. Resolução de Problemas Comuns (Troubleshooting)

### Problema 1: Erro de "Timeout" ou "530 Login Incorrect" no FTP (Deploy Failed)

**Causa:** O GitHub não conseguiu acessar a Hostinger. Geralmente erro de digitação nos Secrets ou bloqueio.
**Como resolver:**

1. Verifique se o `FTP_SERVER_BFF` está **apenas com números** (sem `ftp://` e sem espaços).
2. Vá no hPanel da Hostinger, redefina a senha do usuário FTP afetado e atualize imediatamente nos Secrets do GitHub.
3. No GitHub Actions, clique em **"Re-run failed jobs"** (não precisa gerar nova tag).

### Problema 2: Erro `Cannot find module @rollup/rollup-linux-x64-gnu` no Frontend

**Causa:** O projeto foi testado no Windows, gerando um `package-lock.json` focado em Windows. O GitHub Actions (que é Linux) tenta ler esse arquivo e trava.
**Como resolver:**

* Certifique-se de que o `deploy.yml` possui o comando `rm -f package-lock.json` logo antes do `npm install` no job do frontend. Isso força o Linux a gerar dependências frescas.

### Problema 3: O Frontend sobe, mas a tela fica totalmente BRANCA

**Causa:** Conflito de injeção de dependências. O arquivo `index.html` possui uma tag `<script type="importmap">` gerada por IAs, que manda o navegador baixar o React da internet, mas o Vite já o empacotou no build.
**Como resolver:**

* Abra o `public/web/index.html`.
* **Apague** completamente o bloco `<script type="importmap">...</script>`.
* O Vite se encarregará de importar o React automaticamente na versão de produção. Faça o commit e crie uma nova tag.

### Problema 4: Onde configuro as variáveis da minha máquina local?

**Causa:** Confusão entre `.env` local e pipeline.
**Como resolver:**

* Crie o arquivo `public/api/.env` (para o PHP) e `public/web/.env.development` (para o React) apenas na sua máquina.
* **Certifique-se de que eles estão listados no `.gitignore**` para que o Git não os envie para o repositório. O código PHP deve sempre buscar com `getenv('VARIAVEL')`.
