import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import colorService from "./colorService";


export const getAllColors = createAsyncThunk('color/get-colors', async (_, thunkAPI) => {
    try {
        return await colorService.getColors();
    } catch (e){
        return thunkAPI.rejectWithValue(e);
    }
})

const initialState = {
    colors: [],
    isError: false,
    isLoading: false,
    isSuccess: false,
    message: '',
};

export const colorSlice = createSlice({
    name: 'allcolors',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAllColors.pending, (state) => {
                state.isLoading = true
            })

            .addCase(getAllColors.fulfilled, (state, action) => {
                state.isLoading = false,
                state.isError = false,
                state.isSuccess = true,
                state.colors = action.payload!
            })

            .addCase(getAllColors.rejected, (state, action) => {
                state.isLoading = false,
                state.isError = true,
                state.isSuccess = false,
                state.colors = null!,
                state.message = action.error.message!
            })
    },
})

export default colorSlice.reducer;
