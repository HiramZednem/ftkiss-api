import fs from 'fs';
import path from 'path';
import handlebars from 'handlebars';
import nodemailer from 'nodemailer';
import { SMTP_URL } from '../config';


export class MailService {

    private static instance: MailService;
    private transporter;
    private from: string;

    private constructor() {
        const parsed = new URL(SMTP_URL);
        const smtpUser = decodeURIComponent(parsed.username);
        if (!smtpUser) throw new Error("SMTP_USER not found");
        this.from = `"FTKISS" <${smtpUser}>`;
        this.transporter = nodemailer.createTransport(SMTP_URL);
    }

    public static getInstance(): MailService {
        if (!MailService.instance) {
            MailService.instance = new MailService();
        }
        return MailService.instance;
    }

    private renderTemplate(templateName: string, data: Record<string, any>): string {
        const templatePath = path.join(__dirname, '..', 'templates', `${templateName}.hbs`);
        const source = fs.readFileSync(templatePath, 'utf8');
        const compiled = handlebars.compile(source);
        return compiled(data);
    }

    private async send(to: string, subject: string, html: string) {
        const info = await this.transporter.sendMail({
            from: this.from,
            to,
            subject,
            html,
        });
        console.log("Message sent: %s", info.messageId);
    }

    public async sendWithTemplate(
        to: string,
        subject: string,
        templateName: string,
        data: Record<string, any>
    ) {
        const html = this.renderTemplate(templateName, data);
        await this.send(to, subject, html);
    }
}