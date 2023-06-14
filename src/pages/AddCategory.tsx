import Input from '../components/Input'
import { AppDispatch } from "../app/store";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { toast } from 'react-toastify';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from "react-router-dom";
import { createAProductCategory } from '../features/categories/categorySlice';
import { useEffect } from 'react';
let schema = Yup.object().shape({
  title: Yup.string().required('Title is required')
})
function AddCategory() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  interface newCategoryProps{
		isSuccess : string;
    isError : string;
    isLoading : string;
    createdCategory : string;
	}

  const newCategory: newCategoryProps = useSelector((state: any) => state.categories)
  const { isSuccess, isError, isLoading, createdCategory } = newCategory;
  useEffect(() => {
    if (isSuccess && createdCategory){
      toast.success('Your category has been created successfully!');
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
      dispatch(createAProductCategory(values))
      // console.log(values);
      
      formik.resetForm();
      setTimeout(() => {
        navigate('/admin/category-list')
      }, 3000)
    }
  });
  return (
    <div>
        <h3 className="title mb-4">Add category</h3>
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
                Add category
                </button>
            </form>
        </div>
    </div>
  )
}

export default AddCategory