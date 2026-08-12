# Chef Mind — System Architecture & Design Specification

> **AI-Powered Culinary Assistant, Pantry Intelligence & Meal Planning Platform**

---

## 1. System Architecture & Data Flow

Chef Mind is a 4-tier web platform built with **React (Vite)**, **Node.js/Express**, **PostgreSQL**, and **Google Gemini AI**.

```mermaid
sequenceDiagram
    autonumber
    actor User as User / Browser
    participant Client as React Client (Vite + Tailwind)
    participant Axios as Axios Client (AuthContext + Token Interceptor)
    participant API as Express API Server (server.js + Auth Middleware)
    participant Controller as API Controllers (recipe/pantry/mealPlan/shoppingList)
    participant Model as Data Access Models (pg.Pool)
    participant DB as PostgreSQL Database (8 Tables)
    participant Gemini as Google Gemini AI (gemini-2.5-flash)

    Note over User, Gemini: 1. Client Request & Security Flow
    User->>Client: Interacts with Dashboard / Pantry / Planner / Generator
    Client->>Axios: Dispatches API request
    Axios->>API: HTTP REST Request (JSON payload + Bearer Token)
    API->>API: authMiddleware: jwt.verify(token)

    Note over User, Gemini: 2. Core Tier Data Processing
    alt Standard Data Operations (Pantry / Meal Plans / Shopping List)
        API->>Controller: Route to Controller Handler
        Controller->>Model: Execute Model operations
        Model->>DB: Parameterized SQL Queries (pg.Pool)
        DB-->>Model: Query Results
        Model-->>Controller: Formatted Data
        Controller-->>API: 200 OK JSON Response
    else AI Recipe Generation & Suggestions
        API->>Controller: recipeController.generateRecipe()
        Controller->>Model: Retrieve pantry ingredients and user preferences
        Model->>DB: SELECT * FROM pantry_items / user_preferences
        DB-->>Model: In-stock items and dietary restrictions
        Model-->>Controller: Aggregated context
        Controller->>Gemini: Structured JSON prompt with pantry context
        Gemini-->>Controller: Raw generative response
        Controller->>Controller: Defensive Parser (Strip markdown fences -> JSON.parse())
        Controller-->>API: 200 OK (Structured Recipe JSON)
    else Compound Recipe Save (ACID Transaction)
        API->>Controller: recipeController.saveRecipe()
        Controller->>Model: Recipe.create(userId, recipeData)
        Model->>DB: BEGIN Transaction
        Model->>DB: INSERT INTO recipes (...) RETURNING *
        Model->>DB: INSERT INTO recipe_ingredients (...) (Batch insert)
        Model->>DB: INSERT INTO recipe_nutrition (...)
        Model->>DB: COMMIT Transaction
        DB-->>Model: Full Recipe Record
        Model-->>Controller: Created Recipe
        Controller-->>API: 201 Created JSON Response
    end

    API-->>Axios: HTTP Response Payload
    Axios-->>Client: Update React Context / State
    Client-->>User: Render updated UI view
```

---

## 2. Database Architecture (Entity-Relationship Diagram)

The database schema utilizes **8 PostgreSQL tables** 

```mermaid
erDiagram
  users {
    uuid id PK
    string email
    string password_hash
    string name
    timestamp created_at
    timestamp updated_at
  }
  user_preferences {
    uuid id PK
    uuid user_id FK
    array dietary_restrictions
    array allergies
    array preferred_cuisines
    int default_servings
    string measurement_unit
    timestamp created_at
    timestamp updated_at
  }
  pantry_items {
    uuid id PK
    uuid user_id FK
    string name
    decimal quantity
    string unit
    string category
    date expiry_date
    boolean is_running_low
    timestamp created_at
    timestamp updated_at
  }
  recipes {
    uuid id PK
    uuid user_id FK
    string name
    string description
    string cuisine_type
    string difficulty
    int prep_time
    int cook_time
    int servings
    jsonb instructions
    array dietary_tags
    string user_notes
    string image_url
    timestamp created_at
    timestamp updated_at
  }
  recipe_ingredients {
    uuid id PK
    uuid recipe_id FK
    string ingredient_name
    decimal quantity
    string unit
    timestamp created_at
  }
  recipe_nutrition {
    uuid id PK
    uuid recipe_id FK
    int calories
    decimal protein
    decimal carbs
    decimal fats
    decimal fiber
    timestamp created_at
  }
  meal_plans {
    uuid id PK
    uuid user_id FK
    uuid recipe_id FK
    date meal_date
    string meal_type
    timestamp created_at
    timestamp updated_at
  }
  shopping_list_items {
    uuid id PK
    uuid user_id FK
    string ingredient_name
    decimal quantity
    string unit
    string category
    boolean is_checked
    boolean from_meal_plan
    timestamp created_at
    timestamp updated_at
  }

  users ||--o{ user_preferences : "has"
  users ||--o{ pantry_items : "owns"
  users ||--o{ recipes : "saves"
  users ||--o{ meal_plans : "plans"
  users ||--o{ shopping_list_items : "manages"
  recipes ||--o{ recipe_ingredients : "has"
  recipes ||--|| recipe_nutrition : "has"
  recipes ||--o{ meal_plans : "used in"
```

### Multi-Table Atomic Transaction (Recipe Persistence)

Saving a recipe executes an atomic ACID transaction across `recipes`, `recipe_ingredients`, and `recipe_nutrition` via [`Recipe.create()`](file:///D:/project/good/good/chef_mind/backend/src/models/Recipe.js):
```mermaid
sequenceDiagram
    autonumber
    actor Client as Client App
    participant Controller as recipeController.js
    participant Model as Recipe.js Model
    participant DB as PostgreSQL Connection Pool

    Client->>Controller: POST /api/recipes (Recipe + Ingredients + Nutrition)
    Controller->>Model: Recipe.create(userId, recipeData)
    Model->>DB: client.query('BEGIN')
    Model->>DB: INSERT INTO recipes (...) RETURNING *
    Model->>DB: INSERT INTO recipe_ingredients (...) (Batch insert)
    Model->>DB: INSERT INTO recipe_nutrition (...)
    alt Success
        Model->>DB: client.query('COMMIT')
        Model->>Controller: Complete Recipe Object
        Controller->>Client: 201 Created
    else Error Detected
        Model->>DB: client.query('ROLLBACK')
        Model->>Controller: Propagate Error
        Controller->>Client: 500 Internal Server Error
    end
```

---

## 3. AI Pipeline & Capabilities (Google Gemini Integration)

Google Gemini (`gemini-2.5-flash`) handles all generative culinary intelligence via [`backend/src/utils/gemini.js`]

```mermaid
flowchart LR
    subgraph Input_Context ["Input Context Aggregation"]
        Pantry["Pantry Items (Names + Quantities)"]
        Expiring["Priority Expiring Ingredients"]
        Prefs["Dietary & Allergy Restrictions"]
        Meta["Cuisine Type, Servings, Cook Time"]
    end

    subgraph Prompt_Engine ["Prompt Engineering"]
        Prompt_Builder["Strict JSON Schema Prompt Specification"]
    end

    subgraph Gemini_API ["Gemini Inference"]
        Model["gemini-2.5-flash"]
    end

    subgraph Defensive_Parser ["Defensive Sanitization"]
        Clean["Strip markdown json fences"]
        Parse["JSON.parse() Validation"]
        Fallback["Error Interception & Fallback Handling"]
    end

    subgraph Output ["Client Delivery"]
        Response["Structured Recipe / Suggestions JSON"]
    end

    Pantry & Expiring & Prefs & Meta --> Prompt_Builder
    Prompt_Builder --> Model
    Model --> Clean
    Clean --> Parse
    Parse -->|Success| Response
    Parse -->|Error| Fallback
```

---

## 4. End-to-End Core Data Flows

### 4.1 Authentication & Session Token Lifecycle

```mermaid
sequenceDiagram
    autonumber
    actor User
    participant React as React Client (Login.jsx)
    participant AuthCtx as AuthContext.jsx
    participant API as Express (/api/auth)
    participant DB as PostgreSQL (users)

    User->>React: Enter credentials (email, password)
    React->>AuthCtx: login(email, password)
    AuthCtx->>API: POST /api/auth/login
    API->>DB: SELECT * FROM users WHERE email = $1
    DB-->>API: User record (password_hash)
    API->>API: bcrypt.compare(password, password_hash)
    API->>API: jwt.sign({ id, email }, JWT_SECRET)
    API-->>AuthCtx: 200 OK { token, user }
    AuthCtx->>AuthCtx: localStorage.setItem('token', token)
    AuthCtx-->>React: Set user state & redirect /dashboard
```

### 4.2 Meal Plan to Smart Shopping List Reconciliation

```mermaid
sequenceDiagram
    autonumber
    actor User
    participant UI as ShoppingList.jsx
    participant API as shoppingListController.js
    participant Model as ShoppingList.js Model
    participant DB as PostgreSQL

    User->>UI: Click "Generate from Meal Plan" (Select Date Range)
    UI->>API: POST /api/shopping-list/generate-from-meal-plan
    API->>Model: generateFromMealPlan(userId, startDate, endDate)
    Model->>DB: Query planned recipes & required recipe_ingredients
    Model->>DB: Query current pantry_items for userId
    Model->>Model: Calculate delta: Required Ingredients - In-Stock Pantry Items
    Model->>DB: INSERT INTO shopping_list_items (missing ingredients)
    DB-->>Model: New shopping list items
    Model-->>API: Synchronized shopping items
    API-->>UI: 200 OK (Render grouped checklist)
    
    Note over User, DB: User shops and marks items as checked
    User->>UI: Click "Add Checked Items to Pantry"
    UI->>API: POST /api/shopping-list/add-to-pantry
    API->>Model: addCheckedToPantry(userId)
    Model->>DB: Upsert checked items into pantry_items
    Model->>DB: DELETE checked items from shopping_list_items
    DB-->>API: Success
    API-->>UI: 200 OK (Pantry updated, list cleared)
```

---

## 5. Deployment & Containerization Architecture

Chef Mind builds as a single container image using a 3-stage [`Dockerfile`]

```mermaid
flowchart TD
    subgraph Stage1 ["Stage 1: frontend-build (Node 22 Slim)"]
        F_Src["frontend/ source"]
        F_Build["npm run build (Vite)"]
        F_Dist["frontend/dist static artifacts"]
        F_Src --> F_Build --> F_Dist
    end

    subgraph Stage2 ["Stage 2: backend-build (Node 22 Slim)"]
        B_Src["backend/ source"]
        B_Build["npm run build (ESM copy)"]
        B_Dist["/app/dist API bundle"]
        B_Src --> B_Build --> B_Dist
    end

    subgraph Stage3 ["Stage 3: runner (Production Image)"]
        R_Prod["npm install --omit=dev"]
        R_CopyB["dist/ ← backend dist"]
        R_CopyF["public/ ← frontend dist"]
        R_User["USER node (Security hardened)"]
        R_Boot["CMD: node dist/migrate.js && node dist/server.js"]
        
        R_Prod --> R_CopyB --> R_CopyF --> R_User --> R_Boot
    end

    F_Dist -.->|Copy compiled SPA| R_CopyF
    B_Dist -.->|Copy compiled API| R_CopyB
```


