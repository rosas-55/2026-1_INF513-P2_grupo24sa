-- ============================================
-- SCRIPT BD - Proyecto INF-513

-- ============================================
-- TABLA: proveedor
-- ============================================

CREATE TABLE proveedor (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    direccion VARCHAR(200),
    telefono VARCHAR(30)
);


-- ============================================
-- TABLA: insumo
-- ============================================

CREATE TABLE insumo (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    descripcion TEXT,
    costo_unitario NUMERIC(12,2) NOT NULL DEFAULT 0,
    estado VARCHAR(30) NOT NULL DEFAULT 'ACTIVO',
    stock_actual NUMERIC(12,2) NOT NULL DEFAULT 0,
    stock_minimo NUMERIC(12,2) NOT NULL DEFAULT 0,
    unidad_medida VARCHAR(50)
);


-- ============================================
-- TABLA: compra
-- ============================================

CREATE TABLE compra (
    id SERIAL PRIMARY KEY,
    proveedor_id INTEGER NOT NULL,
    estado VARCHAR(30) NOT NULL DEFAULT 'PENDIENTE',
    fecha TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    total NUMERIC(12,2) NOT NULL DEFAULT 0,

    CONSTRAINT fk_compra_proveedor
        FOREIGN KEY (proveedor_id)
        REFERENCES proveedor(id)
        ON UPDATE CASCADE
        ON DELETE RESTRICT
);


-- ============================================
-- TABLA: detalle_compra
-- ============================================

CREATE TABLE detalle_compra (
    id SERIAL PRIMARY KEY,
    compra_id INTEGER NOT NULL,
    insumo_id INTEGER NOT NULL,
    cantidad NUMERIC(12,2) NOT NULL,
    precio_unitario NUMERIC(12,2) NOT NULL,
    subtotal NUMERIC(12,2) NOT NULL,

    CONSTRAINT fk_detalle_compra_compra
        FOREIGN KEY (compra_id)
        REFERENCES compra(id)
        ON UPDATE CASCADE
        ON DELETE CASCADE,

    CONSTRAINT fk_detalle_compra_insumo
        FOREIGN KEY (insumo_id)
        REFERENCES insumo(id)
        ON UPDATE CASCADE
        ON DELETE RESTRICT
);


-- ============================================
-- TABLA: inventario
-- ============================================

CREATE TABLE inventario (
    id SERIAL PRIMARY KEY,
    insumo_id INTEGER NOT NULL,
    cantidad NUMERIC(12,2) NOT NULL,
    fecha TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    observacion TEXT,
    tipo_movimiento VARCHAR(50) NOT NULL,
    costo_unitario NUMERIC(12,2) NOT NULL DEFAULT 0,
    valor_total NUMERIC(12,2) NOT NULL DEFAULT 0,

    CONSTRAINT fk_inventario_insumo
        FOREIGN KEY (insumo_id)
        REFERENCES insumo(id)
        ON UPDATE CASCADE
        ON DELETE RESTRICT
);


-- ============================================
-- TABLA: producto
-- ============================================

CREATE TABLE producto (
    id SERIAL PRIMARY KEY,
    estado VARCHAR(30) NOT NULL DEFAULT 'ACTIVO',
    nombre VARCHAR(100) NOT NULL,
    precio_venta NUMERIC(12,2) NOT NULL DEFAULT 0,
    stock_actual NUMERIC(12,2) NOT NULL DEFAULT 0,
    insumo_id INTEGER,

    CONSTRAINT fk_producto_insumo
        FOREIGN KEY (insumo_id)
        REFERENCES insumo(id)
        ON UPDATE CASCADE
        ON DELETE SET NULL
);


-- ============================================
-- TABLA: receta
-- ============================================

CREATE TABLE receta (
    id SERIAL PRIMARY KEY,
    producto_id INTEGER NOT NULL,
    descripcion TEXT,
    tiempo_preparacion VARCHAR(100),

    CONSTRAINT fk_receta_producto
        FOREIGN KEY (producto_id)
        REFERENCES producto(id)
        ON UPDATE CASCADE
        ON DELETE CASCADE
);


-- ============================================
-- TABLA: receta_insumo
-- ============================================

CREATE TABLE receta_insumo (
    receta_id INTEGER NOT NULL,
    insumo_id INTEGER NOT NULL,
    cantidad NUMERIC(12,2) NOT NULL,

    PRIMARY KEY (receta_id, insumo_id),

    CONSTRAINT fk_receta_insumo_receta
        FOREIGN KEY (receta_id)
        REFERENCES receta(id)
        ON UPDATE CASCADE
        ON DELETE CASCADE,

    CONSTRAINT fk_receta_insumo_insumo
        FOREIGN KEY (insumo_id)
        REFERENCES insumo(id)
        ON UPDATE CASCADE
        ON DELETE RESTRICT
);


-- ============================================
-- TABLA: produccion
-- ============================================

CREATE TABLE produccion (
    id SERIAL PRIMARY KEY,
    receta_id INTEGER NOT NULL,
    cantidad_producida NUMERIC(12,2) NOT NULL,
    fecha TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_produccion_receta
        FOREIGN KEY (receta_id)
        REFERENCES receta(id)
        ON UPDATE CASCADE
        ON DELETE RESTRICT
);


-- ============================================
-- TABLA: User
-- ============================================

CREATE TABLE "User" (
    id SERIAL PRIMARY KEY,
    cedula VARCHAR(30),
    celular VARCHAR(30),
    direccion VARCHAR(200),
    email VARCHAR(150) NOT NULL UNIQUE,
    name VARCHAR(100) NOT NULL,
    password VARCHAR(255) NOT NULL
);


-- ============================================
-- TABLA: venta
-- ============================================

CREATE TABLE venta (
    id SERIAL PRIMARY KEY,
    cliente_id INTEGER NOT NULL,
    vendedor_id INTEGER NOT NULL,
    estado VARCHAR(30) NOT NULL DEFAULT 'PENDIENTE',
    fecha TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    interes_mora NUMERIC(12,2) NOT NULL DEFAULT 0,
    nro_cuotas INTEGER NOT NULL DEFAULT 0,
    tipo VARCHAR(50) NOT NULL,
    total NUMERIC(12,2) NOT NULL DEFAULT 0,
    interes NUMERIC(12,2) NOT NULL DEFAULT 0,
    pagofaciltransactionid VARCHAR(100),

    CONSTRAINT fk_venta_cliente
        FOREIGN KEY (cliente_id)
        REFERENCES "User"(id)
        ON UPDATE CASCADE
        ON DELETE RESTRICT,

    CONSTRAINT fk_venta_vendedor
        FOREIGN KEY (vendedor_id)
        REFERENCES "User"(id)
        ON UPDATE CASCADE
        ON DELETE RESTRICT
);


-- ============================================
-- TABLA: detalle_venta
-- ============================================

CREATE TABLE detalle_venta (
    id SERIAL PRIMARY KEY,
    venta_id INTEGER NOT NULL,
    producto_id INTEGER NOT NULL,
    cantidad NUMERIC(12,2) NOT NULL,
    precio_unitario NUMERIC(12,2) NOT NULL,
    sub_total NUMERIC(12,2) NOT NULL,

    CONSTRAINT fk_detalle_venta_venta
        FOREIGN KEY (venta_id)
        REFERENCES venta(id)
        ON UPDATE CASCADE
        ON DELETE CASCADE,

    CONSTRAINT fk_detalle_venta_producto
        FOREIGN KEY (producto_id)
        REFERENCES producto(id)
        ON UPDATE CASCADE
        ON DELETE RESTRICT
);


-- ============================================
-- TABLA: cuota
-- ============================================

CREATE TABLE cuota (
    id SERIAL PRIMARY KEY,
    venta_id INTEGER NOT NULL,
    estado VARCHAR(30) NOT NULL DEFAULT 'PENDIENTE',
    fecha_pago TIMESTAMP,
    fecha_vencimiento DATE NOT NULL,
    interes_mora NUMERIC(12,2) NOT NULL DEFAULT 0,
    monto_pagado NUMERIC(12,2) NOT NULL DEFAULT 0,
    nro_cuota INTEGER NOT NULL,
    plan_pago VARCHAR(100),
    monto_fijo NUMERIC(12,2) NOT NULL DEFAULT 0,
    pagofaciltransactionid VARCHAR(100),

    CONSTRAINT fk_cuota_venta
        FOREIGN KEY (venta_id)
        REFERENCES venta(id)
        ON UPDATE CASCADE
        ON DELETE CASCADE
);


-- ============================================
-- TABLA: role
-- ============================================

CREATE TABLE role (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    descripcion TEXT
);


-- ============================================
-- TABLA: role_users
-- ============================================

CREATE TABLE role_users (
    role_id INTEGER NOT NULL,
    user_id INTEGER NOT NULL,

    PRIMARY KEY (role_id, user_id),

    CONSTRAINT fk_role_users_role
        FOREIGN KEY (role_id)
        REFERENCES role(id)
        ON UPDATE CASCADE
        ON DELETE CASCADE,

    CONSTRAINT fk_role_users_user
        FOREIGN KEY (user_id)
        REFERENCES "User"(id)
        ON UPDATE CASCADE
        ON DELETE CASCADE
);


-- ============================================
-- TABLA: modulo
-- ============================================

CREATE TABLE modulo (
    id SERIAL PRIMARY KEY,
    codigo VARCHAR(50) NOT NULL,
    descripcion TEXT,
    estado VARCHAR(30) NOT NULL DEFAULT 'ACTIVO',
    name VARCHAR(100) NOT NULL,
    nivel INTEGER NOT NULL DEFAULT 1
);


-- ============================================
-- TABLA: role_modulo
-- ============================================

CREATE TABLE role_modulo (
    role_id INTEGER NOT NULL,
    modulo_id INTEGER NOT NULL,

    PRIMARY KEY (role_id, modulo_id),

    CONSTRAINT fk_role_modulo_role
        FOREIGN KEY (role_id)
        REFERENCES role(id)
        ON UPDATE CASCADE
        ON DELETE CASCADE,

    CONSTRAINT fk_role_modulo_modulo
        FOREIGN KEY (modulo_id)
        REFERENCES modulo(id)
        ON UPDATE CASCADE
        ON DELETE CASCADE
);


-- ============================================
-- TABLA: accion
-- ============================================

CREATE TABLE accion (
    id SERIAL PRIMARY KEY,
    modulo_id INTEGER NOT NULL,
    codigo VARCHAR(50) NOT NULL,
    descripcion TEXT,
    estado VARCHAR(30) NOT NULL DEFAULT 'ACTIVO',
    name VARCHAR(100) NOT NULL,

    CONSTRAINT fk_accion_modulo
        FOREIGN KEY (modulo_id)
        REFERENCES modulo(id)
        ON UPDATE CASCADE
        ON DELETE CASCADE
);


-- ============================================
-- TABLA: bitacora (Activity Log)
-- ============================================

CREATE TABLE bitacora (
    id SERIAL PRIMARY KEY,
    user_id INTEGER,
    tipo VARCHAR(30) NOT NULL,
    recurso VARCHAR(200),
    ip_address VARCHAR(45),
    user_agent TEXT,
    datos_extra JSONB,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_bitacora_user
        FOREIGN KEY (user_id)
        REFERENCES "User"(id)
        ON UPDATE CASCADE
        ON DELETE SET NULL
);

CREATE INDEX idx_bitacora_tipo ON bitacora(tipo);
CREATE INDEX idx_bitacora_created_at ON bitacora(created_at);
CREATE INDEX idx_bitacora_user_id ON bitacora(user_id);


-- ============================================
-- TABLA: contador_visitas
-- ============================================

CREATE TABLE contador_visitas (
    id SERIAL PRIMARY KEY,
    ruta VARCHAR(200) NOT NULL UNIQUE,
    nombre_pagina VARCHAR(200) NOT NULL,
    total_visitas BIGINT NOT NULL DEFAULT 0,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);


-- ============================================
-- TABLA: tema_usuario
-- ============================================

CREATE TABLE tema_usuario (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL UNIQUE,
    tema VARCHAR(30) NOT NULL DEFAULT 'adultos',
    modo VARCHAR(10) NOT NULL DEFAULT 'auto',
    tamano_letra VARCHAR(10) NOT NULL DEFAULT 'normal',
    alto_contraste BOOLEAN NOT NULL DEFAULT FALSE,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_tema_usuario_user
        FOREIGN KEY (user_id)
        REFERENCES "User"(id)
        ON UPDATE CASCADE
        ON DELETE CASCADE
);


-- ============================================
-- TABLA: sessions (SESSION_DRIVER=database)
-- ============================================

CREATE TABLE sessions (
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

CREATE INDEX idx_sessions_user_id ON sessions(user_id);
CREATE INDEX idx_sessions_last_activity ON sessions(last_activity);


-- ============================================
-- TABLA: cache (CACHE_STORE=database)
-- ============================================

CREATE TABLE cache (
    key VARCHAR(255) PRIMARY KEY,
    value TEXT NOT NULL,
    expiration INTEGER NOT NULL
);


-- ============================================
-- TABLA: jobs (QUEUE_CONNECTION=database)
-- ============================================

CREATE TABLE jobs (
    id BIGSERIAL PRIMARY KEY,
    queue VARCHAR(255) NOT NULL,
    payload TEXT NOT NULL,
    attempts SMALLINT NOT NULL DEFAULT 0,
    reserved_at INTEGER,
    available_at INTEGER NOT NULL,
    created_at INTEGER NOT NULL
);

CREATE INDEX idx_jobs_queue ON jobs(queue);

CREATE TABLE job_batches (
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

CREATE TABLE failed_jobs (
    id BIGSERIAL PRIMARY KEY,
    uuid VARCHAR(255) NOT NULL UNIQUE,
    connection TEXT NOT NULL,
    queue TEXT NOT NULL,
    payload TEXT NOT NULL,
    exception TEXT NOT NULL,
    failed_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);
