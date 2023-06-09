import React from 'react'
import Input from '../components/Input'
import { RiLoginBoxLine } from 'react-icons/ri'
import { Link } from 'react-router-dom'
function Login() {
  return (
    <div className='py-5' style={{ backgroundColor: '#6fdc87', minHeight: '100vh' }}>
      <br />
      <br />
      <br />
      <div className='my-5 w-25 bg-white rounded-3 mx-auto p-4'>
        <h3 className='text-center fs-5 fw-bolder d-flex flex-column align-items-center gap-3'><RiLoginBoxLine size={40} color='6fdc87' /> Login</h3>
        <p className='text-center'>Login to your account to continue</p>
        <form action="">
          <Input type='text' label='Email Address' i_id='email' />
          <Input type='password' label='Password' i_id='password' />
          <Link className='border-0 fw-bold px-3 py-2 w-100 text-white' type='submit' style={{ backgroundColor: '#6fdc87' }}>Login</Link>
        </form>
      </div>
    </div>
  )
}

export default Login