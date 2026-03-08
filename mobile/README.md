# ⚠️ IMPORTANTE: Dependencias y Versiones

**REQUISITO ESTRICTO DE EXPO SDK:**
Estamos trabajando de forma obligatoria con **Expo SDK 54** y **Expo Go (Client Version 54.0.6)**.

### Instrucciones para el equipo y asistentes de IA:
1. **NO actualizar**: Bajo ninguna circunstancia se debe actualizar el Expo SDK a una versión superior o inferior de la rama 54 con cliente 54.0.6.
2. **Dependencias**: Al instalar nuevas librerías o dependencias, verificar obligatoriamente que sean **compatibles con Expo 54**. Se ha downgradeado `react-native-svg` (a ^15.15.0) y otras dependencias para lograr la estabilidad del build.
3. **Instalación de paquetes**: Debido a los conflictos resueltos anteriormente, si necesitas ejecutar la instalación, usa:
   `npm install --legacy-peer-deps`
4. **Objetivo Principal**: Mantener la viabilidad de escanear el código QR con el teléfono móvil sin caídas por conflictos de versión de React Native / SVG / Expo.

## 🚀 Cómo Levantar la Aplicación

Para ejecutar el proyecto en dispositivos físicos o emuladores, primero asegúrate de instalar las dependencias con:
```bash
npm install --legacy-peer-deps
```

### 🤖 Android (Conectado por USB)
1. **Activar Opciones de Desarrollador**: En tu teléfono Android, ve a *Ajustes > Acerca del teléfono* y pulsa 7 veces sobre el *Número de compilación*.
2. **Depuración USB**: Entra en *Sistema > Opciones para desarrolladores* y activa **Depuración por USB**.
3. **Conexión**: Conecta el teléfono a la PC mediante un cable USB de buena calidad.
4. **Ejecutar**: En la terminal, dentro de la carpeta `mobile`, ejecuta:
   ```bash
   npx expo run:android
   ```
   *Nota: La primera vez descargará herramientas de build y puede demorar unos minutos.*

### 🍎 iOS (iPhone/iPad)
Debido a que estamos usando **Expo SDK 54**, la forma más rápida y estable de probar en iOS sin necesidad de una Mac (usando Windows) es a través de **Expo Go**:

1. **Instalar Expo Go**: Descarga la app "Expo Go" desde el App Store en tu iPhone.
2. **Misma Red Wi-Fi**: Asegúrate de que tanto tu PC como tu iPhone estén conectados a la misma red Wi-Fi.
3. **Iniciar Servidor**:
   ```bash
   npx expo start
   ```
4. **Escanear QR**: Abre la cámara de tu iPhone y escanea el código QR que aparecerá en la terminal (o usa la opción "Scan QR Code" dentro de la propia app Expo Go).

---

## 🛠️ Utilidades (Solo Windows)

### Liberar Puerto 8001 (`kill8001.bat`)
Si al intentar iniciar Expo recibes un error de que el puerto **8001** ya está en uso, puedes usar este script para cerrar rápidamente cualquier proceso que esté bloqueando el puerto.

**Uso:**
- Ejecuta `.\kill8001.bat` desde la terminal dentro de esta carpeta.
- O haz doble clic sobre el archivo `mobile/kill8001.bat`.

*Nota: Este script utiliza comandos específicos de Windows (`netstat` y `taskkill`).*

