import React from 'react'
import Input from '../components/Input'

function AddColor() {
  return (
    <div>
        <h3 className="mb-4">Add color</h3>
        <div>
            <form action="">
                <Input type='color' label='Enter color' i_id='color' />
                <button className='btn btn-success border-0 rounded-3 my-5' type='submit'>
                Add color
                </button>
            </form>
        </div>
    </div>
  )
}

export default AddColor;