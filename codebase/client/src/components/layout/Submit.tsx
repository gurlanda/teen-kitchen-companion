import { twMerge } from 'tailwind-merge';
import { ButtonTextColor, buttonStyles } from './Button';

const Submit = ({
  disabled,
  primary,
  textColor,
  children,
  className,
  onClick,
}: {
  disabled?: boolean;
  primary?: boolean;
  textColor?: ButtonTextColor;
  children?: string;
  className?: string;
  onClick?: React.MouseEventHandler<HTMLInputElement>;
}): JSX.Element => {
  return (
    <input
      type="submit"
      onClick={onClick}
      className={twMerge(
        buttonStyles({ primary, disabled, textColor }),
        'cursor-pointer',
        className
      )}
    >
      {children}
    </input>
  );
};

export default Submit;
