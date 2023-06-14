import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import productCategoryService from "./productCategoryService";

export const getAllProductCategories = createAsyncThunk('category/get-product-categories', async (_, thunkAPI) => {
    try {
        return await productCategoryService.getAllProductCategories();
    } catch (e){
        return thunkAPI.rejectWithValue(e);
    }
})

export const createAProductCategory = createAsyncThunk('category/create-product-categories', async (category: {}, thunkAPI) => {
    try {
        return await productCategoryService.createProductCategory(category);
    } catch (e){
        return thunkAPI.rejectWithValue(e);
    }
})

const initialState = {
    productCategories: [],
    createdProductCategory: [],
    isError: false,
    isLoading: false,
    isSuccess: false,
    message: '',
};

export const productCategorySlice = createSlice({
    name: 'allProductCategories',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAllProductCategories.pending, (state) => {
                state.isLoading = true
            })

            .addCase(getAllProductCategories.fulfilled, (state, action) => {
                state.isLoading = false,
                state.isError = false,
                state.isSuccess = true,
                state.productCategories = action.payload!
            })

            .addCase(getAllProductCategories.rejected, (state, action) => {
                state.isLoading = false,
                state.isError = true,
                state.isSuccess = false,
                state.productCategories = null!,
                state.message = action.error.message!
            })

            .addCase(createAProductCategory.pending, (state) => {
                state.isLoading = true
            })

            .addCase(createAProductCategory.fulfilled, (state, action) => {
                state.isLoading = false,
                state.isError = false,
                state.isSuccess = true,
                state.createdProductCategory = action.payload!
            })

            .addCase(createAProductCategory.rejected, (state, action) => {
                state.isLoading = false,
                state.isError = true,
                state.isSuccess = false,
                state.createdProductCategory = null!,
                state.message = action.error.message!
            })
    },
})

export default productCategorySlice.reducer;
