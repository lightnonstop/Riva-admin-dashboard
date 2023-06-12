import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "./authService";

const getUser = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')!) : null;
const userDefaultState = {
    _id: getUser,
    firstname: null,
    lastname: null,
    email: null,
    mobile: null,
    token: null,
};

const initialState = {
    user: userDefaultState,
    orders: [],
    isError: false,
    isLoading: false,
    isSuccess: false,
    message: '',
};

export const login = createAsyncThunk('auth/admin-login', async (user: {}, thunkAPI) => {
    try {
        return await authService.login(user);
    } catch (e){
        return thunkAPI.rejectWithValue(e);
    }
})

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.isLoading = true
            })

            .addCase(login.fulfilled, (state, action) => {
                state.isError = false,
                state.isLoading = false,
                state.isSuccess = true,
                state.user = action.payload!
            })

            .addCase(login.rejected, (state, action) => {
                state.isLoading = false,
                state.isError = true,
                state.isSuccess = false,
                state.user = null!,
                state.message = action.error.message!
            })
    },
})

export default authSlice.reducer;
