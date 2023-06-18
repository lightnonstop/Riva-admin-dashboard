import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import couponService from "./couponService";


export const getAllCoupons = createAsyncThunk('coupon/get-coupons', async (_, thunkAPI) => {
    try {
        return await couponService.getCoupons();
    } catch (e){
        return thunkAPI.rejectWithValue(e);
    }
})

export const getACoupon = createAsyncThunk('coupon/get-coupon', async (id: string, thunkAPI) => {
    try {
        return await couponService.getCoupon(id);
    } catch (e){
        return thunkAPI.rejectWithValue(e);
    }
})

export const updateACoupon = createAsyncThunk('coupon/update-coupon', async (updateData: { id: string; couponValues: { name: string; expiry: string; discount: string } }, thunkAPI) => {
    try {
        return await couponService.updateCoupon(updateData);
    } catch (e){
        return thunkAPI.rejectWithValue(e);
    }
})

export const deleteACoupon = createAsyncThunk('coupon/delete-coupon', async (id: string, thunkAPI) => {
    try {
        return await couponService.deleteCoupon(id);
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
    couponName?: string,
    couponExpiryDate?: string;
    couponDiscount?: string;
    updatedCoupon?: string,
    deletedCoupon?: [],
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

            .addCase(getACoupon.pending, (state) => {
                state.isLoading = true
            })

            .addCase(getACoupon.fulfilled, (state, action) => {
                state.isLoading = false,
                state.isError = false,
                state.isSuccess = true,
                state.couponName = action.payload.name!
                state.couponExpiryDate = action.payload.expiry!
                state.couponDiscount = action.payload.discount!
            })

            .addCase(getACoupon.rejected, (state, action) => {
                state.isLoading = false,
                state.isError = true,
                state.isSuccess = false,
                state.couponName = null!,
                state.couponExpiryDate = null!,
                state.couponDiscount = null!,
                state.message = action.error.message!
            })

            .addCase(updateACoupon.pending, (state) => {
                state.isLoading = true
            })

            .addCase(updateACoupon.fulfilled, (state, action) => {
                state.isLoading = false,
                state.isError = false,
                state.isSuccess = true,
                state.updatedCoupon = action.payload!
            })

            .addCase(updateACoupon.rejected, (state, action) => {
                state.isLoading = false,
                state.isError = true,
                state.isSuccess = false,
                state.updatedCoupon = null!,
                state.message = action.error.message!
            })

            .addCase(deleteACoupon.pending, (state) => {
                state.isLoading = true
            })

            .addCase(deleteACoupon.fulfilled, (state, action) => {
                state.isLoading = false,
                state.isError = false,
                state.isSuccess = true,
                state.deletedCoupon = action.payload!
            })

            .addCase(deleteACoupon.rejected, (state, action) => {
                state.isLoading = false,
                state.isError = true,
                state.isSuccess = false,
                state.deletedCoupon = null!,
                state.message = action.error.message!
            })
            .addCase(resetCouponState, () => initialState)
    },
})

export default couponSlice.reducer;
