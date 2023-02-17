import React from 'react';

const UpDownArrows = ({ dataId, onClickUp, onClickDown }) => {
  return (
    <div className='flex flex-col justify-center -ml-1.5 mr-1'>
      <button
        className='rounded-md hover:bg-gray-100 active:bg-gray-300'
        data-id={dataId}
        onClick={onClickUp}
      >
        <i className='fa-solid fa-arrow-up m-auto p-2' data-id={dataId}></i>
      </button>
      <button
        className='rounded-md hover:bg-gray-100 active:bg-gray-300'
        data-id={dataId}
        onClick={onClickDown}
      >
        <i className='fa-solid fa-arrow-down m-auto p-2' data-id={dataId}></i>
      </button>
    </div>
  );
};

export default UpDownArrows;
