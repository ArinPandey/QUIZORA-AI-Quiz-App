// const express = require("express");
// const router = express.Router();
// const multer = require('multer');

// // Controller aur Middleware ko import karna
// const { generateQuiz } = require("../controllers/Quiz");
// const { auth } = require("../middlewares/auth"); 

// // Multer ko setup karna (ye file ko memory mein store karega)
// const storage = multer.memoryStorage();
// const upload = multer({ storage: storage });

// // Route for generating quiz from PDF
// // Ye ek PROTECTED route hai
// // Is route par request aane par, pehle 'auth' middleware chalega (token check karega),
// // phir 'upload.single('pdfFile')' middleware chalega (file ko dhoondhega),
// // aur aakhir mein 'generateQuiz' controller chalega.
// router.post("/generate", auth, upload.single('pdfFile'), generateQuiz);

// module.exports = router;

const express = require("express");
const router = express.Router();
const multer = require('multer');

// Controller and Middleware imports
const { generateQuiz } = require("../controllers/Quiz");
const { auth } = require("../middlewares/auth"); 

// Multer setup
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Main route for generating a quiz
router.post("/generate", auth, upload.single('pdfFile'), generateQuiz);

// --- ADD THIS TEST ROUTE ---
// This will help us diagnose if the quiz router is working.
router.get("/ping", (req, res) => {
    res.status(200).json({ message: "Quiz router is alive and reachable!" });
});
// -------------------------

module.exports = router;