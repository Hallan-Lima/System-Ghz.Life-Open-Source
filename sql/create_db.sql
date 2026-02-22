DROP DATABASE IF EXISTS ghz_life_AMBIENTE;

-- ==============================================================================
-- SCRIPT DE CRIAÇÃO DO BANCO DE DADOS
-- Versão: 1.0
-- Estrutura: UUID Binário (Otimizado), RBAC Simples, Multi-plataforma
-- ==============================================================================

-- Criar o Banco de Dados com suporte total a caracteres (UTF-8 MB4)
CREATE DATABASE IF NOT EXISTS ghz_life_AMBIENTE
CHARACTER SET utf8mb4
COLLATE utf8mb4_unicode_ci;
USE ghz_life_AMBIENTE;
SET default_storage_engine = InnoDB;
SET FOREIGN_KEY_CHECKS = 0;

-- ==============================================================================
-- TABELAS DE ESTRUTURA DO SISTEMA
-- ==============================================================================

-- ##START_SYS## 
    -- ESTRUTURA DE SISTEMA (Domínios, Configurações e Catálogos)

    -- 1. Gêneros
    CREATE TABLE sys_gender (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(30) NOT NULL UNIQUE
    );

    -- 2. Status (Usado globalmente: Usuários, Módulos, Tarefas)
    CREATE TABLE sys_status (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(30) NOT NULL UNIQUE
    );

    -- 3. Planos de Assinatura
    CREATE TABLE sys_subscription_plan (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(50) NOT NULL UNIQUE,
        description TEXT DEFAULT NULL,
        price DECIMAL(10,2) NOT NULL,
        expires_at DECIMAL(10,2) NOT NULL, -- Duração em dias ou meses (definir na lógica)
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

    -- 4. Interesses / Hobbies (Catálogo)
    -- UTILIZAR EM FUTURAS VERSÕES
    --  CREATE TABLE sys_interest (
    --     id INT AUTO_INCREMENT PRIMARY KEY,
    --     name VARCHAR(50) NOT NULL UNIQUE,
    --     description TEXT DEFAULT NULL,
    --     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    -- );

    -- 6. Módulos do Sistema (Agrupadores de funcionalidades)
    CREATE TABLE sys_module (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(50) NOT NULL UNIQUE,
        sys_status_id INT NOT NULL,
        sys_subscription_plan_id INT DEFAULT NULL,
        icon VARCHAR(100) DEFAULT NULL,
        color VARCHAR(20) DEFAULT NULL,
        description TEXT DEFAULT NULL,
        router_link VARCHAR(255) DEFAULT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        deleted_at TIMESTAMP NULL,
        FOREIGN KEY (sys_status_id) REFERENCES sys_status(id),
        FOREIGN KEY (sys_subscription_plan_id) REFERENCES sys_subscription_plan(id)
    );

    -- 7. Funcionalidades dos Módulos (Telas, Menus, Ações)
    CREATE TABLE sys_module_functionality (
        id INT AUTO_INCREMENT PRIMARY KEY,
        sys_module_id INT NOT NULL,
        title VARCHAR(50) NOT NULL,
        sys_status_id INT NOT NULL,
        url VARCHAR(255) DEFAULT NULL,
        sys_subscription_plan_id INT DEFAULT NULL,
        icon VARCHAR(100) DEFAULT NULL,
        color VARCHAR(20) DEFAULT NULL,
        description TEXT DEFAULT NULL,
        router_link VARCHAR(255) DEFAULT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        deleted_at TIMESTAMP NULL,
        FOREIGN KEY (sys_module_id) REFERENCES sys_module(id),
        FOREIGN KEY (sys_subscription_plan_id) REFERENCES sys_subscription_plan(id),
        FOREIGN KEY (sys_status_id) REFERENCES sys_status(id)
    );

-- ##END_SYS##


-- ##START_USER## 
    -- ESTRUTURA DO USUÁRIO
    -- Tabelas que armazenam dados de quem utiliza o sistema.

    -- 8. Tabela Mestra de Usuários
    CREATE TABLE user (
        id BINARY(16) NOT NULL PRIMARY KEY, -- UUID v7 ou v4 Binário
        nickname VARCHAR(50) NOT NULL,
        password_hash VARCHAR(500) NOT NULL,
        sys_gender_id INT NOT NULL,
        birthdate DATE NOT NULL,
        sys_status_id INT NOT NULL,
        sys_subscription_plan_id INT DEFAULT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        deleted_at TIMESTAMP NULL,
        FOREIGN KEY (sys_gender_id) REFERENCES sys_gender(id),
        FOREIGN KEY (sys_status_id) REFERENCES sys_status(id),
        FOREIGN KEY (sys_subscription_plan_id) REFERENCES sys_subscription_plan(id)
    );

    -- 9. Autenticação (Refresh Tokens)
    CREATE TABLE sys_user_token (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id BINARY(16) NOT NULL,
        refresh_token VARCHAR(255) NOT NULL UNIQUE,
        expires_at DATETIME NOT NULL,
        created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME NULL ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES user(id)
    );

    -- 10. E-mails do Usuário
    CREATE TABLE user_email (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id BINARY(16) NOT NULL,
        email VARCHAR(100) NOT NULL,
        is_primary BOOLEAN DEFAULT FALSE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        deleted_at TIMESTAMP NULL,
        FOREIGN KEY (user_id) REFERENCES user(id),
        UNIQUE (user_id, email)
    );

    -- 11. Telefones do Usuário
    CREATE TABLE user_phone (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id BINARY(16) NOT NULL,
        phone VARCHAR(20) NOT NULL,
        is_primary BOOLEAN DEFAULT FALSE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        deleted_at TIMESTAMP NULL,
        FOREIGN KEY (user_id) REFERENCES user(id),
        UNIQUE (user_id, phone)
    );

    -- 12. Interesses do Usuário (N:N)
    -- TODO: TALVEZ UTILIZAR EM FUTURAS VERSÕES
    -- CREATE TABLE user_interest (
    --     id INT AUTO_INCREMENT PRIMARY KEY,
    --     user_id BINARY(16) NOT NULL,
    --     sys_interest_id INT NOT NULL,
    --     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    --     updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    --     deleted_at TIMESTAMP NULL,
    --     FOREIGN KEY (user_id) REFERENCES user(id),
    --     FOREIGN KEY (sys_interest_id) REFERENCES sys_interest(id),
    --     UNIQUE (user_id, sys_interest_id)
    -- );

-- ##END_USER##


-- ##START_RELATIONS## 
    -- RELACIONAMENTOS ESPECÍFICOS (Permissões e Vínculos de Módulo)

    -- 13. Permissões Específicas por Usuário (Exceções ou vínculos diretos)
    CREATE TABLE sys_module_functionality_user (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id BINARY(16) NOT NULL,
        sys_module_functionality_id INT DEFAULT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        deleted_at TIMESTAMP NULL,
        FOREIGN KEY (sys_module_functionality_id) REFERENCES sys_module_functionality(id),
        FOREIGN KEY (user_id) REFERENCES user(id),
        UNIQUE (sys_module_functionality_id, user_id)
    );

-- ##END_RELATIONS##


-- ##START_MODULE_TASK## 
    -- MÓDULO DE TAREFAS

    -- 14. Tarefas e Metas
    CREATE TABLE app_tasks (
        id INT AUTO_INCREMENT PRIMARY KEY,
        sys_module_functionality_id INT NOT NULL, -- Vincula a tarefa à funcionalidade "Tarefas" ou "Metas"
        user_id BINARY(16) NOT NULL,
        title VARCHAR(255) NOT NULL,
        sys_status_id INT NOT NULL, -- Status: Pendente, Concluído, etc.
        priority INT NOT NULL DEFAULT 0,
        content TEXT NULL,
        notes TEXT NULL,
        tags JSON NULL, -- Tags flexíveis (Ex: ["urgente", "pessoal"])
        isPinned BOOLEAN DEFAULT FALSE,
        due_date DATETIME NULL,
        recurrence VARCHAR(50) NULL, -- Ex: 'daily', 'weekly', 'cron_format'
        progress DECIMAL(5,2) DEFAULT 0.00,
        target_value DECIMAL(18,2) NULL, -- Para metas financeiras ou numéricas
        current_value DECIMAL(18,2) NULL,
        estimated_cost DECIMAL(18,2) NULL,
        unit VARCHAR(20) NULL, -- 'R$', 'km', 'kg'
        created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME NULL ON UPDATE CURRENT_TIMESTAMP,
        deleted_at DATETIME NULL,
        FOREIGN KEY (sys_module_functionality_id) REFERENCES sys_module_functionality(id),
        FOREIGN KEY (user_id) REFERENCES user(id),
        FOREIGN KEY (sys_status_id) REFERENCES sys_status(id)
    );

-- ##END_MODULE_TASK##

SET FOREIGN_KEY_CHECKS = 1;


