import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import productService from "./productService";


export const getAllProducts = createAsyncThunk('product/get-products', async (_, thunkAPI) => {
    try {
        return await productService.getProducts();
    } catch (e){
        return thunkAPI.rejectWithValue(e);
    }
})

export const createAProduct = createAsyncThunk('product/create-products', async (productData: {}, thunkAPI) => {
    try {
        return await productService.createProducts(productData);
    } catch (e){
        return thunkAPI.rejectWithValue(e);
    }
})
export const resetProductState = createAction('Reset_all');
type initialStateProps = {
    products: [],
    isError: boolean,
    isLoading: boolean,
    isSuccess: boolean,
    message: string;
    createdProduct?: {}[];
}
const initialState: initialStateProps = {
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

            .addCase(createAProduct.pending, (state) => {
                state.isLoading = true
            })

            .addCase(createAProduct.fulfilled, (state, action) => {
                state.isLoading = false,
                state.isError = false,
                state.isSuccess = true,
                state.createdProduct = action.payload!
            })

            .addCase(createAProduct.rejected, (state, action) => {
                state.isLoading = false,
                state.isError = true,
                state.isSuccess = false,
                state.createdProduct = null!,
                state.message = action.error.message!
            })
            .addCase(resetProductState, () => initialState)
    },
})

export default productSlice.reducer;
