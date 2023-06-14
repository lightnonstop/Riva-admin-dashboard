import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import couponService from "./couponService";


export const getAllCoupons = createAsyncThunk('coupon/get-coupons', async (_, thunkAPI) => {
    try {
        return await couponService.getCoupons();
    } catch (e){
        return thunkAPI.rejectWithValue(e);
    }
})

export const createACoupon = createAsyncThunk('coupon/create-coupons', async (couponData: {}, thunkAPI) => {
    try {
        return await couponService.createCoupons(couponData);
    } catch (e){
        return thunkAPI.rejectWithValue(e);
    }
})
export const resetCouponState = createAction('Reset_all');

type initialStateProps = {
    coupons: [],
    isError: boolean,
    isLoading: boolean,
    isSuccess: boolean,
    message: string;
    createdCoupon?: [];
}
const initialState: initialStateProps = {
    coupons: [],
    isError: false,
    isLoading: false,
    isSuccess: false,
    message: '',
};

export const couponSlice = createSlice({
    name: 'allCoupons',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAllCoupons.pending, (state) => {
                state.isLoading = true
            })

            .addCase(getAllCoupons.fulfilled, (state, action) => {
                state.isLoading = false,
                state.isError = false,
                state.isSuccess = true,
                state.coupons = action.payload!
            })

            .addCase(getAllCoupons.rejected, (state, action) => {
                state.isLoading = false,
                state.isError = true,
                state.isSuccess = false,
                state.coupons = null!,
                state.message = action.error.message!
            })

            .addCase(createACoupon.pending, (state) => {
                state.isLoading = true
            })

            .addCase(createACoupon.fulfilled, (state, action) => {
                state.isLoading = false,
                state.isError = false,
                state.isSuccess = true,
                state.createdCoupon = action.payload!
            })

            .addCase(createACoupon.rejected, (state, action) => {
                state.isLoading = false,
                state.isError = true,
                state.isSuccess = false,
                state.createdCoupon = null!,
                state.message = action.error.message!
            })
            .addCase(resetCouponState, () => initialState)
    },
})

export default couponSlice.reducer;
