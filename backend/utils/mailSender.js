 const nodemailer = require('nodemailer');
require('dotenv').config();

const mailSender = async (email, title, body) => {
    try {
        // Create a transporter object using SMTP transport
        let transporter = nodemailer.createTransport({
            host: process.env.MAIL_HOST,
            port: 587, // Standard port for secure SMTP
            secure: false, // true for 465, false for other ports
            auth: {
                user: process.env.MAIL_USER, // Your email address
                pass: process.env.MAIL_PASS, // Your email password or app password
            },
        });

        // Send mail with defined transport object
        let info = await transporter.sendMail({
            from: `"Quizora" <${process.env.MAIL_USER}>`, // Sender address
            to: email, // List of receivers
            subject: title, // Subject line
            html: body, // HTML body content
        });

        console.log("Email sent successfully!");
        console.log("Message ID:", info.messageId);
        return info;

    } catch (error) {
        console.error("Error sending email:", error);
        throw new Error("Failed to send email."); // Re-throw for controller to handle
    }
};

module.exports = mailSender;