// Import required packages
const express = require("express");

// Create an Express application
const app = express();

// Load environment variables from .env file
require("dotenv").config();

const cors = require("cors");

const connectDB = require("./config/database");

// Importing Routes
const userRoutes = require("./routes/user");
const quizRoutes = require("./routes/quiz");

// Define the port the server will run on
// Use the PORT from .env file, or default to 4000
const PORT = process.env.PORT || 4000;

// Middleware
// Enable CORS for all routes
app.use(cors());
// Allow the server to parse JSON from request bodies
app.use(express.json());

// --- Database Connection ---
// Connect to MongoDB
connectDB();

// 2. Apne server ko batayein ki in routes ko use karna hai
// Iska matlab: "Har woh URL jo '/api/v1' se shuru ho, use aage 'userRoutes' ya 'quizRoutes' ke paas bhej do."
app.use("/api/v1", userRoutes);
app.use("/api/v1/quiz", quizRoutes);

// Basic route (for testing)
app.get("/", (req, res) => {
    res.json({
        message: "Hello from the backend! Welcome to the Quizora API."
    });
});

app.listen(PORT, () => {
    console.log(`Server is running successfully on http://localhost:${PORT}`);
});