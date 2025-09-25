const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config();

// Configure the AI with our API key from the .env file
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// This is our main function that will talk to the AI
async function generateQuizFromText(text) {
    try {
        // We are using the 'gemini-1.5-flash' model, which is fast and efficient
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});

        // This is the most important part: The Prompt
        // We are giving the AI very specific instructions on what we want
        const prompt = `
            You are an expert quiz creator. Based on the following text, generate exactly 7 unique multiple-choice questions.
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

        // AI ko instructions bhejna aur jawaab ka intezaar karna
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const responseText = response.text();

        // The AI's response is a string, so we need to parse it into a JavaScript object
        const quiz = JSON.parse(responseText);
        return quiz;

    } catch (error) {
        console.error("Error communicating with the AI model:", error);
        // If the AI fails, we return null so the controller knows something went wrong
        return null;
    }
}

// Export the function so we can use it in our controller
module.exports = { generateQuizFromText };

