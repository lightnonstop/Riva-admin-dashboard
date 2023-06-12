import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import blogService from "./blogService";


export const getAllBlogs = createAsyncThunk('blog/get-blogs', async (_, thunkAPI) => {
    try {
        return await blogService.getBlogs();
    } catch (e){
        return thunkAPI.rejectWithValue(e);
    }
})

const initialState = {
    blogs: [],
    isError: false,
    isLoading: false,
    isSuccess: false,
    message: '',
};

export const blogSlice = createSlice({
    name: 'AllBlogs',
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
    },
})

export default blogSlice.reducer;
