// const jwt = require("jsonwebtoken");
// require("dotenv").config();

// // This function acts as our security guard
// exports.auth = async (req, res, next) => {
//     try {
//         // Extract the token
//         // The token can be in the request body, cookie, or "Authorization" header
//         const token = req.cookies.token 
//                     || req.body.token 
//                     || req.header("Authorization").replace("Bearer ", "");

//         // If token is missing, return an error
//         if (!token) {
//             return res.status(401).json({
//                 success: false,
//                 message: "Authentication token is missing.",
//             });
//         }

//         // Verify the token using the secret key
//         try {
//             const decodedPayload = jwt.verify(token, process.env.JWT_SECRET);
//             console.log("Decoded Token:", decodedPayload);
            
//             // Attach the decoded token's payload to the request object
//             // This makes the user's ID and email available in the next controller
//             req.user = decodedPayload;

//         } catch (error) {
//             // If verification fails (e.g., token is invalid or expired)
//             return res.status(401).json({
//                 success: false,
//                 message: "Token is invalid.",
//             });
//         }

//         // If the token is valid, pass the request to the next middleware/controller
//         next();

//     } catch (error) {
//         return res.status(500).json({
//             success: false,
//             message: "Something went wrong while validating the token.",
//         });
//     }
// };


const jwt = require("jsonwebtoken");
require("dotenv").config();

// middleware to verify the user token...
exports.auth = async (req, res, next) => {
    try {
        // extract token...
        let token = null;

        // Check for token in Authorization header...
        const authHeader = req.header("Authorization");
        if (authHeader && authHeader.startsWith("Bearer ")) {
            token = authHeader.replace("Bearer ", "");
        }
        // If not in header, check for token in cookies
        else if (req.cookies && req.cookies.token) {
            token = req.cookies.token;
        }
        // If not in header or cookies, check for token in request body
        else if (req.body && req.body.token) {
            token = req.body.token;
        }

        // If no token was found in any location
        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Authentication token is missing.",
            });
        }

        // Verify the token
        try {
            const decodedPayload = jwt.verify(token, process.env.JWT_SECRET);
            req.user = decodedPayload;
        } catch (error) {
            return res.status(401).json({
                success: false,
                message: "Token is invalid or expired.",
            });
        }

        // If token is valid, proceed to the next step
        next();

    } catch (error) {
        console.error("Critical error in auth middleware:", error);
        return res.status(500).json({
            success: false,
            message: "Something went wrong during token validation.",
        });
    }
};