
// backend/utils/aiHelper.js

// const axios = require('axios');
// require("dotenv").config();

// exports.generateQuizFromText = async (text) => {
//     try {
//         console.log("🤖 Calling Gemini API with the correct model...");

//         // Use the exact model name from the list we retrieved
//         const modelName = "gemini-2.5-flash"; 
//         const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${process.env.GEMINI_API_KEY}`;

//         const payload = {
//             contents: [{
//                 parts: [{
//                     text: `
//                         Based on the following text, create a multiple-choice quiz.
//                         The quiz must have exactly 5 questions.
//                         Each question must have 4 options.
//                         The response must be only a valid JSON array of objects, with no extra text or markdown.
//                         Each object in the array must have this exact structure:
//                         {
//                             "question": "The question text",
//                             "options": ["Option A", "Option B", "Option C", "Option D"],
//                             "correctAnswer": 0 
//                         }
//                         The correctAnswer value must be the 0-based index of the correct option.

//                         Here is the text:
//                         ---
//                         ${text}
//                         ---
//                     `
//                 }]
//             }]
//         };

//         const response = await axios.post(API_URL, payload);
//         const jsonOutput = response.data.candidates[0].content.parts[0].text;
        
//         const quiz = JSON.parse(jsonOutput);
//         return quiz;

//     } catch (error) {
//         if (error.response) {
//             console.error("Error from AI API:", error.response.data);
//         } else {
//             console.error("Error in AI quiz generation:", error.message);
//         }
//         throw new Error("Failed to generate a valid quiz from the AI model.");
//     }
// };

// GOOODDDDDDDDDDDD CODEEEEEEEEEEE BELOWWWWWWW...................

// const axios = require('axios');
// require("dotenv").config();

// exports.generateQuizFromText = async (text) => {
//     try {
//         console.log("🤖 Calling Gemini API directly via REST...");

//         const modelName = "gemini-2.5-flash"; 
//         const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${process.env.GEMINI_API_KEY}`;

//         const payload = {
//             contents: [{
//                 parts: [{
//                     text: `
//                         Based on the following text, create a multiple-choice quiz.
//                         The quiz must have exactly 5 questions.
//                         Each question must have 4 options.
//                         The response must be only a valid JSON array of objects, with no extra text or markdown.
//                         Each object in the array must have this exact structure:
//                         {
//                             "question": "The question text",
//                             "options": ["Option A", "Option B", "Option C", "Option D"],
//                             "correctAnswer": 0 
//                         }
//                         The correctAnswer value must be the 0-based index of the correct option.

//                         Here is the text:
//                         ---
//                         ${text}
//                         ---
//                     `
//                 }]
//             }]
//         };

//         const response = await axios.post(API_URL, payload);
//         const rawResponseText = response.data.candidates[0].content.parts[0].text;
        
//         // --- NEW ROBUST JSON EXTRACTION LOGIC ---
//         // Find the start of the JSON array '[' and the end ']'
//         const startIndex = rawResponseText.indexOf('[');
//         const endIndex = rawResponseText.lastIndexOf(']');
        
//         if (startIndex === -1 || endIndex === -1) {
//             throw new Error("Could not find a valid JSON array in the AI response.");
//         }

//         // Extract just the JSON part of the string
//         const jsonString = rawResponseText.substring(startIndex, endIndex + 1);
//         // --- END OF NEW LOGIC ---
        
//         const quiz = JSON.parse(jsonString); 
//         return quiz;

//     } catch (error) {
//         if (error.response) {
//             console.error("Error from AI API:", error.response.data);
//         } else {
//             console.error("Error in AI quiz generation:", error.message);
//         }
//         throw new Error("Failed to generate a valid quiz from the AI model.");
//     }
// };


// NEWWWWWWWWWWWWWW CODEEEEEEEEEEEEEEEE BELOWWWWWWWWWWWWWWWWWW.....

const axios = require('axios'); // Library for making HTTP requests to Gemini
require("dotenv").config(); // Load environment variables for the API Key

exports.generateQuizFromText = async (text) => {
    try {
        console.log("🤖 AI Helper: Generating Quiz...");

        const modelName = "gemini-2.5-flash"; // The current AI model being used
        const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${process.env.GEMINI_API_KEY}`;

        // We removed the hardcoded "exactly 5 questions" to let the 'text' variable handle it
        const payload = {
            contents: [{
                parts: [{
                    text: `
                        You are a professional quiz generator. 
                        Create a multiple-choice quiz based on the specific instructions provided below.
                        
                        Rules:
                        1. Each question must have exactly 4 options.
                        2. The response MUST be ONLY a valid JSON array of objects.
                        3. No extra text, no markdown code blocks (like \`\`\`json), just raw JSON.
                        4. Follow this exact object structure:
                        {
                            "question": "The question text",
                            "options": ["Option A", "Option B", "Option C", "Option D"],
                            "correctAnswer": 0
                        }
                        5. The correctAnswer value must be the 0-based index of the correct option.

                        Specific Quiz Instructions:
                        ---
                        ${text}
                        ---
                    `
                }]
            }]
        };

        const response = await axios.post(API_URL, payload); // Sending the request to Google
        const rawResponseText = response.data.candidates[0].content.parts[0].text;
        
        // Robust JSON extraction to handle cases where Gemini adds extra text
        const startIndex = rawResponseText.indexOf('[');
        const endIndex = rawResponseText.lastIndexOf(']');
        
        if (startIndex === -1 || endIndex === -1) {
            throw new Error("Invalid AI response format.");
        }

        const jsonString = rawResponseText.substring(startIndex, endIndex + 1); // Extract the array string
        return JSON.parse(jsonString); // 8. Return the parsed array to the controller

    } catch (error) {
        console.error("💥 AI Helper Error:", error.message);
        throw new Error("Failed to generate a valid quiz.");
    }
};