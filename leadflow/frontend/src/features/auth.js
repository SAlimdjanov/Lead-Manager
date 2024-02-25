/**
 * auth.js
 *
 * User authentication state management
 */

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

import registerAccount from "../../routes/auth/register";
import loginToAccount from "../../routes/auth/login";
import obtainUserInfo from "../../routes/auth/me";
import verifyUser from "../../routes/auth/verify";

/**
 * Asynchronous thunk action creator for registering a new user account. This function sends a
 * registration request to the server with the provided data.
 *
 * @param {Object} requestData - The data containing registration details
 * @returns {Promise<number>} A Promise that resolves with the HTTP response status code
 * @throws {Error} If an error occurs during the registration process or if the request fails
 */
export const register = createAsyncThunk("user/registerAccount", async (requestData) => {
    try {
        const responseStatus = registerAccount(requestData);
        if (responseStatus !== 201) {
            throw new Error(`${responseStatus}: Bad registration request`);
        }
        return responseStatus;
    } catch (error) {
        console.error(error, ": Error during account registration.");
        throw error;
    }
});

/**
 * Asynchronous thunk action creator for retrieving user information. This function sends a request
 * to obtain user information from the server.
 *
 * @returns {Promise<Object>} A Promise that resolves with the user information
 * @throws {Error} If an error occurs during the user data fetch or if the request fails
 */
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

/**
 * Asynchronous thunk action creator for user login. It sends a login request to the server with
 * the provided credentials, sets access and refresh cookies upon successful login, and dispatches
 * an action to retrieve user information.
 *
 * @param {Object} requestData - The data containing login credentials
 * @param {Object} thunkAPI - The Redux thunk API object
 * @returns {Promise<Object>} A Promise that resolves with the login response data
 * @throws {Error} If an error occurs during the login process or if the login request fails
 */
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

/**
 * Asynchronous thunk action creator for checking user authentication. Dispatches an action to
 * validate a user access token.
 *
 * @param {Object} thunkAPI - Redux thunk API object
 * @returns {Promise<void>} A Promise that resolves once the authentication is complete
 * @throws {Error} If an error occurs during verification process
 */

export const checkAuthentication = createAsyncThunk("user/verify", async (_, thunkAPI) => {
    try {
        const response = verifyUser();
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

/**
 * Asynchronous thunk action creator for user logout. Dispatches an action to reset the user state,
 * logging the user out. The back-end API is also updated during this process
 *
 * @param {Object} thunkAPI - Redux thunk API object
 * @returns {Promise<void>} A Promise that resolves once the logout process is completed
 * @throws {Error} If an error occurs during the logout process
 */
export const logout = createAsyncThunk("user/logout", async (_, thunkAPI) => {
    try {
        const { dispatch } = thunkAPI;
        dispatch(userSlice.actions.resetUser());
    } catch (error) {
        console.error(error, ": Error during logout.");
        throw error;
    }
});

/**
 * Initial user account redux state
 */
const initialState = {
    isAuthenticated: false,
    user: null,
    loading: false,
    registered: false,
};

/**
 * Initializes redux state of a user, and contains an object containing reducer functions. This
 * generates action creators and action types that correspond to reduces and state. State
 * variables are modified based on the outcomes of actions.
 */
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
