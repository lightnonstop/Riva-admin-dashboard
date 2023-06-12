import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import orderService from "./orderService";

export const getAllOrders = createAsyncThunk('order/get-orders', async (_, thunkAPI) => {
    try {
        return await orderService.getOrders();
        
    } catch (e){
        return thunkAPI.rejectWithValue(e);
    }
})

const initialState = {
    orders: [],
    isError: false,
    isLoading: false,
    isSuccess: false,
    message: '',
};

export const orderSlice = createSlice({
    name: 'allorders',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAllOrders.pending, (state) => {
                state.isLoading = true
            })

            .addCase(getAllOrders.fulfilled, (state, action) => {
                state.isLoading = false,
                state.isError = false,
                state.isSuccess = true,
                state.orders = action.payload!
            })

            .addCase(getAllOrders.rejected, (state, action) => {
                state.isLoading = false,
                state.isError = true,
                state.isSuccess = false,
                state.orders = null!,
                state.message = action.error.message!
            })
    },
})

export default orderSlice.reducer;
