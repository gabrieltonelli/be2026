# Decisiones de Stack Tecnológico - Be

## 🎯 Filosofía de Selección

Elegimos tecnologías basándonos en:
1. **Rapid Development** - Iteración rápida en fase temprana
2. **Scalability** - Soportar millones de usuarios
3. **Cost Efficiency** - Infraestructura optimizada
4. **Developer Experience** - Herramientas modernas y productivas
5. **Ecosystem Maturity** - Comunidades grandes y soporte

---

## 📱 Frontend Móvil

### React Native

**Por qué React Native:**
- ✅ **Una sola codebase** para iOS y Android (ahorro 50% tiempo)
- ✅ **Performance nativo** con componentes nativos
- ✅ **Hot Reload / Fast Refresh** = desarrollo ultra rápido
- ✅ **Comunidad masiva** = librerías para todo
- ✅ **JavaScript/TypeScript** = fácil de encontrar desarrolladores
- ✅ **Expo como opción** para acelerar desarrollo inicial

**Alternativas consideradas:**
- ❌ Flutter - Ecosistema más pequeño, Dart menos común
- ❌ Native (Swift/Kotlin) - 2x tiempo de desarrollo
- ❌ Ionic - Performance inferior, UX web-like

**Librerías clave:**
```json
{
  "@react-navigation/native": "Navegación entre pantallas",
  "react-native-firebase": "Autenticación social",
  "axios": "HTTP client",
  "react-native-charts-wrapper": "Gráficos nativos",
  "react-native-gesture-handler": "Swipe interactions"
}
```

---

## 🌐 Frontend Web

### React + Vite

**Por qué React:**
- ✅ **Librería más popular** del mercado
- ✅ **Componentización** = código reutilizable
- ✅ **Gran ecosistema** de librerías
- ✅ **Hooks** = lógica clara y reutilizable
- ✅ **Compartir código** con React Native (lógica)

**Por qué Vite:**
- ✅ **HMR ultra rápido** (Hot Module Replacement)
- ✅ **Build optimizado** con Rollup
- ✅ **TypeScript out-of-the-box**
- ✅ **Más rápido** que Create React App

**Alternativas consideradas:**
- ❌ Next.js - Overhead de SSR innecesario para esta app
- ❌ Vue - Ecosistema más pequeño
- ❌ Angular - Demasiado pesado y complejo

---

## ⚙️ Backend

### NestJS

**Por qué NestJS:**
- ✅ **Arquitectura modular** y escalable
- ✅ **TypeScript nativo** = type safety
- ✅ **Inspirado en Angular** = estructura clara
- ✅ **Decoradores** = código limpio y legible
- ✅ **Dependency Injection** built-in
- ✅ **Testing** integrado (Jest)
- ✅ **Compatible con TypeORM** para MySQL

**Alternativas consideradas:**
- ❌ Express - Demasiado básico, sin estructura
- ❌ Fastify - Menos maduro
- ❌ Django/Flask (Python) - Queremos JavaScript/TypeScript full-stack

**Estructura modular:**
```typescript
@Module({
  imports: [UsersModule, RatingsModule, ContactsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
```

---

## 🗄️ Base de Datos

### MySQL 8.0+

**Por qué MySQL:**
- ✅ **Relacional** = perfecto para estructura de árbol (Ámbitos → Categorías → Atributos)
- ✅ **ACID compliance** = consistencia de datos
- ✅ **Performance** probado a escala masiva
- ✅ **Transacciones** = crítico para integridad de calificaciones
- ✅ **Indexing robusto** = queries rápidas
- ✅ **Gratis y open-source**

**Alternativas consideradas:**
- ❌ MongoDB - NoSQL no ideal para relaciones complejas
- ❌ PostgreSQL - Más complejo, MySQL es suficiente
- ❌ Firestore - Caro a escala, queries limitadas

**ORM elegido: TypeORM**
```typescript
@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;
  
  @Column({ unique: true })
  firebaseUid: string;
  
  @Column()
  name: string;
  
  @Column({ type: 'decimal', precision: 2, scale: 1 })
  globalRating: number;
}
```

---

## 🔐 Autenticación

### Firebase Auth

**Por qué Firebase Auth:**
- ✅ **OAuth 2.0** integrado para todas las redes sociales
- ✅ **SDKs oficiales** para Google, Facebook, etc.
- ✅ **JWT tokens** = estándar de la industria
- ✅ **Gratis hasta 50K usuarios** activos/mes
- ✅ **Security probada** por Google
- ✅ **Fácil integración** con React Native

**Proveedores soportados:**
- Google
- Facebook
- LinkedIn (OAuth custom)
- Twitter
- Instagram (OAuth custom)

**Flujo de autenticación:**
```typescript
// Frontend (React Native)
const signInWithGoogle = async () => {
  const result = await GoogleSignin.signIn();
  const credential = auth.GoogleAuthProvider.credential(result.idToken);
  const userCredential = await auth().signInWithCredential(credential);
  const token = await userCredential.user.getIdToken();
  
  // Enviar token al backend
  await axios.post('/api/auth/login', { token });
};

// Backend (NestJS)
@Injectable()
export class AuthService {
  async validateFirebaseToken(token: string) {
    const decodedToken = await admin.auth().verifyIdToken(token);
    return this.findOrCreateUser(decodedToken);
  }
}
```

---

## 🎨 Styling & UI

### React Native

**Solución elegida: StyleSheet + Theme Provider**
```typescript
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#0f172a',
    flex: 1,
  }
});
```

**Librería de componentes:**
- React Native Paper (opcional)
- Componentes custom

### Web

**Solución elegida: CSS Modules / Tailwind CSS**
- CSS Modules para componentes aislados
- Tailwind para utility-first approach

---

## 📊 Visualización de Datos

### React Native

**Librería: react-native-charts-wrapper**
- Wrapper nativo de MPAndroidChart / Charts (iOS)
- Performance nativo
- Gráficos animados

### Web

**Librería: Chart.js + react-chartjs-2**
- Más popular para web
- Altamente customizable
- Animaciones suaves

---

## 🚀 Deployment & Hosting

### Backend (NestJS)

**Opción 1: AWS Elastic Beanstalk**
- Auto-scaling
- Load balancing
- Monitoreo integrado

**Opción 2: Docker + VPS (DigitalOcean)**
- Más económico
- Control total

**Opción 3: Railway / Render**
- Deploy automático desde Git
- Gratis para empezar

### Base de Datos (MySQL)

**Opción 1: AWS RDS**
- Backups automáticos
- Alta disponibilidad
- Escalable

**Opción 2: PlanetScale**
- MySQL serverless
- Branching (como Git para BD)
- Gratis hasta cierto límite

### Frontend Web

**Netlify / Vercel**
- Deploy automático desde Git
- CDN global
- HTTPS gratis

### Mobile

**Google Play Store** (Android)
**Apple App Store** (iOS)

---

## 📈 Analytics & Monitoring

### Backend

**Sentry** - Error tracking
**New Relic / DataDog** - Performance monitoring
**Winston** - Logging estructurado

### Frontend

**Firebase Analytics** - Eventos de usuario
**Mixpanel** - Funnels y retención

---

## 💰 Cost Estimation

### Mes 1 (100 usuarios)
- Firebase Auth: **$ 0** (free tier)
- MySQL (PlanetScale): **$0** (free tier)
- Backend (Railway): **$0** (free tier)
- Web Hosting (Netlify): **$0** (free tier)
- **Total: ~$0/mes**

### Mes 12 (10K usuarios)
- Firebase Auth: **$50/mes**
- MySQL (PlanetScale): **$29/mes**
- Backend (Railway): **$20/mes**
- OpenAI API: **$200/mes** (consejos IA)
- CDN/Bandwidth: **$50/mes**
- **Total: ~$350/mes** 

ROI positivo con ~100 usuarios premium @ $4.99/mes = $499/mes

---

## 🔄 CI/CD Pipeline

### GitHub Actions

```yaml
# Mobile (React Native)
- Lint & Format
- Unit Tests
- Build APK/IPA
- Deploy to TestFlight / Google Play Beta

# Web (React)
- ESLint
- Build
- Deploy to Netlify

# Backend (NestJS)
- Lint
- Unit Tests
- E2E Tests
- Deploy to Railway
```

---

## 🛠️ Development Tools

### IDEs
- **VS Code** (principal) con extensiones:
  - ESLint
  - Prettier
  - React Native Tools
  - TypeScript

### Version Control
- **Git** + **GitHub**
- Conventional Commits
- Feature branches

### Package Management
- **npm** / **yarn**

### API Testing
- **Postman** / **Insomnia**
- **REST Client** (VS Code)

---

## 🔮 Futuro: Posibles Evoluciones

1. **GraphQL** (Apollo) - En lugar de REST cuando crezca
2. **PostgreSQL** - Si necesitamos features más avanzadas
3. **Redis** - Cache layer para queries pesadas
4. **Kafka/RabbitMQ** - Event streaming a escala masiva
5. **Kubernetes** - Orquestación de containers
6. **TensorFlow** - Modelos propios de ML

---

## ✅ Decisión Final: Stack Aprobado

```
┌─────────────────────────────────────┐
│   MOBILE APP (React Native)         │
│   WEB APP (React + Vite)            │
└─────────────┬───────────────────────┘
              │
              │ HTTP/REST
              ▼
┌─────────────────────────────────────┐
│    BACKEND (NestJS + TypeScript)    │
│  • Auth Module (Firebase Auth)      │
│  • Users Module                     │
│  • Ratings Module                   │
│  • Analytics Module                 │
└─────────────┬───────────────────────┘
              │
              │ TypeORM
              ▼
┌─────────────────────────────────────┐
│       DATABASE (MySQL 8.0+)         │
│  • Users                            │
│  • Contacts                         │
│  • Ratings                          │
│  • Ambits/Categories/Attributes     │
└─────────────────────────────────────┘
```

**Costo/Beneficio**: ⭐⭐⭐⭐⭐  
**Time to Market**: ⭐⭐⭐⭐⭐  
**Scalability**: ⭐⭐⭐⭐⭐  
**Developer Happiness**: ⭐⭐⭐⭐⭐

---

**Última revisión**: Febrero 2026  
**Próxima revisión**: Junio 2026 (post-MVP)
