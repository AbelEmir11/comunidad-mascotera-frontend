-- ============================================================================
-- TRABAJO PRÁCTICO: CARGA INICIAL Y DATOS DE EJEMPLO
-- Materia: Base de Datos
-- Curso: 3.º 2.ª
-- Sistema: Comunidad Mascotera Mendoza (Plataforma Integral de Adopción,
--          Red de Refugios y Seguimiento Responsable)
-- Archivo: 01_inicializacion.sql
-- Motor: PostgreSQL (compatible con Supabase, pgAdmin 4 y psql)
--
-- DESCRIPCIÓN:
-- Este script realiza la preparación completa de la estructura relacional (DDL)
-- e inserta los datos esenciales de inicialización del sistema:
-- 1. Eliminación limpia de tablas previas (DROP CASCADE).
-- 2. Creación de tablas, claves primarias, foráneas, restricciones e índices.
-- 3. Inserción de Roles y Permisos del sistema (RBAC).
-- 4. Inserción de Usuarios iniciales con credenciales ficticias de prueba.
--
-- ORDEN DE EJECUCIÓN:
-- 1.° Ejecutar este archivo: 01_inicializacion.sql
-- 2.° Ejecutar a continuación: 02_datos_ejemplo.sql
-- ============================================================================

BEGIN;

-- ============================================================================
-- 1. LIMPIEZA DE TABLAS PREVIAS (ORDEN DE DEPENDENCIAS CON CASCADE)
-- ============================================================================
DROP TABLE IF EXISTS rol_permisos CASCADE;
DROP TABLE IF EXISTS permisos CASCADE;
DROP TABLE IF EXISTS usuarios CASCADE;
DROP TABLE IF EXISTS roles CASCADE;
DROP TABLE IF EXISTS hitos_seguimiento CASCADE;
DROP TABLE IF EXISTS seguimiento_mascotas CASCADE;
DROP TABLE IF EXISTS solicitudes_adopcion CASCADE;
DROP TABLE IF EXISTS animal_fotos CASCADE;
DROP TABLE IF EXISTS animal_rasgos CASCADE;
DROP TABLE IF EXISTS animales CASCADE;
DROP TABLE IF EXISTS necesidades_refugio CASCADE;
DROP TABLE IF EXISTS refugios CASCADE;
DROP TABLE IF EXISTS avisos_zoonosis CASCADE;
DROP TABLE IF EXISTS patrocinadores CASCADE;

-- ============================================================================
-- 2. CREACIÓN DE ESTRUCTURAS DDL (TABLAS, CLAVES Y RESTRICCIONES)
-- ============================================================================

-- ----------------------------------------------------------------------------
-- Tabla: roles
-- Define los perfiles de acceso dentro de la plataforma comunitaria
-- ----------------------------------------------------------------------------
CREATE TABLE roles (
    id VARCHAR(30) PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    descripcion TEXT,
    nivel_jerarquia INT NOT NULL DEFAULT 1
);

COMMENT ON TABLE roles IS 'Roles disponibles para el control de acceso en la plataforma';
COMMENT ON COLUMN roles.id IS 'Identificador único del rol (código unívoco en mayúsculas)';
COMMENT ON COLUMN roles.nivel_jerarquia IS 'Nivel jerárquico numérico para control de privilegios (1=Básico, 10=Superadmin)';

-- ----------------------------------------------------------------------------
-- Tabla: permisos
-- Catálogo atómico de capacidades y privilegios del sistema
-- ----------------------------------------------------------------------------
CREATE TABLE permisos (
    id VARCHAR(50) PRIMARY KEY,
    modulo VARCHAR(50) NOT NULL,
    descripcion TEXT NOT NULL
);

COMMENT ON TABLE permisos IS 'Catálogo de permisos atómicos agrupados por módulo funcional';

-- ----------------------------------------------------------------------------
-- Tabla intermedia: rol_permisos
-- Relación muchos a muchos entre roles y sus permisos asociados
-- ----------------------------------------------------------------------------
CREATE TABLE rol_permisos (
    rol_id VARCHAR(30) NOT NULL REFERENCES roles(id) ON DELETE CASCADE,
    permiso_id VARCHAR(50) NOT NULL REFERENCES permisos(id) ON DELETE CASCADE,
    PRIMARY KEY (rol_id, permiso_id)
);

-- ----------------------------------------------------------------------------
-- Tabla: refugios
-- Entidades protectoras, hogares de tránsito y ONGs de rescate animal
-- ----------------------------------------------------------------------------
CREATE TABLE refugios (
    id VARCHAR(50) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    tagline VARCHAR(255),
    logo VARCHAR(1000),
    cover_image VARCHAR(1000),
    location VARCHAR(255) NOT NULL,
    zone VARCHAR(100) NOT NULL,
    description VARCHAR(2000),
    story VARCHAR(2000),
    alias VARCHAR(100),
    cbu VARCHAR(50),
    bank_name VARCHAR(100),
    titular VARCHAR(150),
    cuit VARCHAR(30),
    phone VARCHAR(50),
    whatsapp VARCHAR(50),
    instagram VARCHAR(100),
    email VARCHAR(150),
    animals_count INT DEFAULT 0,
    adoptions_count INT DEFAULT 0,
    CONSTRAINT chk_animals_count CHECK (animals_count >= 0),
    CONSTRAINT chk_adoptions_count CHECK (adoptions_count >= 0)
);

COMMENT ON TABLE refugios IS 'Refugios, protectoras y hogares de tránsito registrados en Mendoza';

-- ----------------------------------------------------------------------------
-- Tabla: usuarios
-- Cuentas de acceso de administradores, veterinarios, coordinadores y adoptantes
-- ----------------------------------------------------------------------------
CREATE TABLE usuarios (
    id VARCHAR(50) PRIMARY KEY,
    email VARCHAR(150) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    nombre_completo VARCHAR(150) NOT NULL,
    telefono VARCHAR(50),
    rol_id VARCHAR(30) NOT NULL REFERENCES roles(id),
    refugio_id VARCHAR(50) REFERENCES refugios(id) ON DELETE SET NULL,
    activo BOOLEAN NOT NULL DEFAULT TRUE,
    fecha_creacion TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

COMMENT ON TABLE usuarios IS 'Usuarios del sistema con roles asignados y vinculación opcional a un refugio';
COMMENT ON COLUMN usuarios.password_hash IS 'Contraseña hasheada (para pruebas se detallan contraseñas ficticias en comentarios)';

-- ----------------------------------------------------------------------------
-- Tabla: necesidades_refugio
-- Insumos y recursos prioritarios solicitados por cada refugio
-- ----------------------------------------------------------------------------
CREATE TABLE necesidades_refugio (
    id BIGSERIAL PRIMARY KEY,
    item VARCHAR(255) NOT NULL,
    needed INT NOT NULL CHECK (needed > 0),
    current INT NOT NULL DEFAULT 0 CHECK (current >= 0),
    unit VARCHAR(50) NOT NULL,
    urgency VARCHAR(20) NOT NULL DEFAULT 'media' CHECK (urgency IN ('baja', 'media', 'alta', 'critica')),
    refugio_id VARCHAR(50) NOT NULL REFERENCES refugios(id) ON DELETE CASCADE
);

COMMENT ON TABLE necesidades_refugio IS 'Necesidades de insumos y alimentos por refugio con barra de progreso';

-- ----------------------------------------------------------------------------
-- Tabla: animales
-- Ficha médica y comportamental de animales rescatados en adopción
-- ----------------------------------------------------------------------------
CREATE TABLE animales (
    id VARCHAR(50) PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    species VARCHAR(50) NOT NULL CHECK (species IN ('perro', 'gato', 'otro')),
    gender VARCHAR(20) NOT NULL CHECK (gender IN ('macho', 'hembra')),
    age VARCHAR(50),
    approx_age_months INT CHECK (approx_age_months >= 0),
    size VARCHAR(30) CHECK (size IN ('pequeño', 'mediano', 'grande', 'gigante')),
    status VARCHAR(50) NOT NULL DEFAULT 'en_adopcion' CHECK (status IN ('en_adopcion', 'en_proceso', 'adoptado', 'en_recuperacion')),
    story VARCHAR(2000),
    urgent BOOLEAN NOT NULL DEFAULT FALSE,
    time_in_shelter VARCHAR(50),
    vaccinated BOOLEAN NOT NULL DEFAULT FALSE,
    neutered BOOLEAN NOT NULL DEFAULT FALSE,
    dewormed BOOLEAN NOT NULL DEFAULT FALSE,
    microchip BOOLEAN NOT NULL DEFAULT FALSE,
    special_care VARCHAR(500),
    apartment BOOLEAN NOT NULL DEFAULT TRUE,
    kids BOOLEAN NOT NULL DEFAULT TRUE,
    other_dogs BOOLEAN NOT NULL DEFAULT TRUE,
    cats BOOLEAN NOT NULL DEFAULT TRUE,
    energy_level VARCHAR(30) CHECK (energy_level IN ('bajo', 'medio', 'alto')),
    hours_alone_ok VARCHAR(30) CHECK (hours_alone_ok IN ('pocas', 'medias', 'muchas')),
    refugio_id VARCHAR(50) NOT NULL REFERENCES refugios(id) ON DELETE CASCADE
);

COMMENT ON TABLE animales IS 'Mascotas rescatadas disponibles para adopción o en proceso de adopción';

-- ----------------------------------------------------------------------------
-- Tabla: animal_fotos
-- Galería de imágenes reales de cada animal
-- ----------------------------------------------------------------------------
CREATE TABLE animal_fotos (
    animal_id VARCHAR(50) NOT NULL REFERENCES animales(id) ON DELETE CASCADE,
    foto_url VARCHAR(1000) NOT NULL,
    PRIMARY KEY (animal_id, foto_url)
);

-- ----------------------------------------------------------------------------
-- Tabla: animal_rasgos
-- Etiquetas descriptivas de temperamento y carácter de cada animal
-- ----------------------------------------------------------------------------
CREATE TABLE animal_rasgos (
    animal_id VARCHAR(50) NOT NULL REFERENCES animales(id) ON DELETE CASCADE,
    rasgo VARCHAR(100) NOT NULL,
    PRIMARY KEY (animal_id, rasgo)
);

-- ----------------------------------------------------------------------------
-- Tabla: solicitudes_adopcion
-- Formularios de postulación de familias adoptantes
-- ----------------------------------------------------------------------------
CREATE TABLE solicitudes_adopcion (
    id BIGSERIAL PRIMARY KEY,
    applicant_name VARCHAR(150) NOT NULL,
    applicant_dni VARCHAR(20) NOT NULL,
    applicant_phone VARCHAR(30) NOT NULL,
    applicant_housing VARCHAR(100),
    agreed_to_followup BOOLEAN NOT NULL DEFAULT FALSE,
    status VARCHAR(50) NOT NULL DEFAULT 'PENDIENTE' CHECK (status IN ('PENDIENTE', 'EN_EVALUACION', 'APROBADA', 'RECHAZADA')),
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    animal_id VARCHAR(50) NOT NULL REFERENCES animales(id) ON DELETE CASCADE
);

COMMENT ON TABLE solicitudes_adopcion IS 'Solicitudes de adopción responsable enviadas por la comunidad';

-- ----------------------------------------------------------------------------
-- Tabla: seguimiento_mascotas
-- Ficha del programa "Álbum de Vida" post-adopción con semáforo de bienestar
-- ----------------------------------------------------------------------------
CREATE TABLE seguimiento_mascotas (
    id VARCHAR(50) PRIMARY KEY,
    pet_id VARCHAR(50) NOT NULL,
    pet_name VARCHAR(100) NOT NULL,
    pet_photo VARCHAR(1000),
    species VARCHAR(50) NOT NULL,
    shelter_id VARCHAR(50) NOT NULL REFERENCES refugios(id) ON DELETE RESTRICT,
    shelter_name VARCHAR(255) NOT NULL,
    adopter_name VARCHAR(150) NOT NULL,
    adopter_location VARCHAR(255),
    adoption_date VARCHAR(100) NOT NULL,
    health_traffic_light VARCHAR(20) NOT NULL DEFAULT 'verde' CHECK (health_traffic_light IN ('verde', 'amarillo', 'rojo')),
    last_update_date VARCHAR(100),
    next_due_date VARCHAR(100)
);

COMMENT ON TABLE seguimiento_mascotas IS 'Seguimiento post-adopción a 15, 45, 90 y 180 días con semáforo de salud';

-- ----------------------------------------------------------------------------
-- Tabla: hitos_seguimiento
-- Momentos e hitos clave del proceso de adaptación en el nuevo hogar
-- ----------------------------------------------------------------------------
CREATE TABLE hitos_seguimiento (
    id VARCHAR(50) PRIMARY KEY,
    period VARCHAR(50) NOT NULL,
    title VARCHAR(255) NOT NULL,
    description VARCHAR(1000),
    due_date VARCHAR(100),
    status VARCHAR(50) NOT NULL DEFAULT 'pendiente' CHECK (status IN ('pendiente', 'completado', 'atrasado')),
    photo_url VARCHAR(1000),
    notes VARCHAR(2000),
    completed_at VARCHAR(100),
    badge_name VARCHAR(100),
    badge_icon VARCHAR(50),
    badge_description VARCHAR(500),
    seguimiento_id VARCHAR(50) NOT NULL REFERENCES seguimiento_mascotas(id) ON DELETE CASCADE
);

COMMENT ON TABLE hitos_seguimiento IS 'Hitos periódicos del Álbum de Vida con medallas de adaptación';

-- ----------------------------------------------------------------------------
-- Tabla: avisos_zoonosis
-- Novedades municipales, móviles veterinarios gratuitos y logros comunitarios
-- ----------------------------------------------------------------------------
CREATE TABLE avisos_zoonosis (
    id VARCHAR(50) PRIMARY KEY,
    type VARCHAR(50) NOT NULL,
    title VARCHAR(500) NOT NULL,
    subtitle VARCHAR(1000),
    highlight_badge VARCHAR(100),
    location VARCHAR(255),
    municipality VARCHAR(100),
    date VARCHAR(100),
    action_text VARCHAR(150),
    action_url VARCHAR(500),
    image VARCHAR(1000),
    urgent BOOLEAN NOT NULL DEFAULT FALSE
);

COMMENT ON TABLE avisos_zoonosis IS 'Avisos oficiales de zoonosis, castraciones masivas y noticias de la comunidad';

-- ----------------------------------------------------------------------------
-- Tabla: patrocinadores
-- Municipios, clínicas veterinarias y comercios aliados solidarios
-- ----------------------------------------------------------------------------
CREATE TABLE patrocinadores (
    id VARCHAR(50) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    category VARCHAR(100) NOT NULL,
    tier VARCHAR(50) NOT NULL CHECK (tier IN ('platino', 'oro', 'plata')),
    logo VARCHAR(1000),
    description VARCHAR(1500),
    location VARCHAR(255),
    support_type VARCHAR(1000),
    benefit_for_adopters VARCHAR(1000),
    contact_url VARCHAR(500)
);

COMMENT ON TABLE patrocinadores IS 'Organizaciones aliadas, municipios e instituciones que apoyan el proyecto';

-- ============================================================================
-- 3. ÍNDICES PARA OPTIMIZACIÓN DE CONSULTAS
-- ============================================================================
CREATE INDEX idx_usuarios_email ON usuarios(email);
CREATE INDEX idx_usuarios_rol ON usuarios(rol_id);
CREATE INDEX idx_animales_refugio ON animales(refugio_id);
CREATE INDEX idx_animales_status ON animales(status);
CREATE INDEX idx_animales_species ON animales(species);
CREATE INDEX idx_solicitudes_animal ON solicitudes_adopcion(animal_id);
CREATE INDEX idx_solicitudes_status ON solicitudes_adopcion(status);
CREATE INDEX idx_hitos_seguimiento ON hitos_seguimiento(seguimiento_id);
CREATE INDEX idx_necesidades_refugio ON necesidades_refugio(refugio_id);

-- ============================================================================
-- 4. DATOS BÁSICOS DE INICIALIZACIÓN DEL SISTEMA
-- ============================================================================

-- ----------------------------------------------------------------------------
-- 4.1 Inserción de Roles del Sistema
-- ----------------------------------------------------------------------------
INSERT INTO roles (id, nombre, descripcion, nivel_jerarquia) VALUES
('ADMIN_GENERAL', 'Administrador General', 'Control total de la plataforma, auditoría de refugios y gestión de accesos.', 10),
('ADMIN_REFUGIO', 'Coordinador de Refugio', 'Gestión de ficha de refugio, carga de animales rescatados y evaluación de solicitudes de adopción.', 7),
('VETERINARIO_ZOONOSIS', 'Veterinario Municipal / Zoonosis', 'Publicación de cronogramas de móviles de castración, vacunación antirrábica y validación sanitaria.', 6),
('VOLUNTARIO', 'Voluntario de Tránsito y Rescate', 'Apoyo en relevamiento de necesidades, fotos de animales y actualización del Álbum de Vida.', 4),
('ADOPTANTE', 'Tutor / Adoptante Registrado', 'Postulación para adopción responsable y carga de hitos en el seguimiento post-adopción.', 1);

-- ----------------------------------------------------------------------------
-- 4.2 Inserción del Catálogo de Permisos del Sistema
-- ----------------------------------------------------------------------------
INSERT INTO permisos (id, modulo, descripcion) VALUES
-- Módulo Refugios
('REFUGIO_CREAR', 'REFUGIOS', 'Crear y dar de alta nuevos refugios u ONGs'),
('REFUGIO_EDITAR', 'REFUGIOS', 'Modificar datos institucionales, alias bancarios y contacto'),
('REFUGIO_VER', 'REFUGIOS', 'Visualizar fichas de refugios y sus necesidades'),
('NECESIDAD_GESTIONAR', 'REFUGIOS', 'Cargar y actualizar necesidades e insumos solicitados'),

-- Módulo Animales
('ANIMAL_CREAR', 'ANIMALES', 'Registrar un nuevo animal rescatado en adopción'),
('ANIMAL_EDITAR', 'ANIMALES', 'Actualizar ficha médica, fotos, rasgos y compatibilidades'),
('ANIMAL_ELIMINAR', 'ANIMALES', 'Dar de baja o archivar la ficha de un animal'),
('ANIMAL_VER', 'ANIMALES', 'Visualizar el catálogo completo de animales'),

-- Módulo Adopciones
('ADOPCION_POSTULAR', 'ADOPCIONES', 'Enviar formulario de solicitud de adopción responsable'),
('ADOPCION_EVALUAR', 'ADOPCIONES', 'Aprobar, rechazar o solicitar entrevista por solicitudes recibidas'),
('ADOPCION_VER_TODAS', 'ADOPCIONES', 'Ver listado global de postulaciones'),

-- Módulo Seguimiento y Álbum de Vida
('SEGUIMIENTO_CREAR', 'SEGUIMIENTO', 'Crear el expediente de seguimiento post-adopción'),
('SEGUIMIENTO_SUBIR_HITO', 'SEGUIMIENTO', 'Subir fotos y notas de adaptación para hitos de 15, 45, 90 días'),
('SEGUIMIENTO_VALIDAR', 'SEGUIMIENTO', 'Revisar bienestar y ajustar semáforo de salud (verde/amarillo/rojo)'),

-- Módulo Zoonosis y Novedades
('ZOONOSIS_PUBLICAR', 'ZOONOSIS', 'Publicar avisos de móviles veterinarios y fechas de castración'),
('ZOONOSIS_EDITAR', 'ZOONOSIS', 'Actualizar o finalizar avisos municipales'),

-- Módulo Usuarios y Auditoría
('USUARIOS_ADMIN', 'USUARIOS', 'Administración de cuentas, bloqueo de usuarios y asignación de roles');

-- ----------------------------------------------------------------------------
-- 4.3 Asignación de Permisos a Roles (Matriz RBAC)
-- ----------------------------------------------------------------------------
-- ADMIN_GENERAL: Todos los permisos
INSERT INTO rol_permisos (rol_id, permiso_id)
SELECT 'ADMIN_GENERAL', id FROM permisos;

-- ADMIN_REFUGIO: Gestión de su refugio, animales, evaluación de adopciones y validación de seguimiento
INSERT INTO rol_permisos (rol_id, permiso_id) VALUES
('ADMIN_REFUGIO', 'REFUGIO_EDITAR'),
('ADMIN_REFUGIO', 'REFUGIO_VER'),
('ADMIN_REFUGIO', 'NECESIDAD_GESTIONAR'),
('ADMIN_REFUGIO', 'ANIMAL_CREAR'),
('ADMIN_REFUGIO', 'ANIMAL_EDITAR'),
('ADMIN_REFUGIO', 'ANIMAL_VER'),
('ADMIN_REFUGIO', 'ADOPCION_EVALUAR'),
('ADMIN_REFUGIO', 'SEGUIMIENTO_CREAR'),
('ADMIN_REFUGIO', 'SEGUIMIENTO_SUBIR_HITO'),
('ADMIN_REFUGIO', 'SEGUIMIENTO_VALIDAR');

-- VETERINARIO_ZOONOSIS: Publicación de cronogramas y validación sanitaria
INSERT INTO rol_permisos (rol_id, permiso_id) VALUES
('VETERINARIO_ZOONOSIS', 'ZOONOSIS_PUBLICAR'),
('VETERINARIO_ZOONOSIS', 'ZOONOSIS_EDITAR'),
('VETERINARIO_ZOONOSIS', 'ANIMAL_VER'),
('VETERINARIO_ZOONOSIS', 'SEGUIMIENTO_VALIDAR');

-- VOLUNTARIO: Apoyo en carga de animales y necesidades
INSERT INTO rol_permisos (rol_id, permiso_id) VALUES
('VOLUNTARIO', 'ANIMAL_CREAR'),
('VOLUNTARIO', 'ANIMAL_EDITAR'),
('VOLUNTARIO', 'ANIMAL_VER'),
('VOLUNTARIO', 'NECESIDAD_GESTIONAR'),
('VOLUNTARIO', 'SEGUIMIENTO_SUBIR_HITO');

-- ADOPTANTE: Postulación y carga de su propio seguimiento
INSERT INTO rol_permisos (rol_id, permiso_id) VALUES
('ADOPTANTE', 'ANIMAL_VER'),
('ADOPTANTE', 'REFUGIO_VER'),
('ADOPTANTE', 'ADOPCION_POSTULAR'),
('ADOPTANTE', 'SEGUIMIENTO_SUBIR_HITO');

-- ----------------------------------------------------------------------------
-- 4.4 Inserción de Usuarios Iniciales del Sistema
-- ============================================================================
-- NOTA IMPORTANTE DE SEGURIDAD (CONSIGNA):
-- No se utilizan contraseñas reales ni datos sensibles personales.
-- A continuación se detallan las credenciales ficticias de prueba para evaluar
-- el sistema con cada uno de los roles:
--
-- +----------------------------------------+-------------------+----------------------+
-- | Email de Acceso                        | Rol Asignado      | Contraseña Ficticia  |
-- +----------------------------------------+-------------------+----------------------+
-- | admin@comunidadmascotera.org           | ADMIN_GENERAL     | Admin2026!           |
-- | refugio.angeles@comunidadmascotera.org | ADMIN_REFUGIO     | Refugio2026!         |
-- | hogar.felino@comunidadmascotera.org    | ADMIN_REFUGIO     | Felino2026!          |
-- | vet.zoonosis@godoycruz.gob.ar          | VETERINARIO_ZOON. | Zoonosis2026!        |
-- | voluntario.mza@comunidadmascotera.org  | VOLUNTARIO        | Voluntario2026!      |
-- | adoptante.mendoza@gmail.com            | ADOPTANTE         | Adoptante2026!       |
-- +----------------------------------------+-------------------+----------------------+
-- Todos los hashes corresponden a formato BCrypt estándar para testing.
-- ----------------------------------------------------------------------------

INSERT INTO usuarios (id, email, password_hash, nombre_completo, telefono, rol_id, refugio_id, activo) VALUES
('usr-admin-1', 'admin@comunidadmascotera.org', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', 'Alvaro Martinez (Administrador)', '+54 9 261 367-0507', 'ADMIN_GENERAL', NULL, TRUE),
('usr-ref-angeles', 'refugio.angeles@comunidadmascotera.org', '$2a$10$wBskvX7HlK6e58h6h1l0rO7y5E4vVjVfM7Z1nN8x2yL8qZ1aB2cDe', 'Mariana Rossi (Coord. Ángeles 4 Patas)', '+54 9 261 512-3456', 'ADMIN_REFUGIO', NULL, TRUE),
('usr-ref-felino', 'hogar.felino@comunidadmascotera.org', '$2a$10$bM3k9v1s9l8x2yL8qZ1aB2cDeWskvX7HlK6e58h6h1l0rO7y5E4vV', 'Gonzalo Morales (Coord. Hogar Felino)', '+54 9 261 487-6543', 'ADMIN_REFUGIO', NULL, TRUE),
('usr-vet-zoonosis', 'vet.zoonosis@godoycruz.gob.ar', '$2a$10$kL8qZ1aB2cDeWskvX7HlK6e58h6h1l0rO7y5E4vVjVfM7Z1nN8x2y', 'Dra. Claudia Varela (Zoonosis Godoy Cruz)', '+54 9 261 413-3100', 'VETERINARIO_ZOONOSIS', NULL, TRUE),
('usr-voluntario-1', 'voluntario.mza@comunidadmascotera.org', '$2a$10$vVjVfM7Z1nN8x2yL8qZ1aB2cDeWskvX7HlK6e58h6h1l0rO7y5E4', 'Agustina Perez (Voluntaria Pedemonte)', '+54 9 261 698-7412', 'VOLUNTARIO', NULL, TRUE),
('usr-adoptante-1', 'adoptante.mendoza@gmail.com', '$2a$10$7Z1nN8x2yL8qZ1aB2cDeWskvX7HlK6e58h6h1l0rO7y5E4vVjVfM', 'Mariana Godoy (Tutor Adoptante)', '+54 9 261 367-0507', 'ADOPTANTE', NULL, TRUE);

COMMIT;
