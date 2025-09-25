// const jwt = require("jsonwebtoken");
// require("dotenv").config();

// // auth middleware
// exports.auth = async (req, res, next) => {
//     try {
//         // Step 1: Token ko extract karna
//         // Token 3 jagah se aa sakta hai: request body, cookie, ya header.
//         // Hum sabse standard tareeka use karenge: Authorization Header.
//         const token = req.body.token || req.cookies.token || req.header("Authorization").replace("Bearer ", "");

//         if (!token) {
//             return res.status(401).json({
//                 success: false,
//                 message: "Token is missing. Please log in.",
//             });
//         }

//         // Step 2: Token ko verify karna
//         try {
//             // jwt.verify() token ko secret key se decode karne ki koshish karta hai
//             const decodedPayload = jwt.verify(token, process.env.JWT_SECRET);
//             console.log("Decoded Token Payload:", decodedPayload);

//             // Decoded payload (jisme user ki id aur email hai) ko request object mein daal do
//             req.user = decodedPayload;

//         } catch (error) {
//             return res.status(401).json({
//                 success: false,
//                 message: "Token is invalid.",
//             });
//         }

//         // Step 3: Agle middleware ya controller par jaana
//         // Sab kuch theek hai, ab security guard request ko aage jaane dega
//         next();

//     } catch (error) {
//         return res.status(401).json({
//             success: false,
//             message: "Something went wrong while validating the token.",
//         });
//     }
// };

// // isStudent, isAdmin middlewares hum baad mein add kar sakte hain

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


