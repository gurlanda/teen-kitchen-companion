import React from 'react';
import UpDownArrows, {
  ClickHandler as ArrowClickHandler,
} from './UpDownArrows';
import DeleteXButton, {
  ClickHandler as DeleteClickHandler,
} from './DeleteXButton';
import DynamicTextArea, { ChangeHandler } from './DynamicTextArea';

const FieldEdit: React.FC<{
  id: string;
  placeholder: string;
  value: string;
  onClickUp: ArrowClickHandler;
  onClickDown: ArrowClickHandler;
  onClickDelete: DeleteClickHandler;
  onTextChange: ChangeHandler;
}> = ({
  id,
  placeholder,
  value,
  onClickUp,
  onClickDown,
  onClickDelete,
  onTextChange,
}) => {
  return (
    <div className="flex justify-end items-center mb-3">
      <UpDownArrows id={id} onClickUp={onClickUp} onClickDown={onClickDown} />
      <DynamicTextArea
        classNames="mr-3 grow"
        placeholder={placeholder}
        value={value}
        id={id}
        onChange={onTextChange}
      />
      <DeleteXButton id={id} onClick={onClickDelete} />
    </div>
  );
};

export default FieldEdit;
