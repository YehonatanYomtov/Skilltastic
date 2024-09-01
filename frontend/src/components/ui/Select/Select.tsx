import { ChangeEventHandler, ReactNode } from "react";

type OptionsType = {
  value: string;
  label: ReactNode;
};

type SelectProps = {
  name: string;
  value: string;
  onChange: ChangeEventHandler<HTMLSelectElement>;
  options: OptionsType[];
};

function Select({
  name,
  value,
  onChange,
  options,
  ...restOfProps
}: SelectProps) {
  return (
    <select name={name} value={value} onChange={onChange} {...restOfProps}>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}

export default Select;
