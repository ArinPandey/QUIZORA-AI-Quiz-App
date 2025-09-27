const pdf = require('pdf-parse');
const { generateQuizFromText } = require('../utils/aiHelper');

exports.generateQuiz = async (req, res) => {
    try {
        console.log("Generate quiz endpoint hit"); // Debug log
        
        // Step 1: Check if file was uploaded
        if (!req.file) {
            console.log("No file uploaded");
            return res.status(400).json({
                success: false,
                message: "No file uploaded. Please upload a PDF.",
            });
        }

        // Step 2: Extract text from PDF
        console.log("Extracting text from PDF...");
        let text;
        try {
            const data = await pdf(req.file.buffer);
            text = data.text;
            console.log(`Text extracted. Length: ${text.length} characters`);
        } catch (pdfError) {
            console.error("PDF extraction error:", pdfError);
            return res.status(400).json({
                success: false,
                message: "Could not read the PDF file. Please ensure it's a valid PDF.",
            });
        }

        if (!text || text.trim() === "") {
            return res.status(400).json({
                success: false,
                message: "Could not extract text from the PDF. The PDF might be empty or scanned."
            });
        }

        // Step 3: Limit text length to prevent token limits
        const limitedText = text.substring(0, 10000); // Limit to 10k characters
        
        // Step 4: Call the AI to generate quiz
        console.log("Sending text to AI for quiz generation...");
        
        const quizGenerationPromise = generateQuizFromText(limitedText);
        const timeoutPromise = new Promise((_, reject) => {
            setTimeout(() => reject(new Error("AI generation timeout after 45 seconds")), 45000);
        });
        
        const quiz = await Promise.race([quizGenerationPromise, timeoutPromise]);

        if (!quiz || !Array.isArray(quiz)) {
            console.error("AI returned invalid quiz format:", quiz);
            return res.status(500).json({
                success: false,
                message: "The AI could not generate a valid quiz from the provided text."
            });
        }

        // Step 5: Send successful response
        console.log("Quiz generated successfully with", quiz.length, "questions");
        return res.status(200).json({
            success: true,
            message: "Quiz generated successfully!",
            quiz: quiz,
            questionsCount: quiz.length
        });

    } catch (error) {
        console.error("Error in generating quiz:", error);
        
        let errorMessage = "Server error while generating quiz. Please try again.";
        if (error.message.includes("timeout")) {
            errorMessage = "Quiz generation took too long. Please try with a smaller PDF.";
        } else if (error.message.includes("API key")) {
            errorMessage = "AI service configuration error. Please contact support.";
        }
        
        return res.status(500).json({
            success: false,
            message: errorMessage,
            error: process.env.NODE_ENV === 'development' ? error.message : undefined,
        });
    }
};