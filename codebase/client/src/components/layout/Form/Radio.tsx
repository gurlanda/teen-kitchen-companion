import { FC } from 'react';

export type StateChangeHandler = { (affectedOption: string): void };

const Radio: FC<{
  name: string;
  text: string;
  value: string;
  state: boolean;
  id: string;
  onStateChange: StateChangeHandler;
}> = ({ name, text, value, state, id, onStateChange }) => {
  return (
    <label
      htmlFor={id ? id : undefined}
      className="text-gray-700 hover:text-gray-900 mb-1 ml-1 cursor-pointer flex"
    >
      <input
        type="radio"
        id={id ? id : undefined}
        name={name ? name : undefined}
        value={value ? value : undefined}
        checked={state ? state : undefined}
        onChange={(e) => onStateChange(e.target.value)}
        className="h-4 w-4 self-center"
      />
      <span className="ml-2">{text}</span>
    </label>
  );
};

export default Radio;
