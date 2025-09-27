const express = require("express");
const router = express.Router();
const multer = require('multer');

// Controller aur Middleware ko import karna
const { generateQuiz } = require("../controllers/Quiz");
const { auth } = require("../middlewares/auth"); 

// Multer ko setup karna (ye file ko memory mein store karega)
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Route for generating quiz from PDF
// Ye ek PROTECTED route hai
// Is route par request aane par, pehle 'auth' middleware chalega (token check karega),
// phir 'upload.single('pdfFile')' middleware chalega (file ko dhoondhega),
// aur aakhir mein 'generateQuiz' controller chalega.
router.post("/generate", auth, upload.single('pdfFile'), generateQuiz);

module.exports = router;
