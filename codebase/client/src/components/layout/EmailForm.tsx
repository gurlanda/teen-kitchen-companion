import React, { useState } from 'react';
import Email from 'src/model/Email/Email';
import { sendEmailWithCallable } from 'src/model/Email/sendEmail';

const EmailForm = ({
  className,
  header,
  content,
}: {
  className?: string;
  header?: string;
  content?: string;
}): JSX.Element => {
  // const [recipient, setRecipient] = useState<string>('');
  const [subject, setSubject] = useState<string>('');
  const [message, setMessage] = useState<string>('');

  const clearFields = () => {
    setSubject('');
    setMessage('');
  };

  const onSubmit: React.MouseEventHandler<HTMLInputElement> = (
    e: React.MouseEvent<HTMLInputElement>
  ) => {
    e.preventDefault();

    const email = new Email(subject, message);
    sendEmailWithCallable(email);
    clearFields();
  };

  return (
    <form
      className={`flex flex-col gap-5 text-lg border border-gray-300 shadow-md shadow-gray-200 rounded-xl px-6 py-8 ${className}`}
    >
      <div className="flex flex-col gap-2">
        <h1 className="self-stretch text-4xl font-heading font-bold">
          {header === undefined ? 'Send an email' : header}
        </h1>

        {content && (
          <p>
            You can contact our registered dietition for a free consultation or
            chatting about your meals. Click here to contact or make an
            appointment to chat with them!
          </p>
        )}
      </div>
      <div className="flex flex-col gap-2">
        <Input
          type="text"
          value={subject}
          placeholder="Subject line"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setSubject(e.target.value)
          }
        />
        <textarea
          placeholder="Message"
          value={message}
          className={`${inputClasses}`}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
            setMessage(e.target.value)
          }
        />
      </div>
      {/* <Label className="flex flex-col gap-2">
        Message:{' '}
      </Label> */}
      <Input
        type="submit"
        className="self-end cursor-pointer text-brand-teal"
        onClick={onSubmit}
      />
    </form>
  );
};

const inputClasses = 'px-4 py-2 border border-gray-300 rounded-lg min-w-0';
type InputValue = React.InputHTMLAttributes<HTMLInputElement>['value'];
const Input = ({
  id,
  name,
  type,
  value,
  className,
  placeholder,
  onClick,
  onSubmit,
  onChange,
}: {
  id?: string;
  name?: string;
  type: React.HTMLInputTypeAttribute;
  value?: InputValue;
  placeholder?: string;
  className?: string;
  onClick?: React.MouseEventHandler<HTMLInputElement>;
  onSubmit?: React.FormEventHandler<HTMLInputElement>;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
}): JSX.Element => {
  return (
    <input
      id={id}
      name={name}
      type={type}
      placeholder={placeholder}
      className={`${inputClasses} ${className}`}
      value={value}
      onClick={onClick}
      onSubmit={onSubmit}
      onChange={onChange}
    />
  );
};

export default EmailForm;
