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
export const getABlogCategory = createAsyncThunk('category/get-category', async (id: string, thunkAPI) => {
    try {
        return await blogCategoryService.getblogCategory(id);
    } catch (e){
        return thunkAPI.rejectWithValue(e);
    }
})

export const updateABlogCategory = createAsyncThunk('category/update-category', async (updateData: { id: string; blogCategoryValues: { title: string } }, thunkAPI) => {
    try {
        return await blogCategoryService.updateblogCategory(updateData);
    } catch (e){
        return thunkAPI.rejectWithValue(e);
    }
})

export const deleteABlogCategory = createAsyncThunk('category/delete-category', async (id: string, thunkAPI) => {
    try {
        return await blogCategoryService.deleteblogCategory(id);
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
    blogCategoryName?: string,
    updatedBlogCategory?: string,
    deletedBlogCategory?: [],
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
            .addCase(getABlogCategory.pending, (state) => {
                state.isLoading = true
            })

            .addCase(getABlogCategory.fulfilled, (state, action) => {
                state.isLoading = false,
                state.isError = false,
                state.isSuccess = true,
                state.blogCategoryName = action.payload.title!
            })

            .addCase(getABlogCategory.rejected, (state, action) => {
                state.isLoading = false,
                state.isError = true,
                state.isSuccess = false,
                state.blogCategoryName = null!,
                state.message = action.error.message!
            })

            .addCase(updateABlogCategory.pending, (state) => {
                state.isLoading = true
            })

            .addCase(updateABlogCategory.fulfilled, (state, action) => {
                state.isLoading = false,
                state.isError = false,
                state.isSuccess = true,
                state.updatedBlogCategory = action.payload!
            })

            .addCase(updateABlogCategory.rejected, (state, action) => {
                state.isLoading = false,
                state.isError = true,
                state.isSuccess = false,
                state.updatedBlogCategory = null!,
                state.message = action.error.message!
            })

            .addCase(deleteABlogCategory.pending, (state) => {
                state.isLoading = true
            })

            .addCase(deleteABlogCategory.fulfilled, (state, action) => {
                state.isLoading = false,
                state.isError = false,
                state.isSuccess = true,
                state.deletedBlogCategory = action.payload!
            })

            .addCase(deleteABlogCategory.rejected, (state, action) => {
                state.isLoading = false,
                state.isError = true,
                state.isSuccess = false,
                state.deletedBlogCategory = null!,
                state.message = action.error.message!
            })
            .addCase(resetBlogCategoryState, () => initialState)
    },
})

export default blogCategorySlice.reducer;
