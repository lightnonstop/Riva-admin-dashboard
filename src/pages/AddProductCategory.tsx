import Input from '../components/Input'
import { AppDispatch } from "../app/store";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { toast } from 'react-toastify';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import { createAProductCategory, getAProductCategory, resetProductCategoryState, updateAProductCategory } from '../features/productCategories/productCategorySlice';
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
let schema = Yup.object().shape({
  title: Yup.string().required('Title is required')
})
function AddProductCategory() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  interface newCategoryProps{
		isSuccess : string;
    isError : string;
    isLoading : string;
    createdProductCategory: [];
    productCategoryName: string,
    updatedProductCategory: string,
	}

  const newCategory: newCategoryProps = useSelector((state: any) => state.productCategories)
  const { isSuccess, isError, isLoading, createdProductCategory, productCategoryName, updatedProductCategory } = newCategory;
  
  const location = useLocation();
  const productCategoryId = location.pathname.split('/')[3];

  useEffect(() => {
    if (productCategoryId !== undefined){
      dispatch(getAProductCategory(productCategoryId))
    } else {
      dispatch(resetProductCategoryState())
    }
    
  }, [productCategoryId, productCategoryName])
  
  useEffect(() => {
    if (isSuccess && createdProductCategory){
      toast.success('Your product category has been created successfully!');
    }
    if (isSuccess && updatedProductCategory){
      toast.success('Your product category has been updated successfully!');
        setTimeout(() => {
          navigate('/admin/product-categories')
        }, 300)
    }
    if (isError){
      toast.success('Something went wrong!');
    }
  }, [isSuccess, isError, isLoading,])
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: productCategoryName || '',
    },
    validationSchema: schema,
    onSubmit: (values) => {
      if (productCategoryId !== undefined){
        const data = {
          id: productCategoryId,
          productCategoryValues: values,
        }
        dispatch(updateAProductCategory(data))
      } else {
        dispatch(createAProductCategory(values))
        formik.resetForm();
      }
    }
  });
  return (
    <div>
        <h3 className="title mb-4">{productCategoryId ? 'Edit' : 'Add'} category</h3>
        <div>
            <form action="" onSubmit={formik.handleSubmit}>
            <Input type="text" label="Enter category title" i_id="categoryTitle" name="title" 
            onChange={formik.handleChange('title')}
            onBlur={formik.handleBlur('title')}
            value={formik.values.title}
             />
             <div className="error">
                {formik.touched.title && formik.errors.title}
             </div>
                <button className='btn btn-success border-0 rounded-3 my-5' type='submit'>
                {productCategoryId ? 'Update' : 'Add'} category
                </button>
            </form>
        </div>
    </div>
  )
}

export default AddProductCategory