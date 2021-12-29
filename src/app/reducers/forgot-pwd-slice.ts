import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { selectAuthError } from "./auth-slice";

export enum STATUS {
    SUCCESS = "ACCEPTED",
    FAILED = 417,
}

Object.freeze(STATUS);

export interface ForgotPasswordRequest {
    email: string;
}

export interface ForgotPasswordResponse {
    timeStamp: string;
    status: STATUS;
    message: string;
}

export interface ForgotPasswordState {
    passwordState: ForgotPasswordRequest;
    error: string;
    isError: boolean;
}

const initialState: ForgotPasswordState = {
    passwordState: { email: "" },
    error: "",
    isError: true,
};

const forgotPasswordSlice = createSlice({
    name: "forgot-pwd",
    initialState,
    reducers: {
        getOtp(state, action: PayloadAction<ForgotPasswordRequest>) {},
        setEmail(state, action: PayloadAction<string>) {
            state.passwordState.email = action.payload;
            state.isError = false;
            state.error = "";
            console.log("Saga ends");
        },
        setError(state, action: PayloadAction<string>) {
            state.error = action.payload;
            state.isError = true;
            console.log("Saga ends");
        },
    },
});

// Reducers
export const forgotPasswordReducers = forgotPasswordSlice.reducer;

// Actions
export const forgotPasswordActions = forgotPasswordSlice.actions;

// Selectors
export const selectEmail = (state: RootState) => state.forgotPasswordState.passwordState.email;
export const selectError = (state: RootState) => state.forgotPasswordState.error;
export const selectIsError = (state: RootState) => state.forgotPasswordState.isError;
