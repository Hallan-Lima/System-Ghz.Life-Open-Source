

-- ------------------------------------------------------------------------------
-- CRIAR USUÁRIO (Cadastro)
-- Cria User, Email e Permissões Iniciais em Transação
-- ------------------------------------------------------------------------------
-- 1. Limpar variáveis
SET @uuid = NULL;
SET @token = NULL;

-- 2. Executar (Sem o campo Level)
CALL sp_register_complete_user(
    'Usuario Sem Level',           -- Nickname
    '$2y$10$TesteHash',            -- Senha
    2,                             -- Gênero
    '1995-05-20',                  -- Data Nascimento
    'teste.nolevel@ghz.life',      -- Email
    1,                             -- Status (1=Ativo)
    1,                             -- Plano (1=Free)
    '[1, 2, 5]',                   -- Funcionalidades
    @uuid,                         -- Saída UUID
    @token                         -- Saída Token
);


-- ==============================================================================
-- TESTE: CRIANDO TAREFAS
-- ==============================================================================

-- Exemplo 1: Criar uma Tarefa Diária (DAILY) de Prioridade Alta (2)
CALL sp_task_create(
    @uuid,              -- UUID do usuário (ou use string fixa 'uuid-aqui')
    'DAILY',            -- Tipo (Mapeia para ID 1)
    'Reunião com a equipe de DEV', -- Título
    2                   -- Prioridade (High)
);

-- Exemplo 2: Criar uma Meta (GOAL) de Prioridade Média (1)
CALL sp_task_create(
    @uuid,
    'GOAL',             -- Tipo (Mapeia para ID 2)
    'Economizar R$ 5.000',
    1                   -- Prioridade (Medium)
);

-- Exemplo 3: Criar uma Anotação (NOTE) de Prioridade Baixa (0)
CALL sp_task_create(
    @uuid,
    'NOTE',             -- Tipo (Mapeia para ID 5)
    'Ideia para vídeo do YouTube',
    0                   -- Prioridade (Low)
);


-- 3. Verificar resultados
SELECT @uuid AS uuid, @token AS token;
SELECT * FROM vw_user_session WHERE email = 'teste.nolevel@ghz.life';
select * from vw_system_modules;
select * from vw_app_tasks_board;
CALL sp_auth_login('teste.nolevel@ghz.life')
