import React, { ReactNode } from 'react';

export type ClickHandler = { (): void };
const FullWidthButton: React.FC<{
  onClick: ClickHandler;
  children: ReactNode;
}> = ({ onClick, children }) => {
  return (
    <button
      className="text-left text-gray-500 border-b-[1px] border-gray-300 pl-2 py-2 mb-7 mr-6 ml-6 hover:bg-gray-100 hover:text-black"
      onClick={() => onClick()}
    >
      {children}
    </button>
  );
};

export default FullWidthButton;
