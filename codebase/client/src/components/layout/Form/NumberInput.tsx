import { ChangeEvent, FC, FocusEventHandler, ReactNode } from 'react';

export type StateChangeHandler = { (newValue: number): void };
const NumberInput: FC<{
  title?: string;
  placeholder: string;
  value?: number;
  min?: number;
  max?: number;
  step?: number;
  onStateChange: StateChangeHandler;
  onBlur: FocusEventHandler<HTMLInputElement>;
}> = ({ title, placeholder, value, min, max, step, onStateChange, onBlur }) => {
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const numValue = Number.parseFloat(value);
    onStateChange(numValue);
  };

  return (
    <div className="mb-3">
      <label className="block font-bold mb-3 text-gray-800">{title}</label>
      <div className="mb-3">
        <input
          className="px-3 py-2 border border-gray-300 rounded-md w-full hover:border-gray-400 focus:outline-blue-400"
          type="number"
          min={min ? min.toString() : undefined}
          max={max ? max.toString() : undefined}
          step={step ? step.toString() : undefined}
          value={value}
          placeholder={placeholder ? placeholder : undefined}
          onChange={onChange}
          onBlur={onBlur}
        />
      </div>
    </div>
  );
};

export default NumberInput;
