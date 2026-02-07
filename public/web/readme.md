<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# ⚡ Ghz.Life - Seu Hub de Vida Inteligente

Bem-vindo ao **Ghz.Life**, uma plataforma integrada desenvolvida para simplificar a gestão da sua vida pessoal. Este projeto une **Finanças**, **Saúde** e **Produtividade** em uma interface moderna, mobile-first e impulsionada por Inteligência Artificial.

---

## 🚀 Sobre o Projeto

O **Ghz.Life** foi criado para resolver o problema da fragmentação de apps. Em vez de ter um app para anotações, outro para o banco e outro para beber água, aqui você tem tudo em um só lugar.

### Principais Funcionalidades

-   💰 **Finanças:** Controle de entradas, saídas e reservas financeiras.
-   ❤️ **Saúde:** Monitoramento de hidratação, lembretes de medicamentos e agenda de consultas.
-   ✅ **Produtividade:** Gestão de tarefas diárias, metas de longo prazo (sonhos), listas de compras e anotações.
-   🧠 **IA Integrada:** Utiliza o Google Gemini para analisar seus dados e fornecer insights personalizados (ex: "Beba mais água para manter o foco nas suas tarefas de hoje!").
-   🎨 **Personalização:** Suporte total a **Modo Escuro (Dark Mode)** e interface adaptável.

---

## 🛠️ Tecnologias e Arquitetura

Este projeto segue padrões modernos de desenvolvimento para garantir escalabilidade e facilidade de manutenção.

### Stack Tecnológica
-   **React 19:** Biblioteca principal para construção da interface.
-   **TypeScript:** Para um código mais seguro e tipado.
-   **Tailwind CSS:** Para estilização rápida e responsiva.
-   **Google Gemini API:** Para os recursos de inteligência artificial.
-   **Vite:** Build tool ultra-rápida.

### Padrões de Código (Feature-Based)

Adotamos uma estrutura baseada em **Features (Funcionalidades)**. Isso significa que, em vez de separar arquivos por tipo técnico (apenas "componentes" ou "serviços"), separamos pelo assunto que eles tratam.

Exemplo: Tudo relacionado a "Saúde" está dentro da pasta `features/health`.

### Estrutura de Pastas

```bash
src/
├── components/       # Componentes visuais "burros" (botões, cards genéricos)
├── domain/           # Tipos e Regras de Negócio globais (interfaces TypeScript)
├── features/         # O Coração do sistema (Lógica separada por domínio)
│   ├── auth/         # Login, Registro e Onboarding
│   ├── dashboard/    # Visão geral e integração de dados
│   ├── finance/      # Módulo Financeiro
│   ├── health/       # Módulo de Saúde
│   ├── settings/     # Configurações do usuário
│   └── tasks/        # Módulo de Tarefas e Produtividade
├── layout/           # Estrutura da página (Sidebar, Menu Mobile)
├── pages/            # As telas que compõem as rotas do app
└── services/         # Conexão com APIs externas (ex: Gemini AI)
```

---

## 🏁 Como Rodar o Projeto Localmente

Siga este passo a passo para ter o **Ghz.Life** rodando no seu computador.

### Pré-requisitos
Você precisa ter instalado no seu computador:
1.  **Node.js** (Versão 18 ou superior).
2.  Um editor de código (recomendamos o **VS Code**).

### Passo a Passo

1.  **Instale as dependências**
    Abra o terminal na pasta do projeto e execute:
    ```bash
    npm install
    ```

2.  **Configure a Chave de API (Importante para a IA)**
    Para que a Inteligência Artificial funcione, você precisa de uma chave do Google Gemini.
    - Crie um arquivo chamado `.env` na raiz do projeto.
    - Adicione a seguinte linha (substitua `SUA_CHAVE_AQUI` pela sua chave real):
    ```env
    API_KEY=SUA_CHAVE_AQUI
    ```
    > *Dica: Se não tiver uma chave agora, o app vai funcionar, mas os "Insights de IA" mostrarão mensagens padrão.*

3.  **Rode o Projeto**
    No terminal, execute:
    ```bash
    npm run dev
    ```
    O terminal irá mostrar um link (geralmente `http://localhost:5173`). Clique nele ou copie e cole no seu navegador.

---

## 📱 Dicas de Uso

-   **Navegação:** Use a barra inferior no celular ou o menu lateral no computador.
-   **Ação Rápida:** O botão central `+` (FAB) muda de função dependendo da tela que você está.
-   **Modo Escuro:** Vá em "Ajustes" (ícone de engrenagem) para alternar entre tema Claro e Escuro.
-   **IA:** No Dashboard, a IA analisa seus dados automaticamente ao carregar a página.

---

## 🤝 Contribuição e Autoria

Projeto desenvolvido com foco em **Clean Code** e **Experiência do Usuário (UX)**.

**Autor:** HallTech AI
**Versão:** MVP

---
<div align="center">
  <sub>Feito com 💜 e React</sub>
</div>
