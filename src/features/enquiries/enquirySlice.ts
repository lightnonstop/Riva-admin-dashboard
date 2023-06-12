import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import enquiryService from "./enquiryService";


export const getAllEnquiries = createAsyncThunk('enquiry/get-enquiries', async (_, thunkAPI) => {
    try {
        return await enquiryService.getEnquiries();
    } catch (e){
        return thunkAPI.rejectWithValue(e);
    }
})

const initialState = {
    enquiries: [],
    isError: false,
    isLoading: false,
    isSuccess: false,
    message: '',
};

export const enquirySlice = createSlice({
    name: 'allEnquiries',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAllEnquiries.pending, (state) => {
                state.isLoading = true
            })

            .addCase(getAllEnquiries.fulfilled, (state, action) => {
                state.isLoading = false,
                state.isError = false,
                state.isSuccess = true,
                state.enquiries = action.payload!
            })

            .addCase(getAllEnquiries.rejected, (state, action) => {
                state.isLoading = false,
                state.isError = true,
                state.isSuccess = false,
                state.enquiries = null!,
                state.message = action.error.message!
            })
    },
})

export default enquirySlice.reducer;
