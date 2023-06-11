type InputProps = {
    type: string;
    label: string;
    i_id: string;
    i_class?: string;
    name?: string;
};
function Input({ type, label, i_id, i_class, name }: InputProps) {
  return (
    <div className='form-floating mb-3'>
        <input 
        type={type} 
        className={i_class ? `form-control ${i_class}` : 'form-control'}
        id={i_id}
        placeholder={label}
        name={name}
        />
        <label htmlFor="floatingInput">{label}</label>
    </div>

  )
}

export default Input