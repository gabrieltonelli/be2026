# Be - Red Social de Feedback Anónimo

> **"We are perceptions"** - Lo que los demás opinan de ti y lo que tú opinas de ellos

## 📋 Descripción

**Be** es una innovadora red social diseñada para ayudar a las personas a obtener retroalimentación honesta y anónima sobre sus características personales, profesionales y sociales. A diferencia de otras redes sociales donde los usuarios controlan su imagen pública, Be refleja cómo realmente te perciben tus contactos.

### El Problema que Resuelve

En redes sociales tradicionales (Facebook, Instagram, LinkedIn), las personas muestran solo lo que desean proyectar. Be cambia esto al permitir que tus contactos califiquen tus atributos de manera **anónima**, brindándote una visión auténtica de cómo eres percibido en diferentes ámbitos de tu vida.

### Propuesta de Valor

- 🎭 **Autenticidad**: Opiniones honestas sin temor a represalias
- 🔒 **Privacidad**: Calificaciones completamente anónimas
- 📊 **Autoconocimiento**: Descubre cómo te perciben en realidad
- 🎯 **Mejora personal**: Identifica áreas de crecimiento con datos concretos
- 🌍 **Transparencia social**: Expone casos de abuso de autoridad o corrupción

## 🚀 Características Principales

### Para el Usuario

- **Calificación de Contactos**: Evalúa a tus amigos, familia y contactos en múltiples atributos
- **Recepción de Feedback**: Recibe calificaciones anónimas sobre tu persona
- **Interfaz Intuitiva**: Sistema de tarjetas deslizables con opciones de calificación 1-5
- **Estadísticas Detalladas**: Visualiza tu calificación global y calificaciones generales por atributo
- **Generación de Informes**: Exporta reportes en PDF (versión premium)
- **Control de Privacidad**: Decide si mostrar o ocultar tus calificaciones generales

### Sistema de Árboles de Esencia

La aplicación organiza las calificaciones en una estructura jerárquica:

```
Ámbito → Categoría → Atributo → Calificación Particular → Calificación General → Calificación Global
```

**Ámbitos disponibles:**
- 💼 Laboral
- 🏛️ Político
- 🏃 Deportivo
- 👨‍👩‍👧 Social (Familia, Amigos, Pareja)
- 🏥 Salud (Física, Mental, Emocional)
- 🎨 Estético
- 🎭 Artístico

## 🛠️ Stack Tecnológico

### Frontend (Móvil)
- **Framework**: React Native
- **Plataformas**: iOS y Android (código compartido)
- **Autenticación Social**: Integración con Facebook, LinkedIn, Instagram, Twitter, Google

### Frontend (Web)
- **Framework**: React
- **Plataformas**: Web
- **Autenticación Social**: Integración con Facebook, LinkedIn, Instagram, Twitter, Google

### Backend
- **Base de Datos**: MySQL
- **Autenticación**: Firebase Auth
- **Microservicios**: NestJS
- **Procesamiento de Datos**: Datamining e IA para generación de consejos personalizados

## 📱 ¿Cómo Funciona?

1. **Registro**: Inicia sesión con tu red social favorita
2. **Importación**: La app recupera automáticamente tu lista de contactos
3. **Configuración Inicial**: Selecciona los ámbitos que te interesan
4. **Navegación**: Desliza entre contactos y tarjetas de atributos
5. **Calificación**: Selecciona 1 de 5 opciones (de negativo a positivo)
6. **Feedback**: Visualiza cómo te califican tus contactos
7. **Mejora**: Recibe consejos personalizados basados en IA

## 🎯 Definiciones Clave

- **Tarjeta de Atributo**: Característica a calificar (ej: "Puntual o Impuntual")
- **Calificación Particular**: Puntaje asignado por un usuario específico
- **Calificación General**: Promedio de todas las calificaciones particulares de un atributo
- **Calificación Global**: Promedio de todas las calificaciones generales (tu "esencia")

## 🔐 Privacidad y Seguridad

- ✅ **Anonimato absoluto** en las calificaciones
- ✅ **Sin comentarios escritos** para evitar agravios
- ✅ **Sistema de detección de bullying**: Alertas automáticas ante patrones de acoso
- ✅ **Control total del usuario**: Decide qué mostrar y qué ocultar
- ✅ **Reciprocidad**: Si ocultas tus calificaciones, no podrás ver las de otros

## 💎 Versión Premium

La versión premium incluye:
- 📄 **Informes detallados** en PDF con gráficos avanzados
- 📈 **Análisis de tendencias** y progreso temporal
- 🎯 **Consejos personalizados** potenciados por IA
- 📊 **Estadísticas comparativas** con promedios generales

## 🎨 Diseño de la Interfaz

### Características Visuales
- **Estilo UI**: Minimalista y moderno. Por defecto dark mode. Estilo gamming. Se puede cambiar a modo claro. Efectos visuales de Iluminación de neon y sombras para dar profundidad. Controles 3d. Animaciones fluidas y efectos de partículas pero no sobrecargado. 
- **UX**: Intuitivo y fácil de usar. Navegación fluida entre contactos y atributos. Sistema de deslizamiento intuitivo entre contactos y atributos.
Menues desplegable para una interface mas limpia. 
- **Tarjetas girables**: El dorso muestra gráficos de calificación general
- **Visualizaciones**: Gráficos de torta, barras y otros para interpretación rápida
- **Opciones de calificación**: 5 niveles desde negativo → neutral → positivo

## 📂 Estructura del Proyecto

```
/be
├── mobile/                 # App React Native (iOS/Android)
│   ├── src/
│   │   ├── screens/       # Pantallas de la aplicación
│   │   ├── components/    # Componentes reutilizables
│   │   ├── services/      # Servicios (API, Auth)
│   │   ├── models/        # Modelos de datos
│   │   └── utils/         # Utilidades y helpers
│   └── package.json
├── web/                    # App React Web
│   ├── src/
│   │   ├── pages/
│   │   ├── components/
│   │   └── services/
│   └── package.json
├── backend/                # Backend NestJS
│   ├── src/
│   │   ├── auth/
│   │   ├── users/
│   │   ├── ratings/
│   │   └── contacts/
│   └── package.json
├── docs/                   # Documentación del proyecto
│   ├── ARCHITECTURE.md    # Arquitectura técnica
│   ├── DATA_MODEL.md      # Modelo de datos MySQL
│   └── DEVELOPMENT_GUIDE.md  # Guía de desarrollo
├── web-prototype/          # Prototipo web estático
└── README.md              # Este archivo
```

## 🚦 Ejecución y Desarrollo

El proyecto Be se divide en módulos. A continuación se detallan las instrucciones para ejecutar cada uno.

### 🖥️ Frontend Web (Companion App)
Diseñado como una "WhatsApp Web" para análisis profundo y reportes.
- **Tecnología**: React + Vite + Tailwind v4.
- **Pasos**:
  ```bash
  cd web
  # Instalar dependencias (solo la primera vez)
  cmd /c npm install
  # Ejecutar en modo desarrollo
  cmd /c npm run dev
  ```
- **Acceso**: Abre `http://localhost:5173` en tu navegador.

### 📱 Frontend Móvil (App Principal)
La experiencia nativa para swipes y calificaciones rápidas.
- **Tecnología**: React Native + Expo.
- **Pasos**:
  1. Instala la app **Expo Go** en tu móvil (App Store / Play Store).
  2. Asegúrate de que tu móvil y PC estén en la **misma red Wi-Fi**.
  3. Ejecuta los comandos:
     ```bash
     cd mobile
     # Instalar dependencias (solo la primera vez)
     cmd /c npm install
     # Iniciar el servidor de Expo
     cmd /c npx expo start
     ```
  4. Escanea el código QR que aparecerá en la terminal con la app Expo Go.

### ⚙️ Backend (Próximamente)
- **Tecnología**: NestJS + MySQL.
- **Estado**: En fase de planificación e inicialización.

## 🌐 Casos de Uso

1. **Autoconocimiento personal**: Descubre cómo te perciben en diferentes ámbitos
2. **Mejora profesional**: Identifica áreas de crecimiento en el trabajo
3. **Relaciones personales**: Entiende mejor tus relaciones familiares y de amistad
4. **Evaluación 360°**: Herramienta para empresas y organizaciones
5. **Transparencia social**: Exponer abusos de autoridad o conductas inapropiadas

## 🎯 Roadmap

- [x] Diseño conceptual y arquitectura
- [ ] Desarrollo del MVP (versión básica)
- [ ] Integración con redes sociales
- [ ] Sistema de calificaciones
- [ ] Generación de informes
- [ ] IA para consejos personalizados
- [ ] Versión premium
- [ ] Lanzamiento público

## 📄 Licencia y Términos

Por favor revisa:
- [Política de Privacidad](docs/privacy-policy.md)
- [Términos y Condiciones](docs/terms-and-conditions.md)

## 📧 Contacto

- **Web**: [Sitio web oficial]
- **Email**: contacto@be.com
- **FAQ**: [Preguntas frecuentes](docs/faq.md)

---

**Be** - Descubre tu verdadera esencia a través de los ojos de quienes te conocen.
