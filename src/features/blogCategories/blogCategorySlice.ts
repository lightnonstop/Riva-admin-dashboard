import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import blogCategoryService from "./blogCategoryService";

export const getAllBlogCategories = createAsyncThunk('category/get-blog-categories', async (_, thunkAPI) => {
    try {
        return await blogCategoryService.getAllBlogCategories();
    } catch (e){
        return thunkAPI.rejectWithValue(e);
    }
})

export const createABlogCategory = createAsyncThunk('category/create-product-categories', async (category: {}, thunkAPI) => {
    try {
        return await blogCategoryService.createABlogCategory(category);
    } catch (e){
        return thunkAPI.rejectWithValue(e);
    }
})
export const resetBlogCategoryState = createAction('Reset_all');

type initialStateProps = {
    blogCategories: [],
    isError: boolean,
    isLoading: boolean,
    isSuccess: boolean,
    message: string;
    createdBlogCategory?: string;
}
const initialState: initialStateProps = {
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
            .addCase(createABlogCategory.pending, (state) => {
                state.isLoading = true
            })

            .addCase(createABlogCategory.fulfilled, (state, action) => {
                state.isLoading = false,
                state.isError = false,
                state.isSuccess = true,
                state.createdBlogCategory = action.payload!
            })

            .addCase(createABlogCategory.rejected, (state, action) => {
                state.isLoading = false,
                state.isError = true,
                state.isSuccess = false,
                state.createdBlogCategory = null!,
                state.message = action.error.message!
            })

            .addCase(resetBlogCategoryState, () => initialState)
    },
})

export default blogCategorySlice.reducer;
