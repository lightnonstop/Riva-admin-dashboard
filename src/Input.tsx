import React from 'react'
type InputProps = {
    type: string;
    label: string;
    i_id: string;
    i_class?: string;
};
function Input({ type, label, i_id, i_class }: InputProps) {
  return (
    <div className='form-floating mb-3'>
        <input 
        type={type} 
        className={i_class ? `form-control ${i_class}` : 'form-control'}
        id={i_id}
        placeholder={label}
        />
        <label htmlFor="floatingInput">{label}</label>
    </div>

  )
}

export default Input