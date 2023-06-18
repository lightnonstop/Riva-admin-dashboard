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
export const getABlog = createAsyncThunk('blog/get-blog', async (id: {}, thunkAPI) => {
    try {
        return await blogService.getBlog(id);
    } catch (e){
        return thunkAPI.rejectWithValue(e);
    }
})

export const updateABlog = createAsyncThunk('blog/update-blog', async (updateData: { id: string; blogValues:  { title: string; description: string; category: string; images: never[]; } }, thunkAPI) => {
    try {
        return await blogService.updateBlog(updateData);
    } catch (e){
        return thunkAPI.rejectWithValue(e);
    }
})

export const deleteABlog = createAsyncThunk('blog/delete-blog', async (id: string, thunkAPI) => {
    try {
        return await blogService.deleteBlog(id);
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
    blogTitle?: string,
    blogDescription?: string;
    blogCategory?: string;
    blogImages?: [];
    updatedBlog?: string,
    deletedBlog?: [],
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
            .addCase(getABlog.pending, (state) => {
                state.isLoading = true
            })

            .addCase(getABlog.fulfilled, (state, action) => {
                state.isLoading = false,
                state.isError = false,
                state.isSuccess = true,
                state.blogTitle = action.payload.title!
                state.blogCategory = action.payload.category!
                state.blogDescription = action.payload.description!
                state.blogImages = action.payload.images[0]!
            })

            .addCase(getABlog.rejected, (state, action) => {
                state.isLoading = false,
                state.isError = true,
                state.isSuccess = false,
                state.blogTitle = null!,
                state.blogCategory = null!,
                state.blogImages = null!,
                state.blogDescription = null!,
                state.message = action.error.message!
            })

            .addCase(updateABlog.pending, (state) => {
                state.isLoading = true
            })

            .addCase(updateABlog.fulfilled, (state, action) => {
                state.isLoading = false,
                state.isError = false,
                state.isSuccess = true,
                state.updatedBlog = action.payload!
            })

            .addCase(updateABlog.rejected, (state, action) => {
                state.isLoading = false,
                state.isError = true,
                state.isSuccess = false,
                state.updatedBlog = null!,
                state.message = action.error.message!
            })

            .addCase(deleteABlog.pending, (state) => {
                state.isLoading = true
            })

            .addCase(deleteABlog.fulfilled, (state, action) => {
                state.isLoading = false,
                state.isError = false,
                state.isSuccess = true,
                state.deletedBlog = action.payload!
            })

            .addCase(deleteABlog.rejected, (state, action) => {
                state.isLoading = false,
                state.isError = true,
                state.isSuccess = false,
                state.deletedBlog = null!,
                state.message = action.error.message!
            })
            .addCase(resetBlogState, () => initialState)
    },
})

export default blogSlice.reducer;
