import React from 'react';

export type ClickHandler = { (id: string): void };
const DeleteXButton: React.FC<{ id: string; onClick: ClickHandler }> = ({
  id,
  onClick,
}) => {
  return (
    <button
      className="rounded-[50%] hover:bg-gray-100 active:bg-gray-300 h-10 w-10 -ml-3 -mr-[0.85rem] -mb-2 flex flex-col justify-center"
      data-id={id}
      onClick={() => onClick(id)}
    >
      <i className="fa-solid fa-x m-auto fa-sm" data-id={id}></i>
    </button>
  );
};

export default DeleteXButton;
