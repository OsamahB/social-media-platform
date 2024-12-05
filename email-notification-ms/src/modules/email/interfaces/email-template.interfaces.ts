export interface EmailTemplateType {
  subject: string;
  html: string;
}

export interface ResponseData {
  receiverName: string;
  eventTitle: string;
  eventDate: string;
}

export interface RequestData extends ResponseData {
  senderName: string;
  senderEmail: string;
}

export enum TemplateType {
  ACCEPT = 'accept',
  REJECT = 'reject',
  REQUEST = 'request',
}
