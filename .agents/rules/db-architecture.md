# Arquitectura de Base de Datos y Servicios - Proyecto Be

## Definición Tecnológica "Supabase + FCM Stack"

Se ha decidido utilizar una arquitectura híbrida para maximizar la potencia relacional y las capacidades de tiempo real, minimizando la complejidad de infraestructura.

### 1. Base de Datos (Persistencia)
- **Tecnología:** PostgreSQL vía **Supabase**.
- **Acceso:** NestJS con **TypeORM**.
- **Justificación:** Necesidad de relaciones complejas entre usuarios, contactos y ratings, con soporte nativo para actualizaciones en tiempo real (Realtime).

### 2. Autenticación (Identity)
- **Tecnología:** **Supabase Auth**.
- **Alcance:** Registro, inicio de sesión (Email/Google), gestión de sesiones y Row Level Security (RLS).
- **Integración:** El backend de NestJS validará los JWT emitidos por Supabase.

### 3. Notificaciones Push
- **Tecnología:** **Firebase Cloud Messaging (FCM)**.
- **Rol:** Únicamente "Cartero".
- **Flujo:** 
    1. Acción ocurre en la DB (vía Supabase o NestJS).
    2. NestJS detecta la necesidad de notificación.
    3. NestJS llama a la API de Firebase Admin para enviar el mensaje push al token del dispositivo.

### 4. Backend (Cerebro)
- **Tecnología:** **NestJS**.
- **Responsabilidad:** Lógica de negocio, validaciones complejas, orquestación entre Supabase y Firebase, y APIs para el frontend.

---
> [!IMPORTANT]
> **Prohibido:** No utilizar Firebase Realtime Database ni Firestore para datos relacionales. Todo dato estructural debe residir en Supabase.
