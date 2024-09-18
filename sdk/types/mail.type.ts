export interface Mail {
  id: string;
  address: string;
  mailbox: string;
  domain?: string;
  mailCuid: string;
  from?: any;
  to?: any;
  subject?: string;
  date: Date;
  read: boolean;
  text?: string;
  message?: any;
  labels?: string[];
}
