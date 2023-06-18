import Input from '../components/Input'
import { AppDispatch } from "../app/store";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { toast } from 'react-toastify';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useEffect } from 'react';
import { createACoupon, getACoupon, resetCouponState, updateACoupon } from '../features/coupons/couponSlice';
import { useLocation, useNavigate } from 'react-router-dom';
let schema = Yup.object().shape({
  name: Yup.string().required('Coupon Name is required'),
  expiry: Yup.date().required('Expiry Date is required'),
  discount: Yup.number().required('Percentage Discount  is required'),
})
function AddCoupon() {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const location = useLocation();
  const couponId = location.pathname.split('/')[3];
  interface newCouponProps{
		isSuccess : string;
    isError : string;
    isLoading : string;
    createdCoupon : string;
    couponName: string,
    couponExpiryDate: string;
    couponDiscount: string;
    updatedCoupon: string;
	}
  const newCoupon: newCouponProps = useSelector((state: any) => state.coupons)
  
  const { isSuccess, isError, isLoading, createdCoupon, couponName, couponExpiryDate, couponDiscount, updatedCoupon } = newCoupon;

  const changeDateFormat = date => {
    const newDate = new Date(date).toLocaleDateString();
    const [month, day, year] = newDate.split('/');
    if (day?.length == 1){
      if (month.length == 1){
        return [year, `0${month}`, `0${day}`].join('-')
      }
      else {
        return [year, `${month}`, `0${day}`].join('-')
      }
    } else if (month.length == 1){
      console.log([year, `0${month}`, `${day}`].join('-'));
      return [year, `0${month}`, `${day}`].join('-')
    }
    else {
      return [year, `${month}`, `${day}`].join('-')
    }
  }

  useEffect(() => {
    if (couponId !== undefined){
      dispatch(getACoupon(couponId))
    } else {
      dispatch(resetCouponState())
    }
    
  }, [couponId, couponName, couponDiscount, couponExpiryDate])
  
  useEffect(() => {
    if (isSuccess && createdCoupon){
      toast.success('Your coupon has been created successfully!');
    }
    if (isSuccess && updatedCoupon){
      toast.success('Your coupon has been updated successfully!');
        setTimeout(() => {
          navigate('/admin/coupons')
        }, 300)
    }
    if (isError){
      toast.success('Something went wrong!');
    }
  }, [isSuccess, isError, isLoading,])
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: couponName || '',
      expiry: changeDateFormat(couponExpiryDate) || '',
      discount: couponDiscount || '',
    },
    validationSchema: schema,
    onSubmit: (values) => {
      if (couponId !== undefined){
        const data = {
          id: couponId,
          couponValues: values,
        }
        dispatch(updateACoupon(data))
      } else {
        dispatch(createACoupon(values))
        formik.resetForm();
      }
    }
  });
  return (
    <div>
        <h3 className="title mb-4">{couponId ? 'Edit' : 'Add'} Coupon</h3>
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
                {couponId ? 'Update' : 'Add'} Coupon
                </button>
            </form>
        </div>
    </div>
  )
}

export default AddCoupon