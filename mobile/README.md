# ⚠️ IMPORTANTE: Dependencias y Versiones

**REQUISITO ESTRICTO DE EXPO SDK:**
Estamos trabajando de forma obligatoria con **Expo SDK 54** y **Expo Go (Client Version 54.0.6)**.

### Instrucciones para el equipo y asistentes de IA:
1. **NO actualizar**: Bajo ninguna circunstancia se debe actualizar el Expo SDK a una versión superior o inferior de la rama 54 con cliente 54.0.6.
2. **Dependencias**: Al instalar nuevas librerías o dependencias, verificar obligatoriamente que sean **compatibles con Expo 54**. Se ha downgradeado `react-native-svg` (a ^15.15.0) y otras dependencias para lograr la estabilidad del build.
3. **Instalación de paquetes**: Debido a los conflictos resueltos anteriormente, si necesitas ejecutar la instalación, usa:
   `npm install --legacy-peer-deps`
4. **Objetivo Principal**: Mantener la viabilidad de escanear el código QR con el teléfono móvil sin caídas por conflictos de versión de React Native / SVG / Expo.
