export type StorableEmail = {
  recipientEmail?: string;
  subject: string;
  message: string;
};

class Email {
  private _recipientEmail?: string;
  private _subject: string;
  private _message: string;

  constructor(subject: string, message: string, recipientEmail?: string) {
    this._recipientEmail = recipientEmail;
    this._subject = subject;
    this._message = message;
  }

  get recipientEmail(): string | undefined {
    return this._recipientEmail;
  }
  get subject(): string {
    return this._subject;
  }
  get message(): string {
    return this._message;
  }

  clone(): Email {
    return new Email(this.subject, this.message, this.recipientEmail);
  }

  toStorable(): StorableEmail {
    return {
      recipientEmail: this.recipientEmail,
      subject: this.subject,
      message: this.message,
    };
  }

  static isValidStorable(maybeStorable: any): maybeStorable is StorableEmail {
    const recipientEmail_is_string_or_undefined =
      (maybeStorable as StorableEmail).recipientEmail === undefined ||
      typeof (maybeStorable as StorableEmail).recipientEmail === 'string';

    return (
      recipientEmail_is_string_or_undefined &&
      (maybeStorable as StorableEmail).subject !== undefined &&
      (maybeStorable as StorableEmail).message !== undefined
    );
  }

  static fromStorable(storableEmail: any): Email | null {
    if (!Email.isValidStorable(storableEmail)) {
      return null;
    }

    return new Email(
      storableEmail.subject,
      storableEmail.message,
      storableEmail.recipientEmail
    );
  }
}

export default Email;
