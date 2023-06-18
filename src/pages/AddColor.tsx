import Input from '../components/Input'
import { AppDispatch } from "../app/store";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { toast } from 'react-toastify';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import { useEffect } from 'react';
import { createAColor, getAColor, resetColorState, updateAColor } from '../features/colors/colorSlice';
import { useLocation, useNavigate } from 'react-router-dom';
let schema = Yup.object().shape({
  title: Yup.string().required('Title is required')
})
function AddColor() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const location = useLocation();
  const colorId = location.pathname.split('/')[3];
  interface newColorProps{
		isSuccess : string;
    isError : string;
    isLoading : string;
    createdColor : string;
    colorName: string;
    updatedColor: string;
	}

  const newColor: newColorProps = useSelector((state: any) => state.colors)
  const { isSuccess, isError, isLoading, createdColor, colorName, updatedColor } = newColor;  
  useEffect(() => {
    if (colorId !== undefined){
      dispatch(getAColor(colorId))
    } else {
      dispatch(resetColorState())
    }
    
  }, [colorId, colorName])

  useEffect(() => {
    if (isSuccess && createdColor){
      toast.success('Your color has been added successfully!');
    }
    if (isSuccess && updatedColor){
      toast.success('Your color has been updated successfully!');
        setTimeout(() => {
          navigate('/admin/colors')
        }, 300)
      }
    if (isError){
      toast.success('Something went wrong!');
    }
  }, [isSuccess, isError, isLoading,])
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: colorName || '',
    },
    validationSchema: schema,
    onSubmit: (values) => {
      if (colorId !== undefined){
        const data = {
          id: colorId,
          colorValues: values,
        }
        dispatch(updateAColor(data))
      } else {
        dispatch(createAColor(values))
        formik.resetForm();
      }
    }
  });
  return (
    <div>
        <h3 className="title mb-4">{colorId ? 'Edit' : 'Add'} color</h3>
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
                {colorId ? 'Update' : 'Add'} color
                </button>
            </form>
        </div>
    </div>
  )
}

export default AddColor;