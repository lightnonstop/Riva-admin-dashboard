import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import categoryService from "./categoryService";

export const getAllCategories = createAsyncThunk('category/get-categories', async (_, thunkAPI) => {
    try {
        return await categoryService.getCategories();
    } catch (e){
        return thunkAPI.rejectWithValue(e);
    }
})

const initialState = {
    categories: [],
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
            .addCase(getAllCategories.pending, (state) => {
                state.isLoading = true
            })

            .addCase(getAllCategories.fulfilled, (state, action) => {
                state.isLoading = false,
                state.isError = false,
                state.isSuccess = true,
                state.categories = action.payload!
            })

            .addCase(getAllCategories.rejected, (state, action) => {
                state.isLoading = false,
                state.isError = true,
                state.isSuccess = false,
                state.categories = null!,
                state.message = action.error.message!
            })
    },
})

export default categorySlice.reducer;
