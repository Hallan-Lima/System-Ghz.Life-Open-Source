-- =============================================
USE application;
-- =============================================


-- Gêneros de usuários
INSERT INTO gender (name) VALUES 
('Masculino'),
('Feminino'),
('Não-binário'),
('Transgênero'),
('Intersexo'),
('Gênero fluido'),
('Agênero'),
('Pangênero'),
('Bigênero'),
('Cisgênero'),
('Gênero não-conforme'),
('Gênero queer'),
('Outros');

-- Status de usuários padrões
INSERT INTO user_status (name) VALUES 
('Ativo'),
('Inativo'),
('Pendente');

-- Níveis de usuário padrões
INSERT INTO user_level (name) VALUES 
('Administrador'),
('Usuário'),
('Convidado');

-- Tipos de categoria financeira
INSERT INTO category_type (name) VALUES 
('Receita'),
('Despesa'),
('Transferência');

-- Tipos de transação financeira
INSERT INTO transaction_type (name) VALUES 
('Receber'),
('Pagar'),
('Transferir'),
('Cartão de Crédito'),
('Recorrente Mensal');

-- Módulos do sistema
INSERT INTO module (name, description) VALUES 
('Principal', 'Primeiros itens do sistema'),
('Usuários', 'Gerenciamento de usuários e permissões'),
('Financeiro', 'Controle de contas, transações e categorias'),
('Listas', 'Listas de compras e metas pessoais'),
('Timer', 'Cronômetros e timers'),
('Calendário', 'Eventos, lembretes e tarefas'),
('Calculadora', 'Calculadoras e conversores'),
('Social', 'Interações sociais e sugestões'),
('Configurações', 'Configurações do sistema');

-- Grupos de exemplo
INSERT INTO `group` (name, description) VALUES 
('Empresa Exemplo', 'Grupo padrão de uma empresa fictícia'),
('Família Silva', 'Grupo para controle financeiro familiar');





-- Exemplo de inserts para funcionalidades e menus do sistema
-- =============================================
-- 1. Home (menu principal)
INSERT INTO functionality (module_id, parent_id, name, url, description, order_index)
VALUES (
    (SELECT id FROM module WHERE name = 'Principal'), 
    NULL, 
    'Home', 
    'home', 
    'Página inicial', 
    1
);

-- 2. Financeiro (header)
SET @moduleId = (SELECT id FROM module WHERE name = 'Financeiro');
INSERT INTO functionality (module_id, parent_id, name, url, description, order_index)
VALUES (@moduleId, NULL, 'Contas', 'account' ,'Módulo financeiro', 1),
(@moduleId, NULL, 'Receber', '#', 'Contas a receber', 2),
(@moduleId, NULL, 'Pagar', '#', 'Contas a pagar', 3),
(@moduleId, NULL, 'Transações', '#', 'Movimentações financeiras', 4),
(@moduleId, NULL, 'Cartão de Credito', '#', 'Gestão de cartões', 5),
(@moduleId, NULL, 'Configuração', '#', 'Configurações financeiras', 6);

-- 3. Listas (header)
SET @moduleId = (SELECT id FROM module WHERE name = 'Listas');
INSERT INTO functionality (module_id, parent_id, name, url, description, order_index)
VALUES (@moduleId, NULL, 'Metas Pessoais', '#' ,'', 1);
INSERT INTO functionality (module_id, parent_id, name, url, description, order_index)
VALUES (@moduleId, NULL, 'Comprar', '#' ,'', 2);

-- 3.1 Listas (submenu)
SET @parentId = (SELECT id FROM functionality WHERE name = 'Metas Pessoais');
INSERT INTO functionality (module_id, parent_id, name, url, description, order_index)
VALUES (@moduleId, @parentId, 'itens', '#' ,'', 1);
INSERT INTO functionality (module_id, parent_id, name, url, description, order_index)
VALUES (@moduleId, @parentId, 'Cadastrar', '#' ,'', 2);

-- 3.2 Listas (submenu)
SET @parentId = (SELECT id FROM functionality WHERE name = 'Comprar');
INSERT INTO functionality (module_id, parent_id, name, url, description, order_index)
VALUES (@moduleId, @parentId, 'itens', '#' ,'', 1);
INSERT INTO functionality (module_id, parent_id, name, url, description, order_index)
VALUES (@moduleId, @parentId, 'Cadastrar', '#' ,'', 2);

-- 4. Timer (header)
SET @moduleId = (SELECT id FROM module WHERE name = 'Timer');
INSERT INTO functionality (module_id, parent_id, name, url, description, order_index)
VALUES (@moduleId, NULL, 'Pomodoro', '#' ,'Timer Pomodoro', 1),
(@moduleId, NULL, 'Cronometro', '#' ,'Cronômetro', 2);

-- 5. Calendário (header)
SET @moduleId = (SELECT id FROM module WHERE name = 'Calendário');
INSERT INTO functionality (module_id, parent_id, name, url, description, order_index)
VALUES (@moduleId, NULL, 'Acompanhar', '#' ,'Acompanhamento', 1),
(@moduleId, NULL, 'Despertador', '#' ,'Despertador', 2),
(@moduleId, NULL, 'Acompanhar Menstruação', '#' ,'Acompanhamento de menstruação', 3),
(@moduleId, NULL, 'Agenda', '#' ,'Agenda pessoal', 4),
(@moduleId, NULL, 'Tarefas', '#' ,'Gestão de tarefas', 5),
(@moduleId, NULL, 'Lembretes', '#' ,'Gestão de lembretes', 6),
(@moduleId, NULL, 'Eventos', '#' ,'Gestão de eventos', 7);

-- 5.1 Acompanhar (submenu)
SET @parentId = (SELECT id FROM functionality WHERE name = 'Acompanhar');
INSERT INTO functionality (module_id, parent_id, name, url, description, order_index)
VALUES (@moduleId, @parentId, 'Academia', '#' ,'Acompanhamento de academia', 1),
(@moduleId, @parentId, 'Controle de Marcações', '#' ,'Controle de marcações', 2),
(@moduleId, @parentId, 'Alimentação', '#' ,'Acompanhamento de alimentação', 3);

-- 5.2 Despertador (submenu)
SET @parentId = (SELECT id FROM functionality WHERE name = 'Despertador');
INSERT INTO functionality (module_id, parent_id, name, url, description, order_index)
VALUES (@moduleId, @parentId, 'Monitoramento Sono', '#' ,'Monitoramento do sono', 1),
(@moduleId, @parentId, 'Listar Itens', '#' ,'Listar itens do despertador', 2),
(@moduleId, @parentId, 'Incluir Itens', '#' ,'Incluir itens no despertador', 3);

-- 6. Calculadora (header)
SET @moduleId = (SELECT id FROM module WHERE name = 'Calculadora');
INSERT INTO functionality (module_id, parent_id, name, url, description, order_index)
VALUES (@moduleId, NULL, 'Básica', '#' ,'Calculadora básica', 1),
(@moduleId, NULL, 'Cientifica', '#' ,'Calculadora científica', 2),
(@moduleId, NULL, 'Financeira', '#' ,'Calculadora financeira', 3),
(@moduleId, NULL, 'Conversores', '#' ,'Conversores de unidades', 4);

-- 7. Social (header)
SET @moduleId = (SELECT id FROM module WHERE name = 'Social');
INSERT INTO functionality (module_id, parent_id, name, url, description, order_index)
VALUES (@moduleId, NULL, 'Assistente Pessoal', '#' ,'Assistente pessoal', 1),
(@moduleId, NULL, 'Enquetes', '#' ,'Gestão de enquetes', 2),
(@moduleId, NULL, 'Pesquisas', '#' ,'Gestão de pesquisas', 3),
(@moduleId, NULL, 'Sugestões', '#' ,'Sugestões de usuários', 4);

-- 8. Configurações (header)
SET @moduleId = (SELECT id FROM module WHERE name = 'Configurações');
INSERT INTO functionality (module_id, parent_id, name, url, description, order_index)
VALUES (@moduleId, NULL, 'Perfil', 'profile' ,'Perfil do usuário', 1),
(@moduleId, NULL, 'Funcionalidades', 'config-functions-system' ,'Configuração de funcionalidades', 2),
(@moduleId, NULL, 'IA', '#' ,'Inteligência Artificial', 3);



DELIMITER $$

CREATE PROCEDURE create_user_with_all_functionalities (
    IN p_nickname VARCHAR(50),
    IN p_password_hash VARCHAR(255),
    IN p_gender_id INT,
    IN p_birthdate DATE,
    IN p_status_id INT,
    IN p_level_id INT,
    OUT v_user_id INT
)
BEGIN
    -- Inserir usuário e obter o ID gerado
    INSERT INTO user (nickname, password_hash, gender_id, birthdate, status_id, level_id)
    VALUES (p_nickname, p_password_hash, p_gender_id, p_birthdate, p_status_id, p_level_id);

    SET v_user_id = LAST_INSERT_ID();

    -- Conceder todas as funcionalidades como ativas
    INSERT INTO user_functionality (
        user_id, functionality_id, can_read, can_create, can_update, can_delete, granted_by
    )
    SELECT
        v_user_id, f.id, 1, 1, 1, 1, v_user_id
    FROM functionality f;
END$$

DELIMITER ;



-- INSERT INTO functionality (module_id, parent_id, name, url, description, order_index)
-- VALUES (@moduleId, @parentId, 'Contas', 'account', 'Gestão de Contas', 1),


-- -- 3. Listas (header)
-- INSERT INTO functionality (module_id, parent_id, name, url, description, order_index)
-- VALUES (@moduleId, NULL, 'Listas','Módulo de listas', 3);
-- SET @parentId = (SELECT id FROM functionality WHERE name = 'Listas');

-- INSERT INTO functionality (module_id, parent_id, name, url, description, order_index)
-- VALUES (@moduleId, @parentId, 'Metas Pessoais', '#', '', 1),
-- (@moduleId, @parentId, 'Itens', '#', '', 2),
-- (@moduleId, @parentId, 'Cadastrar', '#', '', 3);

-- -- 4. Comprar (header)
-- INSERT INTO functionality (module_id, parent_id, name, url, description, order_index)
-- VALUES (@moduleId, NULL, 'Comprar','Módulo de Comprar', 3);
-- SET @parentId = (SELECT id FROM functionality WHERE name = 'Comprar');

-- INSERT INTO functionality (module_id, parent_id, name, url, description, order_index)
-- VALUES (@moduleId, @parentId, 'Metas Pessoais', '#', '', 1),
-- (@moduleId, @parentId, 'Itens', '#', '', 2),
-- (@moduleId, @parentId, 'Cadastrar', '#', '', 3);


-- -- 4. Timer (header)
-- INSERT INTO functionality (module_id, parent_id, name, url, description, order_index)
-- VALUES (@moduleId, NULL, 'Timer','Módulo de timer', 4);
-- SET @parentId = (SELECT id FROM functionality WHERE name = 'Timer');

-- INSERT INTO functionality (module_id, parent_id, name, url, description, order_index)
-- VALUES (@moduleId, @parentId, 'Pomodoro', '#', 'Timer Pomodoro', 1),
-- (@moduleId, @parentId, 'Cronometro', '#', 'Cronômetro', 2);

-- -- 5. Calendário (header)
-- INSERT INTO functionality (module_id, parent_id, name, url, description, order_index)  
-- VALUES (@moduleId, NULL, 'Calendário','Módulo de calendário', 5);
-- SET @parentId = (SELECT id FROM functionality WHERE name = 'Calendário');

-- INSERT INTO functionality (module_id, parent_id, name, url, description, order_index)
-- VALUES (@moduleId, @parentId, 'Acompanhar', '#', 'Acompanhamento', 1),
-- (@moduleId, @parentId, 'Despertador', '#', 'Despertador', 2),
-- (@moduleId, @parentId, 'Acompanhar Menstruação', '#', 'Acompanhamento de menstruação', 3),
-- (@moduleId, @parentId, 'Agenda', '#', 'Agenda pessoal', 4),
-- (@moduleId, @parentId, 'Tarefas', '#', 'Gestão de tarefas', 5),
-- (@moduleId, @parentId, 'Lembretes', '#', 'Gestão de lembretes', 6),
-- (@moduleId, @parentId, 'Eventos', '#', 'Gestão de eventos', 7);



















-- INSERT INTO functionality (module_id, parent_id, name, url, description, order_index)
-- VALUES (@moduleId, NULL, 'Financeiro','Módulo financeiro', 2);


-- -- 2.1 Contas
-- INSERT INTO functionality (module_id, parent_id, name, url, description, order_index)
-- VALUES (1, 2, 'Contas', 'account', 'Gestão de contas', 1);

-- -- 2.2 Receber
-- INSERT INTO functionality (module_id, parent_id, name, url, description, order_index)
-- VALUES (1, 2, 'Receber', '#', 'Contas a receber', 2);

-- -- 2.3 Pagar
-- INSERT INTO functionality (module_id, parent_id, name, url, description, order_index)
-- VALUES (1, 2, 'Pagar', '#', 'Contas a pagar', 3);

-- -- 2.4 Transações
-- INSERT INTO functionality (module_id, parent_id, name, url, description, order_index)
-- VALUES (1, 2, 'Transações', '#', 'Movimentações financeiras', 4);

-- -- 2.5 Cartão de Crédito
-- INSERT INTO functionality (module_id, parent_id, name, url, description, order_index)
-- VALUES (1, 2, 'Cartão de Credito', '#', 'Gestão de cartões', 5);

-- -- 2.6 Configuração
-- INSERT INTO functionality (module_id, parent_id, name, url, description, order_index)
-- VALUES (1, 2, 'Configuração', '#', 'Configurações financeiras', 6);

-- -- 3. Listas (header)
-- INSERT INTO functionality (module_id, parent_id, name, url, description, order_index)
-- VALUES (2, NULL, 'Listas', NULL, 'Módulo de listas', 3);

-- -- 3.1 Metas Pessoais (submenu)
-- INSERT INTO functionality (module_id, parent_id, name, url, description, order_index)
-- VALUES (2, 9, 'Metas Pessoais', 'javascript:void(0);', 'Metas pessoais', 1);

-- -- 3.1.1 Itens
-- INSERT INTO functionality (module_id, parent_id, name, url, description, order_index)
-- VALUES (2, 10, 'Itens', '#', 'Itens de metas pessoais', 1);

-- -- 3.1.2 Cadastrar
-- INSERT INTO functionality (module_id, parent_id, name, url, description, order_index)
-- VALUES (2, 10, 'Cadastrar', '#', 'Cadastrar meta pessoal', 2);

-- -- 3.2 Comprar (submenu)
-- INSERT INTO functionality (module_id, parent_id, name, url, description, order_index)
-- VALUES (2, 9, 'Comprar', 'javascript:void(0);', 'Lista de compras', 2);

-- -- 3.2.1 Itens
-- INSERT INTO functionality (module_id, parent_id, name, url, description, order_index)
-- VALUES (2, 13, 'Itens', '#', 'Itens de compras', 1);

-- -- 3.2.2 Cadastrar
-- INSERT INTO functionality (module_id, parent_id, name, url, description, order_index)
-- VALUES (2, 13, 'Cadastrar', '#', 'Cadastrar item de compra', 2);

-- -- 4. Timer (header)
-- INSERT INTO functionality (module_id, parent_id, name, url, description, order_index)
-- VALUES (3, NULL, 'Timer', NULL, 'Módulo de timer', 4);

-- -- 4.1 Pomodoro
-- INSERT INTO functionality (module_id, parent_id, name, url, description, order_index)
-- VALUES (3, 16, 'Pomodoro', '#', 'Timer Pomodoro', 1);

-- -- 4.2 Cronometro
-- INSERT INTO functionality (module_id, parent_id, name, url, description, order_index)
-- VALUES (3, 16, 'Cronometro', '#', 'Cronômetro', 2);

-- -- 5. Calendário (header)
-- INSERT INTO functionality (module_id, parent_id, name, url, description, order_index)
-- VALUES (4, NULL, 'Calendário', NULL, 'Módulo de calendário', 5);

-- -- 5.1 Acompanhar (submenu)
-- INSERT INTO functionality (module_id, parent_id, name, url, description, order_index)
-- VALUES (4, 19, 'Acompanhar', 'javascript:void(0);', 'Acompanhamento', 1);

-- -- 5.1.1 Academia
-- INSERT INTO functionality (module_id, parent_id, name, url, description, order_index)
-- VALUES (4, 20, 'Academia', '#', 'Acompanhamento de academia', 1);

-- -- 5.1.2 Controle de Marcações
-- INSERT INTO functionality (module_id, parent_id, name, url, description, order_index)
-- VALUES (4, 20, 'Controle de Marcações', '#', 'Controle de marcações', 2);

-- -- 5.1.3 Alimentação
-- INSERT INTO functionality (module_id, parent_id, name, url, description, order_index)
-- VALUES (4, 20, 'Alimentação', '#', 'Acompanhamento de alimentação', 3);

-- -- 5.2 Despertador (submenu)
-- INSERT INTO functionality (module_id, parent_id, name, url, description, order_index)
-- VALUES (4, 19, 'Despertador', 'javascript:void(0);', 'Despertador', 2);

-- -- 5.2.1 Monitoramento Sono
-- INSERT INTO functionality (module_id, parent_id, name, url, description, order_index)
-- VALUES (4, 24, 'Monitoramento Sono', '#', 'Monitoramento do sono', 1);

-- -- 5.2.2 Listar Itens
-- INSERT INTO functionality (module_id, parent_id, name, url, description, order_index)
-- VALUES (4, 24, 'Listar Itens', '#', 'Listar itens do despertador', 2);

-- -- 5.2.3 Incluir Itens
-- INSERT INTO functionality (module_id, parent_id, name, url, description, order_index)
-- VALUES (4, 24, 'Incluir Itens', '#', 'Incluir itens no despertador', 3);

-- -- 5.3 Acompanhar Menstruação
-- INSERT INTO functionality (module_id, parent_id, name, url, description, order_index)
-- VALUES (4, 19, 'Acompanhar Menstruação', '#', 'Acompanhamento de menstruação', 3);

-- -- 5.4 Agenda
-- INSERT INTO functionality (module_id, parent_id, name, url, description, order_index)
-- VALUES (4, 19, 'Agenda', '#', 'Agenda pessoal', 4);

-- -- 5.5 Tarefas
-- INSERT INTO functionality (module_id, parent_id, name, url, description, order_index)
-- VALUES (4, 19, 'Tarefas', '#', 'Gestão de tarefas', 5);

-- -- 5.6 Lembretes
-- INSERT INTO functionality (module_id, parent_id, name, url, description, order_index)
-- VALUES (4, 19, 'Lembretes', '#', 'Gestão de lembretes', 6);

-- -- 5.7 Eventos
-- INSERT INTO functionality (module_id, parent_id, name, url, description, order_index)
-- VALUES (4, 19, 'Eventos', '#', 'Gestão de eventos', 7);

-- -- 6. Calculadora (header)
-- INSERT INTO functionality (module_id, parent_id, name, url, description, order_index)
-- VALUES (5, NULL, 'Calculadora', NULL, 'Módulo de calculadora', 6);

-- -- 6.1 Básica
-- INSERT INTO functionality (module_id, parent_id, name, url, description, order_index)
-- VALUES (5, 32, 'Básica', '#', 'Calculadora básica', 1);

-- -- 6.2 Cientifica
-- INSERT INTO functionality (module_id, parent_id, name, url, description, order_index)
-- VALUES (5, 32, 'Cientifica', '#', 'Calculadora científica', 2);

-- -- 6.3 Financeira
-- INSERT INTO functionality (module_id, parent_id, name, url, description, order_index)
-- VALUES (5, 32, 'Financeira', '#', 'Calculadora financeira', 3);

-- -- 6.4 Conversores
-- INSERT INTO functionality (module_id, parent_id, name, url, description, order_index)
-- VALUES (5, 32, 'Conversores', '#', 'Conversores de unidades', 4);

-- -- 7. Social (header)
-- INSERT INTO functionality (module_id, parent_id, name, url, description, order_index)
-- VALUES (6, NULL, 'Social', NULL, 'Módulo social', 7);

-- -- 7.1 Assistente Pessoal
-- INSERT INTO functionality (module_id, parent_id, name, url, description, order_index)
-- VALUES (6, 37, 'Assistente Pessoal', '#', 'Assistente pessoal', 1);

-- -- 7.2 Enquetes
-- INSERT INTO functionality (module_id, parent_id, name, url, description, order_index)
-- VALUES (6, 37, 'Enquetes', '#', 'Gestão de enquetes', 2);

-- -- 7.3 Pesquisas
-- INSERT INTO functionality (module_id, parent_id, name, url, description, order_index)
-- VALUES (6, 37, 'Pesquisas', '#', 'Gestão de pesquisas', 3);

-- -- 7.4 Sugestões
-- INSERT INTO functionality (module_id, parent_id, name, url, description, order_index)
-- VALUES (6, 37, 'Sugestões', '#', 'Sugestões de usuários', 4);

-- -- 8. Configurações (header)
-- INSERT INTO functionality (module_id, parent_id, name, url, description, order_index)
-- VALUES (7, NULL, 'Configurações', NULL, 'Módulo de configurações', 8);

-- -- 8.1 Perfil
-- INSERT INTO functionality (module_id, parent_id, name, url, description, order_index)
-- VALUES (7, 42, 'Perfil', 'profile', 'Perfil do usuário', 1);

-- -- 8.2 Funcionalidades
-- INSERT INTO functionality (module_id, parent_id, name, url, description, order_index)
-- VALUES (7, 42, 'Funcionalidades', 'config-functions-system', 'Configuração de funcionalidades', 2);

-- -- 8.3 IA
-- INSERT INTO functionality (module_id, parent_id, name, url, description, order_index)
-- VALUES (7, 42, 'IA', '#', 'Inteligência Artificial', 3);