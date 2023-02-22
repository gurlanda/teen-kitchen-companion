import { FC, ReactNode, MouseEventHandler } from 'react';

const Button: FC<{
  children: ReactNode;
  classNames?: string;
  value?: string;
  type?: 'button' | 'submit' | 'reset';
  onClick?: { (): void };
  preventDefault?: boolean;
}> = ({
  children,
  classNames,
  value,
  type,
  onClick = () => {},
  preventDefault,
}) => {
  const onClickHandler: MouseEventHandler<HTMLButtonElement> = (e) => {
    if (preventDefault) {
      e.preventDefault();
    }

    onClick();
  };

  return (
    <div className="mr-3 last:mr-0">
      <button
        className={`px-4 py-2 border-[1px] rounded-md ${classNames}`}
        type={type ? type : undefined}
        value={value ? value : undefined}
        onClick={(e) => onClickHandler(e)}
        data-preventdefault={preventDefault}
      >
        {children}
      </button>
    </div>
  );
};

export default Button;
