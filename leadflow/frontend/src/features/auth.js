/**
 * auth.js
 *
 * User authentication state initialization
 */

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import registerAccount from "../../routes/auth/register";
import loginToAccount from "../../routes/auth/login";
import obtainUserInfo from "../../routes/auth/me";

export const register = createAsyncThunk("user/registerAccount", async (requestData) => {
    try {
        const responseStatus = await registerAccount(requestData);
        if (responseStatus !== 201) {
            throw new Error(`${responseStatus}: Bad registration request`);
        }
        return responseStatus;
    } catch (error) {
        console.error(error, ": Error during account registration.");
        throw error;
    }
});

const getUserInfo = createAsyncThunk("user/getUserInfo", async (accessToken, thunkAPI) => {
    try {
        const userInfo = await obtainUserInfo(accessToken);
        if (userInfo.response.status !== 200) {
            throw new Error(`${userInfo.response.status}: Bad user data request`);
        }
        return userInfo.data;
    } catch (error) {
        console.error(error, ": Error during user data fetch.");
        throw error;
    }
});

export const login = createAsyncThunk("user/loginToAccount", async (requestData, thunkAPI) => {
    try {
        const credentials = await loginToAccount(requestData);
        if (credentials.response.status === 200) {
            const { dispatch } = thunkAPI;
            dispatch(getUserInfo(credentials.data.access));
        } else {
            throw new Error(`${credentials.response.status}: Bad login request`);
        }
        return credentials.data;
    } catch (error) {
        console.error(error, ": Error during account login.");
        throw error;
    }
});

export const logout = createAsyncThunk("user/logout", async (_, thunkAPI) => {
    try {
        const { dispatch } = thunkAPI;
        dispatch(userSlice.actions.resetUser());
    } catch (error) {
        console.error(error, ": Error during logout.");
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
        resetUser: (state) => {
            state.isAuthenticated = false;
            state.user = null;
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
            })
            .addCase(login.pending, (state) => {
                state.loading = true;
            })
            .addCase(login.fulfilled, (state) => {
                state.loading = false;
                state.isAuthenticated = true;
            })
            .addCase(login.rejected, (state) => {
                state.loading = false;
            })
            .addCase(getUserInfo.pending, (state) => {
                state.loading = true;
            })
            .addCase(getUserInfo.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
            })
            .addCase(getUserInfo.rejected, (state) => {
                state.loading = false;
            });
    },
});

export const { resetRegistered } = userSlice.actions;
export default userSlice.reducer;
