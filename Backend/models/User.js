const mongoose = require("mongoose");

// userSchema batata hai ki har user document mein kya-kya fields honge
const userSchema = new mongoose.Schema({
    // User ka naam
    firstName: {
        type: String, // Data ka type String (text) hoga
        required: true, // Ye field zaroori hai
        trim: true, // Aage-peeche ke extra spaces hata dega
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
    },
    // User ka email, jo unique hona chahiye
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true, // Har user ka email alag hoga
    },
    // User ka password
    password: {
        type: String,
        required: true,
    },
    // Future ke liye: user ki profile picture (hum yahan Cloudinary ka URL save karenge)
    image: {
        type: String,
    },
    // Future ke liye: user ne kaun-kaun se quiz diye hain
    quizzes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Quiz", // "Quiz" naam ke model se link hoga
        }
    ]
}, { timestamps: true }); // timestamps: true automatically 'createdAt' aur 'updatedAt' fields add kar deta hai

// Is schema ko ek model banakar export kar rahe hain
module.exports = mongoose.model("User", userSchema);
