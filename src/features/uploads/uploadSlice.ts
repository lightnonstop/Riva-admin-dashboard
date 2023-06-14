import { createSlice, createAsyncThunk, isPending } from "@reduxjs/toolkit";
import uploadService from "./uploadService";

type T = File;
export const getUploadingImages = createAsyncThunk('upload/images', async (data: T[], thunkAPI) => {
    try {
        const formData = new FormData();
        for (let i = 0; i < data.length; i++){
            formData.append('images', data[i]);
        }
        return await uploadService.uploadImages(formData);
    } catch (e){
        return thunkAPI.rejectWithValue(e);
    }
})

export const getDeletingImages = createAsyncThunk('delete/images', async (id: string, thunkAPI) => {
    try {
        return await uploadService.deleteImages(id);
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

            .addCase(getDeletingImages.pending, (state) => {
                state.isLoading = true
            })

            .addCase(getDeletingImages.fulfilled, (state, action) => {
                state.isLoading = false,
                state.isError = false,
                state.isSuccess = true,
                state.images = [];
            })

            .addCase(getDeletingImages.rejected, (state, action) => {
                state.isLoading = false,
                state.isError = true,
                state.isSuccess = false,
                state.images = null!,
                state.message = action.error.message!
            })
    },
})

export default uploadSlice.reducer;
