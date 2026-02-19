-- ==============================================================================
-- SCRIPT DE CARGA INICIAL (SEED DATA)
-- Execute este script APÓS criar as tabelas para popular os domínios básicos.
-- ==============================================================================

USE ghz_life_AMBIENTE; -- Garante que está no banco certo

-- ------------------------------------------------------------------------------
-- 1. POPULANDO STATUS (sys_status)
-- Usados em todo o sistema (Usuários, Módulos, Tarefas)
-- ------------------------------------------------------------------------------
INSERT INTO sys_status (id, name) VALUES 
(1, 'Ativo'),
(2, 'Inativo'),
(3, 'Pendente'),
(4, 'Bloqueado'),
(5, 'Concluído'),  -- Útil para Tarefas
(6, 'Arquivado');  -- Útil para Tarefas
(7, 'Em breve');   -- Modulos e Funcionalidades que ainda serão lançados

-- ------------------------------------------------------------------------------
-- 2. POPULANDO GÊNEROS (sys_gender)
-- ------------------------------------------------------------------------------
INSERT INTO sys_gender (id, name) VALUES 
(1, 'Não Informado'),
(2, 'Masculino'),
(3, 'Feminino'),
(4, 'Outro');

-- ------------------------------------------------------------------------------
-- 4. POPULANDO PLANOS DE ASSINATURA (sys_subscription_plan)
-- ------------------------------------------------------------------------------
INSERT INTO sys_subscription_plan (id, name, description, price, expires_at) VALUES 
(1, 'Free', 'Plano gratuito básico', 0.00, 0), -- 0 = Vitalício ou sem expiração
(2, 'Mensal Premium', 'Acesso completo mensal', 29.90, 30),
(3, 'Anual Premium', 'Acesso completo anual com desconto', 299.00, 365);


-- ==============================================================================
-- 6. POPULANDO MÓDULOS (sys_module)
-- Apenas o ID 1 (Produtividade) está ATIVO (1). Os demais estão INATIVOS (2).
-- ==============================================================================
INSERT INTO sys_module (id, title, sys_status_id, icon, color, description) VALUES 
(1, 'Produtividade', 1, 'fas fa-list-check', 'indigo', 'Gestão de tarefas, metas e organização pessoal.'),
(2, 'Financeiro', 7, 'fas fa-wallet', 'emerald', 'Controle de gastos, entradas e planejamento.'),
(3, 'Saúde & Bem-estar', 7, 'fas fa-heartbeat', 'rose', 'Monitoramento corporal e hábitos saudáveis.'),
(4, 'Inteligência Artificial', 7, 'fas fa-brain', 'purple', 'Assistente virtual e insights inteligentes.'),
(5, 'Social', 7, 'fas fa-users', 'amber', 'Interações, eventos e comunidades.');

-- ==============================================================================
-- 7. POPULANDO FUNCIONALIDADES DO MÓDULO (sys_module_functionality)
-- ==============================================================================

-- --- MÓDULO 1: PRODUTIVIDADE (Ativo) ---
INSERT INTO sys_module_functionality (sys_module_id, title, sys_status_id, router_link, icon, description) VALUES 
(1, 'Tarefas Diárias', 1, '/tasks?type=DAILY', 'fas fa-check-double', 'Checklists de rotina'),
(1, 'Metas & Objetivos', 1, '/tasks?type=GOAL', 'fas fa-bullseye', 'Metas quantitativas'),
(1, 'Sonhos', 1, '/tasks?type=DREAM', 'fas fa-plane', 'Visão de longo prazo'),
(1, 'Listas de Compras', 1, '/tasks?type=SHOPPING', 'fas fa-cart-shopping', 'Controle de itens e valores'),
(1, 'Anotações', 1, '/tasks?type=NOTE', 'fas fa-sticky-note', 'Bloco de notas rápido');

-- --- MÓDULO 2: FINANCEIRO (Inativo - Status 7) ---
INSERT INTO sys_module_functionality (sys_module_id, title, sys_status_id, router_link, icon, description) VALUES 
(2, 'Movimentações', 7, '/finance', 'fas fa-money-bill-wave', 'Registro de entradas/saídas'),
(2, 'Categorias', 7, NULL, NULL, 'Agrupamento de gastos'),
(2, 'Cartões de Crédito', 7, NULL, NULL, 'Gestão de faturas'),
(2, 'Relatórios', 7, NULL, NULL, 'Gráficos mensais');

-- --- MÓDULO 3: SAÚDE (Inativo - Status 7) ---
INSERT INTO sys_module_functionality (sys_module_id, title, sys_status_id, router_link, icon, description) VALUES 
(3, 'Hidratação', 7, '/health', 'fas fa-glass-water', 'Meta de água diária'),
(3, 'Medicamentos', 7, '/health', 'fas fa-pills', 'Lembretes de hora em hora'),
(3, 'Consultas', 7, '/health', 'fas fa-user-doctor', 'Agenda médica'),
(3, 'Treinos', 7, NULL, NULL, 'Ficha de academia');

-- --- MÓDULO 4: IA (Inativo - Status 7) ---
INSERT INTO sys_module_functionality (sys_module_id, title, sys_status_id, router_link, icon, description) VALUES 
(4, 'Sugestões IA', 7, '/ia', 'fas fa-heart-pulse', 'Conversa e Dicas');

-- --- MÓDULO 5: SOCIAL (Inativo - Status 7) ---
INSERT INTO sys_module_functionality (sys_module_id, title, sys_status_id, router_link, icon, description) VALUES 
(5, 'Agenda Social', 7, '/social', 'far fa-calendar-alt', 'Calendário social'),
(5, 'Explorar', 7, '/social', 'far fa-compass', 'Descobrir novidades');