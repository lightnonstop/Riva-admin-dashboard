import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import brandService from "./brandService";


export const getAllBrands = createAsyncThunk('brand/get-brands', async (_, thunkAPI) => {
    try {
        return await brandService.getBrands();
    } catch (e){
        return thunkAPI.rejectWithValue(e);
    }
})

const initialState = {
    brands: [],
    isError: false,
    isLoading: false,
    isSuccess: false,
    message: '',
};

export const brandSlice = createSlice({
    name: 'allBrands',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAllBrands.pending, (state) => {
                state.isLoading = true
            })

            .addCase(getAllBrands.fulfilled, (state, action) => {
                state.isLoading = false,
                state.isError = false,
                state.isSuccess = true,
                state.brands = action.payload!
            })

            .addCase(getAllBrands.rejected, (state, action) => {
                state.isLoading = false,
                state.isError = true,
                state.isSuccess = false,
                state.brands = null!,
                state.message = action.error.message!
            })
    },
})

export default brandSlice.reducer;
