// backend/utils/mailSender.js
import { Resend } from 'resend';
import * as dotenv from 'dotenv';

dotenv.config();

const resend = new Resend(process.env.RESEND_API_KEY);

const mailSender = async (to, subject, html) => {
    try {
        console.log(`Attempting to send email via Resend to ${to}...`);
        const { data, error } = await resend.emails.send({
            from: `Quizora <${process.env.FROM_EMAIL}>`, // Or a custom sender like 'Quizora <noreply@yourdomain.com>' if verified
            to: [to], // Resend expects an array of recipients
            subject: subject,
            html: html,
        });

        if (error) {
            console.error('Error response from Resend:', error);
            throw new Error(`Failed to send email via Resend: ${error.message}`);
        }

        console.log(`✅ Email sent successfully via Resend! ID: ${data.id}`);
        return data; // Indicate success

    } catch (error) {
        console.error('❌ Error in mailSender function:', error);
        throw error; // Re-throw the error for the controller
    }
};

export default mailSender;