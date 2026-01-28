const pdf = require('pdf-parse'); // 1. Library to extract text from PDF buffers
const { generateQuizFromText } = require('../utils/aiHelper'); // 2. Helper that talks to Gemini AI

exports.generateQuiz = async (req, res) => {
    try {
        // 3. Destructure the instant quiz data from the request body
        const { type, tags, numQuestions, difficulty } = req.body; 
        let textToProcess = ""; 

        // --- SECTION A: Handle Instant Quiz (Tags) ---
        // 4. This is the new logic that prevents the 400 error
        if (type === 'instant' && tags) {
            console.log("⚡ Instant Quiz requested for:", tags);
            textToProcess = `Generate a ${difficulty} difficulty quiz with ${numQuestions} questions about these topics: ${tags.join(", ")}.`;
        } 
        
        // --- SECTION B: Handle PDF Quiz (Original Logic) ---
        else if (req.file) {
            console.log("📂 PDF Quiz requested:", req.file.originalname);
            const data = await pdf(req.file.buffer);
            textToProcess = data.text.substring(0, 15000); // 5. Limit text for AI context window
        } 
        
        // --- SECTION C: Fallback Error ---
        else {
            // 6. If both are missing, then we return a 400
            return res.status(400).json({ 
                success: false, 
                message: "Please provide a PDF or select topics." 
            });
        }

        // --- SECTION D: Unified AI Call ---
        console.log("🤖 Sending to AI helper...");
        const quiz = await generateQuizFromText(textToProcess);

        if (!quiz || !Array.isArray(quiz) || quiz.length === 0) {
            return res.status(500).json({ success: false, message: "AI failed to generate quiz." });
        }

        return res.status(200).json({
            success: true,
            message: "Quiz generated successfully!",
            quiz,
        });

    } catch (error) {
        console.error("💥 Controller Error:", error);
        return res.status(500).json({ success: false, message: "Server error occurred." });
    }
};



// const pdf = require('pdf-parse');
// const { generateQuizFromText,listAvailableModels } = require('../utils/aiHelper');

// exports.generateQuiz = async (req, res) => {
//     try {
//         console.log("📌 generateQuiz called");

//         // Step 1: Check if file was uploaded
//         if (!req.file) {
//             console.log("❌ No file uploaded");
//             return res.status(400).json({
//                 success: false,
//                 message: "No file uploaded. Please upload a PDF.",
//             });
//         }

//         console.log("📂 File received:", req.file.originalname);

//         // Step 2: Extract text from the PDF buffer
//         const data = await pdf(req.file.buffer);
//         console.log("📄 PDF text length:", data.text.length);

//         const text = data.text;

//         if (!text || text.trim() === "") {
//             console.log("❌ No text extracted from PDF");
//             return res.status(400).json({
//                 success: false,
//                 message: "Could not extract text from the PDF. The file might be empty or image-based."
//             });
//         }

//         // Step 3: Limit text
//         const limitedText = text.substring(0, 15000);

//         // Step 4: Call the AI helper
//         console.log("🤖 Sending text to AI helper...");
//         const quiz = await generateQuizFromText(limitedText);

//         if (!quiz || !Array.isArray(quiz) || quiz.length === 0) {
//             console.log("❌ AI returned invalid quiz:", quiz);
//             return res.status(500).json({
//                 success: false,
//                 message: "The AI could not generate a valid quiz from the provided text."
//             });
//         }

//         console.log("✅ Quiz generated:", quiz.length, "questions");

//         // Step 5: Success
//         return res.status(200).json({
//             success: true,
//             message: "Quiz generated successfully!",
//             quiz,
//         });

//     } catch (error) {
//         console.error("💥 Error in generateQuiz:", error);
//         return res.status(500).json({
//             success: false,
//             message: "A server error occurred while generating the quiz. Please try again.",
//         });
//     }
// };

// --- ADD THIS NEW FUNCTION ---
exports.listModels = async (req, res) => {
    try {
        console.log("Listing available AI models...");
        const models = await listAvailableModels();
        res.status(200).json({
            success: true,
            models: models,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to list models.",
            error: error.message,
        });
    }
};



// const pdf = require('pdf-parse');
// const { generateQuizFromText } = require('../utils/aiHelper');

// exports.generateQuiz = async (req, res) => {
//     try {
//         // Step 1: Check if file was uploaded 
//         if (!req.file) {
//             return res.status(400).json({
//                 success: false,
//                 message: "No file uploaded. Please upload a PDF.",
//             });
//         }

//         // Step 2: Extract text from the PDF buffer
//         const data = await pdf(req.file.buffer);
//         const text = data.text;

//         if (!text || text.trim() === "") {
//             return res.status(400).json({
//                 success: false,
//                 message: "Could not extract text from the PDF. The file might be empty or image-based."
//             });
//         }

//         // Step 3: Limit text to avoid exceeding AI model token limits
//         const limitedText = text.substring(0, 15000); // Limit to 15,000 characters

//         // Step 4: Call the AI helper to generate the quiz
//         console.log("Sending text to AI for quiz generation...");
//         const quiz = await generateQuizFromText(limitedText);

//         if (!quiz || !Array.isArray(quiz) || quiz.length === 0) {
//             return res.status(500).json({
//                 success: false,
//                 message: "The AI could not generate a valid quiz from the provided text."
//             });
//         }

//         // Step 5: Send the successful response
//         console.log("Quiz generated successfully with", quiz.length, "questions");
//         return res.status(200).json({
//             success: true,
//             message: "Quiz generated successfully!",
//             quiz: quiz,
//         });

//     } catch (error) {
//         console.error("Error in generating quiz:", error.message);
//         return res.status(500).json({
//             success: false,
//             message: "A server error occurred while generating the quiz. Please try again.",
//         });
//     }
// };

