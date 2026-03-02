# 🧪 Roteiro de Teste E2E (End-to-End) Completo

![Objetivo](https://img.shields.io/badge/Objetivo-Verificar%20Estabilidade-blue) ![Responsável](https://img.shields.io/badge/Respons%C3%A1vel-Agente%20de%20IA-purple)
**Instrução para a IA:** Siga rigorosamente este mapeamento usando o seu `Browser Subagent`. Em caso de erro estático, anexe o print do console e continue. Ao finalizar todas as etapas, crie o documento de relatório conforme manda o `guia_principal.md`.

---

## 🚦 Fase 1: Autenticação Inicial
1. Navegar para a base URL `http://localhost:3000/`.
2. Clicar no botão **ENTRAR**.
3. Inserir o E-mail: `ia_tester@halltech.site`
4. Inserir a Senha: `ia_tester@halltech.site`
5. Clicar em **ACESSAR HUB**.
6. **Expectativa:** Redirecionamento bem-sucedido para `/#/dashboard` carregando os dados do usuário.

## 📝 Fase 2: CRUD de Tarefas (Task Module)
1. Navegar até a aba/módulo de **Agenda** ou **Tarefas**.
2. **CREATE:** Criar uma nova tarefa com o título `"Teste Autônomo IA"`.
3. **READ:** Visualizar a tarefa renderizada na lista.
4. **UPDATE:** Clicar para editar a tarefa, alterando seu título para `"Teste Editado pela IA"` e salvando.
5. **INTERACT:** Marcar a tarefa como concluída (Checkbox/Botão de ação rápida).
6. **DELETE:** Encontrar a opção e Excluir a tarefa.
7. **Expectativa:** A tarefa deve sumir da UI, confirmando que a alteração de estado reativa (Zustand ou Hooks) está funcionando sem refetchings falsos.

## ⚙️ Fase 3: Persistência de Perfil (Settings Module)
1. Navegar até a tela de **Perfil/Configurações**.
2. Modificar o campo de Nome/Apelido para `"Mr. IA Tester"`.
3. Clicar no botão de **SALVAR**.
4. Atualizar a página `(F5)` para validar que o Storage guardou os dados.
5. Editar novamente, voltando o nome original `ia_tester`, e **SALVAR**.
6. **Expectativa:** Mudanças precisam constar na UI pós-refresh, confirmando integridade do Service local.

## 🔒 Fase 4: Proteção de Rota (AuthGuard)
1. Executar o botão/opção de **SAIR / LOGOUT** para limpar o cache da sessão.
2. Tentar, via input diretor de URL, visitar `http://localhost:3000/#/dashboard`.
3. **Expectativa:** O componente React Router de Autenticação (`RouterGuard`) deve bloquear o acesso e redirecionar imediatamente para a Landing Page (ou tela de login).

## 🚀 Fase 5: Registro End-to-End (Wizard)
1. Estando na tela inicial (`/#/`), clicar em **CADASTRAR**.
2. Avançar pelas telas do assistente (Steps/Wizard).
3. Preencher nome genérico (Ex: `Agent Smith`).
4. Inserir e-mail genérico com timestamp para não conflitar (Ex: `agent.smith+173200@halltech.site`).
5. Inserir uma senha.
6. Selecionar pelo menos 2 módulos nos checkboxes de interesse (Ex: Produtividade, Finanças).
7. Finalizar cadastro.
8. **Expectativa:** O sistema deve registrar, fazer o handshake e logar automaticamente, levando o usuário recém-criado para o Dashboard com os módulos corretos ligados.

---
🔴 **Ação Final da IA:** Após a conclusão da Etapa 5, interromper o Browse Subagent e gerar o relatório (`teste_completo-DD-MM-AAAA.md`).
