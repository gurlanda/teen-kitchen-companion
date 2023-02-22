import { FC, ReactNode } from 'react';

const OptionGroup: FC<{ children: ReactNode; title?: string }> = ({
  title,
  children,
}) => {
  return (
    <div className="mb-5">
      <label className="block font-bold mb-1 text-gray-800">{title}</label>
      {children}
    </div>
  );
};

export default OptionGroup;
