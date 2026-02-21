USE ghz_life_AMBIENTE;

-- ==============================================================================
-- 1. VIEWS (LEITURA INTELIGENTE PARA O FRONTEND)
-- ==============================================================================

    -- ------------------------------------------------------------------------------
    -- 1.1. VIEW: SESSÃO DO USUÁRIO
    -- Retorna os dados do usuário logado formatados para o perfil
    -- ------------------------------------------------------------------------------
        CREATE OR REPLACE VIEW vw_user_session AS
        SELECT 
            -- Lógica manual BIN_TO_UUID
            LOWER(CONCAT(
                HEX(SUBSTR(u.id, 1, 4)), '-', 
                HEX(SUBSTR(u.id, 5, 2)), '-', 
                HEX(SUBSTR(u.id, 7, 2)), '-', 
                HEX(SUBSTR(u.id, 9, 2)), '-', 
                HEX(SUBSTR(u.id, 11, 6))
            )) AS user_id,
            u.nickname AS name,
            ue.email,
            CASE 
                WHEN u.sys_gender_id = 3 THEN 'fas fa-user-dress' 
                ELSE 'fas fa-user' 
            END AS avatarIcon,
            ssp.name AS plan_name,
            u.created_at AS member_since
        FROM user u
        JOIN user_email ue ON u.id = ue.user_id AND ue.is_primary = 1
        JOIN sys_subscription_plan ssp ON u.sys_subscription_plan_id = ssp.id;

    -- ------------------------------------------------------------------------------
    -- 1.2. VIEW: TAREFAS
    -- Mapeia a tabela app_tasks para a interface Task do Frontend
    -- ------------------------------------------------------------------------------
        CREATE OR REPLACE VIEW vw_app_tasks_board AS
        SELECT 
            t.id,
            -- Lógica manual BIN_TO_UUID
            LOWER(CONCAT(
                HEX(SUBSTR(t.user_id, 1, 4)), '-', 
                HEX(SUBSTR(t.user_id, 5, 2)), '-', 
                HEX(SUBSTR(t.user_id, 7, 2)), '-', 
                HEX(SUBSTR(t.user_id, 9, 2)), '-', 
                HEX(SUBSTR(t.user_id, 11, 6))
            )) AS user_id,
            t.title,
            IF(t.sys_status_id = 5, TRUE, FALSE) AS completed,
            CASE 
                WHEN t.priority >= 2 THEN 'HIGH'
                WHEN t.priority = 1 THEN 'MEDIUM'
                ELSE 'LOW'
            END AS priority,
            UPPER(SUBSTRING_INDEX(smf.router_link, '=', -1)) AS type,
            t.content,
            t.due_date AS dueDate,
            t.progress,
            t.target_value AS targetValue,
            t.current_value AS currentValue,
            t.estimated_cost AS estimatedCost,
            t.tags
        FROM app_tasks t
        JOIN sys_module_functionality smf ON t.sys_module_functionality_id = smf.id
        WHERE t.deleted_at IS NULL;

    -- ------------------------------------------------------------------------------
    -- 1.3. VIEW: MÓDULOS E FEATURES
    -- Ajuda a montar o menu lateral dinamicamente
    -- ------------------------------------------------------------------------------
        CREATE OR REPLACE VIEW vw_system_modules AS
        SELECT 
            sm.id AS module_id,
            sm.title AS module_title,
            sm.icon AS module_icon,
            sm.color AS module_color,
            IF(sm.sys_status_id = 1, TRUE, FALSE) AS module_enabled,
            sm.description AS module_desc,
            stm.name as module_status,
            smf.id AS feature_id,
            smf.title AS feature_label,
            smf.description AS feature_desc,
            smf.icon AS feature_icon,
            smf.router_link AS feature_route,
            IF(smf.sys_status_id = 1, TRUE, FALSE) AS feature_enabled,
            stf.name AS feature_status
        FROM sys_module sm
        LEFT JOIN sys_module_functionality smf ON sm.id = smf.sys_module_id
        LEFT JOIN sys_status stm ON stm.id = sm.sys_status_id
        LEFT JOIN sys_status stf ON stf.id = smf.sys_status_id
        ORDER BY sm.id, smf.id;

-- ==============================================================================
-- 2. PROCEDURES (AÇÕES E ESCRITA)
-- ==============================================================================

    DELIMITER $$
    -- ------------------------------------------------------------------------------
    -- 2.1. CRIAR USUÁRIO (Cadastro)
    -- Cria User, Email e Permissões Iniciais em Transação
    -- ------------------------------------------------------------------------------
        DROP PROCEDURE IF EXISTS sp_register_complete_user$$

        CREATE PROCEDURE sp_register_complete_user(
            -- Dados Pessoais
            IN p_nickname VARCHAR(50),
            IN p_password_hash VARCHAR(500),
            IN p_gender_id INT,
            IN p_birthdate DATE,
            
            -- Dados de Contato
            IN p_email VARCHAR(100),
            
            -- Permissões
            IN p_functionality_ids JSON, 
            
            -- Retornos
            OUT p_new_uuid VARCHAR(36),
            OUT p_generated_token VARCHAR(255)
        )
        BEGIN
            -- Variáveis
            DECLARE v_user_bin BINARY(16);
            DECLARE v_uuid_str VARCHAR(36);
            DECLARE v_token_str VARCHAR(255);
            DECLARE v_email_check INT;
            
            -- Variáveis para Loop JSON (MariaDB)
            DECLARE v_json_count INT DEFAULT 0;
            DECLARE v_i INT DEFAULT 0;
            DECLARE v_func_val VARCHAR(10);

            -- Tratamento de Erro
            DECLARE EXIT HANDLER FOR SQLEXCEPTION
            BEGIN
                ROLLBACK;
                RESIGNAL; 
            END;
            
            -- 2. Gerar UUID e Token
            SET v_uuid_str = UUID(); 
            SET v_user_bin = UNHEX(REPLACE(v_uuid_str, '-', ''));
            SET v_token_str = SHA2(CONCAT(v_uuid_str, RAND(), NOW()), 256);
            
            -- Outputs
            SET p_new_uuid = v_uuid_str;
            SET p_generated_token = v_token_str;

            START TRANSACTION;

                -- A. Insert na Tabela User
                -- sys_status_id = 1 (Ativo)
                -- sys_subscription_plan_id = 1 (Free)
                INSERT INTO user (
                    id, nickname, password_hash, sys_gender_id, birthdate, 
                    sys_status_id, sys_subscription_plan_id
                ) VALUES (
                    v_user_bin, p_nickname, p_password_hash, p_gender_id, p_birthdate, 
                    1, 1
                );

                -- B. Insert Email
                INSERT INTO user_email (user_id, email, is_primary) 
                VALUES (v_user_bin, p_email, TRUE);

                -- C. Insert Token
                INSERT INTO sys_user_token (user_id, refresh_token, expires_at) 
                VALUES (v_user_bin, v_token_str, DATE_ADD(NOW(), INTERVAL 30 DAY));

                -- D. Insert Permissões (Loop JSON)
                IF p_functionality_ids IS NOT NULL THEN
                    SET v_json_count = JSON_LENGTH(p_functionality_ids);
                    SET v_i = 0;

                    WHILE v_i < v_json_count DO
                        SET v_func_val = JSON_UNQUOTE(JSON_EXTRACT(p_functionality_ids, CONCAT('$[', v_i, ']')));
                        
                        IF v_func_val IS NOT NULL AND v_func_val != 'null' AND v_func_val != '0' THEN
                            INSERT INTO sys_module_functionality_user (user_id, sys_module_functionality_id)
                            VALUES (v_user_bin, CAST(v_func_val AS UNSIGNED));
                        END IF;

                        SET v_i = v_i + 1;
                    END WHILE;
                END IF;

            COMMIT;
        END$$

    -- ------------------------------------------------------------------------------
    -- 2.2. AUTENTICAR LOGIN (Para o Backend)
    -- Busca o hash da senha pelo e-mail para o backend comparar
    -- ------------------------------------------------------------------------------
        DROP PROCEDURE IF EXISTS sp_auth_login$$

        CREATE PROCEDURE sp_auth_login(
            IN p_email VARCHAR(100)
        )
        BEGIN
            -- Retorna os dados sensíveis APENAS para o backend validar a senha
            SELECT 
                -- Lógica manual BIN_TO_UUID
                LOWER(CONCAT(
                    HEX(SUBSTR(u.id, 1, 4)), '-', 
                    HEX(SUBSTR(u.id, 5, 2)), '-', 
                    HEX(SUBSTR(u.id, 7, 2)), '-', 
                    HEX(SUBSTR(u.id, 9, 2)), '-', 
                    HEX(SUBSTR(u.id, 11, 6))
                )) AS user_id,
                u.nickname,
                u.sys_status_id,
                u.password_hash
            FROM user u
            JOIN user_email ue ON u.id = ue.user_id
            WHERE ue.email = p_email
            AND u.deleted_at IS NULL
            LIMIT 1;
        END$$

    -- ------------------------------------------------------------------------------
    -- 2.3. CRIAR TAREFA (Simplificado)
    -- ------------------------------------------------------------------------------
        DROP PROCEDURE IF EXISTS sp_task_create$$

        CREATE PROCEDURE sp_task_create(
            IN p_user_uuid VARCHAR(36),
            IN p_type_code VARCHAR(50), -- Ex: 'DAILY', 'GOAL', 'NOTE'
            IN p_title VARCHAR(255),
            IN p_priority INT           -- 0=Low, 1=Medium, 2=High
        )
        BEGIN
            DECLARE v_user_bin BINARY(16);
            DECLARE v_func_id INT;
            
            -- 1. Conversão Manual de UUID (Compatível MariaDB)
            SET v_user_bin = UNHEX(REPLACE(p_user_uuid, '-', ''));
            
            -- 2. Descobre o ID da funcionalidade
            -- Ele busca onde o link contém "type=DAILY" (ou o código passado)
            SELECT id INTO v_func_id 
            FROM sys_module_functionality 
            WHERE router_link LIKE CONCAT('%type=', p_type_code) 
            LIMIT 1;
            
            -- 3. Inserção
            IF v_func_id IS NOT NULL THEN
                INSERT INTO app_tasks (
                    sys_module_functionality_id, 
                    user_id, 
                    title, 
                    sys_status_id, 
                    priority
                ) VALUES (
                    v_func_id, 
                    v_user_bin, 
                    p_title, 
                    3, -- 3 = Pendente (Padrão)
                    p_priority
                );
            ELSE
                SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Tipo de tarefa inválido (Código não encontrado no router_link).';
            END IF;
        END$$

    -- ------------------------------------------------------------------------------
    -- 2.4. ATIVAR/DESATIVAR MÓDULO OU FUNCIONALIDADE PARA O USUÁRIO
    -- Permite que o usuário ative (1) ou desative (0) permissões na sua conta
    -- ------------------------------------------------------------------------------
        DROP PROCEDURE IF EXISTS sp_toggle_user_module_functionality$$

        CREATE PROCEDURE sp_toggle_user_module_functionality(
            IN p_user_uuid VARCHAR(36),      
            IN p_module_id INT,              
            IN p_functionality_id INT,       
            IN p_is_active BOOLEAN           
        )
        BEGIN
            DECLARE v_user_bin BINARY(16);

            -- Tratamento de Erro e Rollback automático em caso de falha
            DECLARE EXIT HANDLER FOR SQLEXCEPTION
            BEGIN
                ROLLBACK;
                RESIGNAL; 
            END;

            SET v_user_bin = UNHEX(REPLACE(p_user_uuid, '-', ''));

            START TRANSACTION;

            IF p_is_active = TRUE THEN
                -- LÓGICA DE ATIVAÇÃO
                IF p_functionality_id IS NOT NULL AND p_functionality_id > 0 THEN
                    INSERT INTO sys_module_functionality_user (user_id, sys_module_functionality_id, deleted_at)
                    VALUES (v_user_bin, p_functionality_id, NULL)
                    ON DUPLICATE KEY UPDATE deleted_at = NULL;
                    
                ELSEIF p_module_id IS NOT NULL AND p_module_id > 0 THEN
                    INSERT INTO sys_module_functionality_user (user_id, sys_module_functionality_id, deleted_at)
                    SELECT v_user_bin, id, NULL
                    FROM sys_module_functionality
                    WHERE sys_module_id = p_module_id
                    ON DUPLICATE KEY UPDATE deleted_at = NULL;
                END IF;

            ELSE
                -- LÓGICA DE DESATIVAÇÃO (Soft Delete)
                IF p_functionality_id IS NOT NULL AND p_functionality_id > 0 THEN
                    UPDATE sys_module_functionality_user
                    SET deleted_at = CURRENT_TIMESTAMP
                    WHERE user_id = v_user_bin 
                    AND sys_module_functionality_id = p_functionality_id
                    AND deleted_at IS NULL;
                    
                ELSEIF p_module_id IS NOT NULL AND p_module_id > 0 THEN
                    UPDATE sys_module_functionality_user smfu
                    JOIN sys_module_functionality smf ON smfu.sys_module_functionality_id = smf.id
                    SET smfu.deleted_at = CURRENT_TIMESTAMP
                    WHERE smfu.user_id = v_user_bin 
                    AND smf.sys_module_id = p_module_id
                    AND smfu.deleted_at IS NULL;
                END IF;

            END IF;

            COMMIT;

            -- =========================================================================
            -- RETORNO: Chama a procedure de listagem para devolver o estado atualizado
            -- =========================================================================
            CALL sp_get_user_modules(p_user_uuid);

        END$$
    
    -- ------------------------------------------------------------------------------
    -- 2.5: BUSCAR MÓDULOS E FUNCIONALIDADES DO USUÁRIO
    -- Retorna a lista completa baseada na View, mas com as flags 
    -- 'module_enabled' e 'feature_enabled' fiéis ao que o usuário ativou/desativou.
    -- ------------------------------------------------------------------------------
        DROP PROCEDURE IF EXISTS sp_get_user_modules$$

        CREATE PROCEDURE sp_get_user_modules(
            IN p_user_uuid VARCHAR(36)
        )
        BEGIN
            DECLARE v_user_bin BINARY(16);
            
            -- Se o UUID for passado vazio ou nulo, apenas retorna vazio
            IF p_user_uuid IS NULL OR p_user_uuid = '' THEN
                SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'O UUID do usuário é obrigatório.';
            END IF;

            SET v_user_bin = UNHEX(REPLACE(p_user_uuid, '-', ''));

            SELECT 
                sm.id AS module_id,
                sm.title AS module_title,
                sm.icon AS module_icon,
                sm.color AS module_color,
                
                -- O módulo é considerado ATIVO se o usuário tiver PELO MENOS UMA feature dele ativa
                IF((
                    SELECT COUNT(1) 
                    FROM sys_module_functionality_user smfu2
                    JOIN sys_module_functionality smf2 ON smfu2.sys_module_functionality_id = smf2.id
                    WHERE smf2.sys_module_id = sm.id 
                    AND smfu2.user_id = v_user_bin 
                    AND smfu2.deleted_at IS NULL
                ) > 0, 1, 0) AS module_enabled,
                
                sm.description AS module_desc,
                stm.name AS module_status,
                smf.id AS feature_id,
                smf.title AS feature_label,
                smf.description AS feature_desc,
                smf.icon AS feature_icon,
                smf.router_link AS feature_route,
                
                -- A feature é considerada ATIVA se existir vínculo na tabela e o deleted_at for NULL
                IF(smfu.id IS NOT NULL, 1, 0) AS feature_enabled,
                stf.name AS feature_status
                
            FROM sys_module sm
            LEFT JOIN sys_module_functionality smf ON sm.id = smf.sys_module_id
            LEFT JOIN sys_status stm ON stm.id = sm.sys_status_id
            LEFT JOIN sys_status stf ON stf.id = smf.sys_status_id
            
            -- Fazemos o LEFT JOIN com a tabela do usuário para pegar apenas o que ele tem ativo
            LEFT JOIN sys_module_functionality_user smfu 
                ON smfu.sys_module_functionality_id = smf.id 
                AND smfu.user_id = v_user_bin 
                AND smfu.deleted_at IS NULL
                
            ORDER BY sm.id, smf.id;
        END$$
    
    DELIMITER ;

-- ==============================================================================
-- 3. TRIGGERS (AUTOMAÇÃO DE REGRAS)
-- ==============================================================================

    DELIMITER $$

    -- 3.1. Ao Concluir Tarefa -> Progresso = 100%
    CREATE TRIGGER trg_task_auto_complete
    BEFORE UPDATE ON app_tasks
    FOR EACH ROW
    BEGIN
        -- Se mudou status para 5 (Concluído), define 100%
        IF NEW.sys_status_id = 5 AND OLD.sys_status_id != 5 THEN
            SET NEW.progress = 100.00;
            SET NEW.current_value = NEW.target_value; -- Se for meta, atinge o alvo
        END IF;

        -- Se setou 100% de progresso, muda status para 5
        IF NEW.progress = 100.00 AND OLD.progress != 100.00 THEN
            SET NEW.sys_status_id = 5;
        END IF;
    END$$

    DELIMITER ;