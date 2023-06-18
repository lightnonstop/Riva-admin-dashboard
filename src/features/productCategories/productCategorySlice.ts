import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
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

export const getAProductCategory = createAsyncThunk('category/get-product-category', async (id: string, thunkAPI) => {
    try {
        return await productCategoryService.getProductCategory(id);
    } catch (e){
        return thunkAPI.rejectWithValue(e);
    }
})

export const updateAProductCategory = createAsyncThunk('category/update-product-category', async (updateData: { id: string; productCategoryValues: { title: string } }, thunkAPI) => {
    try {
        return await productCategoryService.updateProductCategory(updateData);
    } catch (e){
        return thunkAPI.rejectWithValue(e);
    }
})

export const deleteAProductCategory = createAsyncThunk('category/delete-product-category', async (id: string, thunkAPI) => {
    try {
        return await productCategoryService.deleteProductCategory(id);
    } catch (e){
        return thunkAPI.rejectWithValue(e);
    }
})

export const resetProductCategoryState = createAction('Reset_all');

type initialStateProps = {
    productCategories: [],
    isError: boolean,
    isLoading: boolean,
    isSuccess: boolean,
    message: string;
    createdProductCategory?: [];
    productCategoryName?: string,
    updatedProductCategory?: string,
    deletedProductCategory?: [],
}
const initialState: initialStateProps = {
    productCategories: [],
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

            .addCase(getAProductCategory.pending, (state) => {
                state.isLoading = true
            })

            .addCase(getAProductCategory.fulfilled, (state, action) => {
                state.isLoading = false,
                state.isError = false,
                state.isSuccess = true,
                state.productCategoryName = action.payload.title!
            })

            .addCase(getAProductCategory.rejected, (state, action) => {
                state.isLoading = false,
                state.isError = true,
                state.isSuccess = false,
                state.productCategoryName = null!,
                state.message = action.error.message!
            })

            .addCase(updateAProductCategory.pending, (state) => {
                state.isLoading = true
            })

            .addCase(updateAProductCategory.fulfilled, (state, action) => {
                state.isLoading = false,
                state.isError = false,
                state.isSuccess = true,
                state.updatedProductCategory = action.payload!
            })

            .addCase(updateAProductCategory.rejected, (state, action) => {
                state.isLoading = false,
                state.isError = true,
                state.isSuccess = false,
                state.updatedProductCategory = null!,
                state.message = action.error.message!
            })

            .addCase(deleteAProductCategory.pending, (state) => {
                state.isLoading = true
            })

            .addCase(deleteAProductCategory.fulfilled, (state, action) => {
                state.isLoading = false,
                state.isError = false,
                state.isSuccess = true,
                state.deletedProductCategory = action.payload!
            })

            .addCase(deleteAProductCategory.rejected, (state, action) => {
                state.isLoading = false,
                state.isError = true,
                state.isSuccess = false,
                state.deletedProductCategory = null!,
                state.message = action.error.message!
            })
            .addCase(resetProductCategoryState, () => initialState)
    },
})

export default productCategorySlice.reducer;
