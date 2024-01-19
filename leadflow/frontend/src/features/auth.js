/**
 * auth.js
 *
 * User authentication state initialization
 */

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import registerAccount from "../../routes/auth/register";

export const register = createAsyncThunk("users/registerAccount", async (requestData, thunkAPI) => {
    try {
        /** @TODO Troubleshoot bad request response handling */
        const response = await registerAccount(requestData);
        return response;
    } catch (error) {
        console.error("Error during account registration:", error);
        throw error;
    }
});

const initialState = {
    isAuthenticated: false,
    user: null,
    loading: false,
    registered: false,
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        resetRegistered: (state) => {
            state.registered = false;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(register.pending, (state) => {
                state.loading = true;
            })
            .addCase(register.fulfilled, (state) => {
                state.loading = false;
                state.registered = true;
            })
            .addCase(register.rejected, (state) => {
                state.loading = false;
            });
    },
});

export const { resetRegistered } = userSlice.actions;
export default userSlice.reducer;
