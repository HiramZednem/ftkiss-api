import nodemailer from "nodemailer";

export class MailService {
    private static instance: MailService;
    private transporter;

    private constructor() {
        const poolConfig = process.env.SMTP_URL;
        if (!poolConfig) throw new Error("SMTP_URL no definido en .env");

        this.transporter = nodemailer.createTransport(poolConfig);
    }

    public static getInstance(): MailService {
        if (!MailService.instance) {
            MailService.instance = new MailService();
        }
        return MailService.instance;
    }

    public async send(to: string, subject: string, html: string) {
        try {
            const info = await this.transporter.sendMail({
                from: `"FTKISS" <${process.env.SMTP_USER}>`,
                to,
                subject,
                html,
            });
            console.log("Email enviado:", info.messageId);
        } catch (error) {
            console.error("Error al enviar correo:", error);
            throw new Error("Error al enviar correo");
        }
    }
}
