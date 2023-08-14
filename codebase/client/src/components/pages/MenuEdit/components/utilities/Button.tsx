const Button = ({
  className,
  onClick,
  children,
}: {
  className?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  children?: React.ReactNode;
}) => {
  return (
    <button
      className={`border border-gray-800 rounded-md px-4 py-2 ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
