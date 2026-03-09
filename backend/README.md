# Be - Backend (NestJS)

Este es el backend oficial del proyecto **Be**, una plataforma de feedback anónimo. Está construido sobre **NestJS**, utiliza **TypeORM** para la persistencia de datos en **PostgreSQL (Supabase)** y está diseñado para integrarse con Firebase Auth.

## 🚀 Tecnologías

- **NestJS**: Framework de aplicaciones de servidor.
- **TypeORM**: ORM para TypeScript y JavaScript.
- **PostgreSQL (Supabase)**: Base de datos relacional para escalabilidad y facilidad de despliegue.
- **Firebase Admin SDK**: Para autenticación segura y validación de tokens.

## 🛠️ Requisitos previos

- **Node.js**: v18 o superior.
- **PostgreSQL**: Local o instancia remota (Supabase).
- **NPM**: Gestor de paquetes.

## ⚙️ Configuración

1.  Copia el archivo de plantilla de variables de entorno:
    ```bash
    cp .env.template .env
    ```
2.  Asegúrate de que la base de datos MySQL esté corriendo.

## 🔥 Configuración de Firebase (Paso a Paso)

El backend utiliza **Firebase Admin SDK** para validar los JWT enviados por la aplicación móvil. Sigue estos pasos para obtener las credenciales:

### 1. Obtener la Clave Privada (Admin SDK)
1. Ve a la [Consola de Firebase](https://console.firebase.google.com/).
2. Selecciona tu proyecto.
3. Haz clic en el icono de engranaje (⚙️) junto a "Descripción general del proyecto" y selecciona **Configuración del proyecto**.
4. Ve a la pestaña **Cuentas de servicio**.
5. Asegúrate de que "Node.js" esté seleccionado y haz clic en **Generar nueva clave privada**.
6. Esto descargará un archivo `.json`. Abre este archivo y copia los valores en tu `.env`:
   - `projectId` -> `FIREBASE_PROJECT_ID`
   - `client_email` -> `FIREBASE_CLIENT_EMAIL`
   - `private_key` -> `FIREBASE_PRIVATE_KEY`

> **Nota:** La `private_key` debe incluir las comillas y los caracteres `\n`. Ejemplo: `"-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"`.

### 2. Configuración para el Móvil (Client SDK)
Para que el interceptor de Axios funcione en el móvil, necesitas la configuración de la App:
1. En la misma pantalla de **Configuración del proyecto**, ve a la pestaña **General**.
2. En la sección "Tus aplicaciones", si no tienes una, haz clic en el icono de **Web (</>)** para crear una.
3. Copia el objeto `firebaseConfig` y pégalo en `mobile/src/config/firebase.ts`.

## 📦 Instalación

```bash
npm install
```

## ▶️ Ejecución

### Desarrollo
```bash
npm run start:dev
```

## 🏗️ Arquitectura de Datos

El backend gestiona las siguientes entidades principales:
- **Users**: Usuarios sincronizados automáticamente mediante el token de Firebase.
- **Contacts**: Contactos vinculados al usuario autenticado.
- **Ambits/Attributes**: Categorías y atributos de feedback.
- **Ratings**: Evaluaciones anónimas.

## 🧪 Semillas (Seeding)
Al iniciar en modo desarrollo (`start:dev`), el sistema crea automáticamente contactos y atributos de prueba si la base de datos está vacía.
