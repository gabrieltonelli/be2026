# Contexto del Proyecto Be - Para Futuras Conversaciones

## 🚨 IMPORTANTE: Internacionalización (i18n)

**REGLA CRÍTICA**: Todos los textos visibles al usuario **DEBEN** estar en archivos de traducción. **NUNCA** hardcodear strings directamente en componentes.

### Stack de i18n
- **React Native / React Web**: `react-i18next` + `i18next`
- **Backend NestJS**: `nestjs-i18n`

### Estructura de Traducciones
```
i18n/
├── locales/
│   ├── es/               # Español (idioma por defecto)
│   │   ├── common.json   # Textos comunes
│   │   ├── auth.json     # Autenticación
│   │   ├── rating.json   # Calificaciones
│   │   └── profile.json  # Perfil
│   └── en/               # Inglés
│       ├── common.json
│       ├── auth.json
│       ├── rating.json
│       └── profile.json
```

### Uso en Código

#### React / React Native
```tsx
import { useTranslation } from 'react-i18next';

function MyComponent() {
  const { t } = useTranslation('auth');
  return <Text>{t('welcome')}</Text>;
}
```

#### NestJS
```typescript
import { I18n, I18nContext } from 'nestjs-i18n';

async someMethod(@I18n() i18n: I18nContext) {
  return await i18n.t('errors.userNotFound');
}
```

### Convenciones
- **Naming**: camelCase para claves
- **Interpolación**: `{{variable}}`
- **Plurales**: `key` y `key_plural`
- **Idioma por defecto**: Español (es)
- **Fallback**: Español

### Archivos Creados
- `docs/INTERNATIONALIZATION.md` - Guía completa
- `i18n/locales/es/*.json` - Traducciones español
- `i18n/locales/en/*.json` - Traducciones inglés

---

## 🏗️ Stack Tecnológico (DEFINITIVO)

### Frontend Móvil
- **Framework**: React Native
- **Plataformas**: iOS + Android

### Frontend Web
- **Framework**: React + Vite
- **Plataforma**: Web

### Backend
- **Framework**: NestJS (Node.js + TypeScript)
- **ORM**: TypeORM
- **API**: REST

### Base de Datos
- **Motor**: MySQL 8.0+
- **Esquema**: Relacional con FOREIGN KEYS

### Autenticación
- **Servicio**: Firebase Auth
- **Propósito**: Solo login social (Google, Facebook, LinkedIn, Instagram, Twitter)
- **JWT**: Tokens generados por Firebase, validados en NestJS

---

## 📁 Estructura del Proyecto

```
/be
├── mobile/                 # React Native (iOS/Android)
├── web/                    # React Web
├── backend/                # NestJS API
├── i18n/                   # Archivos de traducción compartidos
├── web-prototype/          # Prototipo estático Netlify
├── docs/                   # Documentación
│   ├── ARCHITECTURE.md
│   ├── TECH_STACK.md
│   ├── DATA_MODEL.md
│   ├── DEVELOPMENT_GUIDE.md
│   ├── INTERNATIONALIZATION.md
│   └── ...
└── original_docs/          # Documentos originales del usuario
```

---

## 📚 Documentos de Contexto

### Documentación Técnica
1. **ARCHITECTURE.md** - Arquitectura completa del sistema
2. **TECH_STACK.md** - Decisiones técnicas y justificaciones
3. **DATA_MODEL.md** - Modelo de datos y esquema MySQL
4. **DEVELOPMENT_GUIDE.md** - Guía de setup y desarrollo
5. **INTERNATIONALIZATION.md** - Estrategia de i18n
6. **UI_UX_GUIDE.md** - Diseño UI/UX gaming dark mode

### Documentación de Negocio
1. **README.md** - Overview del proyecto
2. **BUSINESS_CONTEXT.md** - Contexto de negocio y MVP
3. **PROJECT_SUMMARY.md** - Resumen ejecutivo

### Documentos Originales
Los documentos originales del usuario están en `original_docs/`:
- Speach Be.md
- diseño DB.md
- Arbol de Esencia.md
- Drawer menu.md
- diseño.xlsx - Hoja1.csv

---

## 🎯 Concepto del Proyecto

**Be** es una red social de feedback anónimo donde:
- Los usuarios califican contactos en diversos atributos
- Las calificaciones son **completamente anónimas**
- Se organizan en: Ámbito → Categoría → Atributo
- Genera consejos personalizados con IA
- Detecta patrones de bullying
- Modelo freemium (gratis + premium)

### Ámbitos Principales
1. 💼 Laboral
2. 🏛️ Político
3. 🏃 Deportivo
4. 👨‍👩‍👧 Social
5. 🏥 Salud
6. 🎨 Estético
7. 🎭 Artístico

---

## 🎨 Diseño UI/UX

### Principios
- **Dark mode** por defecto (estilo gaming)
- **Animaciones** suaves y fluidas
- **Gamificación** en toda la experiencia
- **Minimalista** pero premium
- **Mobile-first** pero responsive

### Paleta de Colores
```css
--bg-primary: #0f172a
--bg-secondary: #1e293b
--primary: #6366f1 (indigo)
--secondary: #8b5cf6 (purple)
--accent: #06b6d4 (cyan)
```

### Tipografía
- **Headings**: Outfit
- **Body**: Inter

---

## 🔑 Reglas de Negocio Críticas

### Anonimato
- ❌ **NUNCA** revelar quién calificó a quién
- ✅ Solo mostrar promedios agregados
- ✅ Calificaciones individuales encriptadas

### Reciprocidad
- Si ocultas tus calificaciones generales → No puedes ver las de otros

### Detección de Bullying
- Sistema automático detecta patrones
- Alertas a soporte ante múltiples calificaciones negativas
- Protección ante acoso dirigido

---

## 🚀 Estado del Proyecto

### Completado ✅
- Documentación completa
- Prototipo web estático (Netlify-ready)
- Estructura de i18n definida
- Archivos de traducción base (es/en)
- Configuración Git

### Próximos Pasos 🔄
1. Implementar backend NestJS
2. Desarrollar app móvil React Native
3. Desarrollar app web React
4. Integrar Firebase Auth
5. Implementar IA con OpenAI
6. Testing y deploy

---

## 📝 Notas para IA

### Al crear código
- ❌ NO hardcodear textos
- ✅ USAR i18n siempre: `t('namespace:key')`
- ✅ TypeScript en TODO
- ✅ Seguir arquitectura modular
- ✅ Comentar código complejo

### Al modificar documentación
- Mantener consistencia con stack definido
- Actualizar fechas de revisión
- Cross-referenciar documentos relacionados

### Al ayudar con features nuevas
1. Consultar ARCHITECTURE.md primero
2. Revisar DATA_MODEL.md para schema
3. Verificar UI_UX_GUIDE.md para diseño
4. Aplicar i18n desde el inicio

---

**Última actualización**: Febrero 2026  
**Stack definitivo**: React Native + React + NestJS + MySQL + Firebase Auth  
**i18n**: react-i18next + nestjs-i18n  
**Idiomas**: Español (default) + Inglés
