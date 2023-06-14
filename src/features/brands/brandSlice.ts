import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import brandService from "./brandService";


export const getAllBrands = createAsyncThunk('brand/get-brands', async (_, thunkAPI) => {
    try {
        return await brandService.getBrands();
    } catch (e){
        return thunkAPI.rejectWithValue(e);
    }
})

export const createABrand = createAsyncThunk('brand/create-brands', async (brandData: {}, thunkAPI) => {
    try {
        return await brandService.createBrands(brandData);
    } catch (e){
        return thunkAPI.rejectWithValue(e);
    }
})
export const resetBrandState = createAction('Reset_all');

type initialStateProps = {
    brands: [],
    isError: boolean,
    isLoading: boolean,
    isSuccess: boolean,
    message: string;
    createdBrand?: [];
}
const initialState: initialStateProps = {
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

            .addCase(createABrand.pending, (state) => {
                state.isLoading = true
            })

            .addCase(createABrand.fulfilled, (state, action) => {
                state.isLoading = false,
                state.isError = false,
                state.isSuccess = true,
                state.createdBrand = action.payload!
            })

            .addCase(createABrand.rejected, (state, action) => {
                state.isLoading = false,
                state.isError = true,
                state.isSuccess = false,
                state.createdBrand = null!,
                state.message = action.error.message!
            })
            .addCase(resetBrandState, () => initialState)
    },
})

export default brandSlice.reducer;
