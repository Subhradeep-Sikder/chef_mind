import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

//Import routes
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";
import pantryRoutes from './routes/pantry.js';
import recipeRoutes from './routes/recipes.js';
import mealPlanRoutes from './routes/mealPlans.js';
import shoppingListRoutes from './routes/shoppingList.js';
import keepAliveJob from "./utils/keepAlive.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

//Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from the frontend build
const publicPath = path.join(__dirname, "../public");
app.use(express.static(publicPath));

//API routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/pantry', pantryRoutes);
app.use('/api/recipes', recipeRoutes);
app.use('/api/meal-plans', mealPlanRoutes);
app.use('/api/shopping-list', shoppingListRoutes);

// Test API route
app.get("/api", (req, res) => {
  res.json({ message: "Welcome to the Recipe API!" });
});

// Wildcard route to serve index.html for client-side routing (React Router)
app.get("/{*splat}", (req, res) => {
  res.sendFile(path.join(publicPath, "index.html"), (err) => {
    if (err) {
      res.status(404).send("API is running, but frontend static files were not found. Make sure the frontend is built and copied to backend/public.");
    }
  });
});



const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
    
    // Start keep-alive cron job
    keepAliveJob.start();
    console.log("⏰ Keep-alive cron job started.");
});

