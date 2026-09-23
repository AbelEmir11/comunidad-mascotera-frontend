# 🐾 Comunidad Mascotera Mendoza — Frontend

Plataforma web comunitaria desarrollada para conectar refugios de animales en Mendoza (y Argentina) con familias adoptantes responsables, integrando un sistema didáctico de seguimiento post-adopción (**"Álbum de Vida"** con medallas y semáforo de salud), donaciones 100% directas mediante Alias/CBU (sin comisiones intermediarias) y articulación con zoonosis municipal y veterinarias patrocinadoras.

> 🎓 **Proyecto Universitario / Académico:**  
> Este repositorio corresponde a la capa cliente (**Frontend**) bajo una arquitectura desacoplada (*Decoupled Client-Server Architecture*).  
> La API REST y la lógica de negocio persistente se encuentran en el repositorio hermano:  
> 👉 **[comunidad-mascotera-backend](https://github.com/TU_USUARIO/comunidad-mascotera-backend)** (Java Spring Boot 3 + H2 Database).

---

## 🚀 Tecnologías Principales

- **Framework:** [Next.js](https://nextjs.org/) (App Router, Server & Client Components)
- **Librería UI:** React 19 + TypeScript
- **Estilos:** Tailwind CSS v4 (Mobile-first, diseño limpio y accesible)
- **Iconografía:** Lucide React
- **Consumo de Servicios:** Fetch API con tipado estricto y fallback local de resiliencia

---

## ✨ Características y Módulos

1. **Catálogo Inteligente de Adopciones (`/adoptar`)**
   - Filtros por especie (perros / gatos), tamaño y condiciones de vida (apto departamento, convive con chicos, adopción urgente).
   - **Sistema de Favoritos:** Guardado interactivo en `localStorage` con animación y filtro rápido de favoritos.
   - **Test de Compatibilidad ("Match"):** Asistente interactivo que evalúa estilo de vida, espacio y tiempo disponible para sugerir la mascota ideal.

2. **Ficha de la Mascota y Formulario de Postulación (`/mascotas/[id]`)**
   - Pasaporte sanitario visual (vacunación, castración, desparasitación).
   - Formulario de adopción responsable con **validación estricta:**
     - Bloqueo de caracteres no numéricos en DNI y teléfono.
     - Longitud mínima de 8 dígitos con contador en tiempo real.
     - Botón de envío condicionado al cumplimiento de los requisitos.

3. **Álbum de Vida y Seguimiento Didáctico (`/seguimiento`)**
   - Mecánica gamificada post-adopción: el adoptante sube fotos y anécdotas periódicas.
   - Desbloqueo de medallas (*"Primeros Pasos"*, *"Veterinaria al Día"*, *"Familia Consolidada"*).
   - Semáforo de tranquilidad para el refugio (`Verde`: al día, `Amarillo`: aviso pendiente, `Rojo`: alerta de seguimiento).

4. **Red de Refugios y Donaciones 100% Directas (`/refugios`)**
   - Perfil de cada refugio con su censo de rescatados y barra de necesidades urgentes.
   - Botón directo para copiar **Alias / CBU bancario** del refugio, garantizando que el 100% del aporte llegue a los animales sin comisiones de pasarelas de pago.

5. **Mural de Zoonosis y Patrocinadores (`/zoonosis`, `/patrocinadores`)**
   - Turnos para campañas de castración gratuita comunal.
   - Cronograma y preparación para el móvil veterinario.
   - Festejo de metas solidarias logradas y jornadas de adopción.
   - Espacio para veterinarias, municipios y comercios amigos.

---

## 🛠️ Instalación y Puesta en Marcha

### Prerrequisitos
- [Node.js](https://nodejs.org/) (versión 18 o superior)
- [npm](https://www.npmjs.com/) (incluido con Node.js)

### Pasos

1. **Clonar el repositorio:**
   ```bash
   git clone https://github.com/TU_USUARIO/comunidad-mascotera-frontend.git
   cd comunidad-mascotera-frontend
   ```

2. **Instalar dependencias:**
   ```bash
   npm install
   ```

3. **Configurar variables de entorno (opcional):**
   Crea un archivo `.env.local` en la raíz si deseas personalizar la URL del backend:
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:8080/api
   ```
   *(Por defecto ya apunta a `http://localhost:8080/api` y cuenta con datos de prueba si el backend está apagado).*

4. **Iniciar el servidor de desarrollo:**
   ```bash
   npm run dev
   ```
   Abrir [http://localhost:3000](http://localhost:3000) en el navegador.

5. **Compilar para producción:**
   ```bash
   npm run build
   npm run start
   ```

---

## 📁 Estructura del Código

```text
src/
├── app/                  # Rutas y páginas (Next.js App Router)
│   ├── adoptar/          # Catálogo con filtros y Test de Match
│   ├── mascotas/[id]/    # Detalle de animal y postulación
│   ├── refugios/         # Directorio de refugios y donaciones
│   ├── seguimiento/      # Álbum de Vida gamificado
│   ├── zoonosis/         # Campañas municipales y móvil
│   ├── patrocinadores/   # Veterinars y comercios aliados
│   └── page.tsx          # Landing page principal
├── components/           # Componentes reutilizables (Navbar, Footer, PetCard, Modals)
├── data/                 # Datos mock y semillas de contingencia
├── services/             # Cliente HTTP conectado a la API de Java Spring Boot
└── types/                # Interfaces y tipos de TypeScript
```

---

## 🤝 Repositorio Backend

Para ejecutar el sistema completo con persistencia en base de datos H2 y API REST en Java:
- Clonar y ejecutar: **[comunidad-mascotera-backend](https://github.com/TU_USUARIO/comunidad-mascotera-backend)**
