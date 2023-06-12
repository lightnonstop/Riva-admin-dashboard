type InputProps = {
    type: string;
    label: string;
    i_id: string;
    i_class?: string;
    name?: string;
    value?: string;
    onChange?: any;
};
function Input({ type, label, i_id, i_class, name, value, onChange }: InputProps) {
  return (
    <div className='form-floating mt-3 mb-2'>
        <input 
        type={type} 
        className={i_class ? `form-control ${i_class}` : 'form-control'}
        id={i_id}
        placeholder={label}
        name={name}
        value={value}
        onChange={onChange}
        />
        <label htmlFor="floatingInput">{label}</label>
    </div>

  )
}

export default Input