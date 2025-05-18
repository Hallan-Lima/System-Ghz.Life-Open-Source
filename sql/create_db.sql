-- Criação do banco de dados e uso do mesmo
DROP DATABASE IF EXISTS application;
CREATE DATABASE IF NOT EXISTS application CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE application;

-- Tabela que armazena os gêneros possíveis para um usuário. Exemplo: 'Masculino', 'Feminino', 'Outro'
CREATE TABLE gender (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(20) NOT NULL UNIQUE
);

-- Tabela que define os status de um usuário no sistema. Exemplo: 'Ativo', 'Inativo', 'Pendente'
CREATE TABLE user_status (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(30) NOT NULL UNIQUE
);

-- Tabela que define os níveis de acesso de um usuário. Exemplo: 'Administrador', 'Usuário', 'Convidado'
CREATE TABLE user_level (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(30) NOT NULL UNIQUE
);

-- Tabela que representa um grupo de usuários. Pode ser uma empresa, família, etc.
CREATE TABLE `group` (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    description TEXT DEFAULT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP NULL
);

-- Tipos de categoria financeira (ex: receita, despesa, transferência)
CREATE TABLE category_type (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(20) NOT NULL UNIQUE
);

-- Tipos de transações financeiras (ex: pagamento, recebimento, cartão de crédito)
CREATE TABLE transaction_type (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL UNIQUE
);

-- Representa módulos do sistema, utilizados para organizar funcionalidades
CREATE TABLE module (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL UNIQUE,
    description TEXT DEFAULT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Funcionalidades dentro dos módulos, agora com suporte a menus e submenus hierárquicos
CREATE TABLE functionality (
    id INT AUTO_INCREMENT PRIMARY KEY,
    module_id INT NOT NULL,
    parent_id INT DEFAULT NULL, -- Referência para o menu pai (null = menu principal)
    name VARCHAR(50) NOT NULL,
    url VARCHAR(255) DEFAULT NULL, -- Pode ser null para menus sem ação direta
    description TEXT DEFAULT NULL,
    order_index INT DEFAULT 0, -- Para ordenar menus e submenus
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (module_id) REFERENCES module(id),
    FOREIGN KEY (parent_id) REFERENCES functionality(id)
);

-- Tabela principal dos usuários contendo dados pessoais e credenciais de acesso
CREATE TABLE user (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nickname VARCHAR(50) NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    gender_id INT DEFAULT NULL,
    birthdate DATE DEFAULT NULL,
    status_id INT DEFAULT NULL,
    level_id INT DEFAULT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP NULL,
    FOREIGN KEY (gender_id) REFERENCES gender(id),
    FOREIGN KEY (status_id) REFERENCES user_status(id),
    FOREIGN KEY (level_id) REFERENCES user_level(id)
);



-- Tabela que armazena os e-mails de cada usuário, podendo indicar qual é o principal
CREATE TABLE user_email (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    email VARCHAR(100) NOT NULL,
    is_primary BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES user(id),
    UNIQUE (user_id, email)
);

-- Tabela que armazena os telefones dos usuários, com indicação do número principal
CREATE TABLE user_phone (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    phone VARCHAR(20) NOT NULL,
    is_primary BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES user(id),
    UNIQUE (user_id, phone)
);

-- Histórico de senhas do usuário para fins de auditoria e segurança
CREATE TABLE user_password_history (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    changed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES user(id)
);

-- Associação entre usuários e grupos, com possibilidade de designar administradores
CREATE TABLE group_user (
    id INT AUTO_INCREMENT PRIMARY KEY,
    group_id INT NOT NULL,
    user_id INT NOT NULL,
    is_admin BOOLEAN DEFAULT FALSE,
    invited_by INT DEFAULT NULL,
    joined_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (group_id) REFERENCES `group`(id),
    FOREIGN KEY (user_id) REFERENCES user(id),
    FOREIGN KEY (invited_by) REFERENCES user(id),
    UNIQUE (group_id, user_id)
);


-- Permissões de acesso do usuário por funcionalidade: leitura, criação, atualização, exclusão
CREATE TABLE user_functionality (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    functionality_id INT NOT NULL,
    can_read BOOLEAN DEFAULT FALSE,
    can_create BOOLEAN DEFAULT FALSE,
    can_update BOOLEAN DEFAULT FALSE,
    can_delete BOOLEAN DEFAULT FALSE,
    granted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    granted_by INT DEFAULT NULL,
    FOREIGN KEY (user_id) REFERENCES user(id),
    FOREIGN KEY (functionality_id) REFERENCES functionality(id),
    FOREIGN KEY (granted_by) REFERENCES user(id)
);

-- Contas financeiras vinculadas a um grupo (ex: conta corrente, carteira, etc.)
CREATE TABLE account (
    id INT AUTO_INCREMENT PRIMARY KEY,
    group_id INT NOT NULL,
    name VARCHAR(50) NOT NULL,
    description TEXT DEFAULT NULL,
    balance DECIMAL(15,2) DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP NULL,
    FOREIGN KEY (group_id) REFERENCES `group`(id)
);


-- Categorias financeiras definidas por grupo (ex: alimentação, salário, transporte)
CREATE TABLE category (
    id INT AUTO_INCREMENT PRIMARY KEY,
    group_id INT DEFAULT NULL,
    name VARCHAR(50) NOT NULL,
    type_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (group_id) REFERENCES `group`(id),
    FOREIGN KEY (type_id) REFERENCES category_type(id),
    UNIQUE (group_id, name, type_id)
);

-- Etiquetas que podem ser associadas às transações para facilitar a busca e classificação
CREATE TABLE tag (
    id INT AUTO_INCREMENT PRIMARY KEY,
    group_id INT NOT NULL,
    name VARCHAR(30) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (group_id) REFERENCES `group`(id),
    UNIQUE (group_id, name)
);



-- Registro de movimentações financeiras com valor, data, categoria, e tipo
CREATE TABLE `transaction` (
    id INT AUTO_INCREMENT PRIMARY KEY,
    group_id INT NOT NULL,
    user_id INT NOT NULL,
    account_id INT NOT NULL,
    category_id INT NOT NULL,
    transaction_type_id INT NOT NULL,
    value DECIMAL(15,2) NOT NULL,
    description TEXT DEFAULT NULL,
    installment_count INT DEFAULT 1,
    performed_at DATE DEFAULT NULL,
    due_at DATE DEFAULT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP NULL,
    FOREIGN KEY (group_id) REFERENCES `group`(id),
    FOREIGN KEY (user_id) REFERENCES user(id),
    FOREIGN KEY (account_id) REFERENCES account(id),
    FOREIGN KEY (category_id) REFERENCES category(id),
    FOREIGN KEY (transaction_type_id) REFERENCES transaction_type(id)
);

-- Controle de recorrência para transações agendadas ou periódicas
CREATE TABLE transaction_recurrence (
    id INT AUTO_INCREMENT PRIMARY KEY,
    transaction_id INT NOT NULL,
    recurrence_type_id INT NOT NULL,
    interval_days INT DEFAULT NULL,
    next_run DATE DEFAULT NULL,
    end_date DATE DEFAULT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    is_active BOOLEAN DEFAULT TRUE,
    FOREIGN KEY (transaction_id) REFERENCES `transaction`(id),
    FOREIGN KEY (recurrence_type_id) REFERENCES transaction_type(id)
);

-- Associação N:N entre transações e etiquetas (tags)
CREATE TABLE transaction_tag (
    transaction_id INT NOT NULL,
    tag_id INT NOT NULL,
    PRIMARY KEY (transaction_id, tag_id),
    FOREIGN KEY (transaction_id) REFERENCES `transaction`(id),
    FOREIGN KEY (tag_id) REFERENCES tag(id)
);

-- Histórico de saldo das contas após cada transação, utilizado para fins de auditoria
CREATE TABLE account_statement (
    id INT AUTO_INCREMENT PRIMARY KEY,
    account_id INT NOT NULL,
    transaction_id INT NOT NULL,
    balance_after DECIMAL(15,2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (account_id) REFERENCES account(id),
    FOREIGN KEY (transaction_id) REFERENCES `transaction`(id)
);
