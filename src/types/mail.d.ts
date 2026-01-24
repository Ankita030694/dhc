declare module 'mail' {
  interface MailAttachment {
    filename: string;
    content: Buffer | string;
    contentType?: string;
  }

  interface MailOptions {
    from?: string;
    to?: string | string[];
    subject?: string;
    html?: string;
    text?: string;
    attachments?: MailAttachment[];
  }

  class Mail {
    constructor(options: MailOptions);
    build(callback: (err: Error | null, message: string) => void): void;
  }

  export = Mail;
}

