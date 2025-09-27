

const jwt = require("jsonwebtoken");
require("dotenv").config();

// auth middleware
exports.auth = async (req, res, next) => {
    try {
        // Step 1: Token ko extract karna (The new, safer way)
        let token = null;

        // Sabse pehle, Authorization header check karo
        const authHeader = req.header("Authorization");
        if (authHeader && authHeader.startsWith("Bearer ")) {
            // Agar header hai aur "Bearer " se shuru hota hai, toh token nikalo
            token = authHeader.replace("Bearer ", "");
        } else {
            // Agar header mein nahi hai, toh cookie ya body mein dhoondho
            token = req.cookies.token || req.body.token;
        }

        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Token is missing. Please log in.",
            });
        }

        // Step 2: Token ko verify karna
        try {
            const decodedPayload = jwt.verify(token, process.env.JWT_SECRET);
            console.log("Decoded Token Payload:", decodedPayload);
            req.user = decodedPayload;

        } catch (error) {
            // Ye error tab aayega jab token galat ya expired hoga
            return res.status(401).json({
                success: false,
                message: "Token is invalid.",
            });
        }

        // Step 3: Agle middleware ya controller par jaana
        next();

    } catch (error) {
        // Ye error ab aane ki possibility bahut kam hai
        return res.status(401).json({
            success: false,
            message: "Something went wrong while validating the token.",
        });
    }
};


