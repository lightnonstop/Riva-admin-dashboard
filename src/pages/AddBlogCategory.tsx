import Input from '../components/Input'
import { AppDispatch } from "../app/store";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { toast } from 'react-toastify';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import { useEffect } from 'react';
import { createABlogCategory, resetBlogCategoryState } from '../features/blogCategories/blogCategorySlice';
let schema = Yup.object().shape({
  title: Yup.string().required('Title is required')
})
function AddBlogCategory() {
  const dispatch = useDispatch<AppDispatch>();
 

  interface newBlogCategoryProps{
		isSuccess : string;
    isError : string;
    isLoading : string;
    createdBlogCategory : string;
	}
  const newBlogCategory: newBlogCategoryProps = useSelector((state: any) => state.blogCategories)
  const { isSuccess, isError, isLoading, createdBlogCategory } = newBlogCategory;
  useEffect(() => {
    if (isSuccess && createdBlogCategory){
      toast.success('Your blog category has been added successfully!');
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
      dispatch(createABlogCategory(values))
      formik.resetForm();
      setTimeout(() => {
        dispatch(resetBlogCategoryState())  
      }, 3000)
    }
  });
  return (
    <div>
        <h3 className="title mb-4">Add blog category</h3>
        <div>
            <form action="" onSubmit={formik.handleSubmit}>
            <Input type="text" label="Enter Blog Category" i_id="blogCategoryTitle" name="title" 
            onChange={formik.handleChange('title')}
            onBlur={formik.handleBlur('title')}
            value={formik.values.title}
             />
             <div className="error">
                {formik.touched.title && formik.errors.title}
             </div>
                <button className='btn btn-success border-0 rounded-3 my-5' type='submit'>
                Add blog category
                </button>
            </form>
        </div>
    </div>
  )
}

export default AddBlogCategory