# Arquitectura del Proyecto Be

## Visión General

Be es una aplicación multiplataforma (móvil y web) que permite a los usuarios calificar y ser calificados de manera anónima en diversos atributos personales, profesionales y sociales. La arquitectura está diseñada para ser escalable, segura y mantener el anonimato absoluto.

## Stack Tecnológico

### Frontend - Aplicación Móvil

#### React Native
- **Versión**: Latest
- **Plataformas**: iOS y Android (código compartido)
- **Ventajas**: 
  - Una sola base de código para ambas plataformas
  - Interfaces nativas y atractivas
  - Rendimiento nativo con componentes nativos
  - Hot reload para desarrollo rápido
  - Gran ecosistema de librerías

#### Dependencias Principales (Mobile)
```json
{
  "dependencies": {
    "react": "^18.x",
    "react-native": "^0.72.x",
    "@react-navigation/native": "^6.x",
    "@react-navigation/stack": "^6.x",
    "axios": "^1.x",
    "react-native-firebase": "^latest",
    "react-native-charts-wrapper": "^latest"
  }
}
```

### Frontend - Web

#### React
- **Framework**: React con Vite
- **Styling**: CSS Modules / Tailwind CSS
- **State Management**: Context API / Redux Toolkit
- **Routing**: React Router v6

#### Dependencias Principales (Web)
```json
{
  "dependencies": {
    "react": "^18.x",
    "react-dom": "^18.x",
    "react-router-dom": "^6.x",
    "axios": "^1.x",
    "chart.js": "^4.x",
    "react-chartjs-2": "^5.x"
  }
}
```

### Backend - Microservicios

#### NestJS
**Propósito**: API RESTful robusta y escalable

- **Framework**: NestJS (Node.js + TypeScript)
- **Arquitectura**: Microservicios modulares
- **ORM**: TypeORM
- **Validación**: class-validator

#### Módulos Principales
```typescript
src/
├── auth/              # Autenticación y autorización
├── users/             # Gestión de usuarios
├── contacts/          # Gestión de contactos
├── ratings/           # Sistema de calificaciones
├── ambits/            # Ámbitos, categorías y atributos
├── analytics/         # Estadísticas y análisis
├── notifications/     # Sistema de notificaciones
└── reports/           # Generación de reportes PDF
```

### Base de Datos

#### MySQL
**Propósito**: Almacenamiento relacional de datos

- **Motor**: MySQL 8.0+
- **ORM**: TypeORM
- **Migraciones**: TypeORM migrations
- **Backup**: Automatizado diario

### Autenticación

#### Firebase Auth
**Propósito**: Autenticación social y gestión de sesiones

- **Proveedores soportados**:
  - Facebook
  - Google
  - LinkedIn
  - Instagram
  - Twitter

- **JWT Tokens**: Generados por Firebase, validados en NestJS

## Arquitectura de Datos

### Modelo Conceptual: Árbol de Esencia

```
┌─────────────────────────────────────────────────────────────┐
│                      CALIFICACIÓN GLOBAL                     │
│              (Promedio de todas las calificaciones           │
│                  generales del usuario)                      │
└───────────────┬─────────────────────────────────────────────┘
                │
                ├──► CALIFICACIÓN GENERAL (por atributo)
                │    (Promedio de calificaciones particulares)
                │
                └──► Calificación Particular
                     (Opinión individual de un contacto)
                     
Árbol: Ámbito → Categoría → Atributo
```

### Ejemplo Práctico

```
Ámbito: Laboral
  ├── Categoría: Personalidad
  │     ├── Atributo: Puntual / Impuntual
  │     │     ├── Calificación Particular (Usuario A): 4/5
  │     │     ├── Calificación Particular (Usuario B): 5/5
  │     │     └── Calificación General: 4.5/5
  │     │
  │     └── Atributo: Honesto / Deshonesto
  │           └── Calificación General: 4.0/5
  │
  └── Categoría: Competitividad
        └── Atributo: Eficiente / Ineficiente
              └── Calificación General: 3.8/5

Calificación Global del Usuario: Promedio(4.5, 4.0, 3.8, ...) = 4.1/5
```

### Esquema de Base de Datos (MySQL)

#### Tabla: users
```sql
CREATE TABLE users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  firebase_uid VARCHAR(128) UNIQUE NOT NULL,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  avatar_url VARCHAR(512),
  global_rating DECIMAL(2,1) DEFAULT 0.0,
  is_premium BOOLEAN DEFAULT FALSE,
  hide_general_ratings BOOLEAN DEFAULT FALSE,
  selected_ambits JSON,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_firebase_uid (firebase_uid),
  INDEX idx_email (email)
);
```

#### Tabla: social_networks
```sql
CREATE TABLE social_networks (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL,
  type ENUM('facebook', 'google', 'linkedin', 'instagram', 'twitter') NOT NULL,
  social_id VARCHAR(255) NOT NULL,
  username VARCHAR(255),
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  UNIQUE KEY unique_social (user_id, type)
);
```

#### Tabla: contacts
```sql
CREATE TABLE contacts (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL,
  name VARCHAR(255) NOT NULL,
  source ENUM('facebook', 'google', 'linkedin', 'instagram', 'twitter', 'manual') NOT NULL,
  source_id VARCHAR(255),
  avatar_url VARCHAR(512),
  is_hidden BOOLEAN DEFAULT FALSE,
  is_favorite BOOLEAN DEFAULT FALSE,
  groups JSON,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  INDEX idx_user_id (user_id),
  INDEX idx_source (source)
);
```

#### Tabla: ratings
```sql
CREATE TABLE ratings (
  id INT PRIMARY KEY AUTO_INCREMENT,
  from_user_id INT NOT NULL,
  to_contact_id INT NOT NULL,
  attribute_id INT NOT NULL,
  score TINYINT NOT NULL CHECK (score BETWEEN 1 AND 5),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (from_user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (to_contact_id) REFERENCES contacts(id) ON DELETE CASCADE,
  FOREIGN KEY (attribute_id) REFERENCES attributes(id),
  UNIQUE KEY unique_rating (from_user_id, to_contact_id, attribute_id),
  INDEX idx_to_contact (to_contact_id),
  INDEX idx_attribute (attribute_id)
);
```

#### Tabla: ambits
```sql
CREATE TABLE ambits (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL,
  description TEXT,
  icon VARCHAR(50),
  display_order INT DEFAULT 0,
  is_active BOOLEAN DEFAULT TRUE
);
```

#### Tabla: categories
```sql
CREATE TABLE categories (
  id INT PRIMARY KEY AUTO_INCREMENT,
  ambit_id INT NOT NULL,
  name VARCHAR(100) NOT NULL,
  description TEXT,
  display_order INT DEFAULT 0,
  FOREIGN KEY (ambit_id) REFERENCES ambits(id)
);
```

#### Tabla: attributes
```sql
CREATE TABLE attributes (
  id INT PRIMARY KEY AUTO_INCREMENT,
  category_id INT NOT NULL,
  positive_term VARCHAR(100) NOT NULL,
  negative_term VARCHAR(100) NOT NULL,
  icon VARCHAR(50),
  description TEXT,
  display_order INT DEFAULT 0,
  FOREIGN KEY (category_id) REFERENCES categories(id),
  INDEX idx_category (category_id)
);
```

#### Tabla: general_ratings (Calculada/Agregada)
```sql
CREATE TABLE general_ratings (
  id INT PRIMARY KEY AUTO_INCREMENT,
  contact_id INT NOT NULL,
  attribute_id INT NOT NULL,
  average_score DECIMAL(2,1) NOT NULL,
  total_ratings INT DEFAULT 0,
  last_calculated TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (contact_id) REFERENCES contacts(id) ON DELETE CASCADE,
  FOREIGN KEY (attribute_id) REFERENCES attributes(id),
  UNIQUE KEY unique_general_rating (contact_id, attribute_id),
  INDEX idx_contact_attr (contact_id, attribute_id)
);
```

## Flujo de Datos

### 1. Autenticación y Obtención de Contactos

```
┌─────────────┐   1. Login     ┌──────────────┐   2. OAuth   ┌──────────────┐
│             │ ───────────────►│              │ ────────────►│  Red Social  │
│  App React  │                 │   Firebase   │              │  (Facebook)  │
│   Native    │◄───────────────│     Auth     │◄────────────│              │
│             │  3. JWT Token   │              │  4. User Data│              │
└──────┬──────┘                 └──────────────┘              └──────────────┘
       │
       │ 5. GET /api/contacts
       │    Authorization: Bearer <JWT>
       ▼
┌──────────────┐
│    NestJS    │
│   Backend    │
│   (MySQL)    │
└──────────────┘
```

### 2. Calificación de Contacto

```
┌──────────┐                   ┌────────────┐                ┌──────────────┐
│   User   │ 1. Selecciona     │    App     │  2. POST       │    NestJS    │
│          │    calificación   │            │  /api/ratings  │              │
│          │ ─────────────────►│            │ ──────────────►│              │
└──────────┘                   └────────────┘                └──────┬───────┘
                                                                    │
                                                                    │ 3. INSERT
                                                                    ▼
                                                             ┌──────────────┐
                                                             │    MySQL     │
                                                             │              │
                                                             └──────┬───────┘
                                                                    │
                                                                    │ 4. Trigger
                                                                    │ Recalculate
                                                                    ▼
                                                             ┌──────────────┐
                                                             │  Analytics   │
                                                             │   Service    │
                                                             └──────────────┘
```

### 3. Visualización de Calificaciones Propias

```
┌──────────┐                   ┌────────────┐                ┌──────────────┐
│   User   │ 1. Ver mi perfil  │    App     │  2. GET        │    NestJS    │
│          │ ─────────────────►│            │  /api/me/stats │              │
│          │◄─────────────────│            │◄──────────────│              │
└──────────┘ 4. Mostrar stats  └────────────┘  3. Ratings    └──────┬───────┘
                                      │          agregados           │
                                      │                              │
                                      │ 5. Render gráficos           │
                                      ▼                              │
                               ┌─────────────┐                       │
                               │   Chart.js  │                       │
                               │  Components │                       │
                               └─────────────┘                       │
                                                                     │
                                                              ┌──────▼───────┐
                                                              │    MySQL     │
                                                              └──────────────┘
```

## Componentes de la Aplicación

### React Native - Estructura de Carpetas

```
mobile-app/
├── src/
│   ├── App.tsx                # Punto de entrada
│   ├── screens/               # Pantallas principales
│   │   ├── auth/
│   │   │   ├── LoginScreen.tsx
│   │   │   └── SocialSelectScreen.tsx
│   │   ├── home/
│   │   │   ├── HomeScreen.tsx
│   │   │   └── DrawerMenu.tsx
│   │   ├── contacts/
│   │   │   ├── ContactsListScreen.tsx
│   │   │   └── ContactDetailScreen.tsx
│   │   ├── rating/
│   │   │   ├── RatingInterfaceScreen.tsx
│   │   │   └── RatingCard.tsx
│   │   ├── profile/
│   │   │   ├── MyProfileScreen.tsx
│   │   │   ├── StatsScreen.tsx
│   │   │   └── ReportGeneratorScreen.tsx
│   │   └── settings/
│   │       └── PreferencesScreen.tsx
│   ├── components/            # Componentes reutilizables
│   │   ├── RatingSlider.tsx
│   │   ├── AttributeCard.tsx
│   │   ├── ChartComponents.tsx
│   │   └── CustomButtons.tsx
│   ├── services/
│   │   ├── authService.ts
│   │   ├── apiService.ts
│   │   ├── contactsService.ts
│   │   └── ratingsService.ts
│   ├── models/
│   │   ├── User.ts
│   │   ├── Contact.ts
│   │   ├── Rating.ts
│   │   └── Ambit.ts
│   ├── hooks/
│   │   ├── useAuth.ts
│   │   ├── useRatings.ts
│   │   └── useContacts.ts
│   └── utils/
│       ├── constants.ts
│       ├── helpers.ts
│       └── theme.ts
```

### React Web - Estructura de Carpetas

```
web-app/
├── src/
│   ├── main.tsx
│   ├── App.tsx
│   ├── pages/
│   │   ├── LoginPage.tsx
│   │   ├── HomePage.tsx
│   │   ├── ProfilePage.tsx
│   │   └── SettingsPage.tsx
│   ├── components/          # Compartidos con mobile (adaptados)
│   ├── services/
│   ├── hooks/
│   └── utils/
```

### NestJS - Estructura de Backend

```
backend/
├── src/
│   ├── main.ts
│   ├── app.module.ts
│   ├── auth/
│   │   ├── auth.module.ts
│   │   ├── auth.controller.ts
│   │   ├── auth.service.ts
│   │   ├── guards/
│   │   │   └── firebase-auth.guard.ts
│   │   └── strategies/
│   │       └── firebase.strategy.ts
│   ├── users/
│   │   ├── users.module.ts
│   │   ├── users.controller.ts
│   │   ├── users.service.ts
│   │   ├── entities/
│   │   │   └── user.entity.ts
│   │   └── dto/
│   │       ├── create-user.dto.ts
│   │       └── update-user.dto.ts
│   ├── contacts/
│   │   ├── contacts.module.ts
│   │   ├── contacts.controller.ts
│   │   ├── contacts.service.ts
│   │   └── entities/
│   │       └── contact.entity.ts
│   ├── ratings/
│   │   ├── ratings.module.ts
│   │   ├── ratings.controller.ts
│   │   ├── ratings.service.ts
│   │   ├── entities/
│   │   │   ├── rating.entity.ts
│   │   │   └── general-rating.entity.ts
│   │   └── dto/
│   │       ├── create-rating.dto.ts
│   │       └── rating-stats.dto.ts
│   ├── analytics/
│   │   ├── analytics.module.ts
│   │   ├── analytics.service.ts
│   │   └── analytics.controller.ts
│   └── common/
│       ├── decorators/
│       ├── filters/
│       └── interceptors/
```

## Seguridad y Privacidad

### Anonimato
- ❌ **Nunca** se revela quién calificó a quién
- ✅ Solo se muestran **promedios agregados**
- ✅ Las calificaciones individuales solo son accesibles por SQL con permisos de administrador

### Prevención de Bullying

#### Sistema de Detección (NestJS Service)
```typescript
// analytics.service.ts
async detectBullyingPattern(userId: number): Promise<void> {
  const recentRatings = await this.ratingsRepository.find({
    where: {
      toContactId: userId,
      createdAt: MoreThan(new Date(Date.now() - 30 * 24 * 60 * 60 * 1000))
    }
  });
  
  // Regla 1: Múltiples calificaciones negativas en poco tiempo
  const negativeCount = recentRatings.filter(r => r.score <= 2).length;
  if (negativeCount > THRESHOLD_NEGATIVE) {
    await this.alertService.sendToSupport(userId, 'MULTIPLE_NEGATIVE_RATINGS');
  }
  
  // Regla 2: Patrón de mismo atributo calificado negativamente
  const attributeGroups = this.groupBy(recentRatings, 'attributeId');
  for (const [attrId, ratings] of Object.entries(attributeGroups)) {
    const avgScore = ratings.reduce((sum, r) => sum + r.score, 0) / ratings.length;
    if (ratings.length > 5 && avgScore < 2) {
      await this.alertService.sendToSupport(userId, 'TARGETED_ATTRIBUTE_HARASSMENT');
    }
  }
}
```

### Regla de Reciprocidad
```typescript
// ratings.controller.ts
@Get('general/:contactId')
async getGeneralRatings(
  @Param('contactId') contactId: number,
  @CurrentUser() user: User
) {
  if (user.hideGeneralRatings) {
    throw new ForbiddenException(
      'No puedes ver calificaciones generales si has ocultado las tuyas'
    );
  }
  
  return this.ratingsService.getGeneralRatings(contactId);
}
```

## Generación de Consejos (IA)

### Procesamiento con NestJS + OpenAI

```typescript
// analytics.service.ts
import { Injectable } from '@nestjs/common';
import OpenAI from 'openai';

@Injectable()
export class AnalyticsService {
  constructor(private openai: OpenAI) {}
  
  async generateAdvice(userId: number): Promise<string> {
    // 1. Obtener historial de calificaciones
    const ratings = await this.getRatingHistory(userId);
    
    // 2. Identificar áreas de mejora
    const weakAreas = ratings
      .filter(r => r.averageScore < 3.0)
      .sort((a, b) => a.averageScore - b.averageScore)
      .slice(0, 3);
    
    // 3. Generar consejos usando OpenAI
    const completion = await this.openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: "Eres un coach psicológico que genera consejos basados en feedback anónimo."
        },
        {
          role: "user",
          content: `Usuario tiene calificaciones bajas en: ${weakAreas.map(a => a.attributeName).join(', ')}. Genera 3 consejos concretos.`
        }
      ]
    });
    
    const advice = completion.choices[0].message.content;
    
    // 4. Guardar consejo en BD
    await this.saveAdvice(userId, advice);
    
    return advice;
  }
}
```

## Generación de Informes PDF (Premium)

### NestJS + PDFKit

```typescript
// reports.service.ts
import PDFDocument from 'pdfkit';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ReportsService {
  async generatePDFReport(userId: number): Promise<string> {
    const user = await this.usersService.findOne(userId);
    const ratings = await this.ratingsService.getUserStats(userId);
    
    const doc = new PDFDocument();
    const pdfPath = `reports/${userId}_${Date.now()}.pdf`;
    
    // Header
    doc.fontSize(20).text(`Informe Be - ${user.name}`, { align: 'center' });
    
    // Calificación Global
    doc.fontSize(16).text(`Calificación Global: ${user.globalRating}/5`);
    
    // Por cada ámbito
    for (const ambit of await this.getAmbits()) {
      doc.addPage();
      doc.fontSize(18).text(ambit.name);
      
      // Estadísticas
      const ambitStats = ratings.filter(r => r.ambitId === ambit.id);
      ambitStats.forEach(stat => {
        doc.fontSize(12).text(`${stat.attributeName}: ${stat.averageScore}/5`);
      });
    }
    
    // Guardar en sistema de archivos o S3
    doc.pipe(fs.createWriteStream(pdfPath));
    doc.end();
    
    return pdfPath;
  }
}
```

## Escalabilidad

### Estrategias

1. **Caching con Redis**: Calificaciones generales cacheadas
2. **Lazy Loading**: Cargar solo ámbitos seleccionados
3. **Índices en MySQL**: Optimizar queries complejas
4. **Load Balancing**: Múltiples instancias de NestJS
5. **CDN**: Servir assets estáticos
6. **Database Sharding**: Particionar por regiones geográficas

## Próximos Pasos

- [ ] Implementar sistema de workspaces (multi-cuenta)
- [ ] Gamificación (medallas, logros)
- [ ] Chat interno entre usuarios
- [ ] Integración con más redes sociales
- [ ] Marketplace de atributos personalizados
- [ ] Migración a GraphQL para queries optimizadas
