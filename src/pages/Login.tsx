import { useFormik } from 'formik';
import Input from '../components/Input'
import { RiLoginBoxLine } from 'react-icons/ri'
import { Link, useNavigate } from 'react-router-dom'
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../features/auth/authSlice';
import { AppDispatch } from '../app/store';
import { useEffect } from 'react';
function Login() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  let schema = yup.object().shape({
    email: yup.string()
      .email('Email should be valid')
      .required('Email is required'),
    password: yup.string().required('Password is required'),
  })
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: schema,
    onSubmit: (values) => {
      dispatch(login(values));
    }
  });

  const { user, isLoading, isError, isSuccess, message } = useSelector((state: any) => state.auth);
  useEffect(() => {
    if (isSuccess){
      navigate('admin');
    } else {
      navigate('');
    } 
  }, [user, isLoading, isError, isSuccess, message])
  
  return (
    <div className='py-5' style={{ backgroundColor: '#6fdc87', minHeight: '100vh' }}>
      <br />
      <br />
      <br />
      <div className='my-5 w-25 bg-white rounded-3 mx-auto p-4'>
        <h3 className='title  text-center fs-5 fw-bolder d-flex flex-column align-items-center gap-3'><RiLoginBoxLine size={40} color='6fdc87' /> Login</h3>
        <p className='text-center'>Login to your account to continue</p>
        <div className='error text-center'>
          {message === 'Rejected' ? 'You are not the admin': ''}
        </div>
        <form action="" onSubmit={formik.handleSubmit}>
          <Input
            type='text'
            label='Email Address'
            i_id='email'
            name='email'
            value={formik.values.email}
            onChange={formik.handleChange('email')}
          />
          {formik.touched.email && formik.errors.email ? (
            <div className='error'>{formik.errors.email}</div>
          ) : null}
          <Input
            type='password'
            label='Password'
            i_id='password'
            name='password'
            value={formik.values.password}
            onChange={formik.handleChange('password')}
          />
          {formik.touched.password && formik.errors.password ? (
            <div className='error'>{formik.errors.password}</div>
          ) : null}
          <div className='mb-3 text-end' >
            <Link to='/forgot-password' className=''>Forgot Password?</Link>
          </div>
          <button className='border-0 fw-bold px-3 py-2 w-100 text-white text-center text-decoration-none fs-5' type='submit' style={{ backgroundColor: '#6fdc87' }}>Login</button>
        </form>
      </div>
    </div>
  )
}

export default Login