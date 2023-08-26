const Button = ({
  className,
  onClick,
  children,
  disabled,
}: {
  className?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  children?: React.ReactNode;
  disabled?: boolean;
}) => {
  return (
    <button
      className={`border border-gray-800 rounded-md px-4 py-2 ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
