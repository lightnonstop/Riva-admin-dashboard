import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import productService from "./productService";


export const getAllProducts = createAsyncThunk('product/get-products', async (_, thunkAPI) => {
    try {
        return await productService.getProducts();
    } catch (e){
        return thunkAPI.rejectWithValue(e);
    }
})

const initialState = {
    products: [],
    isError: false,
    isLoading: false,
    isSuccess: false,
    message: '',
};

export const productSlice = createSlice({
    name: 'allProducts',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAllProducts.pending, (state) => {
                state.isLoading = true
            })

            .addCase(getAllProducts.fulfilled, (state, action) => {
                state.isLoading = false,
                state.isError = false,
                state.isSuccess = true,
                state.products = action.payload!
            })

            .addCase(getAllProducts.rejected, (state, action) => {
                state.isLoading = false,
                state.isError = true,
                state.isSuccess = false,
                state.products = null!,
                state.message = action.error.message!
            })
    },
})

export default productSlice.reducer;
