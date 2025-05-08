import nodemailer from "nodemailer";
import { SMTP_URL } from "../config";

export class MailService {
    private static instance: MailService;
    private transporter;
    private from: string;

    private constructor() {

        const parsed = new URL(SMTP_URL);
        const smtpUser = decodeURIComponent(parsed.username);

        if (!smtpUser) throw new Error("No se pudo extraer el usuario SMTP de SMTP_URL");

        this.from = `"FTKISS" <${smtpUser}>`;

        this.transporter = nodemailer.createTransport(SMTP_URL);
    }

    public static getInstance(): MailService {
        if (!MailService.instance) {
            MailService.instance = new MailService();
        }
        return MailService.instance;
    }

    public async send(to: string, subject: string, html: string) {
        const info = await this.transporter.sendMail({
            from: this.from,
            to,
            subject,
            html,
        });
        console.log("📨 Correo enviado:", info.messageId);
    }
}
