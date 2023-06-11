import React from 'react'
import Input from '../components/Input'

function AddCategory() {
  return (
    <div>
        <h3 className="mb-4">Add category</h3>
        <div>
            <form action="">
                <Input type='text' label='Enter category' i_id='category' />
                <button className='btn btn-success border-0 rounded-3 my-5' type='submit'>
                Add category
                </button>
            </form>
        </div>
    </div>
  )
}

export default AddCategory