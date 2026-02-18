# Guía de Diseño UI/UX - Be

## Principios de Diseño

### 1. Simplicidad Lúdica
La interfaz debe ser **divertida e intuitiva**, haciendo que calificar contactos sea una experiencia agradable, no tediosa.

### 2. Claridad Visual
Cada elemento debe tener un propósito claro. Los usuarios deben entender inmediatamente qué hacer y qué significa cada visualización.

### 3. Feedback Inmediato
Toda acción debe tener una respuesta visual inmediata (animaciones, cambios de estado).

### 4. Estética Atractiva
Diseño moderno, colores vibrantes, gráficos elegantes.

## Componentes Principales

### 1. Pantalla de Login

#### Diseño
- Fondo degradado suave (azul → morado)
- Logo de Be centrado en la parte superior
- Slogan principal: "We are perceptions"
- Botones de redes sociales apilados verticalmente

#### Botones de Red Social
```
┌──────────────────────────────────┐
│  [f]  Continuar con Facebook     │
└──────────────────────────────────┘
┌──────────────────────────────────┐
│  [G]  Continuar con Google       │
└──────────────────────────────────┘
┌──────────────────────────────────┐
│  [in] Continuar con LinkedIn     │
└──────────────────────────────────┘
```

- Cada botón con el color corporativo de la red social
- Ícono de la red a la izquierda
- Animación sutil al hover (escala ligeramente)

---

### 2. Asistente de Configuración Inicial (Wizard)

#### Paso 1: Bienvenida
- Animación de logo
- Texto: "¿Listo para descubrir tu verdadera esencia?"
- Botón: "Empecemos"

#### Paso 2: Selección de Ámbitos
```
"¿Sobre qué ámbitos te interesa calificar a tus contactos?"

┌─────────────┐  ┌─────────────┐  ┌─────────────┐
│  💼         │  │  👨‍👩‍👧        │  │  🏃          │
│  Laboral    │  │  Social     │  │  Deportivo  │
│  [✓]        │  │  [✓]        │  │  [ ]        │
└─────────────┘  └─────────────┘  └─────────────┘

┌─────────────┐  ┌─────────────┐  ┌─────────────┐
│  🏥         │  │  🎨         │  │  🎭          │
│  Salud      │  │  Estético   │  │  Artístico  │
│  [✓]        │  │  [ ]        │  │  [ ]        │
└─────────────┘  └─────────────┘  └─────────────┘
```

- Grid de tarjetas seleccionables
- Al seleccionar, cambio de color y checkmark
- Mínimo 1 ámbito requerido

#### Paso 3: Ámbitos de Interés Personal
"¿Sobre qué aspectos te interesa que te califiquen?"

(Mismo diseño que Paso 2)

---

### 3. Home Screen (Interfaz de Calificación)

Esta es la pantalla principal de la aplicación.

#### Estructura

```
┌────────────────────────────────────────────┐
│  [☰]  Be              [🔍] [🔔] [👤]      │
├────────────────────────────────────────────┤
│                                            │
│  ┌──────────────────────────────────────┐ │
│  │     CONTACTO ACTUAL                  │ │
│  │     ┌────────┐                       │ │
│  │     │ Avatar │  María García         │ │
│  │     └────────┘  Facebook              │ │
│  │                                       │ │
│  │     Calificación Global: ★★★★☆ 4.2  │ │
│  └──────────────────────────────────────┘ │
│  ◄──────────────────────────────────────► │
│         (Deslizar entre contactos)        │
│                                            │
│  ┌──────────────────────────────────────┐ │
│  │  TARJETA DE ATRIBUTO                 │ │
│  │                                       │ │
│  │  Ámbito: Laboral > Personalidad      │ │
│  │                                       │ │
│  │  ╔════════════════════════════╗      │ │
│  │  ║                            ║      │ │
│  │  ║       PUNTUAL              ║      │ │
│  │  ║          ↕                 ║      │ │
│  │  ║       IMPUNTUAL            ║      │ │
│  │  ║                            ║      │ │
│  │  ║    [1] [2] [3] [4] [5]    ║      │ │
│  │  ║     ☹  🙁  😐  🙂  😊     ║      │ │
│  │  ╚════════════════════════════╝      │ │
│  │                                       │ │
│  │         [Girar tarjeta] ↻            │ │
│  └──────────────────────────────────────┘ │
│  ▲                                        │
│  ▼                                        │
│  (Deslizar entre atributos)              │
│                                            │
└────────────────────────────────────────────┘
```

#### Contacto Slider (Horizontal)
- **Gesto**: Swipe izquierda/derecha
- **Animación**: Card slide con suavidad
- **Indicador**: Puntos en la parte inferior (• • ● • •)
- **Avatar**: Circular, 80x80px
- **Nombre**: Typography bold, 18pt
- **Red social**: Icon + texto, 12pt, color gris
- **Calificación global**: Estrellas + número

#### Tarjeta de Atributo (Vertical)

##### Frente de la Tarjeta
- **Header**: Breadcrumb del ámbito > categoría
- **Cuerpo**:
  - Término positivo arriba
  - Flecha bidireccional
  - Término negativo abajo
  - Escala de calificación 1-5 con emojis

- **Diseño de la escala**:
```
[1]      [2]      [3]      [4]      [5]
☹️       🙁       😐       🙂       😊
Muy     Algo     Neutro   Algo     Muy
Neg     Neg               Pos      Pos
```

- **Interacción**: Tap en un número/emoji para calificar
- **Feedback visual**: El seleccionado crece y brilla

##### Dorso de la Tarjeta
- **Gesto**: Tap en "Girar tarjeta" o swipe vertical especial
- **Animación**: Flip 3D suave (180°)
- **Contenido**:
  - Título: "Calificación General de [Contacto]"
  - Gráfico circular (torta) o barra
  - Número grande: "4.2 / 5"
  - Total de calificaciones: "Basado en 8 opiniones"

```
┌────────────────────────────┐
│  Calificación General      │
│                            │
│      ╭─────╮               │
│      │ 4.2 │               │
│      ╰─────╯               │
│                            │
│   [Gráfico de Torta]       │
│    ██████░░░░  86%         │
│                            │
│  Basado en 8 opiniones     │
│                            │
│  [Volver] ↶                │
└────────────────────────────┘
```

---

### 4. Drawer Menu (Menú Lateral)

#### Header
- Avatar del usuario
- Nombre
- Calificación global destacada
- Botón "Ver mi perfil"

#### Secciones

```
┌────────────────────────────┐
│  ┌────┐                    │
│  │ 👤 │  Juan Pérez        │
│  └────┘  ★★★★☆ 4.3        │
│          [Ver mi perfil]   │
├────────────────────────────┤
│  📊 Mi Reporte             │
│  ⚙️  Preferencias           │
│  👥 Contactos              │
│  💼 Workspaces             │
│  🤝 Colabora               │
│  ℹ️  Acerca de Be          │
├────────────────────────────┤
│  🚪 Cerrar sesión          │
└────────────────────────────┘
```

---

### 5. Mi Perfil / Reporte

#### Sección Hero
- Avatar grande
- Nombre
- **Calificación Global**: Número grande + estrellas + gráfico radial

```
┌────────────────────────────────┐
│        ┌────────┐               │
│        │        │               │
│        │ Avatar │               │
│        │        │               │
│        └────────┘               │
│                                 │
│       Juan Pérez                │
│                                 │
│   ╔═══════════════════╗         │
│   ║                   ║         │
│   ║       4.3         ║         │
│   ║   ★★★★☆           ║         │
│   ║                   ║         │
│   ║  Tu Esencia       ║         │
│   ╚═══════════════════╝         │
│                                 │
│  Basado en 156 calificaciones  │
└────────────────────────────────┘
```

#### Consejo Actual
- Card destacada
- Icono de bombilla 💡
- Título del consejo
- Texto breve
- Botón "Ver historial de consejos"

#### Secciones de Estadísticas

##### Tabs
- Instantánea
- Progreso
- Tops

##### Instantánea
Gráficos por ámbito:
```
Laboral       ████████░░  4.5/5
Social        ███████░░░  4.2/5
Salud         ██████░░░░  3.8/5
Estético      ████████░░  4.4/5
```

##### Progreso
- Gráfico de línea temporal
- Muestra evolución de calificación global
- Filtros por ámbito

##### Tops
```
🏆 Mejores 5 Atributos
1. Honesto         4.8/5 ★★★★★
2. Creativo        4.7/5 ★★★★★
3. Leal            4.6/5 ★★★★★
4. Comunicativo    4.5/5 ★★★★☆
5. Puntual         4.4/5 ★★★★☆

⚠️ Áreas de Mejora
1. Tolerante       2.8/5 ★★★☆☆
2. Flexible        3.0/5 ★★★☆☆
3. Paciente        3.2/5 ★★★☆☆
```

#### Exportar Informe (Premium)
- Botón destacado
- Modal:
  - Opción: Informe Resumido
  - Opción: Informe Completo
  - Botón: "Generar PDF"

---

### 6. Preferencias

Organizado en secciones expandibles:

```
┌──────────────────────────────┐
│  ▼ General                   │
│     Idioma: Español          │
│     Modo oscuro: [ON]        │
├──────────────────────────────┤
│  ▼ Privacidad                │
│     Ocultar mis              │
│     calificaciones: [OFF]    │
├──────────────────────────────┤
│  ▼ Notificaciones            │
│     Nuevas calificaciones    │
│       [✓] Activar            │
│     Consejos generados       │
│       [✓] Activar            │
│     Umbral de variación      │
│       [Slider: 0.5]          │
└──────────────────────────────┘
```

---

## Paleta de Colores

### Tema Claro
- **Primario**: `#6366f1` (Índigo vibrante)
- **Secundario**: `#8b5cf6` (Púrpura)
- **Acento**: `#06b6d4` (Cyan)
- **Fondo**: `#ffffff`
- **Superficie**: `#f9fafb`
- **Texto primario**: `#111827`
- **Texto secundario**: `#6b7280`

### Tema Oscuro
- **Primario**: `#818cf8`
- **Secundario**: `#a78bfa`
- **Acento**: `#22d3ee`
- **Fondo**: `#0f172a`
- **Superficie**: `#1e293b`
- **Texto primario**: `#f1f5f9`
- **Texto secundario**: `#94a3b8`

### Calificaciones
- **1 (Muy Negativo)**: `#ef4444` (Rojo)
- **2 (Negativo)**: `#f97316` (Naranja)
- **3 (Neutral)**: `#eab308` (Amarillo)
- **4 (Positivo)**: `#84cc16` (Lima)
- **5 (Muy Positivo)**: `#22c55e` (Verde)

---

## Tipografía

- **Familia principal**: Inter (sans-serif moderno)
- **Familia secundaria**: Outfit (para headings)

### Escala
- **Heading 1**: 32pt, Bold
- **Heading 2**: 24pt, Bold
- **Heading 3**: 20pt, SemiBold
- **Body**: 16pt, Regular
- **Caption**: 14pt, Regular
- **Small**: 12pt, Regular

---

## Iconografía

- **Librería**: Font Awesome 6 o Material Icons
- **Estilo**: Rounded (suaves, amigables)
- **Tamaños**: 16px, 24px, 32px, 48px

---

## Animaciones

### Principios
- **Duración**: 200-300ms (rápidas)
- **Easing**: `ease-in-out` o cubic-bezier personalizado
- **Naturalidad**: Simulan física real (bounces suaves)

### Ejemplos

1. **Calificar atributo**:
   - Emoji seleccionado: scale(1.2) + brillo
   - Tarjeta: pulso sutil
   - Confeti micro en calificaciones 5/5

2. **Girar tarjeta**:
   - Flip 3D en eje Y, 300ms
   - Fade in del contenido del dorso

3. **Cambiar contacto**:
   - Slide horizontal, 250ms
   - Fade in del nuevo contacto

4. **Abrir drawer**:
   - Slide from left, 300ms
   - Overlay fade in

---

## Responsive Design

Aunque es una app móvil, considerar diferentes tamaños:

- **Small phones**: 320-375px
- **Medium phones**: 376-414px
- **Large phones / Tablets**: 415px+

Ajustar:
- Tamaño de tarjetas
- Espaciado
- Tamaño de fuentes (ligeramente)

---

## Accesibilidad

- ✅ **Contraste**: WCAG AA mínimo (4.5:1 texto normal)
- ✅ **Touch targets**: Mínimo 44x44px
- ✅ **Feedback háptico**: Al calificar, al cambiar contacto
- ✅ **VoiceOver support**: Descripciones claras para lectores de pantalla
- ✅ **Emojis + texto**: No solo emojis para calificaciones, también números/texto

---

## Estados de Carga

- **Skeleton screens** para listas y cards
- **Spinners** solo cuando sea absolutamente necesario
- **Pull to refresh** en listas

---

## Mensajes de Error y Vacíos

### Error de conexión
```
┌─────────────────────────┐
│       🌐 ❌             │
│                         │
│  Sin conexión           │
│                         │
│  No pudimos conectar    │
│  con el servidor        │
│                         │
│  [Reintentar]           │
└─────────────────────────┘
```

### Sin contactos
```
┌─────────────────────────┐
│       👥                │
│                         │
│  Aún no tienes          │
│  contactos              │
│                         │
│  Conecta tu red social  │
│  para empezar           │
│                         │
│  [Conectar Red]         │
└─────────────────────────┘
```

---

## Microinteracciones

1. **Like/Unlike**: Animación de corazón al marcar favorito
2. **Pull to refresh**: Spinner + mensaje "Actualizando..."
3. **Swipe actions**: Revelar opciones (ocultar contacto, favorito)
4. **Haptic feedback**: En selecciones importantes
5. **Progress indicators**: Mostrar avance en wizard
