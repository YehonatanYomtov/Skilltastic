function Input({ name, type, value, onChange }: any) {
  return <input type={type} name={name} value={value} onChange={onChange} />;
}

export default Input;
