import Input from '../components/Input'
import { AppDispatch } from "../app/store";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { toast } from 'react-toastify';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from "react-router-dom";
import { useEffect } from 'react';
import { createAColor } from '../features/colors/colorSlice';
let schema = Yup.object().shape({
  title: Yup.string().required('Title is required')
})
function AddColor() {

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  interface newColorProps{
		isSuccess : string;
    isError : string;
    isLoading : string;
    createdColor : string;
	}

  const newColor: newColorProps = useSelector((state: any) => state.colors)
  const { isSuccess, isError, isLoading, createdColor } = newColor;
  useEffect(() => {
    if (isSuccess && createdColor){
      toast.success('Your color has been added successfully!');
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
      dispatch(createAColor(values))
      
      formik.resetForm();
      setTimeout(() => {
        navigate('/admin/color-list')
      }, 3000)
    }
  });
  return (
    <div>
        <h3 className="title mb-4">Add color</h3>
        <div>
            <form action="" onSubmit={formik.handleSubmit}>
            <Input type="color" label="Enter color title" i_id="colorTitle" name="title" 
            onChange={formik.handleChange('title')}
            onBlur={formik.handleBlur('title')}
            value={formik.values.title}
             />
             <div className="error">
                {formik.touched.title && formik.errors.title}
             </div>
                <button className='btn btn-success border-0 rounded-3 my-5' type='submit'>
                Add color
                </button>
            </form>
        </div>
    </div>
  )
}

export default AddColor;