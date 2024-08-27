import { ChangeEventHandler } from "react";

type OptionsType = {
  value: string;
  label: string;
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
  ...restOdProps
}: SelectProps) {
  return (
    <select name={name} value={value} onChange={onChange} {...restOdProps}>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}

export default Select;
