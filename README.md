# Chef Mind 🍳

**AI-Powered Recipe Generator & Meal Planning App**

Chef Mind is a smart cooking companion that uses AI to generate personalized recipes based on your available ingredients, dietary preferences, and cooking style.

---

## ✨ Key Feature

- 🤖 AI Recipe Generation using Google Gemini
- 🥫 Smart Pantry tracking with expiration alerts
- 📋 Save & organize your recipes
- 🛒 Auto-generated shopping lists
- 🍽️ Weekly meal planning
- 👤 Secure user accounts

---

## 🛠️ Tech Stack

- **Frontend:** React 19, Vite, Tailwind CSS
- **Backend:** Node.js, Express, PostgreSQL
- **AI:** Google Gemini API

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v16+)
- PostgreSQL
- Google Gemini API Key

### Backend Setup

```bash
cd backend
npm install
cp .env.example .env
```

Edit `.env`:
```
PORT=8000
NODE_ENV=development
DATABASE_URL=postgresql://username:password@localhost:5432/recipe_db
JWT_SECRET=your_secret_key
GEMINI_API_KEY=your_gemini_api_key
```

Run migrations and start:
```bash
npm run migrate
npm run dev
```

Server runs on `http://localhost:8000`

### Frontend Setup

```bash
cd frontend
npm install
cp .env.example .env
```

Edit `.env`:
```
VITE_API_URL=http://localhost:8000/api
```

Start development server:
```bash
npm run dev
```

Open `http://localhost:5173` in your browser.

---

## 📸 User Interface

### Authentication Flow
#### Sign Up
Create a new account to get started with Chef Mind
![Sign Up](screenshot/sign-up.png)

#### Sign In
Welcome back! Log in to your Chef Mind account
![Sign In](screenshot/sign-in.png)

### Main Application

#### Dashboard
Your personal cooking hub with quick stats and shortcuts to main features
![Dashboard](screenshot/dashboard.png)

#### AI Recipe Generator
The heart of Chef Mind - generate personalized recipes based on your ingredients, dietary preferences, and cooking time
![Recipe Generator](screenshot/recipe-generator.png)

#### My Recipes
Browse and manage all your saved recipes with search and filtering by cuisine and difficulty level
![My Recipes](screenshot/my-recipe.png)

#### Pantry Management
Keep track of your ingredients and their expiration dates
![Pantry](screenshot/pantry.png)

#### Weekly Meal Planner
Plan your meals for the entire week with an easy-to-use calendar interface
![Meal Planner](screenshot/meal-planner.png)

#### Shopping List
Automatically generated shopping list to help you organize your grocery shopping
![Shopping List](screenshot/shopping-list.png)

---

## 🎯 Future Roadmap

- 🌙 **Dark Mode** - Toggle between light and dark themes
- ⭐ **Recipe Ratings** - Rate and review recipes
- 🔔 **Notifications** - Pantry expiration reminders
- 📊 **Nutritional Info** - Calorie and macro tracking
- 🎨 **Customizable Themes** - More color schemes
- 📱 **Mobile App** - iOS/Android version

---


