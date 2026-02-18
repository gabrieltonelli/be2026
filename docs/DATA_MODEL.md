# Modelo de Datos - Be

## Estructura del Árbol de Esencia

El modelo de datos de Be se basa en una jerarquía de tres niveles que define cómo se organizan los atributos calificables:

```
ÁMBITO (Ambit)
  └── CATEGORÍA (Category)
        └── ATRIBUTO (Attribute)
              └── Calificación Particular (Rating)
                    └── Calificación General (Average)
```

## Definiciones

### 1. Ámbito (Ambit)
**Concepto más general de interés donde se desempeña una persona**

Ejemplos:
- Laboral
- Social
- Deportivo
- Salud
- Estético

### 2. Categoría (Category)
**Aspecto específico dentro de un ámbito**

Ejemplos dentro del ámbito "Laboral":
- Personalidad
- Sociabilidad
- Competitividad

### 3. Atributo (Attribute)
**Característica concreta a ser calificada, expresada como par de antónimos**

Ejemplos:
- Puntual / Impuntual
- Honesto / Deshonesto
- Eficiente / Ineficiente

### 4. Calificación Particular
**Puntaje (1-5) asignado por un usuario específico a un atributo de un contacto**

### 5. Calificación General
**Promedio de todas las calificaciones particulares de un atributo**

### 6. Calificación Global (Esencia)
**Promedio de todas las calificaciones generales de un usuario**

## Ámbitos Definidos

### 1. 💼 Laboral

#### Categorías:

**Personalidad**
- Proactivo / Reactivo
- Puntual / Impuntual
- Cumplidor / Incumplidor
- Responsable / Irresponsable
- Entusiasta / Apático
- Creativo / Convencional
- Seguro / Inseguro
- Concreto / Abstracto
- Reflexivo / Impulsivo
- Auténtico / Falso
- Visionario / Cortoplacista
- Innovador / Tradicional
- Autocrítico / Autocomplaciente
- Pragmático / Idealista
- Honesto / Deshonesto
- Estructurado / Desorganizado
- Buena presencia / Mala presencia

**Sociabilidad**
- Carismático / Antipático
- Adaptable / Rígido
- Motivador / Desmotivador
- Comunicativo / Hermético
- Compasivo / Indiferente
- Empático / Apático
- Tolerante / Intolerante
- Permisivo / Autoritario
- Persuasivo / No convincente
- Delegativo / Controlador
- Cooperativo / Individualista
- Solidario / Egoísta
- Leal / Traicionero

**Competitividad**
- Eficiente / Ineficiente
- Apto / Inepto
- Instruido / Ignorante
- Hábil / Torpe
- Certero / Errático
- Capaz / Incapaz

---

### 2. 🏛️ Político
*(Hereda atributos de Laboral + específicos)*

Categorías y atributos similares a Laboral, con énfasis en:
- Liderazgo
- Transparencia
- Servicio público

---

### 3. 🏃 Deportivo
*(Hereda base de Laboral)*

#### Categorías:

**Destreza Física**
- Potente / Débil
- Resistente / Frágil
- Veloz / Lento
- Flexible / Rígido
- Coordinado / Descoordinado
- Ágil / Torpe
- Equilibrado / Desequilibrado
- Buena técnica / Mala técnica
- Alto rendimiento / Bajo rendimiento
- Preciso / Impreciso

---

### 4. 👨‍👩‍👧 Social

#### Categoría: Familia
- Considerado / Desconsiderado
- Dócil / Agresivo
- Agradecido / Desagradecido
- Puntual / Impuntual
- Solidario / Individualista
- Familiero / Solitario

#### Categoría: Amigos
- Divertido / Aburrido
- Leal / Desleal
- Confiable / No confiable
- Disponible / Ausente

#### Categoría: Pareja
- Confiable / Traicionero
- Confiado / Desconfiado
- Honesto / Mentiroso
- Romántico / Frío
- Atento / Descuidado

#### Categoría: Casuales
- Amable / Grosero
- Respetuoso / Irrespetuoso

---

### 5. 🏥 Salud

#### Categoría: Física
- Buena respiración / Mala respiración
- Descansado / Cansado
- Fuerte / Débil
- Veloz / Lento
- Nutrido / Desnutrido
- Ágil / Torpe
- Enérgico / Agotado
- Coordinado / Descoordinado

#### Categoría: Mental
- Coherente / Desvariante
- Cuerdo / Delirante
- Terrenal / Espiritual
- Dócil / Terco
- Decidido / Indeciso
- Seguro / Inseguro
- Consciente / Inconsciente
- Creyente / Ateo

#### Categoría: Emocional
- Alegre / Triste
- Optimista / Pesimista
- Insensible / Sensible
- Divertido / Aburrido
- Radiante / Sombrío
- Franco / Mentiroso
- Complaciente / Testarudo
- Independiente / Dependiente
- Solidario / Individualista
- Bondadoso / Cruel
- Comprensivo / Incomprensivo
- Moral / Inmoral

---

### 6. 🎨 Estético

#### Categoría: Apariencia Física
- Tonificado / Flácido
- Delgado / Obeso
- Alto / Bajo
- Erguido / Encorvado
- Buen porte / Mal porte
- Rudo / Delicado
- Atractivo / Feo
- Blanco / Moreno

#### Categoría: Vestimenta
- Elegante / Desalineado
- Prolijo / Desprolijo
- Formal / Informal
- Sofisticado / Sencillo
- Original / Común
- Lujoso / Económico
- Chic / Ordinario
- Atrevido / Conservador
- Clásico / Moderno

#### Categoría: Peinado
- Bonito / Feo
- Moderno / Antiguo
- Prolijo / Desprolijo
- Atrevido / Conservador

#### Categoría: Maquillaje
- Apropiado / Exagerado
- Natural / Sobrecargado

#### Categoría: Higiene Personal
- Perfumado / Oloroso
- Limpio / Sucio
- Buen aliento / Mal aliento
- Hidratado / Escamoso

---

### 7. 🎭 Artístico

#### Categorías:
- **Obra**: Calidad de las creaciones
- **Trayectoria**: Consistencia y evolución
- **Prestigio**: Reconocimiento en el medio

---

### 8. 🎓 Educativo
*(Hereda base de Laboral)*

Específicamente para contextos académicos:
- Como docente
- Como estudiante
- Como compañero
- Como directivo

---

## Esquema de Base de Datos (MySQL)

### Tabla: `ambits`

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

### Tabla: `categories`

```sql
CREATE TABLE categories (
  id INT PRIMARY KEY AUTO_INCREMENT,
  ambit_id INT NOT NULL,
  name VARCHAR(100) NOT NULL,
  description TEXT,
  icon VARCHAR(50),
  display_order INT DEFAULT 0,
  FOREIGN KEY (ambit_id) REFERENCES ambits(id),
  INDEX idx_ambit_id (ambit_id)
);
```

### Tabla: `attributes`

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
  INDEX idx_category_id (category_id)
);
```

### Tabla: `users`

```sql
CREATE TABLE users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  firebase_uid VARCHAR(128) UNIQUE NOT NULL,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  avatar_url VARCHAR(512),
  global_rating DECIMAL(2,1) DEFAULT 0.0,
  total_ratings_received INT DEFAULT 0,
  is_premium BOOLEAN DEFAULT FALSE,
  hide_general_ratings BOOLEAN DEFAULT FALSE,
  selected_ambits JSON,
  notification_settings JSON,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_firebase_uid (firebase_uid),
  INDEX idx_email (email)
);
```

### Tabla: `contacts`

```sql
CREATE TABLE contacts (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL,
  name VARCHAR(255) NOT NULL,
  source ENUM('facebook', 'google', 'linkedin', 'instagram', 'twitter', 'manual') NOT NULL,
  source_id VARCHAR(255),
  avatar_url VARCHAR(512),
  email VARCHAR(255),
  is_hidden BOOLEAN DEFAULT FALSE,
  is_favorite BOOLEAN DEFAULT FALSE,
  groups JSON,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  INDEX idx_user_id (user_id),
  INDEX idx_source (source)
);
```

### Tabla: `ratings`

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

### Tabla: `general_ratings` (Calculada/Agregada)

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

## Reglas de Negocio

### Calificaciones

1. **Rango**: 1-5 (enteros)
   - 1: Muy negativo
   - 2: Negativo
   - 3: Neutral
   - 4: Positivo
   - 5: Muy positivo

2. **Actualización**: Un usuario puede cambiar su calificación en cualquier momento

3. **Anonimato**: El `toContactId` **nunca** puede ver el `fromUserId`

### Calificaciones Generales

1. **Cálculo**: `AVG(ratings.score)` donde `ratings.toContactId = contactId AND ratings.attributeId = attributeId`

2. **Mínimo de calificaciones**: Se requieren al menos **3 calificaciones** para mostrar una calificación general

3. **Actualización**: Se recalcula cada vez que hay una nueva calificación o modificación

### Calificación Global

1. **Cálculo**: `AVG(general_ratings.averageScore)` para todos los atributos del usuario

2. **Solo ámbitos activos**: Solo se consideran los ámbitos que el usuario tiene habilitados en preferencias

### Visibilidad

```javascript
if (user.preferences.hideGeneralRatings === true) {
  // El usuario NO puede ver:
  // - general_ratings de sus contactos
  
  // El contacto SÍ puede ver:
  // - general_ratings propias (si están visibles)
}
```

## Índices Recomendados

Para optimizar queries en Firestore:

```javascript
// Índice 1: Obtener todas las calificaciones de un contacto
ratings: [toContactId, attributeId, createdAt]

// Índice 2: Obtener calificaciones por ámbito
ratings: [toContactId, ambitId, createdAt]

// Índice 3: Calificaciones generales de un usuario
general_ratings: [contactId, ambitId, averageScore]
```

## Expansión Futura

### Atributos Personalizados (Marketplace)

En versiones futuras, los usuarios premium podrán:
- Sugerir nuevos atributos
- Votar atributos propuestos por otros
- Ver atributos "trending"

```json
{
  "id": "custom_attr_001",
  "proposedBy": "user_123",
  "positive": "Generoso",
  "negative": "Tacaño",
  "ambitId": "social",
  "categoryId": "personalidad",
  "status": "pending|approved|rejected",
  "votes": 245,
  "uses": 1200
}
```
