import { FC, ReactNode, ChangeEventHandler, ChangeEvent } from 'react';

export type StateChangeHandler = {
  (affectedOption: string, newState: boolean): void;
};
const Checkbox: FC<{
  text: string;
  name: string;
  value: string;
  id: string;
  state: boolean;
  onStateChange: StateChangeHandler;
}> = ({ text, name, value, id, state, onStateChange }) => {
  return (
    <div className="mb-1 ml-1">
      <label
        htmlFor={id ? id : undefined}
        className="text-gray-700 hover:text-gray-900 cursor-pointer flex"
      >
        <input
          type="checkbox"
          name={name ? name : undefined}
          value={value ? value : undefined}
          id={id ? id : undefined}
          checked={state ? state : undefined}
          onChange={(e) => onStateChange(e.target.value, e.target.checked)}
          className="h-4 w-4 self-center"
        />
        <span className="ml-2">{text}</span>
      </label>
    </div>
  );
};

export default Checkbox;
