/**
 * auth.js
 *
 * User authentication state initialization
 */

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

import registerAccount from "../../routes/auth/register";
import loginToAccount from "../../routes/auth/login";
import obtainUserInfo from "../../routes/auth/me";
import verifyUser from "../../routes/auth/verify";

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

const getUserInfo = createAsyncThunk("user/getUserInfo", async () => {
    try {
        const userInfo = await obtainUserInfo();
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
            // Expires 1 / 48 days = 30 min
            Cookies.set("access", credentials.data.access, { path: "/", expires: 1 / 48 });
            // Expires in 1 day
            Cookies.set("refresh", credentials.data.refresh, { path: "/", expires: 1 });
            dispatch(getUserInfo());
        } else {
            throw new Error(`${credentials.response.status}: Bad login request`);
        }
        return credentials.data;
    } catch (error) {
        console.error(error, ": Error during account login.");
        throw error;
    }
});

export const checkAuthentication = createAsyncThunk("user/verify", async (_, thunkAPI) => {
    try {
        const response = await verifyUser();
        if (response === 200) {
            const { dispatch } = thunkAPI;
            dispatch(getUserInfo());
        } else {
            return thunkAPI.rejectWithValue({ status: response });
        }
        return response;
    } catch (error) {
        console.error(error, ": Error during verification.");
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
            })
            .addCase(checkAuthentication.pending, (state) => {
                state.loading = true;
            })
            .addCase(checkAuthentication.fulfilled, (state) => {
                state.loading = false;
                state.isAuthenticated = true;
            })
            .addCase(checkAuthentication.rejected, (state) => {
                state.loading = false;
                state.isAuthenticated = false;
            })
            .addCase(logout.pending, (state) => {
                state.loading = true;
            })
            .addCase(logout.fulfilled, (state) => {
                state.loading = false;
                state.isAuthenticated = false;
                state.user = null;
            })
            .addCase(logout.rejected, (state) => {
                state.loading = false;
            });
    },
});

export const { resetRegistered } = userSlice.actions;
export default userSlice.reducer;
