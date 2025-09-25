

// Mongoose ko import kar rahe hain
const mongoose = require("mongoose");
// dotenv ko import kar rahe hain taaki .env file ki values yahan use kar sakein
require("dotenv").config();

// Database se connect karne ka function
const connectDB = () => {
    console.log("🔄 Attempting to connect to MongoDB...");
    
    mongoose.connect(process.env.DATABASE_URL)
    .then(() => {
        // Agar connection safal hota hai, to console mein message print hoga
        console.log("✅ MongoDB connected successfully");
        console.log(`📊 Database: ${mongoose.connection.name}`);
        console.log(`📍 Host: ${mongoose.connection.host}:${mongoose.connection.port}`);
    })
    .catch((error) => {
        // Agar connection mein koi error aata hai
        console.error("❌ MongoDB connection failed");
        console.error("Error details:", error.message);
        // Process ko exit kar do taaki server aage na chale
        process.exit(1);
    });
};

// Event listeners
mongoose.connection.on('connected', () => {
    console.log('🗄️  Mongoose connected to DB');
});

mongoose.connection.on('error', (err) => {
    console.error('❌ Mongoose connection error:', err);
});

mongoose.connection.on('disconnected', () => {
    console.log('⚠️  Mongoose disconnected');
});

module.exports = connectDB;