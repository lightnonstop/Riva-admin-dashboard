import { useEffect } from 'react'
import Input from '../components/Input'
import Dropzone from 'react-dropzone';
import { getUploadingImages, getDeletingImages } from "../features/uploads/uploadSlice";
import { useNavigate } from "react-router-dom";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { AppDispatch } from "../app/store";
import { useDispatch } from "react-redux";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useSelector } from 'react-redux';
import { getAllBlogCategories } from '../features/blogCategories/blogCategorySlice';
import { createABlog, resetBlogState } from '../features/blogs/blogSlice';

let schema = Yup.object().shape({
  title: Yup.string().required('Title is required'),
  description: Yup.string().required('Description is required'),
  category: Yup.string().required('Category is required'),
  images: Yup.array().required('Image is required'),
  
})

function AddBlog() {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  interface imagesProps{
		url: string;
    public_id: string;
	}
  interface newBlogProps{
		isSuccess : string;
    isError : string;
    isLoading : string;
    createdBlog : string;
	}
  interface blogCategoriesProps{
		title: string;
	}
  const images: imagesProps[] = useSelector((state: any) => state.uploads.images)
  const newBlog: newBlogProps = useSelector((state: any) => state.blogs)
  const blogCategories: blogCategoriesProps[] = useSelector((state: any) => state.blogCategories.blogCategories)
  
  const { isSuccess, isError, isLoading, createdBlog } = newBlog;
  
  useEffect(() => {
    dispatch(getAllBlogCategories());
  }, [])

  useEffect(() => {
    if (isSuccess && createdBlog){
      toast.success('Your blog has been added successfully!');
    }
    if (isError){
      toast.success('Something went wrong!');
    }
  }, [isSuccess, isError, isLoading,])

  const formik = useFormik({
    initialValues: {
      title: '',
      description: '',
      images: [], 
      category: '', 
    },
    validationSchema: schema,
    onSubmit: (values) => {
      dispatch(createABlog(values))
      console.log(values);
      
      formik.resetForm();
      setTimeout(() => {
        dispatch(resetBlogState())
        //navigate('/admin/blogs')
      }, 3000)
    }
  });

  const imageArr: any= [];

  images.forEach(image => {
    imageArr.push({
      public_id: image.public_id,
      url: image.url
    })
  })

  useEffect(() => {
    formik.values.images = imageArr;    
  }, [imageArr])
  return (
    <div>
      <h3 className="title">Add Blog</h3>

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
                  {images?.map((image: any, index) => (
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
            Add blog
           </button>
        </form>
      </div>
    </div>
  )
}

export default AddBlog