# Estrategia de Internacionalización (i18n) - Proyecto Be

## 🌍 Visión General

Be está diseñado para soportar **múltiples idiomas** desde el inicio. Usamos estándares de la industria para cada plataforma.

## 📚 Stack de i18n por Plataforma

### Mobile (React Native)
- **Librería**: `react-i18next` + `i18next`
- **Storage**: `@react-native-async-storage/async-storage`
- **Detección**: `i18next-browser-languagedetector`

### Web (React)
- **Librería**: `react-i18next` + `i18next`
- **Storage**: `localStorage`
- **Detección**: `i18next-browser-languagedetector`

### Backend (NestJS)
- **Librería**: `nestjs-i18n`
- **Formato**: JSON files
- **Fallback**: Español (es)

---

## 🗂️ Estructura de Archivos

### Mobile & Web
```
src/
├── i18n/
│   ├── index.ts              # Configuración de i18next
│   ├── locales/
│   │   ├── es/
│   │   │   ├── common.json   # Textos comunes
│   │   │   ├── auth.json     # Autenticación
│   │   │   ├── rating.json   # Calificaciones
│   │   │   └── profile.json  # Perfil
│   │   ├── en/
│   │   │   ├── common.json
│   │   │   ├── auth.json
│   │   │   ├── rating.json
│   │   │   └── profile.json
│   │   └── pt/               # Portugués (futuro)
│   └── types.ts              # TypeScript types
```

### Backend (NestJS)
```
src/
├── i18n/
│   ├── es/
│   │   ├── validation.json   # Mensajes de validación
│   │   ├── errors.json       # Mensajes de error
│   │   └── emails.json       # Plantillas de email
│   ├── en/
│   │   ├── validation.json
│   │   ├── errors.json
│   │   └── emails.json
```

---

## 🔧 Configuración

### React Native / React Web

```typescript
// src/i18n/index.ts
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Mobile
// import { localStorage } from 'window'; // Web

// Importar traducciones
import esCommon from './locales/es/common.json';
import esAuth from './locales/es/auth.json';
import esRating from './locales/es/rating.json';
import esProfile from './locales/es/profile.json';

import enCommon from './locales/en/common.json';
import enAuth from './locales/en/auth.json';
import enRating from './locales/en/rating.json';
import enProfile from './locales/en/profile.json';

const resources = {
  es: {
    common: esCommon,
    auth: esAuth,
    rating: esRating,
    profile: esProfile,
  },
  en: {
    common: enCommon,
    auth: enAuth,
    rating: enRating,
    profile: enProfile,
  },
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'es', // Idioma por defecto
    fallbackLng: 'es',
    defaultNS: 'common',
    ns: ['common', 'auth', 'rating', 'profile'],
    
    interpolation: {
      escapeValue: false, // React ya escapa por defecto
    },
    
    react: {
      useSuspense: false,
    },
  });

// Cargar idioma guardado
AsyncStorage.getItem('userLanguage').then((lang) => {
  if (lang) {
    i18n.changeLanguage(lang);
  }
});

export default i18n;
```

### NestJS

```typescript
// src/app.module.ts
import { Module } from '@nestjs/common';
import { I18nModule, AcceptLanguageResolver } from 'nestjs-i18n';
import * as path from 'path';

@Module({
  imports: [
    I18nModule.forRoot({
      fallbackLanguage: 'es',
      loaderOptions: {
        path: path.join(__dirname, '/i18n/'),
        watch: true,
      },
      resolvers: [
        AcceptLanguageResolver, // Lee header Accept-Language
      ],
    }),
  ],
})
export class AppModule {}
```

---

## 📝 Uso en Código

### React / React Native

```tsx
import { useTranslation } from 'react-i18next';

function LoginScreen() {
  const { t, i18n } = useTranslation('auth');
  
  const changeLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
    AsyncStorage.setItem('userLanguage', lang);
  };
  
  return (
    <View>
      <Text>{t('welcome')}</Text>
      <Text>{t('loginWith', { network: 'Google' })}</Text>
      
      <Button onPress={() => changeLanguage('en')}>
        English
      </Button>
      <Button onPress={() => changeLanguage('es')}>
        Español
      </Button>
    </View>
  );
}
```

### NestJS

```typescript
import { Controller, Get } from '@nestjs/common';
import { I18n, I18nContext } from 'nestjs-i18n';

@Controller('users')
export class UsersController {
  @Get()
  async getUsers(@I18n() i18n: I18nContext) {
    throw new BadRequestException(
      await i18n.t('errors.userNotFound')
    );
  }
}
```

---

## 🌐 Idiomas Soportados

### Fase 1 (MVP)
- ✅ **Español** (es) - Idioma principal
- ✅ **Inglés** (en) - Internacional

### Fase 2 (Expansión)
- 🔄 **Portugués** (pt) - Brasil
- 🔄 **Francés** (fr) - Europa
- 🔄 **Alemán** (de) - Europa

---

## 📋 Convenciones de Naming

### Keys de Traducción

Usar **camelCase** y estructura jerárquica:

```json
{
  "auth": {
    "welcome": "Bienvenido a Be",
    "loginWith": "Continuar con {{network}}",
    "errors": {
      "invalidCredentials": "Credenciales inválidas",
      "networkError": "Error de conexión"
    }
  }
}
```

### Interpolación

```json
{
  "greeting": "Hola, {{name}}",
  "ratingCount": "Tienes {{count}} calificación",
  "ratingCount_plural": "Tienes {{count}} calificaciones"
}
```

Uso:
```tsx
t('greeting', { name: 'Juan' })
t('ratingCount', { count: 1 })  // "Tienes 1 calificación"
t('ratingCount', { count: 5 })  // "Tienes 5 calificaciones"
```

---

## 🔄 Proceso de Traducción

### 1. Desarrollo

Desarrollador añade claves en **español**:

```json
// locales/es/common.json
{
  "save": "Guardar",
  "cancel": "Cancelar"
}
```

### 2. Traducción

Traductor completa archivo en **inglés**:

```json
// locales/en/common.json
{
  "save": "Save",
  "cancel": "Cancel"
}
```

### 3. Verificación

Script automático verifica que todas las claves existan en todos los idiomas:

```bash
npm run i18n:check
```

---

## 🛠️ Scripts Útiles

```json
{
  "scripts": {
    "i18n:check": "node scripts/check-i18n-keys.js",
    "i18n:extract": "i18next-scanner",
    "i18n:sync": "node scripts/sync-i18n-keys.js"
  }
}
```

---

## 📱 Cambio de Idioma en UI

### Settings Screen

```tsx
function LanguageSettings() {
  const { i18n, t } = useTranslation('common');
  const [currentLang, setCurrentLang] = useState(i18n.language);
  
  const languages = [
    { code: 'es', name: 'Español', flag: '🇪🇸' },
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'pt', name: 'Português', flag: '🇧🇷' },
  ];
  
  const changeLang = async (lang: string) => {
    await i18n.changeLanguage(lang);
    await AsyncStorage.setItem('userLanguage', lang);
    setCurrentLang(lang);
  };
  
  return (
    <View>
      <Text>{t('selectLanguage')}</Text>
      {languages.map((lang) => (
        <TouchableOpacity
          key={lang.code}
          onPress={() => changeLang(lang.code)}
        >
          <Text>{lang.flag} {lang.name}</Text>
          {currentLang === lang.code && <Icon name="check" />}
        </TouchableOpacity>
      ))}
    </View>
  );
}
```

---

## 🎯 Mejores Prácticas

### ✅ DO

- Usar **namespaces** para organizar traducciones
- Definir **types** para autocompletado TypeScript
- Mantener claves en **camelCase**
- Usar **interpolación** para variables
- Soportar **plurales**
- Guardar idioma en **AsyncStorage/localStorage**

### ❌ DON'T

- Hardcodear textos directamente en componentes
- Mezclar idiomas en un mismo archivo
- Usar espacios o caracteres especiales en keys
- Duplicar traducciones
- Olvidar actualizar todos los idiomas

---

## 📊 Ejemplo de Archivo de Traducción Completo

### `locales/es/auth.json`

```json
{
  "welcome": "Bienvenido a Be",
  "tagline": "Descubre tu verdadera esencia",
  "loginWith": "Continuar con {{network}}",
  "moreNetworks": "Más redes sociales",
  "disclaimer": "Al continuar, aceptas nuestros {{terms}} y {{privacy}}",
  "terms": "Términos",
  "privacy": "Política de Privacidad",
  "errors": {
    "invalidCredentials": "Credenciales inválidas",
    "networkError": "Error de conexión. Intenta nuevamente",
    "accountDisabled": "Tu cuenta ha sido deshabilitada",
    "unknownError": "Ocurrió un error inesperado"
  },
  "loading": {
    "signingIn": "Iniciando sesión...",
    "fetchingProfile": "Obteniendo perfil...",
    "connectingNetwork": "Conectando con {{network}}..."
  }
}
```

### `locales/en/auth.json`

```json
{
  "welcome": "Welcome to Be",
  "tagline": "Discover your true essence",
  "loginWith": "Continue with {{network}}",
  "moreNetworks": "More social networks",
  "disclaimer": "By continuing, you accept our {{terms}} and {{privacy}}",
  "terms": "Terms",
  "privacy": "Privacy Policy",
  "errors": {
    "invalidCredentials": "Invalid credentials",
    "networkError": "Connection error. Try again",
    "accountDisabled": "Your account has been disabled",
    "unknownError": "An unexpected error occurred"
  },
  "loading": {
    "signingIn": "Signing in...",
    "fetchingProfile": "Fetching profile...",
    "connectingNetwork": "Connecting with {{network}}..."
  }
}
```

---

## 🔮 Futuro: Traducciones Dinámicas

Para contenido generado por IA (consejos personalizados), usar API de traducción:

```typescript
// analytics.service.ts (NestJS)
async generateAdvice(userId: number, lang: string) {
  const advice = await this.openai.chat.completions.create({
    model: "gpt-4",
    messages: [
      {
        role: "system",
        content: `Generate advice in ${lang === 'es' ? 'Spanish' : 'English'}`
      },
      // ...
    ]
  });
  
  return advice;
}
```

---

## 📋 Checklist de Implementación

- [ ] Instalar dependencias i18n
- [ ] Crear estructura de carpetas
- [ ] Configurar i18next (mobile/web)
- [ ] Configurar nestjs-i18n (backend)
- [ ] Crear archivos de traducción (es/en)
- [ ] Migrar textos hardcodeados a i18n
- [ ] Crear componente de selección de idioma
- [ ] Persistir idioma seleccionado
- [ ] Documentar proceso para nuevos idiomas
- [ ] Crear scripts de verificación

---

**IMPORTANTE**: Todo texto visible para el usuario **DEBE** estar en archivos de traducción. Nunca hardcodear strings directamente en componentes.
