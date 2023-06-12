import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import customerService from "./customerService";


export const getAllUsers = createAsyncThunk('/get-customers', async (_, thunkAPI) => {
    try {
        return await customerService.getAllUsers();
    } catch (e){
        return thunkAPI.rejectWithValue(e);
    }
})

const initialState = {
    customers: [],
    isError: false,
    isLoading: false,
    isSuccess: false,
    message: '',
};

export const customerSlice = createSlice({
    name: 'allUsers',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAllUsers.pending, (state) => {
                state.isLoading = true
            })

            .addCase(getAllUsers.fulfilled, (state, action) => {
                state.isLoading = false,
                state.isError = false,
                state.isSuccess = true,
                state.customers = action.payload!
            })

            .addCase(getAllUsers.rejected, (state, action) => {
                state.isLoading = false,
                state.isError = true,
                state.isSuccess = false,
                state.customers = null!,
                state.message = action.error.message!
            })
    },
})

export default customerSlice.reducer;
