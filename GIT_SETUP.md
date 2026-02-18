# Inicializar repositorio Git y subir a GitHub

## Comandos para ejecutar en orden

```bash
# 1. Inicializar Git (si no está inicializado)
git init

# 2. Añadir todos los archivos
git add .

# 3. Crear commit inicial
git commit -m "feat: initial commit with complete project structure

- React Native mobile app structure
- React web app structure  
- NestJS backend structure
- MySQL schema and data model
- Complete documentation (architecture, tech stack, i18n, etc.)
- i18n implementation with react-i18next and nestjs-i18n
- Translation files (Spanish and English)
- Web prototype (Netlify-ready)
- Git configuration (.gitignore, CONTRIBUTING.md)"

# 4. Crear repositorio en GitHub
# Ve a https://github.com/new
# Nombre: be-app (o el que prefieras)
# Descripción: Red social de feedback anónimo - Anonymous feedback social network
# Público o Privado según prefieras
# NO inicializar con README (ya tenemos uno)

# 5. Conectar con el repositorio remoto (reemplazar con tu URL)
git remote add origin https://github.com/TU_USUARIO/be-app.git

# 6. Verificar la conexión
git remote -v

# 7. Hacer push de la rama principal
git branch -M main
git push -u origin main
```

## Estructura que se subirá

```
be/
├── .gitignore                    # Archivos a ignorar
├── README.md                     # Documentación principal
├── ARCHITECTURE.md               # Arquitectura técnica
├── CONTRIBUTING.md               # Guía de contribución
├── docs/                         # Documentación completa
│   ├── ARCHITECTURE.md
│   ├── BUSINESS_CONTEXT.md
│   ├── DATA_MODEL.md  
│   ├── DEVELOPMENT_GUIDE.md
│   ├── INDEX.md
│   ├── INTERNATIONALIZATION.md  # ⭐ Nueva
│   ├── PROJECT_CONTEXT.md       # ⭐ Nueva
│   ├── PROJECT_SUMMARY.md
│   ├── TECH_STACK.md
│   └── UI_UX_GUIDE.md
├── i18n/                         # ⭐ Nuevo
│   └── locales/
│       ├── es/
│       │   ├── auth.json
│       │   ├── common.json
│       │   └── rating.json
│       └── en/
│           ├── auth.json
│           ├── common.json
│           └── rating.json
├── web-prototype/                # Prototipo web
│   ├── index.html
│   ├── styles.css
│   ├── app.js
│   ├── particles.js
│   ├── netlify.toml
│   └── README.md
└── original_docs/                # Documentos originales
    ├── Speach Be.md
    ├── diseño DB.md
    ├── Arbol de Esencia.md
    └── Drawer menu.md
```

## Notas importantes

1. **Variables de entorno**: No se subirán archivos `.env` (están en .gitignore)
2. **node_modules**: No se subirán dependencias (están en .gitignore)
3. **Secrets**: Asegúrate de no tener API keys en el código

## Después del push

1. Ve a tu repositorio en GitHub
2. Verifica que todos los archivos se hayan subido
3. GitHub automáticamente mostrará el README.md
4. Puedes añadir topics/etiquetas: `react-native`, `nestjs`, `mysql`, `i18n`
5. Considera hacer el repo privado si contiene información sensible

## Configurar ramas protegidas (opcional pero recomendado)

En GitHub:
1. Settings → Branches → Add rule
2. Branch name pattern: `main`
3. Activar:
   - ✅ Require pull request reviews before merging
   - ✅ Require status checks to pass before merging
   - ✅ Include administrators

## Siguiente paso: GitHub Actions (opcional)

Puedes configurar CI/CD con GitHub Actions para:
- Ejecutar tests automáticamente
- Verificar que archivos i18n estén completos
- Deploy automático a Netlify (para web-prototype)
