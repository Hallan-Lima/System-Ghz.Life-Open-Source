-- Migration: Adicionar first_name e last_name na tabela user
-- Data: 2026-03-02

USE ghz_life_AMBIENTE;

-- Adiciona a coluna first_name logo após nickname
ALTER TABLE user 
ADD COLUMN first_name VARCHAR(100) DEFAULT NULL AFTER nickname;

-- Adiciona a coluna last_name logo após first_name
ALTER TABLE user 
ADD COLUMN last_name VARCHAR(100) DEFAULT NULL AFTER first_name;
