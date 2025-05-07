import nodemailer from "nodemailer";

export class MailService {
    private transporter;

    constructor() {
        this.transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: Number(process.env.SMTP_PORT),
            secure: process.env.SMTP_SECURE === "true",
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS,
            },
        });
    }

    public async send(to: string, subject: string, html: string) {
        try {
            const info = await this.transporter.sendMail({
                from: `"FTKISS" <${process.env.SMTP_USER}>`,
                to,
                subject,
                html,
            });

            console.log("Email sent:", info.messageId);
            return info;
        } catch (error) {
            console.error("MailService error:", error);
            throw new Error("Failed to send email");
        }
    }
}
