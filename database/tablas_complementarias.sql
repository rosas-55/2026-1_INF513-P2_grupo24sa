-- ============================================
-- SCRIPT COMPLEMENTARIO — Proyecto INF-513
-- Tablas necesarias para cumplir TODOS los
-- requisitos del proyecto.
--
-- EJECUTAR CONTRA: db_grupo24sa (PostgreSQL)
-- ============================================

-- ============================================
-- 1. BITÁCORA (Activity Log)
--    Login aceptados, fallados, recursos más
--    accedidos.
-- ============================================

CREATE TABLE IF NOT EXISTS bitacora (
    id SERIAL PRIMARY KEY,
    user_id INTEGER,                              -- nullable (fallidos no tienen user)
    tipo VARCHAR(30) NOT NULL,                    -- 'LOGIN_OK', 'LOGIN_FAIL', 'ACCESO_RECURSO'
    recurso VARCHAR(200),                         -- ruta o nombre del recurso accedido
    ip_address VARCHAR(45),
    user_agent TEXT,
    datos_extra JSONB,                            -- info adicional (email intentado, etc.)
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_bitacora_user
        FOREIGN KEY (user_id)
        REFERENCES "User"(id)
        ON UPDATE CASCADE
        ON DELETE SET NULL
);

-- Índices para consultas frecuentes
CREATE INDEX IF NOT EXISTS idx_bitacora_tipo ON bitacora(tipo);
CREATE INDEX IF NOT EXISTS idx_bitacora_created_at ON bitacora(created_at);
CREATE INDEX IF NOT EXISTS idx_bitacora_user_id ON bitacora(user_id);


-- ============================================
-- 2. CONTADOR DE VISITAS POR PÁGINA
--    Debe mostrarse en el footer de cada página.
-- ============================================

CREATE TABLE IF NOT EXISTS contador_visitas (
    id SERIAL PRIMARY KEY,
    ruta VARCHAR(200) NOT NULL UNIQUE,            -- ej: '/dashboard', '/productos'
    nombre_pagina VARCHAR(200) NOT NULL,          -- nombre legible: 'Dashboard', 'Productos'
    total_visitas BIGINT NOT NULL DEFAULT 0,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);


-- ============================================
-- 3. TEMA DE USUARIO
--    Persistir preferencias de tema y
--    accesibilidad (3 temas + día/noche +
--    tamaño letra + contraste).
-- ============================================

CREATE TABLE IF NOT EXISTS tema_usuario (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL UNIQUE,
    tema VARCHAR(30) NOT NULL DEFAULT 'adultos',  -- 'ninos', 'jovenes', 'adultos'
    modo VARCHAR(10) NOT NULL DEFAULT 'auto',     -- 'dia', 'noche', 'auto' (según hora)
    tamano_letra VARCHAR(10) NOT NULL DEFAULT 'normal',  -- 'pequeno', 'normal', 'grande'
    alto_contraste BOOLEAN NOT NULL DEFAULT FALSE,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_tema_usuario_user
        FOREIGN KEY (user_id)
        REFERENCES "User"(id)
        ON UPDATE CASCADE
        ON DELETE CASCADE
);


-- ============================================
-- 4. SESSIONS
--    Requerida por SESSION_DRIVER=database.
--    SIN ESTA TABLA EL LOGIN NO FUNCIONA.
-- ============================================

CREATE TABLE IF NOT EXISTS sessions (
    id VARCHAR(255) PRIMARY KEY,
    user_id INTEGER,
    ip_address VARCHAR(45),
    user_agent TEXT,
    payload TEXT NOT NULL,
    last_activity INTEGER NOT NULL,

    CONSTRAINT fk_sessions_user
        FOREIGN KEY (user_id)
        REFERENCES "User"(id)
        ON UPDATE CASCADE
        ON DELETE SET NULL
);

CREATE INDEX IF NOT EXISTS idx_sessions_user_id ON sessions(user_id);
CREATE INDEX IF NOT EXISTS idx_sessions_last_activity ON sessions(last_activity);


-- ============================================
-- 5. CACHE
--    Requerida por CACHE_STORE=database.
-- ============================================

CREATE TABLE IF NOT EXISTS cache (
    key VARCHAR(255) PRIMARY KEY,
    value TEXT NOT NULL,
    expiration INTEGER NOT NULL
);


-- ============================================
-- 6. JOBS (Colas)
--    Requerida por QUEUE_CONNECTION=database.
-- ============================================

CREATE TABLE IF NOT EXISTS jobs (
    id BIGSERIAL PRIMARY KEY,
    queue VARCHAR(255) NOT NULL,
    payload TEXT NOT NULL,
    attempts SMALLINT NOT NULL DEFAULT 0,
    reserved_at INTEGER,
    available_at INTEGER NOT NULL,
    created_at INTEGER NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_jobs_queue ON jobs(queue);

CREATE TABLE IF NOT EXISTS job_batches (
    id VARCHAR(255) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    total_jobs INTEGER NOT NULL,
    pending_jobs INTEGER NOT NULL,
    failed_jobs INTEGER NOT NULL,
    failed_job_ids TEXT,
    options TEXT,
    cancelled_at INTEGER,
    created_at INTEGER NOT NULL,
    finished_at INTEGER
);

CREATE TABLE IF NOT EXISTS failed_jobs (
    id BIGSERIAL PRIMARY KEY,
    uuid VARCHAR(255) NOT NULL UNIQUE,
    connection TEXT NOT NULL,
    queue TEXT NOT NULL,
    payload TEXT NOT NULL,
    exception TEXT NOT NULL,
    failed_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);
