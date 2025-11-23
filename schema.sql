-- ######################################################################
-- # ARQUIVO: schema.sql
-- # GLOBAL SOLUTION 2025/2 - O FUTURO DO TRABALHO (NexusLab/Nexio)
-- # OBJETIVO: Criar a estrutura básica do banco de dados relacional.
-- ######################################################################


-- 1. TABELA DE USUÁRIOS
-- Armazena os dados de cadastro e autenticação.
CREATE TABLE Usuario (
    usuario_id SERIAL PRIMARY KEY,    -- Chave Primária (Identificador único)
    rm INT UNIQUE NOT NULL,           -- Registro de Matrícula (Único)
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    senha_hash VARCHAR(255) NOT NULL, -- Armazenamento seguro da senha (hashed)
    perfil_acesso VARCHAR(20) DEFAULT 'USER' -- Ex: 'USER', 'ADMIN', 'EMPRESA'
);

-- 2. TABELA DE PERFIL COMPORTAMENTAL
-- Armazena o diagnóstico gerado pela IA a partir das interações (avaliações/vídeos).
CREATE TABLE PerfilComportamental (
    perfil_id SERIAL PRIMARY KEY,     -- Chave Primária
    usuario_id INT NOT NULL,
    data_avaliacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    tipo_perfil VARCHAR(50) NOT NULL, -- Ex: 'Analítico', 'Empreendedor', 'Criativo'
    escore_criatividade DECIMAL(4, 2),-- Métrica para habilidades humanas (0.00 a 10.00)
    escore_pensamento_critico DECIMAL(4, 2),
    
    -- Chave Estrangeira: Associa o perfil a um Usuário
    FOREIGN KEY (usuario_id) REFERENCES Usuario(usuario_id)
);

-- 3. TABELA DE TRILHAS DE CARREIRA
-- Armazena as recomendações de carreira compatíveis com o perfil.
CREATE TABLE TrilhaCarreira (
    trilha_id SERIAL PRIMARY KEY,     -- Chave Primária
    perfil_id INT NOT NULL,
    nome_carreira VARCHAR(100) NOT NULL, -- Ex: 'Especialista em Ética de IA', 'Green Tech Analyst'
    area_foco VARCHAR(50),
    data_recomendacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    -- Chave Estrangeira: Associa a trilha a um Perfil Comportamental
    FOREIGN KEY (perfil_id) REFERENCES PerfilComportamental(perfil_id)
);

-- 4. TABELA DE RECOMENDAÇÕES DE ESTUDO (UPSKILLING/RESKILLING)
-- Armazena os cursos ou skills necessários para a trilha de carreira.
CREATE TABLE RecomendacaoEstudo (
    recomendacao_id SERIAL PRIMARY KEY, -- Chave Primária
    trilha_id INT NOT NULL,
    nome_curso VARCHAR(150) NOT NULL,
    tipo_conteudo VARCHAR(50),          -- Ex: 'Nano Course', 'Bootcamp', 'Skill'
    link_acesso TEXT,
    
    -- Chave Estrangeira: Associa o estudo a uma Trilha de Carreira
    FOREIGN KEY (trilha_id) REFERENCES TrilhaCarreira(trilha_id)
);

-- 5. TABELA DE MONITORAMENTO DE BEM-ESTAR (Simulação IoT)
-- Armazena os dados simulados de sensores de bem-estar no ambiente de trabalho.
CREATE TABLE MonitoramentoBemEstar (
    monitoramento_id SERIAL PRIMARY KEY, -- Chave Primária
    usuario_id INT NOT NULL,
    timestamp_leitura TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    nivel_ruido_db DECIMAL(5, 2),        -- Dados de sensor de ruído
    nivel_stress_mockado INT,            -- Dados simulados de stress (0 a 100)
    
    -- Chave Estrangeira: Associa a leitura a um Usuário
    FOREIGN KEY (usuario_id) REFERENCES Usuario(usuario_id)
);
