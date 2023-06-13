import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import uploadService from "./uploadService";


export const getUploadingImages = createAsyncThunk('upload/images', async (data, thunkAPI) => {
    try {
        return await uploadService.uploadImages(data);
    } catch (e){
        return thunkAPI.rejectWithValue(e);
    }
})

const initialState = {
    images: [],
    isError: false,
    isLoading: false,
    isSuccess: false,
    message: '',
};

export const uploadSlice = createSlice({
    name: 'allimages',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getUploadingImages.pending, (state) => {
                state.isLoading = true
            })

            .addCase(getUploadingImages.fulfilled, (state, action) => {
                state.isLoading = false,
                state.isError = false,
                state.isSuccess = true,
                state.images = action.payload!
            })

            .addCase(getUploadingImages.rejected, (state, action) => {
                state.isLoading = false,
                state.isError = true,
                state.isSuccess = false,
                state.images = null!,
                state.message = action.error.message!
            })
    },
})

export default uploadSlice.reducer;
