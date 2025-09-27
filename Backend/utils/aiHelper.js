const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config();

// This is the "Plan B" function. It creates a fake, sample quiz for the live server.
function createMockQuiz(text) {
    console.log("Using MOCK AI function because we are in a production environment.");
    const textSnippet = text.substring(0, 50).replace(/\s+/g, ' ').trim();
    return [
        {
            "question": "This is a MOCK question. What did your PDF start with?",
            "options": [
                `"${textSnippet}..."`,
                "An option about React",
                "An option about MongoDB",
                "None of the above"
            ],
            "correctAnswer": 0
        },
        {
            "question": "Is this a real AI-generated quiz?",
            "options": [
                "Yes, it is.",
                "No, this is a placeholder for deployment.",
                "Maybe.",
                "I don't know."
            ],
            "correctAnswer": 1
        }
    ];
}

// This is your REAL AI function for local development.
async function generateQuizWithRealAI(text) {
    try {
        if (!process.env.GEMINI_API_KEY) {
            throw new Error("GEMINI_API_KEY is not defined in the environment.");
        }
        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
        const model = genAI.getGenerativeModel({ model: "gemini-pro"}); 
        const prompt = `
            You are an expert quiz creator. Based on the following text, generate exactly 7 unique multiple-choice questions.
            Provide the output as a valid JSON array of objects only. Do not include any other text, explanations, or markdown formatting like \`\`\`json.
            Each object must have these three keys: "question", "options" (an array of 4 strings), and "correctAnswer" (the 0-based index).

            Text to analyze:
            ---
            ${text}
            ---
        `;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const responseText = response.text();
        
        const cleanedText = responseText.replace(/```json/g, "").replace(/```/g, "").trim();
        const quiz = JSON.parse(cleanedText);
        return quiz;

    } catch (error) {
        console.error("Error communicating with the REAL AI model:", error);
        return null;
    }
}

// This is our main function that decides which helper to use.
async function generateQuizFromText(text) {
    // Render sets NODE_ENV to 'production'. Locally, it's often undefined.
    // If the environment is 'production', we use the safe mock function.
    if (process.env.NODE_ENV === 'production') {
        return createMockQuiz(text);
    } else {
        // Otherwise (on your local machine), use the real AI.
        return generateQuizWithRealAI(text);
    }
}

module.exports = { generateQuizFromText };

