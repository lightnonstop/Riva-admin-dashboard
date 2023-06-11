import Input from '../components/Input'

function AddBrand() {
  return (
    <div>
        <h3 className="title mb-4">Add brand</h3>
        <div>
            <form action="">
                <Input type='text' label='Enter brand' i_id='brand' />
                <button className='btn btn-success border-0 rounded-3 my-5' type='submit'>
                Add brand
                </button>
            </form>
        </div>
    </div>
  )
}

export default AddBrand