import Input from '../components/Input'
import { AppDispatch } from "../app/store";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { toast } from 'react-toastify';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import { useEffect } from 'react';
import { createABlogCategory, getABlogCategory, resetBlogCategoryState, updateABlogCategory } from '../features/blogCategories/blogCategorySlice';
import { useLocation, useNavigate } from 'react-router-dom';
let schema = Yup.object().shape({
  title: Yup.string().required('Title is required')
})
function AddBlogCategory() {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const location = useLocation();
  const blogCategoryId = location.pathname.split('/')[3];

  interface newBlogCategoryProps{
		isSuccess : string;
    isError : string;
    isLoading : string;
    createdBlogCategory : string;
    blogCategoryName: string;
    updatedBlogCategory: string;
	}
  const newBlogCategory: newBlogCategoryProps = useSelector((state: any) => state.blogCategories)
  const { isSuccess, isError, isLoading, createdBlogCategory, blogCategoryName, updatedBlogCategory } = newBlogCategory;
  useEffect(() => {
    if (blogCategoryId !== undefined){
      dispatch(getABlogCategory(blogCategoryId))
    } else {
      dispatch(resetBlogCategoryState())
    }
    
  }, [blogCategoryId, blogCategoryName])
  
  useEffect(() => {
    if (isSuccess && createdBlogCategory){
      toast.success('Your blogCategory has been created successfully!');
    }
    if (isSuccess && updatedBlogCategory){
      toast.success('Your blogCategory has been updated successfully!');
        setTimeout(() => {
          navigate('/admin/blog-categories')
        }, 300)
    }
    if (isError){
      toast.success('Something went wrong!');
    }
  }, [isSuccess, isError, isLoading,])
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: blogCategoryName || '',
    },
    validationSchema: schema,
    onSubmit: (values) => {
      if (blogCategoryId !== undefined){
        const data = {
          id: blogCategoryId,
          blogCategoryValues: values,
        }
        dispatch(updateABlogCategory(data))
      } else {
        dispatch(createABlogCategory(values))
        formik.resetForm();
      }
    }
  });
  return (
    <div>
        <h3 className="title mb-4">{blogCategoryId ? 'Edit' : 'Add'} blog category</h3>
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
                {blogCategoryId ? 'Update' : 'Add'} blog category
                </button>
            </form>
        </div>
    </div>
  )
}

export default AddBlogCategory