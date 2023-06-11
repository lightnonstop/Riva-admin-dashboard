import React from 'react'
import Input from '../components/Input'
import { RxReset } from 'react-icons/rx';
function ResetPassword() {
  return (
    <div className='py-5' style={{ backgroundColor: '#6fdc87', minHeight: '100vh' }}>
      <br />
      <br />
      <br />
      <div className='my-5 w-25 bg-white rounded-3 mx-auto p-4'>
        <h3 className='text-center fs-5 fw-bolder d-flex flex-column align-items-center gap-3'><RxReset size={40} color='6fdc87' /> Reset Password</h3>
        <p className='text-center'>Please Enter your new password</p>
        <form action="">
          <Input type='password' label='New Password' i_id='password' />
          <Input type='password' label='Confirm Password' i_id='confirmPassword' />
          <button className='border-0 fw-bold px-3 py-2 w-100 text-white' type='submit' style={{ backgroundColor: '#6fdc87' }}>Reset password</button>
        </form>
      </div>
    </div>
  )
}

export default ResetPassword