// const express = require('express');
// const dotenv = require('dotenv');

// const authRoutes = require('./routes/user');
// const quizRoutes = require('./routes/quiz');

// const cookieParser = require('cookie-parser');
// const cors = require('cors');

// // 1. Import the database connection function from our new file
// const connectDB = require('./config/database');

// // Load environment variables from .env file
// dotenv.config();

// // 2. Execute the connection to the database
// connectDB();

// const app = express();
// const PORT = process.env.PORT || 8000;

// // Middleware to parse incoming JSON requests
// app.use(express.json());
// app.use(cookieParser());

// // This configuration tells the backend to accept requests from your frontend
// app.use(
//     cors({
//         origin: "http://localhost:5173", // The URL of your frontend application
//         credentials: true, // This allows cookies to be sent and received 
//     })
// );

// app.use('/api/auth', authRoutes);  
// app.use('/api/quiz', quizRoutes); 


// // A basic route to check if the server is alive
// app.get('/', (req, res) => {
//   res.json({ message: "Welcome to the Quizora API!" });
// });

// app.listen(PORT, () => {
//   console.log(`🚀 Server is running on port ${PORT}`);
// });



const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const cookieParser = require('cookie-parser'); // 1. Make sure this is imported
const connectDB = require('./config/database');

// --- Import Routes ---
const authRoutes = require('./routes/user');
const quizRoutes = require('./routes/quiz');

// --- Initial Configurations ---
dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;

// --- Database Connection ---
connectDB();

// --- Middlewares (Order is important!) ---
app.use(express.json());
app.use(cookieParser()); // 2. Make sure this line is present and before your routes
app.use(
    cors({
        origin: "https://quizora-ai-quiz-app.vercel.app", 
        credentials: true,
    })
);

// --- Mount API Routes ---
app.use('/api/auth', authRoutes);
app.use('/api/quiz', quizRoutes);

// --- Basic Test Route ---
app.get('/', (req, res) => {
  res.json({ message: "Welcome to the Quizora API!" });
});

// --- Start the Server ---
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});
