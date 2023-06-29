export type StorableEmail = {
  recipientEmail: string;
  subject: string;
  message: string;
};

class Email {
  private _recipientEmail: string;
  private _subject: string;
  private _message: string;

  constructor(recipientEmail: string, subject: string, message: string) {
    this._recipientEmail = recipientEmail;
    this._subject = subject;
    this._message = message;
  }

  get recipientEmail(): string {
    return this._recipientEmail;
  }
  get subject(): string {
    return this._subject;
  }
  get message(): string {
    return this._message;
  }

  clone(): Email {
    return new Email(this.recipientEmail, this.subject, this.message);
  }

  toStorable(): StorableEmail {
    return {
      recipientEmail: this.recipientEmail,
      subject: this.subject,
      message: this.message,
    };
  }

  static isValidStorable(maybeStorable: any): maybeStorable is StorableEmail {
    return (
      (maybeStorable as StorableEmail).recipientEmail !== undefined &&
      (maybeStorable as StorableEmail).subject !== undefined &&
      (maybeStorable as StorableEmail).message !== undefined
    );
  }

  static fromStorable(storableEmail: any): Email | undefined {
    if (!Email.isValidStorable(storableEmail)) {
      return undefined;
    }

    return new Email(
      storableEmail.recipientEmail,
      storableEmail.subject,
      storableEmail.message
    );
  }
}

export default Email;
