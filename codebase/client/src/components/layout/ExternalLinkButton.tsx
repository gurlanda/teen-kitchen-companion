import { twMerge } from 'tailwind-merge';
import { ButtonTextColor, buttonStyles } from './Button';

const ExternalLinkButton = ({
  large,
  textColor,
  to,
  children,
  className,
}: {
  large?: boolean;
  textColor?: ButtonTextColor;
  to: string;
  children?: React.ReactNode;
  className?: string;
}): JSX.Element => {
  return (
    <a
      href={to}
      target="_blank"
      className={twMerge('block', buttonStyles({ large }), className)}
    >
      {children}
    </a>
  );
};

export default ExternalLinkButton;
