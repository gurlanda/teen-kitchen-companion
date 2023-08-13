import { ReactNode } from 'react';

const EllipsisMenu = ({
  isVisible,
  children,
}: {
  isVisible: boolean;
  children?: ReactNode;
}): JSX.Element => {
  return (
    <div
      className={`absolute left-[calc(100%_+_8px)] top-1/2 -translate-y-1/2 bg-white border rounded-lg overflow-hidden ${
        isVisible ? '' : 'hidden'
      }`}
    >
      {children}
    </div>
  );
};

export const EllipsisMenuItem = ({
  onClick,
  children,
}: {
  onClick?: React.MouseEventHandler;
  children?: React.ReactNode;
}): JSX.Element => {
  return (
    <button
      className="bg-white hover:bg-gray-50 active:bg-gray-100 px-4 py-2 w-full min-w-max"
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default EllipsisMenu;
