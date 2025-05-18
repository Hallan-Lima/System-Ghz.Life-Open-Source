USE application;

-- ======================
-- FUNCTIONS
-- ======================


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




-- =====================
-- VIEWS
-- =====================

-- View que mostra o resumo de transações com nomes resolvidos
CREATE VIEW view_transaction_summary AS
SELECT 
    t.id AS transaction_id,
    g.name AS group_name,
    u.nickname AS user_nickname,
    a.name AS account_name,
    c.name AS category_name,
    ct.name AS category_type,
    tt.name AS transaction_type,
    t.value,
    t.description,
    t.performed_at,
    t.due_at,
    t.created_at
FROM `transaction` t
JOIN `group` g ON t.group_id = g.id
JOIN user u ON t.user_id = u.id
JOIN account a ON t.account_id = a.id
JOIN category c ON t.category_id = c.id
JOIN category_type ct ON c.type_id = ct.id
JOIN transaction_type tt ON t.transaction_type_id = tt.id;

-- View com saldo atual por conta
CREATE VIEW view_account_balances AS
SELECT 
    a.id AS account_id,
    a.name AS account_name,
    g.name AS group_name,
    a.balance,
    a.updated_at
FROM account a
JOIN `group` g ON a.group_id = g.id;

-- =====================
-- FUNCTIONS
-- =====================

-- Função para retornar o saldo atual de uma conta
DELIMITER //
CREATE FUNCTION get_account_balance(accountId INT) RETURNS DECIMAL(15,2)
DETERMINISTIC
READS SQL DATA
BEGIN
    DECLARE balance DECIMAL(15,2);
    SELECT a.balance INTO balance FROM account a WHERE a.id = accountId;
    RETURN balance;
END //
DELIMITER ;

-- =====================
-- PROCEDURES
-- =====================

-- Procedure para inserir uma nova transação e atualizar o saldo
DELIMITER //
CREATE PROCEDURE insert_transaction (
    IN p_group_id INT,
    IN p_user_id INT,
    IN p_account_id INT,
    IN p_category_id INT,
    IN p_transaction_type_id INT,
    IN p_value DECIMAL(15,2),
    IN p_description TEXT,
    IN p_installment_count INT,
    IN p_performed_at DATE,
    IN p_due_at DATE
)
BEGIN
    DECLARE current_balance DECIMAL(15,2);

    -- Inserir a transação
    INSERT INTO `transaction` (
        group_id, user_id, account_id, category_id, transaction_type_id,
        value, description, installment_count, performed_at, due_at
    ) VALUES (
        p_group_id, p_user_id, p_account_id, p_category_id, p_transaction_type_id,
        p_value, p_description, p_installment_count, p_performed_at, p_due_at
    );

    -- Atualizar o saldo da conta
    SELECT balance INTO current_balance FROM account WHERE id = p_account_id;

    UPDATE account 
    SET balance = current_balance + p_value
    WHERE id = p_account_id;

    -- Registrar no extrato
    INSERT INTO account_statement (account_id, transaction_id, balance_after)
    VALUES (
        p_account_id,
        LAST_INSERT_ID(),
        current_balance + p_value
    );
END //
DELIMITER ;
