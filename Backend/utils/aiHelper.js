const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config();

// This is our main function that will talk to the AI
async function generateQuizFromText(text) {
    try {
        if (!process.env.GEMINI_API_KEY) {
            throw new Error("GEMINI_API_KEY is not defined in the environment.");
        }
        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
        
        // Using a more stable and universally available model
        const model = genAI.getGenerativeModel({ model: "gemini-pro"}); 

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

        // This will remove the ```json markdown if the AI adds it
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

// Export the function so we can use it in our controller
module.exports = { generateQuizFromText };