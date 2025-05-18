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
('Relatórios', 'Emissão de relatórios financeiros');

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

-- 2. Financeiro (header, sem url)
INSERT INTO functionality (module_id, parent_id, name, url, description, order_index)
VALUES (
    (SELECT id FROM module WHERE name = 'Financeiro'), 
    NULL, 
    'Financeiro', 
    NULL, 
    'Módulo financeiro', 
    2
);

-- 2.1 Contas
INSERT INTO functionality (module_id, parent_id, name, url, description, order_index)
VALUES (
    (SELECT id FROM module WHERE name = 'Usuários'), 
    (SELECT id FROM functionality WHERE name = 'Financeiro' AND module_id = (SELECT id FROM module WHERE name = 'Usuários')), 
    'Contas', 
    'account', 
    'Gestão de contas', 
    1
);

-- 2.2 Receber
INSERT INTO functionality (module_id, parent_id, name, url, description, order_index)
VALUES (
    (SELECT id FROM module WHERE name = 'Usuários'), 
    (SELECT id FROM functionality WHERE name = 'Financeiro' AND module_id = (SELECT id FROM module WHERE name = 'Usuários')), 
    'Receber', 
    '#', 
    'Contas a receber', 
    2
);

-- 2.3 Pagar
INSERT INTO functionality (module_id, parent_id, name, url, description, order_index)
VALUES (
    (SELECT id FROM module WHERE name = 'Usuários'), 
    (SELECT id FROM functionality WHERE name = 'Financeiro' AND module_id = (SELECT id FROM module WHERE name = 'Usuários')), 
    'Pagar', 
    '#', 
    'Contas a pagar', 
    3
);

-- 2.4 Transações
INSERT INTO functionality (module_id, parent_id, name, url, description, order_index)
VALUES (
    (SELECT id FROM module WHERE name = 'Usuários'), 
    (SELECT id FROM functionality WHERE name = 'Financeiro' AND module_id = (SELECT id FROM module WHERE name = 'Usuários')), 
    'Transações', 
    '#', 
    'Movimentações financeiras', 
    4
);

-- 2.5 Cartão de Crédito
INSERT INTO functionality (module_id, parent_id, name, url, description, order_index)
VALUES (
    (SELECT id FROM module WHERE name = 'Usuários'), 
    (SELECT id FROM functionality WHERE name = 'Financeiro' AND module_id = (SELECT id FROM module WHERE name = 'Usuários')), 
    'Cartão de Credito', 
    '#', 
    'Gestão de cartões', 
    5
);

-- 2.6 Configuração
INSERT INTO functionality (module_id, parent_id, name, url, description, order_index)
VALUES (
    (SELECT id FROM module WHERE name = 'Usuários'), 
    (SELECT id FROM functionality WHERE name = 'Financeiro' AND module_id = (SELECT id FROM module WHERE name = 'Usuários')), 
    'Configuração', 
    '#', 
    'Configurações financeiras', 
    6
);


-- 1. Home (menu principal)
INSERT INTO functionality (module_id, parent_id, name, url, description, order_index)
VALUES (1, NULL, 'Home', 'home', 'Página inicial', 1);

-- 2. Financeiro (header, sem url)
INSERT INTO functionality (module_id, parent_id, name, url, description, order_index)
VALUES (1, NULL, 'Financeiro', NULL, 'Módulo financeiro', 2);

-- 2.1 Contas
INSERT INTO functionality (module_id, parent_id, name, url, description, order_index)
VALUES (1, 2, 'Contas', 'account', 'Gestão de contas', 1);

-- 2.2 Receber
INSERT INTO functionality (module_id, parent_id, name, url, description, order_index)
VALUES (1, 2, 'Receber', '#', 'Contas a receber', 2);

-- 2.3 Pagar
INSERT INTO functionality (module_id, parent_id, name, url, description, order_index)
VALUES (1, 2, 'Pagar', '#', 'Contas a pagar', 3);

-- 2.4 Transações
INSERT INTO functionality (module_id, parent_id, name, url, description, order_index)
VALUES (1, 2, 'Transações', '#', 'Movimentações financeiras', 4);

-- 2.5 Cartão de Crédito
INSERT INTO functionality (module_id, parent_id, name, url, description, order_index)
VALUES (1, 2, 'Cartão de Credito', '#', 'Gestão de cartões', 5);

-- 2.6 Configuração
INSERT INTO functionality (module_id, parent_id, name, url, description, order_index)
VALUES (1, 2, 'Configuração', '#', 'Configurações financeiras', 6);

-- 3. Listas (header)
INSERT INTO functionality (module_id, parent_id, name, url, description, order_index)
VALUES (2, NULL, 'Listas', NULL, 'Módulo de listas', 3);

-- 3.1 Metas Pessoais (submenu)
INSERT INTO functionality (module_id, parent_id, name, url, description, order_index)
VALUES (2, 9, 'Metas Pessoais', 'javascript:void(0);', 'Metas pessoais', 1);

-- 3.1.1 Itens
INSERT INTO functionality (module_id, parent_id, name, url, description, order_index)
VALUES (2, 10, 'Itens', '#', 'Itens de metas pessoais', 1);

-- 3.1.2 Cadastrar
INSERT INTO functionality (module_id, parent_id, name, url, description, order_index)
VALUES (2, 10, 'Cadastrar', '#', 'Cadastrar meta pessoal', 2);

-- 3.2 Comprar (submenu)
INSERT INTO functionality (module_id, parent_id, name, url, description, order_index)
VALUES (2, 9, 'Comprar', 'javascript:void(0);', 'Lista de compras', 2);

-- 3.2.1 Itens
INSERT INTO functionality (module_id, parent_id, name, url, description, order_index)
VALUES (2, 13, 'Itens', '#', 'Itens de compras', 1);

-- 3.2.2 Cadastrar
INSERT INTO functionality (module_id, parent_id, name, url, description, order_index)
VALUES (2, 13, 'Cadastrar', '#', 'Cadastrar item de compra', 2);

-- 4. Timer (header)
INSERT INTO functionality (module_id, parent_id, name, url, description, order_index)
VALUES (3, NULL, 'Timer', NULL, 'Módulo de timer', 4);

-- 4.1 Pomodoro
INSERT INTO functionality (module_id, parent_id, name, url, description, order_index)
VALUES (3, 16, 'Pomodoro', '#', 'Timer Pomodoro', 1);

-- 4.2 Cronometro
INSERT INTO functionality (module_id, parent_id, name, url, description, order_index)
VALUES (3, 16, 'Cronometro', '#', 'Cronômetro', 2);

-- 5. Calendário (header)
INSERT INTO functionality (module_id, parent_id, name, url, description, order_index)
VALUES (4, NULL, 'Calendário', NULL, 'Módulo de calendário', 5);

-- 5.1 Acompanhar (submenu)
INSERT INTO functionality (module_id, parent_id, name, url, description, order_index)
VALUES (4, 19, 'Acompanhar', 'javascript:void(0);', 'Acompanhamento', 1);

-- 5.1.1 Academia
INSERT INTO functionality (module_id, parent_id, name, url, description, order_index)
VALUES (4, 20, 'Academia', '#', 'Acompanhamento de academia', 1);

-- 5.1.2 Controle de Marcações
INSERT INTO functionality (module_id, parent_id, name, url, description, order_index)
VALUES (4, 20, 'Controle de Marcações', '#', 'Controle de marcações', 2);

-- 5.1.3 Alimentação
INSERT INTO functionality (module_id, parent_id, name, url, description, order_index)
VALUES (4, 20, 'Alimentação', '#', 'Acompanhamento de alimentação', 3);

-- 5.2 Despertador (submenu)
INSERT INTO functionality (module_id, parent_id, name, url, description, order_index)
VALUES (4, 19, 'Despertador', 'javascript:void(0);', 'Despertador', 2);

-- 5.2.1 Monitoramento Sono
INSERT INTO functionality (module_id, parent_id, name, url, description, order_index)
VALUES (4, 24, 'Monitoramento Sono', '#', 'Monitoramento do sono', 1);

-- 5.2.2 Listar Itens
INSERT INTO functionality (module_id, parent_id, name, url, description, order_index)
VALUES (4, 24, 'Listar Itens', '#', 'Listar itens do despertador', 2);

-- 5.2.3 Incluir Itens
INSERT INTO functionality (module_id, parent_id, name, url, description, order_index)
VALUES (4, 24, 'Incluir Itens', '#', 'Incluir itens no despertador', 3);

-- 5.3 Acompanhar Menstruação
INSERT INTO functionality (module_id, parent_id, name, url, description, order_index)
VALUES (4, 19, 'Acompanhar Menstruação', '#', 'Acompanhamento de menstruação', 3);

-- 5.4 Agenda
INSERT INTO functionality (module_id, parent_id, name, url, description, order_index)
VALUES (4, 19, 'Agenda', '#', 'Agenda pessoal', 4);

-- 5.5 Tarefas
INSERT INTO functionality (module_id, parent_id, name, url, description, order_index)
VALUES (4, 19, 'Tarefas', '#', 'Gestão de tarefas', 5);

-- 5.6 Lembretes
INSERT INTO functionality (module_id, parent_id, name, url, description, order_index)
VALUES (4, 19, 'Lembretes', '#', 'Gestão de lembretes', 6);

-- 5.7 Eventos
INSERT INTO functionality (module_id, parent_id, name, url, description, order_index)
VALUES (4, 19, 'Eventos', '#', 'Gestão de eventos', 7);

-- 6. Calculadora (header)
INSERT INTO functionality (module_id, parent_id, name, url, description, order_index)
VALUES (5, NULL, 'Calculadora', NULL, 'Módulo de calculadora', 6);

-- 6.1 Básica
INSERT INTO functionality (module_id, parent_id, name, url, description, order_index)
VALUES (5, 32, 'Básica', '#', 'Calculadora básica', 1);

-- 6.2 Cientifica
INSERT INTO functionality (module_id, parent_id, name, url, description, order_index)
VALUES (5, 32, 'Cientifica', '#', 'Calculadora científica', 2);

-- 6.3 Financeira
INSERT INTO functionality (module_id, parent_id, name, url, description, order_index)
VALUES (5, 32, 'Financeira', '#', 'Calculadora financeira', 3);

-- 6.4 Conversores
INSERT INTO functionality (module_id, parent_id, name, url, description, order_index)
VALUES (5, 32, 'Conversores', '#', 'Conversores de unidades', 4);

-- 7. Social (header)
INSERT INTO functionality (module_id, parent_id, name, url, description, order_index)
VALUES (6, NULL, 'Social', NULL, 'Módulo social', 7);

-- 7.1 Assistente Pessoal
INSERT INTO functionality (module_id, parent_id, name, url, description, order_index)
VALUES (6, 37, 'Assistente Pessoal', '#', 'Assistente pessoal', 1);

-- 7.2 Enquetes
INSERT INTO functionality (module_id, parent_id, name, url, description, order_index)
VALUES (6, 37, 'Enquetes', '#', 'Gestão de enquetes', 2);

-- 7.3 Pesquisas
INSERT INTO functionality (module_id, parent_id, name, url, description, order_index)
VALUES (6, 37, 'Pesquisas', '#', 'Gestão de pesquisas', 3);

-- 7.4 Sugestões
INSERT INTO functionality (module_id, parent_id, name, url, description, order_index)
VALUES (6, 37, 'Sugestões', '#', 'Sugestões de usuários', 4);

-- 8. Configurações (header)
INSERT INTO functionality (module_id, parent_id, name, url, description, order_index)
VALUES (7, NULL, 'Configurações', NULL, 'Módulo de configurações', 8);

-- 8.1 Perfil
INSERT INTO functionality (module_id, parent_id, name, url, description, order_index)
VALUES (7, 42, 'Perfil', 'profile', 'Perfil do usuário', 1);

-- 8.2 Funcionalidades
INSERT INTO functionality (module_id, parent_id, name, url, description, order_index)
VALUES (7, 42, 'Funcionalidades', 'config-functions-system', 'Configuração de funcionalidades', 2);

-- 8.3 IA
INSERT INTO functionality (module_id, parent_id, name, url, description, order_index)
VALUES (7, 42, 'IA', '#', 'Inteligência Artificial', 3);