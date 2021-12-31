import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
export interface LoginRequest {
    email: string;
    password: string;
}

export interface LoginResponse {
    accessToken: string;
    tokenType: string;
    refreshToken: string;
}

export interface AuthState {
    authenticate: LoginResponse;
    error: string;
    isAuthenticated: boolean;
}

const initialState: AuthState = {
    authenticate: {
        accessToken: "",
        tokenType: "",
        refreshToken: "",
    },
    error: "",
    isAuthenticated: false,
};

const authenticateSlice = createSlice({
    name: "authenticate",
    initialState,
    reducers: {
        login(state, action: PayloadAction<LoginRequest>) {},
        setData(state, action: PayloadAction<LoginResponse>) {
            console.log(action.payload);
            state.authenticate = action.payload;
            state.isAuthenticated = true;
        },
        loginFailure(state, action: PayloadAction<string>) {
            state.error = action.payload;
        },
    },
});

// Actions
export const authActions = authenticateSlice.actions;

// Selectors
export const selectIsAuthenticated = (state: RootState) => state.authState.isAuthenticated;
export const selectAuthError = (state: RootState) => state.authState.error;

// Reducer
export const authReducers = authenticateSlice.reducer;
