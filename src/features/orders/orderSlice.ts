import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import orderService from "./orderService";

export const getAllOrders = createAsyncThunk('order/get-orders', async (_, thunkAPI) => {
    try {
        return await orderService.getOrders();
        
    } catch (e){
        return thunkAPI.rejectWithValue(e);
    }
})

export const getOrderByUser = createAsyncThunk('order/get-orders-by-user', async (id: string, thunkAPI) => {
    try {
        return await orderService.getOrder(id);
        
    } catch (e){
        return thunkAPI.rejectWithValue(e);
    }
})
type initialStateProps = {
    orderByUser?: {};
    orders: [],
    isError: boolean,
    isLoading: boolean,
    isSuccess: boolean,
    message: string,
}
const initialState: initialStateProps = {
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
            .addCase(getOrderByUser.pending, (state) => {
                state.isLoading = true
            })

            .addCase(getOrderByUser.fulfilled, (state, action) => {
                state.isLoading = false,
                state.isError = false,
                state.isSuccess = true,
                state.orderByUser = action.payload!
            })

            .addCase(getOrderByUser.rejected, (state, action) => {
                state.isLoading = false,
                state.isError = true,
                state.isSuccess = false,
                state.orderByUser = null!,
                state.message = action.error.message!
            })
    },
})

export default orderSlice.reducer;
