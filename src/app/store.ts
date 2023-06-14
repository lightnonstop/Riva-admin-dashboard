import { configureStore } from "@reduxjs/toolkit";
import authReducer from '../features/auth/authSlice';
import customerReducer from '../features/customers/customerSlice';
import productReducer from '../features/products/productSlice';
import brandReducer from '../features/brands/brandSlice';
import categoryReducer from '../features/productCategories/productCategorySlice';
import colorReducer from '../features/colors/colorSlice';
import blogReducer from '../features/blogs/blogSlice';
import blogCategoryReducer from '../features/blogCategories/blogCategorySlice';
import enquiryReducer from '../features/enquiries/enquirySlice';
import orderReducer from '../features/orders/orderSlice';
import uploadImagesReducer from '../features/uploads/uploadSlice';
import couponReducer from '../features/coupons/couponSlice';
import { useDispatch } from "react-redux";
export const store = configureStore({
    reducer: {
        auth: authReducer,
        customers: customerReducer,
        products: productReducer,
        brands: brandReducer,
        productCategories: categoryReducer,
        colors: colorReducer,
        blogs: blogReducer,
        blogCategories: blogCategoryReducer,
        enquiries: enquiryReducer,
        orders: orderReducer,
        uploads: uploadImagesReducer,
        coupons: couponReducer,
    },
});
export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch;