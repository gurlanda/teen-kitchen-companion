import { FC } from 'react';

export type ChangeHandler = { (newValue: boolean): void };
const SingleCheckboxInput: FC<{
  title?: string;
  label: string;
  value: boolean;
  id: string;
  isOnEnd: boolean;
  onStateChange: ChangeHandler;
}> = ({ title, label, value, id, isOnEnd, onStateChange }) => {
  return (
    <div className={`mb-3 ${isOnEnd ? 'self-end' : ''}`}>
      {title && <label className="block font-bold mb-1">{title}</label>}
      <label
        htmlFor={id}
        className="text-gray-700 hover:text-gray-900 cursor-pointer flex"
      >
        <input
          type="checkbox"
          name=""
          id={id}
          className="h-4 w-4 self-center cursor-pointer"
          onChange={(e) => onStateChange(e.target.checked)}
          value={id}
          checked={value}
        />
        <span className="ml-2">{label}</span>
      </label>
    </div>
  );
};

export default SingleCheckboxInput;
