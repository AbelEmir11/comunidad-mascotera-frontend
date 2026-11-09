-- ============================================================================
-- TRABAJO PRÁCTICO: CARGA INICIAL Y DATOS DE EJEMPLO
-- Materia: Base de Datos
-- Curso: 3.º 2.ª
-- Sistema: Comunidad Mascotera Mendoza (Plataforma Integral de Adopción,
--          Red de Refugios y Seguimiento Responsable)
-- Archivo: 02_datos_ejemplo.sql
-- Motor: PostgreSQL (compatible con Supabase, pgAdmin 4 y psql)
--
-- REQUISITO PREVIO:
-- Haber ejecutado previamente el script "01_inicializacion.sql".
--
-- DESCRIPCIÓN:
-- Este script inserta datos realistas y verosímiles situados en la provincia
-- de Mendoza para probar integralmente todas las funciones y relaciones del modelo:
-- 1. Refugios mendocinos y actualización de coordinadores.
-- 2. Necesidades prioritarias de insumos por refugio.
-- 3. 10 Animales rescatados con fichas médicas, etológicas y compatibilidades.
-- 4. Galería de fotos y rasgos de personalidad por animal.
-- 5. Solicitudes de adopción en distintos estados (APROBADA, EN_EVALUACION, PENDIENTE).
-- 6. Expedientes de Seguimiento Post-Adopción ("Álbum de Vida") con hitos y medallas.
-- 7. Avisos de Zoonosis municipal y novedades comunitarias.
-- 8. Patrocinadores, alianzas institucionales y veterinarias.
-- 9. Consultas SQL de verificación con JOINs para comprobar integridad referencial.
-- ============================================================================

BEGIN;

-- ============================================================================
-- 1. REFUGIOS Y ASOCIACIONES PROTECTORAS DE MENDOZA
-- ============================================================================
INSERT INTO refugios (
    id, name, tagline, logo, cover_image, location, zone,
    description, story, alias, cbu, bank_name, titular, cuit,
    phone, whatsapp, instagram, email, animals_count, adoptions_count
) VALUES
(
    'angeles-cuatro-patas',
    'Refugio Ángeles de Cuatro Patas',
    'Rescate, rehabilitación y amor en el pedemonte mendocino.',
    'https://images.unsplash.com/photo-1534361960057-19889db9621e?auto=format&fit=crop&w=200&q=80',
    'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&w=1200&q=80',
    'Godoy Cruz / Luján de Cuyo, Mendoza',
    'Godoy Cruz',
    'Espacio sin fines de lucro fundado hace 8 años para rescatar animales de la calle, víctimas de maltrato o abandono severo.',
    'Comenzamos con un patio familiar y hoy cobijamos a más de 35 animales que recuperan su peso, salud y confianza antes de encontrar un hogar definitivo.',
    'refugio.angeles.mza',
    '0110034530000123456789',
    'Banco Nación / Mercado Pago Directo',
    'Asociación Civil Ángeles de 4 Patas',
    '30-71569842-4',
    '+54 9 261 367-0507',
    '5492613670507',
    'angelescuatropatas.mza',
    'contacto@angeles4patas.org.ar',
    26,
    312
),
(
    'hogar-felino-mendoza',
    'Hogar Felino Mendoza & Tránsitos',
    'Cuidado especializado, castraciones y adopciones de gatitos rescatados.',
    'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=200&q=80',
    'https://images.unsplash.com/photo-1543852786-1cf6624b9987?auto=format&fit=crop&w=1200&q=80',
    'Ciudad de Mendoza (Capital)',
    'Capital',
    'Red comunitaria de hogares de tránsito coordinada para rescatar camadas abandonadas y atender felinos.',
    'Creemos en la importancia de educar sobre la tenencia en departamentos y balcones con red de seguridad.',
    'hogar.felino.cuyo',
    '0720123988000034928172',
    'Banco Santander',
    'Red Hogar Felino Mendoza',
    '27-33829104-7',
    '+54 9 261 367-0507',
    '5492613670507',
    'hogarfelino.mza',
    'adopciones@hogarfelinomza.com',
    18,
    195
),
(
    'patitas-del-pedemonte',
    'Patitas del Pedemonte',
    'Refugio abierto y rescate de animales en zonas rurales y pedemonte.',
    'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&w=200&q=80',
    'https://images.unsplash.com/photo-1517423440428-a5a00ad493e8?auto=format&fit=crop&w=1200&q=80',
    'Las Compuertas, Luján de Cuyo, Mendoza',
    'Luján de Cuyo',
    'Refugio amplio rodeado de naturaleza enfocado en la recuperación de perros de tamaño mediano y grande.',
    'Muchos de nuestros perros provienen de puestos rurales y senderos de montaña donde fueron abandonados.',
    'patitas.pedemonte.ok',
    '0290001310000045819203',
    'Banco Ciudad / Ualá',
    'Patitas del Pedemonte ONG',
    '33-71829301-9',
    '+54 9 261 367-0507',
    '5492613670507',
    'patitas.pedemonte',
    'info@patitasdelpedemonte.org',
    32,
    420
);

-- Asignación de refugios a los usuarios coordinadores creados en la inicialización
UPDATE usuarios SET refugio_id = 'angeles-cuatro-patas' WHERE id = 'usr-ref-angeles';
UPDATE usuarios SET refugio_id = 'hogar-felino-mendoza' WHERE id = 'usr-ref-felino';

-- ============================================================================
-- 2. NECESIDADES PRIORITARIAS DE INSUMOS POR REFUGIO
-- ============================================================================
INSERT INTO necesidades_refugio (item, needed, current, unit, urgency, refugio_id) VALUES
-- Necesidades Ángeles de 4 Patas
('Alimento Balanceado Adulto (Bolsas 15kg)', 25, 16, 'bolsas', 'alta', 'angeles-cuatro-patas'),
('Pipetas Antipulgas (Perros 10-25kg)', 30, 8, 'unidades', 'alta', 'angeles-cuatro-patas'),
('Mantas y Toallones de abrigo', 20, 14, 'unidades', 'media', 'angeles-cuatro-patas'),

-- Necesidades Hogar Felino
('Alimento Kitten / Cachorros Gato (Bolsas 7.5kg)', 12, 4, 'bolsas', 'alta', 'hogar-felino-mendoza'),
('Piedritas Sanitarias Absorbentes (Bolsas)', 40, 22, 'bolsas', 'media', 'hogar-felino-mendoza'),

-- Necesidades Patitas del Pedemonte
('Alimento Balanceado Criadores (Bolsas 20kg)', 30, 11, 'bolsas', 'alta', 'patitas-del-pedemonte'),
('Vacunas Óctuples (Dosis)', 15, 3, 'dosis', 'alta', 'patitas-del-pedemonte');

-- ============================================================================
-- 3. ANIMALES RESCATADOS DISPONIBLES EN ADOPCIÓN (10 CASOS REALISTAS)
-- ============================================================================
INSERT INTO animales (
    id, name, species, gender, age, approx_age_months, size, status, story, urgent,
    time_in_shelter, vaccinated, neutered, dewormed, microchip, special_care,
    apartment, kids, other_dogs, cats, energy_level, hours_alone_ok, refugio_id
) VALUES
(
    'pet-1',
    'Pampa',
    'perro',
    'hembra',
    '1 año y 4 meses',
    16,
    'mediano',
    'en_adopcion',
    'Pampa fue rescatada en una acequia del carril Cervantes en Godoy Cruz. Estaba asustada, pero hoy es la perrita más agradecida y mimosa del mundo.',
    FALSE,
    '3 meses',
    TRUE, TRUE, TRUE, FALSE, NULL,
    TRUE, TRUE, TRUE, TRUE,
    'medio', 'medias',
    'angeles-cuatro-patas'
),
(
    'pet-2',
    'Milo',
    'gato',
    'macho',
    '8 meses',
    8,
    'pequeño',
    'en_adopcion',
    'Milo nació en un jardín en la Quinta Sección de Capital. Es un ronroneador profesional y compañero ideal de departamento con balcón protegido.',
    FALSE,
    '2 meses',
    TRUE, TRUE, TRUE, FALSE, NULL,
    TRUE, TRUE, FALSE, TRUE,
    'bajo', 'muchas',
    'hogar-felino-mendoza'
),
(
    'pet-3',
    'Ciro',
    'perro',
    'macho',
    '2 años',
    24,
    'grande',
    'en_adopcion',
    'Ciro es un compañero leal y noble con energía para salir a caminar por los senderos y cuidar el hogar. Necesita casa con patio cerrado.',
    TRUE,
    '6 meses',
    TRUE, TRUE, TRUE, FALSE, 'Requiere espacio amplio y paseos diarios',
    FALSE, TRUE, TRUE, FALSE,
    'alto', 'medias',
    'patitas-del-pedemonte'
),
(
    'pet-4',
    'Luna',
    'perro',
    'hembra',
    '3 años',
    36,
    'pequeño',
    'en_adopcion',
    'Luna pesa solo 7kg. Es tranquila, súper mimosita y le encanta dormir la siesta sobre mantas calentitas.',
    FALSE,
    '1 mes',
    TRUE, TRUE, TRUE, FALSE, NULL,
    TRUE, TRUE, TRUE, TRUE,
    'bajo', 'muchas',
    'angeles-cuatro-patas'
),
(
    'pet-5',
    'Negro',
    'perro',
    'macho',
    '2 años',
    24,
    'mediano',
    'en_adopcion',
    'El Negro fue rescatado en una parada de micro en Las Heras donde esperaba que alguien le compartiera comida. Es un criollo puro corazón, agradecido y muy obediente.',
    TRUE,
    '4 meses',
    TRUE, TRUE, TRUE, FALSE, NULL,
    TRUE, TRUE, TRUE, TRUE,
    'medio', 'muchas',
    'angeles-cuatro-patas'
),
(
    'pet-6',
    'Choco',
    'perro',
    'macho',
    '5 meses',
    5,
    'mediano',
    'en_adopcion',
    'Cachorrito rescatado en senderos de Luján de Cuyo. Es pura ternura, le encanta corretear en el pasto y llenarte de besos.',
    TRUE,
    '1 mes',
    TRUE, FALSE, TRUE, FALSE, 'Compromiso de castración a los 6 meses',
    TRUE, TRUE, TRUE, TRUE,
    'alto', 'pocas',
    'patitas-del-pedemonte'
),
(
    'pet-7',
    'Brisa',
    'perro',
    'hembra',
    '1 año',
    12,
    'mediano',
    'en_adopcion',
    'Brisa es una mestiza barbincha simpatiquísima rescatada en Maipú. Tiene una mirada alegre, aprende trucos rapidísimo y le encanta estar con niños.',
    FALSE,
    '2 meses',
    TRUE, TRUE, TRUE, FALSE, NULL,
    TRUE, TRUE, TRUE, TRUE,
    'medio', 'medias',
    'angeles-cuatro-patas'
),
(
    'pet-8',
    'Simba',
    'gato',
    'macho',
    '1 año',
    12,
    'mediano',
    'en_adopcion',
    'Simba es un gato naranja rescatado de un techo en Guaymallén. Es tranquilo, ama sentarse en la ventana a mirar los árboles y dormir siestas al sol.',
    FALSE,
    '3 meses',
    TRUE, TRUE, TRUE, FALSE, NULL,
    TRUE, TRUE, FALSE, TRUE,
    'bajo', 'muchas',
    'hogar-felino-mendoza'
),
(
    'pet-9',
    'Tito',
    'perro',
    'macho',
    '7 años',
    84,
    'grande',
    'en_adopcion',
    'Tito es un señor perro rescatado en San Martín. Es súper tranquilo, camina despacio y solo busca un rincón calentito donde recibir caricias y pasar su madurez feliz.',
    TRUE,
    '8 meses',
    TRUE, TRUE, TRUE, FALSE, 'Control articular preventivo cada 6 meses',
    TRUE, TRUE, TRUE, TRUE,
    'bajo', 'muchas',
    'patitas-del-pedemonte'
),
(
    'pet-10',
    'Pelusa',
    'gato',
    'hembra',
    '2 años',
    24,
    'pequeño',
    'en_adopcion',
    'Pelusa es una gatita carey rescatada de la Peatonal Sarmiento en el centro de Mendoza. Es muy suave, silenciosa y se acuesta en tu falda en cuanto te sentás.',
    FALSE,
    '2 meses',
    TRUE, TRUE, TRUE, FALSE, NULL,
    TRUE, TRUE, FALSE, TRUE,
    'bajo', 'muchas',
    'hogar-felino-mendoza'
);

-- ============================================================================
-- 4. GALERÍA DE FOTOS Y RASGOS DE COMPORTAMIENTO
-- ============================================================================

-- Fotos de animales
INSERT INTO animal_fotos (animal_id, foto_url) VALUES
('pet-1', 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=800&q=80'),
('pet-1', 'https://images.unsplash.com/photo-1537151625747-768eb6cf92b2?auto=format&fit=crop&w=800&q=80'),
('pet-2', 'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?auto=format&fit=crop&w=800&q=80'),
('pet-3', 'https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=800&q=80'),
('pet-4', 'https://images.unsplash.com/photo-1537151625747-768eb6cf92b2?auto=format&fit=crop&w=800&q=80'),
('pet-5', 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?auto=format&fit=crop&w=800&q=80'),
('pet-6', 'https://images.unsplash.com/photo-1591160690555-5debfba289f0?auto=format&fit=crop&w=800&q=80'),
('pet-7', 'https://images.unsplash.com/photo-1561037404-61cd46aa615b?auto=format&fit=crop&w=800&q=80'),
('pet-8', 'https://images.unsplash.com/photo-1574158622682-e40e69881006?auto=format&fit=crop&w=800&q=80'),
('pet-9', 'https://images.unsplash.com/photo-1544568100-847a948585b9?auto=format&fit=crop&w=800&q=80'),
('pet-10', 'https://images.unsplash.com/photo-1573865526739-10659fec78a5?auto=format&fit=crop&w=800&q=80');

-- Rasgos de temperamento y carácter
INSERT INTO animal_rasgos (animal_id, rasgo) VALUES
('pet-1', 'Súper cariñosa'), ('pet-1', 'Sociable con perros'), ('pet-1', 'Aprende rápido'),
('pet-2', 'Curioso'), ('pet-2', 'Ronroneador'), ('pet-2', 'Ideal departamento'),
('pet-3', 'Guardián noble'), ('pet-3', 'Muy activo'), ('pet-3', 'Fiel protector'),
('pet-4', 'Tranquila'), ('pet-4', 'Ama los sillones'), ('pet-4', 'Pasea sin tirar'),
('pet-5', 'Compañero fiel'), ('pet-5', 'Súper agradecido'), ('pet-5', 'Camina al lado'),
('pet-6', 'Cachorro juguetón'), ('pet-6', 'Alegre'), ('pet-6', 'Sociable'),
('pet-7', 'Barbincha alegre'), ('pet-7', 'Le encantan los chicos'), ('pet-7', 'Muy sociable'),
('pet-8', 'Gato naranja mimoso'), ('pet-8', 'Dormilón'), ('pet-8', 'Limpio y educado'),
('pet-9', 'Señor maduro'), ('pet-9', 'Súper tranquilo'), ('pet-9', 'Paseos lentos'), ('pet-9', 'No ladra'),
('pet-10', 'Gata faldera'), ('pet-10', 'Tranquila'), ('pet-10', 'Ronroneo suave');

-- ============================================================================
-- 5. SOLICITUDES DE ADOPCIÓN (MUESTRAS EN DIFERENTES ESTADOS)
-- ============================================================================
INSERT INTO solicitudes_adopcion (
    applicant_name, applicant_dni, applicant_phone, applicant_housing, agreed_to_followup, status, created_at, animal_id
) VALUES
(
    'Mariana Godoy',
    '38491204',
    '2613670507',
    'Casa con patio cerrado en Godoy Cruz',
    TRUE,
    'APROBADA',
    NOW() - INTERVAL '25 days',
    'pet-1'
),
(
    'Rodrigo Fernandez',
    '40128475',
    '2614981122',
    'Casa con jardín amplio en Dorrego, Guaymallén',
    TRUE,
    'EN_EVALUACION',
    NOW() - INTERVAL '3 days',
    'pet-3'
),
(
    'Camila Suarez',
    '42567891',
    '2616789012',
    'Departamento con balcón enrejado en 5ta Sección',
    TRUE,
    'PENDIENTE',
    NOW() - INTERVAL '1 day',
    'pet-2'
),
(
    'Esteban Morales',
    '35198234',
    '2615432198',
    'Casa con patio en Maipú',
    TRUE,
    'PENDIENTE',
    NOW() - INTERVAL '4 hours',
    'pet-6'
);

-- ============================================================================
-- 6. SEGUIMIENTO POST-ADOPCIÓN Y "ÁLBUM DE VIDA" (CON HITOS Y MEDALLAS)
-- ============================================================================

-- Expediente 1: Bella (adoptada de Ángeles de Cuatro Patas)
INSERT INTO seguimiento_mascotas (
    id, pet_id, pet_name, pet_photo, species, shelter_id, shelter_name,
    adopter_name, adopter_location, adoption_date, health_traffic_light,
    last_update_date, next_due_date
) VALUES
(
    'fol-1',
    'pet-adoptada-1',
    'Bella',
    'https://images.unsplash.com/photo-1561037404-61cd46aa615b?auto=format&fit=crop&w=400&q=80',
    'perro',
    'angeles-cuatro-patas',
    'Refugio Ángeles de Cuatro Patas',
    'Mariana Godoy',
    'Godoy Cruz, Mendoza',
    '15 de Octubre de 2026',
    'verde',
    'Hace 2 días',
    '15 de Noviembre de 2026'
);

-- Hitos del Álbum de Vida de Bella
INSERT INTO hitos_seguimiento (
    id, period, title, description, due_date, status, photo_url, notes,
    completed_at, badge_name, badge_icon, badge_description, seguimiento_id
) VALUES
(
    'mh-1',
    'Día 15',
    'Primeros pasos en el hogar',
    'Foto del espacio donde duerme y primeros paseos por el barrio.',
    '30 de Octubre de 2026',
    'completado',
    'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&w=800&q=80',
    'Bella durmió toda la noche en su cucha. Ya reconoció el patio y pasea alegremente con correa.',
    'Completado el 29 de Octubre de 2026',
    'Bienvenida al Hogar',
    '🏠',
    'Completó los primeros 15 días de adaptación con éxito.',
    'fol-1'
),
(
    'mh-2',
    'Día 45',
    'Adaptación plena y control veterinario',
    'Certificado de vacuna anual y foto conviviendo con la familia.',
    '30 de Noviembre de 2026',
    'pendiente',
    NULL,
    'Turno veterinario solicitado en clínica de barrio para la próxima semana.',
    NULL,
    'Salud al Día',
    '🩺',
    'Superó el primer mes y medio con controles sanitarios al día.',
    'fol-1'
);

-- Expediente 2: Simón (gato adoptado de Hogar Felino Mendoza)
INSERT INTO seguimiento_mascotas (
    id, pet_id, pet_name, pet_photo, species, shelter_id, shelter_name,
    adopter_name, adopter_location, adoption_date, health_traffic_light,
    last_update_date, next_due_date
) VALUES
(
    'fol-2',
    'pet-adoptada-2',
    'Simón',
    'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=400&q=80',
    'gato',
    'hogar-felino-mendoza',
    'Hogar Felino Mendoza & Tránsitos',
    'Lucas Benítez',
    'Ciudad de Mendoza, Capital',
    '20 de Octubre de 2026',
    'verde',
    'Ayer',
    '20 de Noviembre de 2026'
);

INSERT INTO hitos_seguimiento (
    id, period, title, description, due_date, status, photo_url, notes,
    completed_at, badge_name, badge_icon, badge_description, seguimiento_id
) VALUES
(
    'mh-3',
    'Día 15',
    'Rincón seguro y uso de arenero',
    'Foto usando sus rascadores y adaptación con la red de balcón instalada.',
    '04 de Noviembre de 2026',
    'completado',
    'https://images.unsplash.com/photo-1543852786-1cf6624b9987?auto=format&fit=crop&w=800&q=80',
    'Simón usa el rascador y ya duerme a los pies de la cama. El balcón quedó 100% enredado.',
    'Completado el 03 de Noviembre de 2026',
    'Hogar Seguro',
    '🐾',
    'Gatito con adaptación excelente en departamento protegido.',
    'fol-2'
);

-- ============================================================================
-- 7. AVISOS DE ZOONOSIS, MÓVILES VETERINARIOS Y NOVEDADES MUNICIPALES
-- ============================================================================
INSERT INTO avisos_zoonosis (
    id, type, title, subtitle, highlight_badge, location, municipality,
    date, action_text, action_url, image, urgent
) VALUES
(
    'aviso-1',
    'movil_zoonosis',
    'Móvil Veterinario en Godoy Cruz: Castraciones y Vacunación Antirrábica',
    'Atención gratuita por orden de llegada con DNI que acredite domicilio en el departamento.',
    'Móvil Zoonosis Gratis',
    'Polideportivo Nº 1 Biritos, Godoy Cruz',
    'Godoy Cruz',
    'Lunes a Viernes de 8:30 a 12:30 hs',
    'Ver requisitos de ayuno y turnos',
    '#movil-info',
    'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&w=800&q=80',
    TRUE
),
(
    'aviso-2',
    'meta_lograda',
    '¡Meta Cumplida! Refugio Ángeles logró juntar 60 bolsas de alimento',
    'Gracias a 180 vecinos mendocinos y donaciones directas por Alias, 38 rescatados tienen comida asegurada.',
    'Festejo Comunitario 🎉',
    'Sede Pedemonte, Luján de Cuyo',
    'Luján de Cuyo',
    'Actualizado recientemente',
    'Ver resumen de agradecimiento',
    '#celebracion-meta',
    'https://images.unsplash.com/photo-1548767797-d8c844163c4c?auto=format&fit=crop&w=800&q=80',
    FALSE
),
(
    'aviso-3',
    'castracion',
    'Campaña Masiva de Castración Comunitaria en Guaymallén',
    'Operativo conjunto entre protectoras independientes y veterinarios matriculados de Mendoza.',
    'Castraciones Gratuitas',
    'Plaza del Encuentro, Guaymallén',
    'Guaymallén',
    'Sábado 28 de Noviembre - 9:00 a 14:00 hs',
    'Anotá a tu mascota aquí',
    '#inscripcion-castracion',
    'https://images.unsplash.com/photo-1629740067905-bd3f515aa739?auto=format&fit=crop&w=800&q=80',
    FALSE
);

-- ============================================================================
-- 8. PATROCINADORES Y COMERCIOS AMIGOS SOLIDARIOS
-- ============================================================================
INSERT INTO patrocinadores (
    id, name, category, tier, logo, description, location, support_type, benefit_for_adopters, contact_url
) VALUES
(
    'sp-godoy-cruz',
    'Municipalidad de Godoy Cruz',
    'municipio',
    'platino',
    'https://images.unsplash.com/photo-1577495508048-b635879837f1?auto=format&fit=crop&w=200&q=80',
    'Dirección de Salud y Zoonosis. Compromiso con la esterilización quirúrgica gratuita y la tenencia responsable.',
    'Godoy Cruz, Mendoza',
    'Móviles de castración y vacunación antirrábica en plazas departamentales.',
    'Vacunación antirrábica y desparasitación gratuita con certificado oficial.',
    'https://www.godoycruz.gob.ar'
),
(
    'sp-vet-cuyo',
    'Clínica Veterinaria Cuyo 24hs',
    'veterinaria',
    'oro',
    'https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?auto=format&fit=crop&w=200&q=80',
    'Atención médica integral, cirugías complejas y guardias veterinarias de urgencia las 24 horas.',
    'Av. San Martín 1420, Godoy Cruz, Mendoza',
    'Tarifa social en cirugías de rescates y atención de urgencias nocturnas.',
    '20% de descuento en la primera consulta clínica y colocación de microchip bonificada.',
    'https://veterinariacuyo.com.ar'
),
(
    'sp-pet-cordillera',
    'Almacén de Mascotas Cordillera',
    'pet_shop',
    'plata',
    'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?auto=format&fit=crop&w=200&q=80',
    'Distribuidora mayorista y minorista de alimentos balanceados premium y accesorios.',
    'Carrodilla, Luján de Cuyo, Mendoza',
    'Donación mensual de alimento y recepción de donaciones vecinales.',
    'Bolsa de bienvenida de 3kg de alimento balanceado con el certificado de adopción.',
    'https://almacencordillera.com.ar'
);

COMMIT;

-- ============================================================================
-- 9. CONSULTAS DE PRUEBA Y VERIFICACIÓN DE INTEGRIDAD REFERENCIAL
--    (Descomentar o ejecutar para verificar la correcta relación entre tablas)
-- ============================================================================

-- A. Listado de animales con su respectivo refugio y cantidad de fotos registradas:
-- SELECT a.id, a.name AS animal, a.species, a.status, r.name AS refugio, COUNT(f.foto_url) AS total_fotos
-- FROM animales a
-- JOIN refugios r ON a.refugio_id = r.id
-- LEFT JOIN animal_fotos f ON a.id = f.animal_id
-- GROUP BY a.id, a.name, a.species, a.status, r.name
-- ORDER BY a.name;

-- B. Solicitudes de adopción con datos del postulante, animal solicitado y refugio responsable:
-- SELECT s.id AS solicitud_id, s.applicant_name, s.applicant_phone, s.status AS estado_solicitud,
--        a.name AS animal_solicitado, r.name AS refugio
-- FROM solicitudes_adopcion s
-- JOIN animales a ON s.animal_id = a.id
-- JOIN refugios r ON a.refugio_id = r.id
-- ORDER BY s.created_at DESC;

-- C. Seguimiento "Álbum de Vida" con sus hitos y medallas ganadas:
-- SELECT sm.pet_name, sm.adopter_name, sm.health_traffic_light,
--        hs.period, hs.title AS hito, hs.badge_name, hs.status AS estado_hito
-- FROM seguimiento_mascotas sm
-- JOIN hitos_seguimiento hs ON sm.id = hs.seguimiento_id
-- ORDER BY sm.pet_name, hs.period;

-- D. Matriz de usuarios del sistema con sus roles y cantidad de permisos asociados:
-- SELECT u.email, u.nombre_completo, r.nombre AS rol, COUNT(rp.permiso_id) AS total_permisos
-- FROM usuarios u
-- JOIN roles r ON u.rol_id = r.id
-- LEFT JOIN rol_permisos rp ON r.id = rp.rol_id
-- GROUP BY u.email, u.nombre_completo, r.nombre
-- ORDER BY total_permisos DESC;
