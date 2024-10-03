require('dotenv').config()

const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport(
    {
        host: process.env.MAILER_HOST,
        port: process.env.MAILER_PORT,
        secure: process.env.MAILER_PORT == 465,
        auth: {
            user: process.env.MAILER_USER,
            pass: process.env.MAILER_PASSWORD
        }
    }
)

async function sendMail(mailOptions) {

    try {
        // Send the email using the transporter
        const info = await transporter.sendMail({
            to: mailOptions.to,
            subject: mailOptions.subject,
            html: mailOptions.html
        });

        // Return success if the email was sent
        return { success: true, info: info };
    } catch (error) {
        // Return failure if there was an error
        console.error('Error sending email:', error);
        return { success: false, error: error };
    }
}


module.exports = sendMail;