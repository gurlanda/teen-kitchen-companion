import React from 'react';

export type ClickHandler = { (id: string): void };
const UpDownArrows: React.FC<{
  id: string;
  onClickUp: ClickHandler;
  onClickDown: ClickHandler;
}> = ({ id, onClickUp, onClickDown }) => {
  return (
    <div className="flex flex-col justify-center -ml-1.5 mr-1">
      <button
        className="rounded-md hover:bg-gray-100 active:bg-gray-300"
        data-id={id}
        onClick={() => onClickUp(id)}
      >
        <i className="fa-solid fa-arrow-up m-auto p-2" data-id={id}></i>
      </button>
      <button
        className="rounded-md hover:bg-gray-100 active:bg-gray-300"
        data-id={id}
        onClick={() => onClickDown(id)}
      >
        <i className="fa-solid fa-arrow-down m-auto p-2" data-id={id}></i>
      </button>
    </div>
  );
};

export default UpDownArrows;
