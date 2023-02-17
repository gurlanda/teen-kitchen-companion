import React from 'react';
import UpDownArrows from './UpDownArrows';
import DeleteXButton from './DeleteXButton';
import DynamicTextArea from './DynamicTextArea';

const FieldEdit = ({
  dataId,
  placeholder,
  value,
  onClickUp,
  onClickDown,
  onClickDelete,
  onTextChange,
}) => {
  return (
    <div className='flex justify-end items-center mb-3'>
      <UpDownArrows
        dataId={dataId}
        onClickUp={onClickUp}
        onClickDown={onClickDown}
      />
      <DynamicTextArea
        classNames='mr-3 grow'
        placeholder={placeholder}
        value={value}
        dataId={dataId}
        onChange={onTextChange}
      />
      <DeleteXButton dataId={dataId} onClick={onClickDelete} />
    </div>
  );
};

export default FieldEdit;
