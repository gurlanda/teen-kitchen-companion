import { twMerge } from 'tailwind-merge';

export type ButtonTextColor = 'brand-teal' | 'black';
export function buttonStyles({
  primary,
  disabled,
  large,
  textColor,
}: {
  primary?: boolean;
  disabled?: boolean;
  large?: boolean;
  textColor?: ButtonTextColor;
}): string {
  primary = primary ?? false;
  disabled = disabled ?? false;
  large = large ?? false;

  const foundationStyles = 'border rounded-md';

  const normalSize = 'px-5 py-2';
  const largeSize = 'px-6 py-4 text-lg';
  const sizeStyles = large ? largeSize : normalSize;

  const primaryStyles =
    'text-white border-brand-teal bg-brand-teal hover:border-cyan-700 hover:bg-cyan-700 active:border-cyan-800 active:bg-cyan-800';
  const disabledStyles = 'text-gray-400';
  const defaultStyles = `${
    textColor === 'brand-teal' ? 'text-brand-teal' : 'text-black'
  } border-gray-300 bg-white hover:bg-slate-200 active:bg-slate-300`;

  const contextualStyles = disabled
    ? disabledStyles
    : primary
    ? primaryStyles
    : defaultStyles;

  return twMerge(foundationStyles, sizeStyles, contextualStyles);
}

const Button = ({
  className,
  onClick,
  children,
  disabled,
  primary,
  large,
  textColor,
}: {
  className?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  children?: React.ReactNode;
  disabled?: boolean;
  primary?: boolean;
  large?: boolean;
  textColor?: ButtonTextColor;
}) => {
  return (
    <button
      className={twMerge(
        buttonStyles({ primary, disabled, large, textColor }),
        className
      )}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
