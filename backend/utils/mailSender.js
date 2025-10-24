// backend/utils/mailSender.js
const { Resend } = require('resend'); // Use require
const dotenv = require('dotenv'); // Use require

dotenv.config();

const resend = new Resend(process.env.RESEND_API_KEY);

const mailSender = async (to, subject, html) => {
    try {
        console.log(`Attempting to send email via Resend to ${to}...`);
        const { data, error } = await resend.emails.send({
            from: `Quizora <${process.env.FROM_EMAIL}>`,
            to: [to],
            subject: subject,
            html: html,
        });

        if (error) {
            console.error('Error response from Resend:', error);
            throw new Error(`Failed to send email via Resend: ${error.message}`);
        }

        console.log(`✅ Email sent successfully via Resend! ID: ${data.id}`);
        return data;

    } catch (error) {
        console.error('❌ Error in mailSender function:', error);
        throw error;
    }
};

module.exports = mailSender; // Use module.exports