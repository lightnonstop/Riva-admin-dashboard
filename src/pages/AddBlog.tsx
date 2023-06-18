import { useEffect } from 'react'
import Input from '../components/Input'
import Dropzone from 'react-dropzone';
import { getUploadingImages, getDeletingImages } from "../features/uploads/uploadSlice";

import { useFormik } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { AppDispatch } from "../app/store";
import { useDispatch } from "react-redux";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useSelector } from 'react-redux';
import { getAllBlogCategories, resetBlogCategoryState } from '../features/blogCategories/blogCategorySlice';
import { useLocation, useNavigate } from 'react-router-dom';
import { createABlog, getABlog, resetBlogState, updateABlog } from '../features/blogs/blogSlice';

let schema = Yup.object().shape({
  title: Yup.string().required('Title is required'),
  description: Yup.string().required('Description is required'),
  category: Yup.string().required('Category is required'),
  images: Yup.array().required('Image is required'),
  
})

function AddBlog() {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const location = useLocation();
  const blogId = location.pathname.split('/')[3];

  interface imagesProps{
		url: string;
    public_id: string;
	}
  interface newBlogProps{
		isSuccess : string;
    isError : string;
    isLoading : string;
    createdBlog : string;
    blogTitle: string,
    blogCategory: string;
    blogDescription: string;
    blogImages: [];
    updatedBlog: string;
	}
  interface blogCategoriesProps{
		title: string;
	}
  const images: imagesProps[] = useSelector((state: any) => state.uploads.images)

  const newBlog: newBlogProps = useSelector((state: any) => state.blogs)

  const blogCategories: blogCategoriesProps[] = useSelector((state: any) => state.blogCategories.blogCategories)
  
  const { isSuccess, isError, isLoading, createdBlog, blogTitle, blogCategory, blogDescription, blogImages, updatedBlog } = newBlog;
  
  useEffect(() => {
    dispatch(resetBlogCategoryState())
    dispatch(getAllBlogCategories());
  }, [])

  useEffect(() => {
    if (blogId !== undefined){
      dispatch(getABlog(blogId))
      imageArr.push(blogImages)
    } else {
      dispatch(resetBlogState())
    }
  }, [blogId, blogTitle, blogCategory, blogDescription])
  
  useEffect(() => {
    if (isSuccess && createdBlog){
      toast.success('Your blog has been created successfully!');
      navigate('/admin/blogs')
    }
    if (isSuccess && updatedBlog){
      toast.success('Your blog has been updated successfully!');
        setTimeout(() => {
          navigate('/admin/blogs')
        }, 300)
    }
    if (isError){
      toast.success('Something went wrong!');
    }
  }, [isSuccess, isError, isLoading,])

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: blogTitle || '',
      description: blogDescription || '',
      images: [], 
      category: blogCategory || '', 
    },
    validationSchema: schema,
    onSubmit: (values) => {
      if (blogId !== undefined){
        const data = {
          id: blogId,
          blogValues: values,
        }
        dispatch(updateABlog(data))
      } else {
        dispatch(createABlog(values))      
        formik.resetForm();
        setTimeout(() => {
          dispatch(resetBlogState())
        }, 300)
      }
    }
  });
  
  const imageArr: any= [];

  images?.forEach(image => {
    imageArr.push({
      public_id: image.public_id,
      url: image.url
    })
  })
  useEffect(() => {
    formik.values.images = imageArr;    
  }, [blogImages])  
  return (
    <div>
      <h3 className="title">{blogId ? 'Edit' : 'Add'} Blog</h3>

      <div className=''>
        <form action="" onSubmit={formik.handleSubmit} >
          <div>
            <Input type='text' label='Blog Title' i_id='blogTitle' 
            onChange={formik.handleChange('title')}
            onBlur={formik.handleBlur('title')}
            value={formik.values.title}/>
          </div>
          <div className="error">
                {formik.touched.title && formik.errors.title}
             </div>
          <select className='form-control py-3 mb-3' id="" onChange={formik.handleChange('category')}
             onBlur={formik.handleBlur('category')}
             value={formik.values.category}
             name="category" >
            <option value="">Select a blog category</option>
            {
                blogCategories?.map((category, key) => (
                  <option key={key} value={category.title}>
                    {category.title}
                  </option>
                ))
              }
          </select>
          <div className="error">
                {formik.touched.category && formik.errors.category}
             </div>
          <div>
              <ReactQuill
                theme='snow'
                onChange={formik.handleChange('description')}
                onBlur={formik.handleBlur('description')}
                value={formik.values.description}
            />
              <div className="error">
                  {formik.touched.description && formik.errors.description}
                </div>
            </div>
           <div className='bg-white border-1 p-5 text-center mt-3'>
            <Dropzone onDrop={(acceptedFiles) => dispatch(getUploadingImages(acceptedFiles))} >
                  {({ getRootProps, getInputProps }) => (
                    <section>
                      <div { ...getRootProps() }>
                        <input { ...getInputProps() } />
                        <p>Drag 'n' drop some files here, or click to select files</p>
                      </div>
                    </section>
                  )}
                </Dropzone>
           </div>
           <div className="show-images d-flex border-3">
                  {imageArr?.map((image: any, index: string) => (
                    <div key={index}className="position-relative">
                      <button className="btn-close position-absolute" style={{ top: '5px', right: '5px' }} onClick={() => dispatch(getDeletingImages(image.public_url))} />
                      <img src={image.url} alt="" width={200}height={200} />
                    </div>
                  ))}
             </div>
           <button
           className='btn btn-success border-0 rounded-3 my-5'
           type='submit'
           >
            {blogId ? 'Update' : 'Add'} blog
           </button>
        </form>
      </div>
    </div>
  )
}

export default AddBlog