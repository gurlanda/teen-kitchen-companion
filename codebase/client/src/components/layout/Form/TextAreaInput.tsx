import { FC } from 'react';

export type StateChangeHandler = {
  (newValue: string): void;
};
const TextAreaInput: FC<{
  title?: string;
  rows: number;
  value: string;
  placeholder: string;
  onStateChange: StateChangeHandler;
  onBlur: { (): void };
}> = ({ title, rows, value, placeholder, onStateChange, onBlur }) => {
  return (
    <div className="mb-5">
      <label className="block font-bold mb-3 text-gray-800">{title}</label>
      <div className="mb-3">
        <textarea
          className="px-3 py-2 border border-gray-300 rounded-md w-full hover:border-gray-400 focus:outline-blue-400"
          rows={rows ? rows : 5}
          value={value ? value : undefined}
          placeholder={placeholder ? placeholder : undefined}
          onChange={(e) => onStateChange(e.target.value)}
          onBlur={onBlur}
        ></textarea>
      </div>
    </div>
  );
};

export default TextAreaInput;
