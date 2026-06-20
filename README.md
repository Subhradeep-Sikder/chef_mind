# Chef Mind

**AI-Powered Recipe Generation & Meal Planning Platform**

Chef Mind is a modern culinary assistant designed to minimize food waste and simplify daily meal planning. By leveraging Google's Gemini AI, the application analyzes the ingredients currently in a user's pantry to generate personalized, step-by-step recipes that align with their dietary restrictions and cuisine preferences.

---

## Project Overview

In many households, ingredients go to waste simply because it is difficult to keep track of expiration dates and devise recipes on the fly. Chef Mind solves this by providing a unified dashboard where users can manage their pantry stock, receive timely expiration warnings, generate tailored AI recipes, and organize their weekly meals on an interactive calendar.

### Key Value Propositions
- **Waste Reduction:** Promotes sustainability by suggesting recipes that utilize ingredients before they expire.
- **Time Efficiency:** Eliminates the decision fatigue of meal planning with instant, custom recipe generation.
- **Smart Budgeting:** Helps users plan their grocery shopping around their actual needs, preventing unnecessary purchases.
- **Dietary Personalization:** Automatically filters and generates recipes matching health goals, allergies, and dietary preferences.

---

## Technical Stack

- **Frontend:** React, Vite, Tailwind CSS
- **Backend:** Node.js, Express
- **Database:** PostgreSQL
- **AI Integration:** Google Gemini AI

---

## Core Features & User Flow

Chef Mind's features are designed with a focus on intuitive user experience and robust functionality:

1. **User Authentication:** Secure signup and login flow utilizing JWT (JSON Web Tokens) to protect user profiles and persist personal kitchen inventories.
2. **Pantry Management:** Users can log, update, and track available ingredients, with options to set expiration alerts.
3. **AI Recipe Engine:** Generates customized recipes on-demand by passing selected ingredients and dietary flags to the Gemini AI API.
4. **Weekly Planner:** Drag-and-drop recipe cards onto a structured weekly calendar for seamless meal tracking.
5. **Dynamic Shopping List:** Automatically compares required recipe ingredients with the current pantry stock to generate a consolidated checklist of missing items.

---

## UI Preview

Below is the user flow and interface mapped out systematically:

### 1. Authentication Flow
- **Sign Up**
  ![Sign Up](screenshot/sign-up.png)
- **Sign In**
  ![Sign In](screenshot/sign-in.png)

### 2. Main Dashboard & AI Generator
- **Dashboard Overview**
  ![Dashboard](screenshot/dashboard.png)
- **AI Recipe Generator**
  ![Recipe Generator](screenshot/recipe-generator.png)

### 3. Recipe Management & Pantry Tracking
- **My Saved Recipes**
  ![My Recipes](screenshot/my-recipe.png)
- **Pantry Management**
  ![Pantry](screenshot/pantry.png)

### 4. Planning & Smart Shopping
- **Weekly Meal Planner**
  ![Meal Planner](screenshot/meal-planner.png)
- **Smart Shopping List**
  ![Shopping List](screenshot/shopping-list.png)

---

## Local Installation and Setup

### Prerequisites
- Node.js (v18 or higher)
- PostgreSQL database instance
- Google Gemini API Key

### Backend Configuration

1. Navigate to the backend directory and install the necessary dependencies:
   ```bash
   cd backend
   npm install
   ```
2. Create your environment configuration file:
   ```bash
   cp .env.example .env
   ```
3. Configure the `.env` file with your database credentials, JWT secret, and Gemini API key:
   ```env
   PORT=8000
   DATABASE_URL=postgresql://username:password@localhost:5432/recipe_db
   JWT_SECRET=your_jwt_secret_key
   GEMINI_API_KEY=your_google_gemini_api_key
   ```
    [Neon Console](https://neon.tech) || [Google AI Studio](https://aistudio.google.com)
4. Start the backend development server:
   ```bash
   npm run dev
   ```
   The backend service will run on `http://localhost:8000`.

### Frontend Configuration

1. Navigate to the frontend directory and install the required packages:
   ```bash
   cd ../frontend
   npm install
   ```
2. Create the environment configuration file:
   ```bash
   cp .env.example .env
   ```
3. Configure the API endpoint to point to the backend server:
   ```env
   VITE_API_URL=http://localhost:8000/api
   ```
4. Start the frontend development server:
   ```bash
   npm run dev
   ```
   The frontend application will be served at `http://localhost:5173`.

---

## Future Roadmap

- **Dark Mode Support** — Seamless toggle between light and dark themes to enhance visual accessibility.
- **Recipe Reviews & Ratings** — Community ratings and custom notes for saved and generated recipes.
- **Nutritional Calculations** — Integration of dynamic macro and calorie estimations for every generated recipe.
- **Smart Push Notifications** — Real-time alerts for ingredients in the pantry approaching their expiration dates.
- **Native Mobile Application** — Expand the ecosystem to iOS and Android platforms.

---

Build by [Subhradeep Sikder](https://github.com/Subhradeep-Sikder)
