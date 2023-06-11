import React from 'react'
import Input from '../components/Input'

function AddBlogCategory() {
  return (
    <div>
        <h3 className="mb-4">Add blog category</h3>
        <div>
            <form action="">
                <Input type='text' label='Enter blog category' i_id='blogCategory' />
                <button className='btn btn-success border-0 rounded-3 my-5' type='submit'>
                Add blog category
                </button>
            </form>
        </div>
    </div>
  )
}

export default AddBlogCategory