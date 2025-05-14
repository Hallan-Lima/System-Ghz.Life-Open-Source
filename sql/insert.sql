-- =============================================
USE application;
-- =============================================


-- Gêneros de usuários
INSERT INTO gender (name) VALUES 
('Masculino'),
('Feminino'),
('Outro');

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
('Usuários', 'Gerenciamento de usuários e permissões'),
('Financeiro', 'Controle de contas, transações e categorias'),
('Relatórios', 'Emissão de relatórios financeiros');

-- Grupos de exemplo
INSERT INTO `group` (name, description) VALUES 
('Empresa Exemplo', 'Grupo padrão de uma empresa fictícia'),
('Família Silva', 'Grupo para controle financeiro familiar');
