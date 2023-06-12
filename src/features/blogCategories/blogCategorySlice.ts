import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import blogCategoryService from "./blogCategoryService";


export const getAllBlogCategories = createAsyncThunk('blogCategoy/get-blogCategories', async (_, thunkAPI) => {
    try {
        return await blogCategoryService.getBlogCategories();
    } catch (e){
        return thunkAPI.rejectWithValue(e);
    }
})

const initialState = {
    blogCategories: [],
    isError: false,
    isLoading: false,
    isSuccess: false,
    message: '',
};

export const blogCategorySlice = createSlice({
    name: 'allBlogCategories',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAllBlogCategories.pending, (state) => {
                state.isLoading = true
            })

            .addCase(getAllBlogCategories.fulfilled, (state, action) => {
                state.isLoading = false,
                state.isError = false,
                state.isSuccess = true,
                state.blogCategories = action.payload!
            })

            .addCase(getAllBlogCategories.rejected, (state, action) => {
                state.isLoading = false,
                state.isError = true,
                state.isSuccess = false,
                state.blogCategories = null!,
                state.message = action.error.message!
            })
    },
})

export default blogCategorySlice.reducer;
