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

-- Criação de um usuário com todas as funcionalidades
CALL create_user_with_all_functionalities(
    'nickname',
    'hashed_password',
    1,
    '1990-01-01',
    1,
    1,
    1
);



