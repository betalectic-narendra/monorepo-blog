import React from 'react';

interface Data{
    type: string;
    name: string;
    value?: string;
}
interface InputProps {
  label: string;
  data:Data
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}


export const InputField: React.FC<InputProps> = ({ label, data, onChange }) => {
  return (
    <div className="mb-4">
      <label htmlFor={data?.name} className="block mb-1">
        {label}:
      </label>
      <input
        type={data?.type}
        name={data?.name}
        value={data?.value}
        onChange={onChange}
        className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-blue-500"
      />
    </div>
  );
};

