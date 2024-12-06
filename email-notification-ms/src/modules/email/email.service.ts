import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import {
  acceptNotificationTemplate,
  rejectNotificationTemplate,
  requestNotificationTemplate,
} from './template';
import {
  TemplateType,
  RequestData,
  ResponseData,
  EmailTemplateType,
} from './interfaces/email-template.interfaces';

const emailRegx = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

@Injectable()
export class EmailService {
  private readonly transporter: nodemailer.Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.EMAIL_PROVIDER_HOST,
      port: 587,
      secure: false, // true for port 465, false for other ports
      auth: {
        user: process.env.EMAIL_PROVIDER_USER,
        pass: process.env.EMAIL_PROVIDER_PASSWORD,
      },
    });
  }

  validateRequestEmailData({
    to,
    template,
    emailData,
  }: {
    to: string;
    template: TemplateType;
    emailData: any;
  }): boolean {
    /**
     * This function validates the email data before sending the email.
     * returns true if the data is valid, otherwise false.
     */
    // Check if the email is valid
    if (typeof to !== 'string' || !emailRegx.test(to)) {
      return false;
    }
    // Check if the template is valid
    if (
      typeof template !== 'string' ||
      !Object.values(TemplateType).includes(template)
    ) {
      return false;
    }
    // Check if the emailData is of type object and not null
    if (typeof emailData !== 'object' || emailData === null) {
      return false;
    }
    // Check if the emailData has the required fields based on the template
    const { receiverName, eventTitle, eventDate } = emailData;
    if (
      typeof receiverName !== 'string' ||
      typeof eventTitle !== 'string' ||
      typeof eventDate !== 'string'
    ) {
      return false;
    }
    if (template === TemplateType.REQUEST) {
      const { senderName, senderEmail } = emailData;
      if (
        typeof senderName !== 'string' ||
        typeof senderEmail !== 'string' ||
        !emailRegx.test(senderEmail)
      ) {
        return false;
      }
    }
    return true;
  }

  getEmailTemplate(template: TemplateType): EmailTemplateType {
    switch (template) {
      case TemplateType.ACCEPT:
        return acceptNotificationTemplate;
      case TemplateType.REJECT:
        return rejectNotificationTemplate;
      case TemplateType.REQUEST:
        return requestNotificationTemplate;
    }
  }

  async sendEmail(
    to: string,
    template: TemplateType,
    emailData: RequestData | ResponseData,
  ): Promise<void> {
    const { subject, html } = this.getEmailTemplate(template);
    const formattedHtml = html.replace(/{([^{}]*)}/g, (_, key) => {
      return emailData[key];
    });
    await this.transporter.sendMail({
      from: `"${process.env.SENDER_NAME}" <${process.env.SENDER_EMAIL}>`,
      to,
      subject,
      html: formattedHtml,
      text: html,
    });
  }
}
