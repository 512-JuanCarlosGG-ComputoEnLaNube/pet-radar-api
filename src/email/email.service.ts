import { Injectable } from '@nestjs/common';
import nodemailer from 'nodemailer';
import { envs } from 'src/config/envs';

@Injectable()
export class EmailService {
    private transporter = nodemailer.createTransport({
        service: envs.MAILER_SERVICE,
        auth: {
            user: envs.MAILER_USER,
            pass: envs.MAILER_PASSWORD,
        }
    });

    async sendEmail(template: string){
        await this.transporter.sendMail({
            to: 'gallegosgutierrezj62@gmail.com',
            subject: 'Prueba de correo',
            html: template
        });
    }

}
