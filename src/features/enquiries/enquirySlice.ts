import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import enquiryService from "./enquiryService";


export const getAllEnquiries = createAsyncThunk('enquiry/get-enquiries', async (_, thunkAPI) => {
    try {
        return await enquiryService.getEnquiries();
    } catch (e){
        return thunkAPI.rejectWithValue(e);
    }
})
export const deleteAnEnquiry = createAsyncThunk('enquiry/delete-enquiry', async (id: string, thunkAPI) => {
    try {
        return await enquiryService.deleteEnquiry(id);
    } catch (e){
        return thunkAPI.rejectWithValue(e);
    }
})
export const getAnEnquiry = createAsyncThunk('enquiry/get-enquiry', async (id: string, thunkAPI) => {
    try {
        return await enquiryService.getEnquiry(id);
    } catch (e){
        return thunkAPI.rejectWithValue(e);
    }
})
export const updateAnEnquiry = createAsyncThunk('enquiry/update-enquiry', async (updateData: { id: string; enquiryValues: { status: string } }, thunkAPI) => {
    try {
        return await enquiryService.updateEnquiry(updateData);
    } catch (e){
        return thunkAPI.rejectWithValue(e);
    }
})

type initialStateProps = {
    enquiries: [],
    isError: boolean,
    isLoading: boolean,
    isSuccess: boolean,
    message: string;
    deletedEnquiry?: {},
    enquiryName?: string,
    enquiryEmail?: string,
    enquiryMobile?: string,
    enquiryComment?: string,
    enquiryStatus?: string,
    updatedEnquiry?: {},
}
const initialState: initialStateProps = {
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
            .addCase(deleteAnEnquiry.pending, (state) => {
                state.isLoading = true
            })

            .addCase(deleteAnEnquiry.fulfilled, (state, action) => {
                state.isLoading = false,
                state.isError = false,
                state.isSuccess = true,
                state.deletedEnquiry = action.payload!
            })

            .addCase(deleteAnEnquiry.rejected, (state, action) => {
                state.isLoading = false,
                state.isError = true,
                state.isSuccess = false,
                state.deletedEnquiry = null!,
                state.message = action.error.message!
            })
            .addCase(getAnEnquiry.pending, (state) => {
                state.isLoading = true
            })

            .addCase(getAnEnquiry.fulfilled, (state, action) => {
                state.isLoading = false,
                state.isError = false,
                state.isSuccess = true,
                state.enquiryName = action.payload.name!
                state.enquiryEmail = action.payload.email!
                state.enquiryMobile = action.payload.mobile!
                state.enquiryComment = action.payload.comment!
                state.enquiryStatus = action.payload.status!
            })

            .addCase(getAnEnquiry.rejected, (state, action) => {
                state.isLoading = false,
                state.isError = true,
                state.isSuccess = false,
                state.enquiryName = null!
                state.enquiryEmail = null!
                state.enquiryMobile = null!
                state.enquiryComment = null!
                state.enquiryStatus = null!
                state.message = action.error.message!
            })
            .addCase(updateAnEnquiry.pending, (state) => {
                state.isLoading = true
            })

            .addCase(updateAnEnquiry.fulfilled, (state, action) => {
                state.isLoading = false,
                state.isError = false,
                state.isSuccess = true,
                state.updatedEnquiry = action.payload!
            })

            .addCase(updateAnEnquiry.rejected, (state, action) => {
                state.isLoading = false,
                state.isError = true,
                state.isSuccess = false,
                state.updatedEnquiry = null!
                state.message = action.error.message!
            })
    },
})

export default enquirySlice.reducer;
