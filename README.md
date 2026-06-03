# 🍳 Chef Mind

**AI-Powered Recipe Generator & Meal Planning App**

Chef Mind is a smart culinary companion designed to reduce food waste and simplify meal planning. Using Google's Gemini AI, the app generates personalized, delicious recipes based on the ingredients you already have in your pantry, tailored to your dietary restrictions and preferred cuisine.

### 🌟 Key Benefits
- **Zero Waste** 🗑️ — Use up pantry items before they expire.
- **Save Time** ⏱️ — Instant custom recipes on demand.
- **Smart Budget** 🛒 — Shop exactly what you need.
- **Diet Match** 🥗 — Auto-aligned with your health goals.

---

## 🛠️ Tech Stack

- **Frontend:** ![React](https://img.shields.io/badge/React-20232A?style=flat-square&logo=react&logoColor=61DAFB) ![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat-square&logo=vite&logoColor=white) ![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white)
- **Backend:** ![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat-square&logo=nodedotjs&logoColor=white) ![Express](https://img.shields.io/badge/Express-000000?style=flat-square&logo=express&logoColor=white)
- **Database:** ![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=flat-square&logo=postgresql&logoColor=white) 
- **AI Integration:** ![Gemini AI](https://img.shields.io/badge/Google_Gemini-8E75C2?style=flat-square&logo=googlegemini&logoColor=white)

---

## 📖 User Guide

1. **Sign Up & Log In** 🔐 — Create an account to sync your kitchen profile.
2. **Stock Your Pantry** 🥫 — Log available ingredients (with optional expiration alerts).
3. **Generate Recipes** 🤖 — Select ingredients and dietary tags to get custom Gemini AI recipes.
4. **Plan Your Week** 📅 — Save recipes and drag-and-drop them into your meal calendar.
5. **Auto-Shop List** 🛒 — Instantly get a checklist for any missing ingredients.

---

## 📸 User Interface Showcase

Below is the user flow and interface mapped out systematically:

### 1. Authentication Flow
| Sign Up | Sign In |
|:---:|:---:|
| ![Sign Up](screenshot/sign-up.png) | ![Sign In](screenshot/sign-in.png) |

### 2. Main Dashboard & AI Generator
| Dashboard Overview | AI Recipe Generator |
|:---:|:---:|
| ![Dashboard](screenshot/dashboard.png) | ![Recipe Generator](screenshot/recipe-generator.png) |

### 3. Recipe Management & Pantry Tracking
| My Saved Recipes | Pantry Management |
|:---:|:---:|
| ![My Recipes](screenshot/my-recipe.png) | ![Pantry](screenshot/pantry.png) |

### 4. Planning & Smart Shopping
| Weekly Meal Planner | Smart Shopping List |
|:---:|:---:|
| ![Meal Planner](screenshot/meal-planner.png) | ![Shopping List](screenshot/shopping-list.png) |

---

## 🚀 Local Setup

### Prerequisites
- Node.js (v18+)
- PostgreSQL database
- Google Gemini API Key

### Backend Configuration

1. Navigate to the backend directory and install dependencies:
   ```bash
   cd backend
   npm install
   ```
2. Set up your environment file:
   ```bash
   cp .env.example .env
   ```
3. Configure `.env` with your PostgreSQL database URL, JWT Secret, and Gemini API Key:
   ```env
   PORT=8000
   DATABASE_URL=postgresql://username:password@localhost:5432/recipe_db
   JWT_SECRET=your_jwt_secret_key
   GEMINI_API_KEY=your_google_gemini_api_key
   ```
   *(Get your PostgreSQL connection string from [Neon Console](https://neon.tech) and your API key from [Google AI Studio](https://aistudio.google.com))*
4. Start the server:
   ```bash
   npm run dev
   ```
   The backend will run on `http://localhost:8000`.

### Frontend Configuration

1. Navigate to the frontend directory and install dependencies:
   ```bash
   cd ../frontend
   npm install
   ```
2. Set up your environment file:
   ```bash
   cp .env.example .env
   ```
3. Ensure the API endpoint points to the backend server:
   ```env
   VITE_API_URL=http://localhost:8000/api
   ```
4. Run the development server:
   ```bash
   npm run dev
   ```
   The frontend will run on `http://localhost:5173`.

---

## 🔮 Future Improvements

- [ ] 🌙 **Dark Mode Support** — Seamless toggle between light and dark themes.
- [ ] ⭐ **Recipe Reviews** — Community ratings and custom notes on generated recipes.
- [ ] 📊 **Nutritional Calculations** — Dynamic macro and calorie calculations for every AI-generated dish.
- [ ] 🔔 **Smart Reminders** — Push notifications for items in your pantry approaching expiration.
- [ ] 📱 **Native Mobile Application** — Bring the Chef Mind experience to iOS and Android.

---
Built with ❤️
