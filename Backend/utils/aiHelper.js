const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config();

// This is our main, and ONLY, function that will talk to the AI.
async function generateQuizFromText(text) {
    try {
        // Check if the API key is available
        if (!process.env.GEMINI_API_KEY) {
            throw new Error("GEMINI_API_KEY is not defined in the environment.");
        }
        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
        
        // THE FINAL FIX: Using the 'gemini-1.5-flash-latest' model. 
        // This is a stable identifier that points to the latest Flash model.
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-latest"}); 

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

        const result = await model.generateContent(prompt);
        const response = await result.response;
        let responseText = response.text();

        // This will robustly remove the ```json markdown if the AI adds it
        const cleanedText = responseText.replace(/```json/g, "").replace(/```/g, "").trim();

        // Parse the cleaned text in a safe block
        try {
            const quiz = JSON.parse(cleanedText);
            return quiz;
        } catch (parseError) {
            console.error("Failed to parse AI response as JSON:", cleanedText);
            return null; // Return null if parsing fails
        }

    } catch (error) {
        console.error("Error communicating with the AI model:", error);
        return null;
    }
}

// Export the function
module.exports = { generateQuizFromText };