function Input({ name, type, value, onChange, ...restOfProps }: any) {
  return (
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      {...restOfProps}
    />
  );
}

export default Input;
