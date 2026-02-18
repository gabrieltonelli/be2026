# Guía de Desarrollo - Be

## Configuración del Entorno

### Prerrequisitos

1. **Node.js & npm**
   ```bash
   # Verificar instalación
   node --version  # v18+ recomendado
   npm --version
   ```

2. **React Native CLI** (para desarrollo móvil)
   ```bash
   npm install -g react-native-cli
   ```

3. **IDE Recomendado**
   - VS Code con extensiones:
     - ES7+ React/Redux/React-Native snippets
     - ESLint
     - Prettier
     - TypeScript
   - O WebStorm

4. **Docker** (para MySQL local)

5. **Git**

6. **Cuentas Necesarias**
   - Firebase (Google Cloud) - Solo para Auth
   - Facebook Developer
   - Google Cloud Console
   - LinkedIn Developer
   - OpenAI (para IA)

---

## Configuración de Firebase (Solo Auth)

### 1. Crear Proyecto en Firebase Console

1. Ir a [Firebase Console](https://console.firebase.google.com/)
2. Crear nuevo proyecto: "Be-App"
3. Habilitar Google Analytics (opcional)

### 2. Configurar Authentication

1. En Firebase Console → Authentication → Sign-in method
2. Habilitar proveedores:
   - Google
   - Facebook
   - LinkedIn (custom OAuth)
   - Twitter
   - Instagram (custom OAuth)

3. Configurar cada proveedor con sus respectivos Client ID y Secret

### 3. Obtener Configuración

```javascript
// Firebase config (colocar en variables de entorno)
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "be-app.firebaseapp.com",
  projectId: "be-app",
  storageBucket: "be-app.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdef"
};
```

---

##Configuración de MySQL

### Opción 1: Docker (Recomendado para desarrollo)

```bash
# Crear contenedor MySQL
docker run --name be-mysql \
  -e MYSQL_ROOT_PASSWORD=rootpassword \
  -e MYSQL_DATABASE=be_db \
  -e MYSQL_USER=be_user \
  -e MYSQL_PASSWORD=be_password \
  -p 3306:3306 \
  -d mysql:8.0

# Verificar que esté corriendo
docker ps
```

### Opción 2: Instalación Local

1. Descargar MySQL 8.0+ desde [mysql.com](https://dev.mysql.com/downloads/)
2. Instalar y crear base de datos:

```sql
CREATE DATABASE be_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE USER 'be_user'@'localhost' IDENTIFIED BY 'be_password';
GRANT ALL PRIVILEGES ON be_db.* TO 'be_user'@'localhost';
FLUSH PRIVILEGES;
```

---

## Estructura del Proyecto

```
be-monorepo/
├── mobile/                    # React Native app
│   ├── src/
│   │   ├── screens/
│   │   ├── components/
│   │   ├── services/
│   │   ├── models/
│   │   └── utils/
│   ├── package.json
│   └── tsconfig.json
├── web/                       # React web app
│   ├── src/
│   │   ├── pages/
│   │   ├── components/
│   │   ├── services/
│   │   └── utils/
│   ├── package.json
│   └── vite.config.ts
├── backend/                   # NestJS API
│   ├── src/
│   │   ├── auth/
│   │   ├── users/
│   │   ├── contacts/
│   │   ├── ratings/
│   │   └── analytics/
│   ├── package.json
│   └── tsconfig.json
└── docker-compose.yml         # Para MySQL y servicios
```

---

## Configuración Backend (NestJS)

### 1. Crear Proyecto

```bash
# Instalar NestJS CLI
npm i -g @nestjs/cli

# Crear proyecto
nest new backend
cd backend

# Instalar dependencias
npm install @nestjs/typeorm typeorm mysql2
npm install @nestjs/passport passport passport-firebase-jwt
npm install firebase-admin
npm install class-validator class-transformer
```

### 2. Configurar TypeORM

```typescript
// backend/src/app.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST || 'localhost',
      port: 3306,
      username: process.env.DB_USER || 'be_user',
      password: process.env.DB_PASSWORD || 'be_password',
      database: process.env.DB_NAME || 'be_db',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true, // Solo en desarrollo!
    }),
  ],
})
export class AppModule {}
```

### 3. Crear Entidades

```typescript
// backend/src/users/entities/user.entity.ts
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  firebaseUid: string;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column({ nullable: true })
  avatarUrl: string;

  @Column({ type: 'decimal', precision: 2, scale: 1, default: 0.0 })
  globalRating: number;

  @Column({ default: false })
  isPremium: boolean;

  @Column({ default: false })
  hideGeneralRatings: boolean;

  @Column({ type: 'json', nullable: true })
  selectedAmbits: string[];

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;
}
```

### 4. Configurar Firebase Admin (para validar JWT)

```typescript
// backend/src/auth/firebase-admin.ts
import * as admin from 'firebase-admin';

admin.initializeApp({
  credential: admin.credential.cert({
    projectId: process.env.FIREBASE_PROJECT_ID,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
  }),
});

export default admin;
```

### 5. Crear Guard de Autenticación

```typescript
// backend/src/auth/guards/firebase-auth.guard.ts
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import admin from '../firebase-admin';

@Injectable()
export class FirebaseAuthGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization?.split('Bearer ')[1];

    if (!token) {
      return false;
    }

    try {
      const decodedToken = await admin.auth().verifyIdToken(token);
      request.user = decodedToken;
      return true;
    } catch (error) {
      return false;
    }
  }
}
```

---

## Configuración Mobile (React Native)

### 1. Crear Proyecto

```bash
# Opción A: Con React Native CLI (recomendado)
npx react-native init BeApp --template react-native-template-typescript
cd BeApp

# Opción B: Con Expo (más fácil para empezar)
npx create-expo-app BeApp --template blank-typescript
cd BeApp
```

### 2. Instalar Dependencias

```bash
# Navegación
npm install @react-navigation/native @react-navigation/stack
npm install react-native-screens react-native-safe-area-context

# Firebase Auth
npm install @react-native-firebase/app @react-native-firebase/auth

# HTTP
npm install axios

# Charts
npm install react-native-charts-wrapper

# Social Login
npm install @react-native-google-signin/google-signin
npm install react-native-fbsdk-next
```

### 3. Configurar Firebase

```typescript
// mobile/src/config/firebase.ts
import auth from '@react-native-firebase/auth';

export const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
};

export default auth;
```

### 4. Servicio de API

```typescript
// mobile/src/services/apiService.ts
import axios from 'axios';
import auth from '@react-native-firebase/auth';

const API_URL = process.env.API_URL || 'http://localhost:3000';

const apiClient = axios.create({
  baseURL: API_URL,
});

// Interceptor para agregar JWT token
apiClient.interceptors.request.use(async (config) => {
  const user = auth().currentUser;
  if (user) {
    const token = await user.getIdToken();
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default apiClient;
```

---

## Configuración Web (React + Vite)

### 1. Crear Proyecto

```bash
npm create vite@latest be-web -- --template react-ts
cd be-web
npm install
```

### 2. Instalar Dependencias

```bash
# Routing
npm install react-router-dom

# Firebase Auth
npm install firebase

# HTTP
npm install axios

# Charts
npm install chart.js react-chartjs-2

# (Opcional) Tailwind CSS
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

### 3. Configurar Firebase

```typescript
// web/src/config/firebase.ts
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
```

---

## Comandos Útiles

### Backend (NestJS)

```bash
# Ejecutar en modo desarrollo
npm run start:dev

# Build para producción
npm run build

# Tests
npm run test

# Crear módulo
nest g module users
nest g controller users
nest g service users

# Crear migración
npm run typeorm migration:generate -- -n CreateUsersTable
npm run typeorm migration:run
```

### Mobile (React Native)

```bash
# iOS
npx react-native run-ios

# Android
npx react-native run-android

# Metro bundler
npx react-native start

# Limpiar cache
npx react-native start --reset-cache
```

### Web (React)

```bash
# Desarrollo
npm run dev

# Build
npm run build

# Preview build
npm run preview
```

---

## Variables de Entorno

### Backend (.env)

```env
# Database
DB_HOST=localhost
DB_PORT=3306
DB_USER=be_user
DB_PASSWORD=be_password
DB_NAME=be_db

# Firebase
FIREBASE_PROJECT_ID=be-app
FIREBASE_CLIENT_EMAIL=firebase-adminsdk@be-app.iam.gserviceaccount.com
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"

# OpenAI
OPENAI_API_KEY=sk-...

# App
PORT=3000
NODE_ENV=development
```

### Mobile (.env)

```env
API_URL=http://localhost:3000
FIREBASE_API_KEY=...
FIREBASE_AUTH_DOMAIN=be-app.firebaseapp.com
FIREBASE_PROJECT_ID=be-app
```

### Web (.env)

```env
VITE_API_URL=http://localhost:3000
VITE_FIREBASE_API_KEY=...
VITE_FIREBASE_AUTH_DOMAIN=be-app.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=be-app
```

---

## Buenas Prácticas

### 1. Arquitectura

**Clean Architecture con capas:**
- **Presentation**: UI (screens, pages, components)
- **Domain**: Lógica de negocio (entidades, DTOs)
- **Data**: Acceso a datos (services, repositories)

### 2. TypeScript

Usar tipos en TODAS partes:

```typescript
// ❌ MAL
export function getUser(id) {
  return apiClient.get(`/users/${id}`);
}

// ✅ BIEN
export async function getUser(id: number): Promise<User> {
  const response = await apiClient.get<User>(`/users/${id}`);
  return response.data;
}
```

### 3. Manejo de Errores

```typescript
// Backend (NestJS)
@Post()
async create(@Body() dto: CreateUserDto) {
  try {
    return await this.usersService.create(dto);
  } catch (error) {
    if (error.code === 'ER_DUP_ENTRY') {
      throw new ConflictException('User already exists');
    }
    throw new InternalServerErrorException();
  }
}

// Frontend (React/React Native)
const fetchData = async () => {
  try {
    setLoading(true);
    const data = await apiService.getUsers();
    setUsers(data);
  } catch (error) {
    if (error.response?.status === 401) {
      // Redirect to login
    } else {
      showError('Error al cargar usuarios');
    }
  } finally {
    setLoading(false);
  }
};
```

### 4. Validación

```typescript
// Backend DTO
import { IsEmail, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsString()
  firebaseUid: string;

  @IsString()
  @MinLength(2)
  name: string;

  @IsEmail()
  email: string;
}
```

---

## Testing

### Backend (NestJS + Jest)

```typescript
// users.service.spec.ts
describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a user', async () => {
    const dto = { name: 'Test', email: 'test@test.com' };
    const result = await service.create(dto);
    expect(result).toHaveProperty('id');
  });
});
```

### Frontend (React + Vitest)

```typescript
// Button.test.tsx
import { render, fireEvent } from '@testing-library/react';
import Button from './Button';

test('calls onClick when clicked', () => {
  const handleClick = vi.fn();
  const { getByText } = render(<Button onClick={handleClick}>Click me</Button>);
  
  fireEvent.click(getByText('Click me'));
  
  expect(handleClick).toHaveBeenCalledTimes(1);
});
```

---

## CI/CD

### GitHub Actions

```yaml
# .github/workflows/backend.yml
name: Backend CI

on:
  push:
    branches: [main, develop]

jobs:
  test:
    runs-on: ubuntu-latest
    
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      
      - name: Install dependencies
        run: npm ci
        working-directory: ./backend
      
      - name: Run tests
        run: npm test
        working-directory: ./backend
      
      - name: Build
        run: npm run build
        working-directory: ./backend
```

---

## Debugging

### VS Code Launch Configurations

```json
// .vscode/launch.json
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "NestJS Debug",
      "type": "node",
      "request": "launch",
      "runtimeExecutable": "npm",
      "runtimeArgs": ["run", "start:dev"],
      "cwd": "${workspaceFolder}/backend",
      "console": "integratedTerminal"
    },
    {
      "name": "React Native Debug",
      "type": "reactnative",
      "request": "attach",
      "cwd": "${workspaceFolder}/mobile"
    }
  ]
}
```

---

## Performance

### 1. Optimización de Queries (MySQL)

```typescript
// ❌ MAL: N+1 queries
const users = await userRepository.find();
for (const user of users) {
  user.contacts = await contactRepository.find({ userId: user.id });
}

// ✅ BIEN: 1 query con JOIN
const users = await userRepository.find({
  relations: ['contacts'],
});
```

### 2. Caching con Redis (Opcional)

```typescript
// backend/src/cache/cache.service.ts
import { Injectable } from '@nestjs/common';
import Redis from 'ioredis';

@Injectable()
export class CacheService {
  private redis = new Redis();

  async get(key: string): Promise<string | null> {
    return this.redis.get(key);
  }

  async set(key: string, value: string, ttl: number = 3600): Promise<void> {
    await this.redis.set(key, value, 'EX', ttl);
  }
}
```

---

## Próximos Pasos

1. [ ] Configurar Firebase y obtener credenciales
2. [ ] Levantar MySQL con Docker
3. [ ] Crear backend NestJS con entidades básicas
4. [ ] Implementar auth con Firebase
5. [ ] Crear app React Native
6. [ ] Implementar login social
7. [ ] Desarrollar pantallas principales
8. [ ] Integrar con backend
9. [ ] Testing
10. [ ] Deploy 🚀
