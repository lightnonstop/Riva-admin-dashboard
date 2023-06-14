import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import categoryService from "./categoryService";

export const getAllProductCategories = createAsyncThunk('category/get-categories', async (_, thunkAPI) => {
    try {
        return await categoryService.getCategories();
    } catch (e){
        return thunkAPI.rejectWithValue(e);
    }
})

export const createAProductCategory = createAsyncThunk('category/create-categories', async (category: {}, thunkAPI) => {
    try {
        return await categoryService.createProductCategories(category);
    } catch (e){
        return thunkAPI.rejectWithValue(e);
    }
})

const initialState = {
    categories: [],
    createdCategory: [],
    isError: false,
    isLoading: false,
    isSuccess: false,
    message: '',
};

export const categorySlice = createSlice({
    name: 'allCategories',
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
                state.categories = action.payload!
            })

            .addCase(getAllProductCategories.rejected, (state, action) => {
                state.isLoading = false,
                state.isError = true,
                state.isSuccess = false,
                state.categories = null!,
                state.message = action.error.message!
            })

            .addCase(createAProductCategory.pending, (state) => {
                state.isLoading = true
            })

            .addCase(createAProductCategory.fulfilled, (state, action) => {
                state.isLoading = false,
                state.isError = false,
                state.isSuccess = true,
                state.createdCategory = action.payload!
            })

            .addCase(createAProductCategory.rejected, (state, action) => {
                state.isLoading = false,
                state.isError = true,
                state.isSuccess = false,
                state.createdCategory = null!,
                state.message = action.error.message!
            })
    },
})

export default categorySlice.reducer;
