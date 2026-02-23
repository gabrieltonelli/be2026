# Documento Técnico: Estrategia de Seguridad y Despliegue de Grado Corporal

Este documento detalla la arquitectura de seguridad y el plan de infraestructura para **Be**, siguiendo los estándares de la industria usados por empresas como Netflix, Airbnb y WhatsApp.

## 1. Arquitectura de Seguridad (Auth & Transport)

Para lograr un estándar profesional, implementaremos una arquitectura basada en **Zero Trust** y **OIDC (OpenID Connect)**.

### A. Autenticación y Autorización
Utilizaremos **Firebase Auth** como nuestro IDP (Identity Provider) pero con un flujo de **JWT (JSON Web Tokens)** validado en el servidor:
1.  **Mobile Client**: Se autentica contra Firebase (OAuth2/OIDC).
2.  **ID Token**: Firebase entrega un `idToken` al móvil.
3.  **Backend Verification**: El móvil envía este token en el header `Authorization: Bearer <token>`. Nuestro backend (NestJS) usa el **Firebase Admin SDK** para verificar la firma del JWT, el tiempo de expiración y la validez en cada request.
4.  **JWT Strategy**: Implementaremos una estrategia de pasaporte en NestJS para extraer el `uid` del usuario y vincularlo a sus datos en MySQL.

### B. Seguridad de Transporte (TLS/SSL)
En un despliegue real, nunca exponemos el puerto del backend directamente:
-   **Certificados Managed**: Uso de Let's Encrypt o AWS ACM para TLS 1.3.
-   **API Gateway / Reverse Proxy**: Un Nginx o Traffic control que gestione la terminación SSL.

### C. Protección de API
-   **Rate Limiting**: Evitar ataques de fuerza bruta o DoS.
-   **CORS**: Configuración estricta para permitir solo dominios/orígenes conocidos.
-   **Header Security**: Uso de **Helmet** para configurar headers de seguridad (HSTS, CSP, X-Frame-Options).

---

## 2. Infraestructura Recomendada (Simulación de Despliegue)

Para simular un despliegue profesional localmente o en nube, necesitamos la siguiente pila:

| Componente | Tecnología | Propósito |
| :--- | :--- | :--- |
| **Contenedores** | Docker & Docker Compose | Aislamiento de servicios. |
| **Orquestación** | Kubernetes (o Docker Swarm) | Escalabilidad y auto-recuperación. |
| **Proxy Inverso** | Nginx / Traefik | Terminación SSL, Balanceo de carga y Path routing. |
| **CI/CD** | GitHub Actions | Automatización de tests y despliegue continuo. |
| **Database** | MySQL (Managed o en Docker) | Persistencia de datos. |

---

## 3. Guía de Despliegue Simulado (Local con Docker)

### Paso 1: Configuración de Firebase Admin
Necesitamos un archivo `firebase-admin-sdk.json` generado en la consola de Firebase para que el backend pueda validar los tokens de los celulares.

### Paso 2: Orquestación con Docker Compose
Crearemos un archivo `docker-compose.prod.yml` que incluya:
-   **Servicio Backend**: Imagen de producción de la app NestJS.
-   **Servicio DB**: MySQL con volúmenes persistentes.
-   **Servicio Proxy**: Nginx para recibir tráfico en el puerto 80/443 e internamente enviarlo al backend en el puerto 3000.

### Paso 3: Optimización de Imágenes
-   **Multi-stage builds**: Crear imágenes livianas (Node Alpine/Slim) que solo contengan el `/dist` compilado y las dependencias de producción.

---

## 4. Roadmap de Seguridad Inmediato

1.  **Backend**: Instalar `@nestjs/passport` y `firebase-admin`.
2.  **Mobile**: Implementar interceptores en Axios para inyectar automáticamente el token de Firebase en cada petición.
3.  **Ambiente**: Mover todas las credenciales sensibles a un sistema de gestión de secretos (Vault o variables de entorno encriptadas).

Este enfoque garantiza que, si la aplicación escala a millones de usuarios, la base de seguridad ya está diseñada para soportarlo sin necesidad de refactorizar el núcleo del sistema.
