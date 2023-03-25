import nodemailer from "nodemailer";

export const mailHelper = (mailOptions) => {

    const transport = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS
        }
    });

    transport.sendMail(mailOptions);
}