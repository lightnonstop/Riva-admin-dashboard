import Input from '../components/Input'
import { AppDispatch } from "../app/store";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { toast } from 'react-toastify';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import { createABrand, getABrand, resetBrandState, updateABrand } from '../features/brands/brandSlice';
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
let schema = Yup.object().shape({
  title: Yup.string().required('Title is required')
})
function AddBrand() {
  const navigate = useNavigate();
  interface newBrandProps{
		isSuccess : string;
    isError : string;
    isLoading : string;
    createdBrand : string;
    brandName: string;
    updatedBrand: string;
	}

  const newBrand: newBrandProps = useSelector((state: any) => state.brands)
  const { isSuccess, isError, isLoading, createdBrand, brandName, updatedBrand } = newBrand;

  const dispatch = useDispatch<AppDispatch>();
  const location = useLocation();
  const brandId = location.pathname.split('/')[3];
  
  useEffect(() => {
    if (brandId !== undefined){
      dispatch(getABrand(brandId))
    } else {
      dispatch(resetBrandState())
    }
    
  }, [brandId, brandName])
  
  useEffect(() => {
    if (isSuccess && createdBrand){
      toast.success('Your brand has been created successfully!');
    }
    if (isSuccess && updatedBrand){
      toast.success('Your brand has been updated successfully!');
        setTimeout(() => {
          navigate('/admin/brands')
        }, 3000)
    }
    if (isError){
      toast.success('Something went wrong!');
    }
  }, [isSuccess, isError, isLoading,])
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: brandName || '',
    },
    validationSchema: schema,
    onSubmit: (values) => {
      if (brandId !== undefined){
        const data = {
          id: brandId,
          brandValues: values,
        }
        dispatch(updateABrand(data))
      } else {
        dispatch(createABrand(values))
        formik.resetForm();
        setTimeout(() => {
          dispatch(resetBrandState())
        }, 3000)
      }
    }
  });
  return (
    <div>
        <h3 className="title mb-4">{brandId ? 'Edit' : 'Add'} brand</h3>
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
                {brandId ? 'Update' : 'Add'} brand
                </button>
            </form>
        </div>
    </div>
  )
}

export default AddBrand