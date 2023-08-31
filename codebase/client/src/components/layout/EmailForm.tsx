import { useContext, useState } from 'react';
import Email from 'src/model/Email/Email';
import { sendEmailWithCallable } from 'src/model/Email/sendEmail';
import LanguageContext from 'src/context/Language/LanguageContext';
import PreferredLanguage from 'src/model/User/PreferredLanguage';

const EmailForm = ({
  className,
  header,
  content,
  headingSizeClassName,
  paddingClassName,
}: {
  className?: string;
  header: string;
  content?: string;
  paddingClassName?: string;
  headingSizeClassName?: string;
}): JSX.Element => {
  const { preferredLanguage } = useContext(LanguageContext);
  const [subject, setSubject] = useState<string>('');
  const [senderEmail, setSenderEmail] = useState<string>('');
  const [message, setMessage] = useState<string>('');

  const clearFields = () => {
    setSubject('');
    setMessage('');
  };

  const onSubmit: React.MouseEventHandler<HTMLInputElement> = (
    e: React.MouseEvent<HTMLInputElement>
  ) => {
    e.preventDefault();

    const senderInfo = `Sender email: ${senderEmail}\n`;
    const messageBody = senderInfo + message;

    const email = new Email(subject, messageBody);
    sendEmailWithCallable(email);
    clearFields();
  };

  return (
    <form
      className={`flex flex-col gap-5 text-lg border border-gray-300 shadow-md shadow-gray-200 rounded-xl ${
        paddingClassName ?? 'px-6 py-8'
      } ${className}`}
    >
      <div className="flex flex-col gap-2">
        <h1
          className={`self-stretch  ${
            headingSizeClassName ?? 'text-4xl'
          } font-heading font-bold`}
        >
          {header}
        </h1>

        {content && <p>{content}</p>}
      </div>
      <div className="flex flex-col gap-2">
        <Input
          type="text"
          value={subject}
          placeholder={
            preferredLanguage === PreferredLanguage.ENGLISH
              ? 'Subject line'
              : 'Lorem ipsum'
          }
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setSubject(e.target.value)
          }
        />
        <Input
          type="email"
          value={senderEmail}
          placeholder={
            preferredLanguage === PreferredLanguage.ENGLISH
              ? 'Your email'
              : 'Lorem ipsum'
          }
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setSenderEmail(e.target.value)
          }
        />
        <textarea
          placeholder={
            preferredLanguage === PreferredLanguage.ENGLISH
              ? 'Message'
              : 'Lorem ipsum'
          }
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

const inputClasses =
  'px-4 py-2 border border-gray-300 focus:outline-brand-teal rounded-lg min-w-0';
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
