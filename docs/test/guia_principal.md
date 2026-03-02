# 🤖 Guia Principal de Testes Automatizados (QA para Agentes de IA)

Este documento foi criado para **Agentes de Inteligência Artificial** operarem como Analistas de QA (Quality Assurance) no sistema System-Ghz Web. Quando for solicitado que você teste a aplicação, obedeça estritamente aos parâmetros abaixo.

## 📌 Parâmetros Básicos do Testador IA

Sempre que a IA for iniciar um teste padronizado, deve utilizar as seguintes credenciais predefinidas no banco de dados, unless instruído o contrário:

- **Usuário de QA:** `ia_tester@halltech.site`
- **Senha:** `ia_tester@halltech.site`

## 🛠️ Regras de Operação no Navegador (Browser Subagent)

1. **Acesso Local:** A base URL padrão de testes frontend é `http://localhost:3000/`. (Certifique-se de que o sistema e as APIs estejam rodando previamente).
2. **Registro Fotográfico:** Toda etapa fundamental (mudança de página, visualização de modal, erro explícito na tela) **deve** ter a captura do DOM/Screenshot armazenada na memória do agente.
3. **Avaliação Crítica de UI/UX:**
   - O layout está "quebrando" responsivamente?
   - Os loadings states estão se resolvendo ou ficam parados na tela?
   - A resposta da ação (Toasts de sucesso/erro) apareceu?
   - As informações inputadas resistem a um F5 (Page Refresh)?
4. **Resiliência a Fluxos Negativos:** Sempre tente navegar para uma URL protegida (ex: `/#/dashboard`) sem estar logado para garantir que a segurança da arquitetura `core/` redirecionará você de volta para o Login.

## 📝 Regras de Relatório Automático (Output do Teste)

Ao final do `[Browser Subagent]`, você **não** deve apenas responder "Testado com sucesso". Você **deve** gerar um artefato Markdown na pasta `docs/ia/` com a seguinte nomenclatura: 
`teste_completo-DD-MM-AAAA.md` (inserindo a data atual da execução).

**Sua documentação gerada DEVERÁ conter obrigatoriamente a estrutura abaixo:**

1. **Processos Realizados:** Passo a passo técnico do que foi navegado e preenchido.
2. **Print das Telas:** Referências as capturas de telas em anexo (se suportado pelo seu driver) descrevendo os passos de UI.
3. **Pontos Relevantes:** O que fluiu bem, quão rápido as transições acorreram, design aprovado.
4. **Pontos de Atenção:** Alertas menores, textos estourando, carregamentos longos, ausência de feedback de cliques.
5. **Sugestões de Melhoria:** Ações que um Desenvolvedor frontend poderia adicionar para curar os pontos de atenção.
6. **Resumo do Teste:** Avaliação sumária de Aprovado (Pass) ou Reprovado (Fail).

---
> **Nota para o Agente IA:** Sempre comece revisando o arquivo `docs/test/teste_completo.md` para entender exatamente qual a Rota e as Ações do dia que precisam ser submetidas ao robô.