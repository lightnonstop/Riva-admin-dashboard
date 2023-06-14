import Input from '../components/Input'
import { AppDispatch } from "../app/store";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { toast } from 'react-toastify';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from "react-router-dom";
import { createABrand } from '../features/brands/brandSlice';
import { useEffect } from 'react';
let schema = Yup.object().shape({
  title: Yup.string().required('Title is required')
})
function AddBrand() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  interface newBrandProps{
		isSuccess : string;
    isError : string;
    isLoading : string;
    createdBrand : string;
	}
  const newBrand: newBrandProps = useSelector((state: any) => state.brands)
  const { isSuccess, isError, isLoading, createdBrand } = newBrand;
  useEffect(() => {
    if (isSuccess && createdBrand){
      toast.success('Your brand has been created successfully!');
    }
    if (isError){
      toast.success('Something went wrong!');
    }
  }, [isSuccess, isError, isLoading,])
  const formik = useFormik({
    initialValues: {
      title: '',
    },
    validationSchema: schema,
    onSubmit: (values) => {
      dispatch(createABrand(values))
      formik.resetForm();
      setTimeout(() => {
        //navigate('/admin/brands')
      }, 3000)
    }
  });
  return (
    <div>
        <h3 className="title mb-4">Add brand</h3>
        <div>
            <form action="" onSubmit={formik.handleSubmit}>
            <Input type="text" label="Enter brand title" i_id="brandTitle" name="title" 
            onChange={formik.handleChange('title')}
            onBlur={formik.handleBlur('title')}
            value={formik.values.title}
             />
             <div className="error">
                {formik.touched.title && formik.errors.title}
             </div>
                <button className='btn btn-success border-0 rounded-3 my-5' type='submit'>
                Add brand
                </button>
            </form>
        </div>
    </div>
  )
}

export default AddBrand