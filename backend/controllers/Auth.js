// User model ko import kar rahe hain taaki hum database se interact kar sakein
const User = require("../models/User");

// bcrypt library ko import kar rahe hain password hashing ke liye
const bcrypt = require("bcryptjs");

// jsonwebtoken library ko import kar rahe hain token banane ke liye
const jwt = require("jsonwebtoken");

require("dotenv").config();

// Signup logic
exports.signup = async (req, res) => {
    try {
        // Step 1: User se data fetch karna (request body se)
        const { firstName, lastName, email, password } = req.body;

        // Step 2: Validation - Check karna ki saari details bhari hain ya nahi
        if (!firstName || !lastName || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "Please fill all the details carefully.",
            });
        }

        // Step 3: Check karna ki user pehle se registered toh nahi hai
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "User with this email already exists.",
            });
        }

        // Step 4: Password ko hash (secure) karna
        let hashedPassword;
        try {
            // bcrypt.hash() function password ko 10 rounds of salting se secure karta hai
            hashedPassword = await bcrypt.hash(password, 10);
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: `Error in hashing password: ${error.message}`,
            });
        }

        // Step 5: Naye user ko database mein create karna
        const user = await User.create({
            firstName,
            lastName,
            email,
            password: hashedPassword, // Hashed password save kar rahe hain
        });

        // Step 6: Success response bhejna
        return res.status(201).json({
            success: true,
            message: "User registered successfully!",
            user: user,
        });

    } catch (error) {
        // Agar koi aur error aata hai
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "User cannot be registered. Please try again.",
        });
    }
};

// Login logic
exports.login = async (req, res) => {
    try {
        // Step 1: User se data lena
        const { email, password } = req.body;

        // Step 2: Validation
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Please provide both email and password.",
            });
        }

        // Step 3: Check karna ki user exist karta hai ya nahi
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ // 401 = Unauthorized
                success: false,
                message: "Invalid credentials. User not found.",
            });
        }

        // Step 4: Password ko compare karna
        // bcrypt.compare() user ke diye plain password ko database ke hashed password se compare karta hai
        if (await bcrypt.compare(password, user.password)) {
            // Passwords match

            // Step 5: JWT Token create karna
            const payload = {
                email: user.email,
                id: user._id, // User ki unique ID
            };
            
            const token = jwt.sign(payload, process.env.JWT_SECRET, {
                expiresIn: "2h", // Token 2 ghante mein expire ho jayega
            });

            // Password ko response se hata do taaki woh frontend par na jaaye
            user = user.toObject();
            user.password = undefined; 
            
            const options = {
                expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // Cookie 3 din mein expire hogi
                httpOnly: true, // Isse cookie client-side script se access nahi ho sakti (security)
            };

            // Step 6: Token ko cookie mein bhejna aur success response dena
            res.cookie("token", token, options).status(200).json({
                success: true,
                token,
                user,
                message: "Logged in successfully!",
            });

        } else {
            // Passwords do not match
            return res.status(401).json({
                success: false,
                message: "Invalid credentials. Please check your password.",
            });
        }

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Login failed. Please try again.",
        });
    }
};

