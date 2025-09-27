const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function generateQuizFromText(text) {
    try {
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        const prompt = `
            You are an expert quiz creator. Based on the following text, generate up to 7 unique multiple-choice questions (minimum 3, maximum 7).
            If the text does not provide enough material, create additional reasonable questions based on general knowledge of the same topic.
            Provide the output as a valid JSON array of objects only. Do not include any other text, explanations, or markdown formatting like \`\`\`json.
            Each object in the array must have these three exact keys: 
            1. "question" (string)
            2. "options" (an array of exactly 4 strings)
            3. "correctAnswer" (the 0-based index of the correct option in the "options" array).

            Here is the text to analyze:
            ---
            ${text.substring(0, 10000)} // Limit text to prevent token limits
            ---
        `;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        let responseText = response.text(); // Use 'let' instead of 'const'

        // Clean the response text
        if (responseText.startsWith("```json")) {
            responseText = responseText.substring(7, responseText.length - 3);
        } else if (responseText.startsWith("```")) {
            responseText = responseText.substring(3, responseText.length - 3);
        }

        // Trim and parse
        responseText = responseText.trim();
        
        try {
            const quiz = JSON.parse(responseText);
            
            // Validate the quiz structure
            if (!Array.isArray(quiz) || quiz.length === 0) {
                console.error("AI response is not a valid array");
                return null;
            }
            
            return quiz;
        } catch (parseError) {
            console.error("Failed to parse AI response as JSON:", responseText);
            console.error("Parse error:", parseError);
            return null;
        }

    } catch (error) {
        console.error("Error communicating with the AI model:", error);
        return null;
    }
}

module.exports = { generateQuizFromText };


// const { GoogleGenerativeAI } = require("@google/generative-ai");
// require("dotenv").config();

// // Configure the AI with our API key from the .env file
// const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// // This is our main function that will talk to the AI
// async function generateQuizFromText(text) {
//     try {
//         // We are using the 'gemini-1.5-flash' model, which is fast and efficient
//         const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});

//         // This is the most important part: The Prompt
//         // We are giving the AI very specific instructions on what we want
//         const prompt = `
//             You are an expert quiz creator. Based on the following text, generate exactly 7 unique multiple-choice questions.
//             Provide the output as a valid JSON array of objects only. Do not include any other text, explanations, or markdown formatting like \`\`\`json.
//             Each object in the array must have these three exact keys: 
//             1. "question" (string)
//             2. "options" (an array of exactly 4 strings)
//             3. "correctAnswer" (the 0-based index of the correct option in the "options" array).

//             Here is the text to analyze:
//             ---
//             ${text}
//             ---
//         `;

//         // AI ko instructions bhejna aur jawaab ka intezaar karna
//         const result = await model.generateContent(prompt);
//         const response = await result.response;
//         const responseText = response.text();

//         // Hum check kar rahe hain ki kahin AI ne extra markdown formatting toh nahi bhej di
//         if (responseText.startsWith("```json")) {
//             responseText = responseText.substring(7, responseText.length - 3);
//         }
        
//         // Ab JSON ko ek safe try-catch block ke andar parse kar rahe hain
//         try {
//             const quiz = JSON.parse(responseText);
//             return quiz;
//         } catch (parseError) {
//             console.error("Failed to parse AI response as JSON:", responseText);
//             return null;
//         }

//     } catch (error) {
//         console.error("Error communicating with the AI model:", error);
//         // If the AI fails, we return null so the controller knows something went wrong
//         return null;
//     }
// }




// // Export the function so we can use it in our controller
// module.exports = { generateQuizFromText };


// const { GoogleGenerativeAI } = require("@google/generative-ai");
// require("dotenv").config();

// const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// async function generateQuizFromText(text) {
//     try {
       
//         const model = genAI.getGenerativeModel({ model: "gemini-pro"});

//         const prompt = `
//             You are an expert quiz creator. Based on the following text, generate exactly 5 unique multiple-choice questions.
//             Provide the output as a valid JSON array of objects only. Do not include any other text, explanations, or markdown formatting like \`\`\`json.
//             Each object in the array must have these three exact keys: 
//             1. "question" (string)
//             2. "options" (an array of exactly 4 strings)
//             3. "correctAnswer" (the 0-based index of the correct option in the "options" array).

//             Here is the text to analyze:
//             ---
//             ${text}
//             ---
//         `;

//         const result = await model.generateContent(prompt);
//         const response = await result.response;
//         const responseText = response.text();
        
//         const cleanedText = responseText.replace(/```json/g, "").replace(/```/g, "").trim();
//         const quiz = JSON.parse(cleanedText);
//         return quiz;

//     } catch (error) {
//         console.error("Error communicating with the AI model:", error);
//         return null;
//     }
// }

// module.exports = { generateQuizFromText };

