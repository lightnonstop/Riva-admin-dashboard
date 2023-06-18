import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import colorService from "./colorService";


export const getAllColors = createAsyncThunk('color/get-colors', async (_, thunkAPI) => {
    try {
        return await colorService.getColors();
    } catch (e){
        return thunkAPI.rejectWithValue(e);
    }
})

export const createAColor = createAsyncThunk('color/create-colors', async (colorData: {}, thunkAPI) => {
    try {
        return await colorService.createColors(colorData);
    } catch (e){
        return thunkAPI.rejectWithValue(e);
    }
})

export const getAColor = createAsyncThunk('color/get-color', async (id: {}, thunkAPI) => {
    try {
        return await colorService.getColor(id);
    } catch (e){
        return thunkAPI.rejectWithValue(e);
    }
})

export const updateAColor = createAsyncThunk('color/update-color', async (updateData: { id: string; colorValues: { title: string } }, thunkAPI) => {
    try {
        return await colorService.updateColor(updateData);
    } catch (e){
        return thunkAPI.rejectWithValue(e);
    }
})

export const deleteAColor = createAsyncThunk('color/delete-color', async (id: string, thunkAPI) => {
    try {
        return await colorService.deleteColor(id);
    } catch (e){
        return thunkAPI.rejectWithValue(e);
    }
})

export const resetColorState = createAction('Reset_all');

type initialStateProps = {
    colors: [],
    isError: boolean,
    isLoading: boolean,
    isSuccess: boolean,
    message: string;
    createdColor?: [];
    colorName?: string,
    updatedColor?: string,
    deletedColor?: [],
}
const initialState: initialStateProps = {
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
                state.createdColor = null!,
                state.message = action.error.message!
            })

            .addCase(createAColor.pending, (state) => {
                state.isLoading = true
            })

            .addCase(createAColor.fulfilled, (state, action) => {
                state.isLoading = false,
                state.isError = false,
                state.isSuccess = true,
                state.createdColor = action.payload!
            })

            .addCase(createAColor.rejected, (state, action) => {
                state.isLoading = false,
                state.isError = true,
                state.isSuccess = false,
                state.createdColor = null!,
                state.message = action.error.message!
            })

            .addCase(getAColor.pending, (state) => {
                state.isLoading = true
            })

            .addCase(getAColor.fulfilled, (state, action) => {
                state.isLoading = false,
                state.isError = false,
                state.isSuccess = true,
                state.colorName = action.payload.title!
            })

            .addCase(getAColor.rejected, (state, action) => {
                state.isLoading = false,
                state.isError = true,
                state.isSuccess = false,
                state.colorName = null!,
                state.message = action.error.message!
            })

            .addCase(updateAColor.pending, (state) => {
                state.isLoading = true
            })

            .addCase(updateAColor.fulfilled, (state, action) => {
                state.isLoading = false,
                state.isError = false,
                state.isSuccess = true,
                state.updatedColor = action.payload!
            })

            .addCase(updateAColor.rejected, (state, action) => {
                state.isLoading = false,
                state.isError = true,
                state.isSuccess = false,
                state.updatedColor = null!,
                state.message = action.error.message!
            })

            .addCase(deleteAColor.pending, (state) => {
                state.isLoading = true
            })

            .addCase(deleteAColor.fulfilled, (state, action) => {
                state.isLoading = false,
                state.isError = false,
                state.isSuccess = true,
                state.deletedColor = action.payload!
            })

            .addCase(deleteAColor.rejected, (state, action) => {
                state.isLoading = false,
                state.isError = true,
                state.isSuccess = false,
                state.deletedColor = null!,
                state.message = action.error.message!
            })
            .addCase(resetColorState, () => initialState)
    },
})

export default colorSlice.reducer;
