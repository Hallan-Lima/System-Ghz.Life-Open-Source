

-- ##START_SYS## Estrutura para criar as tabelas RELACIONADAS AO SYS (estrutura de sistema, funcionalidades, grupos e gêneros)

    -- Tabela que define os gêneros dos usuários. Exemplo: 'Masculino', 'Feminino', 'Outro
    CREATE TABLE sys_gender (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(30) NOT NULL UNIQUE
    );

    -- Tabela que define os status de um usuário no sistema. Exemplo: 'Ativo', 'Inativo', 'Pendente'
    CREATE TABLE sys_status (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(30) NOT NULL UNIQUE
    );

    -- Tabela de planos de assinatura, para controlar acesso a funcionalidades premium
    CREATE TABLE sys_subscription_plan (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(50) NOT NULL UNIQUE,
        description TEXT DEFAULT NULL,
        price DECIMAL(10,2) NOT NULL,
        expires_at DECIMAL(10,2) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

    -- Tabela que representa interesses ou hobbies, para personalizar a experiência do usuário
    CREATE TABLE sys_interest (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(50) NOT NULL UNIQUE,
        description TEXT DEFAULT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

    -- Tabela de módulos do sistema, para organizar funcionalidades
    CREATE TABLE sys_module (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(50) NOT NULL UNIQUE,
        sys_status_id INT NOT NULL, -- Referência ao status do módulo (ativo, inativo, etc.)
        sys_subscription_plan_id INT DEFAULT NULL,  -- Referência ao plano de assinatura necessário para
        icon VARCHAR(100) DEFAULT NULL,
        color VARCHAR(20) DEFAULT NULL,
        description TEXT DEFAULT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        deleted_at TIMESTAMP NULL
    );

    -- Tabela de funcionalidades, associada a módulos e com suporte a hierarquia de menus
    CREATE TABLE sys_module_functionality (
        id INT AUTO_INCREMENT PRIMARY KEY,
        sys_module_id INT NOT NULL, -- Referência ao módulo ao qual a funcionalidade pertence
        title VARCHAR(50) NOT NULL,
        sys_status_id INT NOT NULL, -- Referência ao status da funcionalidade (ativa, inativa, etc.)
        url VARCHAR(255) DEFAULT NULL, -- Pode ser null para menus sem ação direta
        sys_subscription_plan_id INT DEFAULT NULL,  -- Referência ao plano de assinatura necessário para acessar a funcionalidade
        icon VARCHAR(100) DEFAULT NULL,
        color VARCHAR(20) DEFAULT NULL,
        description TEXT DEFAULT NULL,
        router_link VARCHAR(255) DEFAULT NULL, -- Para uso em front-end, pode ser null para funcionalidades sem rota direta
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        deleted_at TIMESTAMP NULL,
        FOREIGN KEY (sys_module_id) REFERENCES sys_module(id),
        FOREIGN KEY (sys_subscription_plan_id) REFERENCES sys_subscription_plan(id),
        FOREIGN KEY (sys_status_id) REFERENCES sys_status(id)
    );

    -- Tabela de controle de Tokens de acesso, para gerenciar sessões e autenticação de usuários
    CREATE TABLE sys_user_token (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id BINARY(16) NOT NULL,  -- Referência ao usuário por UUID
        refresh_token VARCHAR(255) NOT NULL UNIQUE,
        expires_at DATETIME NOT NULL,
        created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME NULL ON UPDATE CURRENT_TIMESTAMP
        FOREIGN KEY (user_id) REFERENCES user(id)
    );

-- ##END_SYS## Estrutura para criar as tabelas RELACIONADAS AO SYS (estrutura de sistema, funcionalidades, grupos e gêneros)
-- ##START_USER## Estrutura para criar as tabelas relacionada ao usuário e suas associações

    -- Tabela principal dos usuários contendo dados pessoais e credenciais de acesso
    CREATE TABLE user (
        id BINARY(16) NOT NULL PRIMARY KEY,           -- Usar UUID para garantir unicidade global
        nickname VARCHAR(50) NOT NULL,
        password_hash VARCHAR(500) NOT NULL,        -- Aumentado para suportar hashes mais longos
        sys_gender_id INT NOT NULL,
        birthdate DATE NOT NULL,
        sys_status_id INT NOT NULL,
        sys_subscription_plan_id INT DEFAULT NULL,  -- Referência ao plano de assinatura do usuário (pode ser null para usuários sem plano)
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        deleted_at TIMESTAMP NULL,
        FOREIGN KEY (sys_gender_id) REFERENCES sys_gender(id),
        FOREIGN KEY (sys_status_id) REFERENCES sys_status(id)
    );  

    -- Tabela que armazena os e-mails de cada usuário, podendo indicar qual é o principal
    CREATE TABLE user_email (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id BINARY(16) NOT NULL,
        email VARCHAR(100) NOT NULL,
        is_primary BOOLEAN DEFAULT FALSE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,   -- Para registrar quando o e-mail foi adicionado
        deleted_at TIMESTAMP NULL,                   -- Para permitir marcação de e-mail como "removido" sem perder histórico (soft delete)
        FOREIGN KEY (user_id) REFERENCES user(id),
        UNIQUE (user_id, email)
    );

    -- Tabela que armazena os telefones dos usuários, com indicação do número principal
    CREATE TABLE user_phone (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id BINARY(16) NOT NULL,
        phone VARCHAR(20) NOT NULL,
        is_primary BOOLEAN DEFAULT FALSE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,    -- Para registrar quando o telefone foi adicionado
        deleted_at TIMESTAMP NULL,                    -- Para permitir marcação de telefone como "removido" sem perder histórico (soft delete)
        FOREIGN KEY (user_id) REFERENCES user(id),
        UNIQUE (user_id, phone)
    );

    -- Associação entre hobbies/interesses e usuários, para personalizar a experiência do usuário
    CREATE TABLE user_interest (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id BINARY(16) NOT NULL,
        sys_interest_id INT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,     -- Para registrar quando o interesse foi adicionado
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, -- Para registrar quando o interesse foi atualizado
        deleted_at TIMESTAMP NULL,                      -- Para permitir marcação de interesse como "removido" sem perder histórico (soft delete)
        FOREIGN KEY (user_id) REFERENCES user(id),
        FOREIGN KEY (sys_interest_id) REFERENCES sys_interest(id),
        UNIQUE (user_id, sys_interest_id)
    );
    

-- ##END_USER## Estrutura para criar as tabelas relacionada ao usuário e suas associações
-- ##START_N&N## Estrutura para criar as tabelas relacionada a Módulos e Funcionalidades da aplicação e usuário

    -- sys_module_user: Tabela de associação entre usuários e módulos, para controle de acesso baseado em módulos
    CREATE TABLE sys_module_functionality_user (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id  BINARY(16) NOT NULL,  -- Referência ao usuário por UUID
        sys_module_functionality_id INT DEFAULT NULL, -- Referência à funcionalidade específica (pode ser null para acesso geral ao módulo)
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,  -- Para registrar quando o acesso ao módulo foi concedido
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,  -- Para registrar quando o acesso foi atualizado
        deleted_at TIMESTAMP NULL,  -- Para permitir marcação de acesso como "removido" sem perder histórico (soft delete)
        FOREIGN KEY (sys_module_functionality_id) REFERENCES sys_module_functionality(id),
        FOREIGN KEY (user_id) REFERENCES user(id),
        UNIQUE (sys_module_functionality_id, user_id)  -- Garante que um usuário não tenha acesso à mesma funcionalidade mais de uma vez
    );

--- ##END_N&N## Estrutura para criar as tabelas relacionada a GROUP (grupos de usuários) e suas associações
-- ##START_MODULE_TASK## Estrutura para criar as tabelas relacionada a Módulos e Funcionalidades da aplicação

    CREATE TABLE app_tasks (
        id INT AUTO_INCREMENT PRIMARY KEY,
        sys_module_functionality_id INT NOT NULL, -- Referência à funcionalidade associada à tarefa (pode ser null para tarefas gerais)
        user_id BINARY(16) NOT NULL,
        title VARCHAR(255) NOT NULL,
        sys_status_id INT NOT NULL, -- Referência ao status da tarefa (ativa, concluída, arquivada, etc.)
        priority INT NOT NULL DEFAULT 0, -- 0 = Baixa
        content TEXT NULL,  -- Descrição detalhada da tarefa, pode ser null para tarefas simples
        notes TEXT NULL,    -- Campo para anotações adicionais, pode ser null
        tags JSON NULL,     -- Para armazenar tags ou categorias em formato JSON, pode ser null
        isPinned BOOLEAN DEFAULT FALSE, -- Para destacar tarefas importantes
        due_date DATETIME NULL, -- Data de vencimento da tarefa, pode ser null para tarefas sem prazo definido
        recurrence VARCHAR(50) NULL, -- Para tarefas recorrentes, pode ser null para tarefas únicas
        progress DECIMAL(5,2) DEFAULT 0.00, -- Para indicar o progresso da tarefa em porcentagem, pode ser null para tarefas sem acompanhamento de progresso
        target_value DECIMAL(18,2) NULL, -- Para metas, pode ser null para tarefas sem valor alvo
        current_value DECIMAL(18,2) NULL, -- Para metas, pode ser null para tarefas sem valor atual
        estimated_cost DECIMAL(18,2) NULL, -- Para tarefas de compras, pode ser null para tarefas sem custo estimado
        unit VARCHAR(20) NULL, -- Unidade de medida para metas ou compras, pode ser null para tarefas sem unidade
        created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME NULL ON UPDATE CURRENT_TIMESTAMP,
        deleted_at DATETIME NULL,
        FOREIGN KEY (sys_module_functionality_id) REFERENCES sys_module_functionality(id),
        FOREIGN KEY (user_id) REFERENCES user(id),
        FOREIGN KEY (sys_status_id) REFERENCES sys_status(id)
    );
--- ##END_MODULE_TASK## Estrutura para criar as tabelas relacionada a Módulos e Funcionalidades da aplicação






