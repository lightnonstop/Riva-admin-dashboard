import Input from '../components/Input'
import { AppDispatch } from "../app/store";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { toast } from 'react-toastify';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useEffect } from 'react';
import { createACoupon, resetCouponState } from '../features/coupons/couponSlice';
let schema = Yup.object().shape({
  name: Yup.string().required('Coupon Name is required'),
  expiry: Yup.date().required('Expiry Date is required'),
  discount: Yup.number().required('Percentage Discount  is required'),
})
function AddCoupon() {
  const dispatch = useDispatch<AppDispatch>();
 

  interface newCouponProps{
		isSuccess : string;
    isError : string;
    isLoading : string;
    createdCoupon : string;
	}
  const newCoupon: newCouponProps = useSelector((state: any) => state.coupons)
  const { isSuccess, isError, isLoading, createdCoupon } = newCoupon;
  useEffect(() => {
    if (isSuccess && createdCoupon){
      toast.success('Your coupon has been created successfully!');
    }
    if (isError){
      toast.success('Something went wrong!');
    }
  }, [isSuccess, isError, isLoading,])
  
  const formik = useFormik({
    initialValues: {
      name: '',
      expiry: '',
      discount: '',
    },
    validationSchema: schema,
    onSubmit: (values) => {
      dispatch(createACoupon(values));
      formik.resetForm();
      setTimeout(() => {
        dispatch(resetCouponState())
      }, 3000)
    }
  });
  return (
    <div>
        <h3 className="title mb-4">Add Coupon</h3>
        <div>
            <form action="" onSubmit={formik.handleSubmit}>
            <Input type="text" label="Enter Coupon Name" i_id="couponName" name="name" 
            onChange={formik.handleChange('name')}
            onBlur={formik.handleBlur('name')}
            value={formik.values.name}
             />
             <div className="error">
                {formik.touched.name && formik.errors.name}
             </div>

             <Input type="date" label="Enter Expiry Date" i_id="expiryDate" name="expiryDate" 
            onChange={formik.handleChange('expiry')}
            onBlur={formik.handleBlur('expiry')}
            value={formik.values.expiry}
             />
             <div className="error">
                {formik.touched.expiry && formik.errors.expiry}
             </div>

             <Input type="text" label="Enter Discount" i_id="discount" name="number" 
            onChange={formik.handleChange('discount')}
            onBlur={formik.handleBlur('discount')}
            value={formik.values.discount}
             />
             <div className="error">
                {formik.touched.discount && formik.errors.discount}
             </div>
                <button className='btn btn-success border-0 rounded-3 my-5' type='submit'>
                Add Coupon
                </button>
            </form>
        </div>
    </div>
  )
}

export default AddCoupon