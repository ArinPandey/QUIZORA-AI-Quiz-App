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


const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config();

// This function creates a fake, sample quiz.
function createMockQuiz(text) {
    console.log("Using MOCK AI function. No external API call was made.");
    const textSnippet = text.substring(0, 50).replace(/\s+/g, ' ').trim(); // Get a small snippet of the PDF text
    return [
        {
            question: "This is a MOCK question based on your PDF. What was the first sentence?",
            options: [
                `"${textSnippet}..."`,
                "An option about React",
                "An option about MongoDB",
                "None of the above"
            ],
            "correctAnswer": 0
        },
        {
            question: "Is this a real AI-generated quiz?",
            options: [
                "Yes, it is.",
                "No, this is a placeholder for development.",
                "Maybe.",
                "I don't know."
            ],
            "correctAnswer": 1
        }
    ];
}


// This is your REAL AI function.
async function generateQuizWithRealAI(text) {
    try {
        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});
        const prompt = `
            You are an expert quiz creator. Based on the following text, generate exactly 5 unique multiple-choice questions.
            Provide the output as a valid JSON array of objects only. Do not include any other text, explanations, or markdown formatting like \`\`\`json.
            Each object in the array must have these three exact keys: 
            1. "question" (string)
            2. "options" (an array of exactly 4 strings)
            3. "correctAnswer" (the 0-based index of the correct option in the "options" array).

            Here is the text to analyze:
            ---
            ${text}
            ---
        `;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const responseText = response.text();
        
        // Clean up potential markdown formatting from the AI response
        const cleanedText = responseText.replace(/```json/g, "").replace(/```/g, "").trim();
        const quiz = JSON.parse(cleanedText);
        return quiz;

    } catch (error) {
        console.error("Error communicating with the AI model:", error);
        return null;
    }
}

// This is our main function that decides which helper to use.
async function generateQuizFromText(text) {
    // We check an environment variable. If we're on our local machine, we try the real AI.
    // If we're on Render (or any other environment), we use the safe, mock version.
    if (process.env.NODE_ENV === 'development') {
        return generateQuizWithRealAI(text);
    } else {
        return createMockQuiz(text);
    }
}

module.exports = { generateQuizFromText };

