import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import blogService from "./blogService";


export const getAllBlogs = createAsyncThunk('blog/get-blogs', async (_, thunkAPI) => {
    try {
        return await blogService.getBlogs();
    } catch (e){
        return thunkAPI.rejectWithValue(e);
    }
})

export const createABlog = createAsyncThunk('blog/create-blogs', async (blogData: {}, thunkAPI) => {
    try {
        return await blogService.createBlogs(blogData);
    } catch (e){
        return thunkAPI.rejectWithValue(e);
    }
})
export const resetBlogState = createAction('Reset_all');
type initialStateProps = {
    blogs: [],
    isError: boolean,
    isLoading: boolean,
    isSuccess: boolean,
    message: string;
    createdBlog?: {}[];
}
const initialState: initialStateProps = {
    blogs: [],
    isError: false,
    isLoading: false,
    isSuccess: false,
    message: '',
};

export const blogSlice = createSlice({
    name: 'allBlogs',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAllBlogs.pending, (state) => {
                state.isLoading = true
            })

            .addCase(getAllBlogs.fulfilled, (state, action) => {
                state.isLoading = false,
                state.isError = false,
                state.isSuccess = true,
                state.blogs = action.payload!
            })

            .addCase(getAllBlogs.rejected, (state, action) => {
                state.isLoading = false,
                state.isError = true,
                state.isSuccess = false,
                state.blogs = null!,
                state.message = action.error.message!
            })

            .addCase(createABlog.pending, (state) => {
                state.isLoading = true
            })

            .addCase(createABlog.fulfilled, (state, action) => {
                state.isLoading = false,
                state.isError = false,
                state.isSuccess = true,
                state.createdBlog = action.payload!
            })

            .addCase(createABlog.rejected, (state, action) => {
                state.isLoading = false,
                state.isError = true,
                state.isSuccess = false,
                state.createdBlog = null!,
                state.message = action.error.message!
            })
            .addCase(resetBlogState, () => initialState)
    },
})

export default blogSlice.reducer;
