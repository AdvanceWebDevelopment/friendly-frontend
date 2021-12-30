import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { selectAuthError } from "./auth-slice";

export enum STATUS {
    ACCEPTED = "ACCEPTED",
    FAILED = 417,
    OK = "OK",
}

Object.freeze(STATUS);

export interface ForgotPasswordRequest {
    email: string;
}

export interface OtpRequest {
    email: string;
    otp: string;
}

export interface OtpResponse {
    timeStamp: string;
    status: STATUS;
    message: string;
}

export interface ResetPasswordRequest {
    email: string;
    otp: string;
    password: string;
    confirmPassword: string;
}

export interface ResetPasswordResponse {
    timeStamp: string;
    status: STATUS;
    message: string;
}
export interface ForgotPasswordResponse {
    timeStamp: string;
    status: STATUS;
    message: string;
}

export interface ForgotPasswordState {
    passwordState: ForgotPasswordRequest;
    error: string;
    isPending: boolean;
    otp: string;
}

const initialState: ForgotPasswordState = {
    passwordState: { email: "" },
    error: "",
    isPending: true,
    otp: "",
};

const forgotPasswordSlice = createSlice({
    name: "forgot-pwd",
    initialState,
    reducers: {
        setEmail(state, action: PayloadAction<string>) {
            state.passwordState.email = action.payload;
            state.error = "";
            state.isPending = false;
        },
        setError(state, action: PayloadAction<string>) {
            state.error = action.payload;
            state.isPending = false;
        },

        setIsPending(state, action: PayloadAction<boolean>) {
            state.isPending = action.payload;
        },

        setOtp(state, action: PayloadAction<string>) {
            state.otp = action.payload;
        },
        getOtp(state, action: PayloadAction<ForgotPasswordRequest>) {
            state.isPending = true;
        },
        sendOtp(state, action: PayloadAction<OtpRequest>) {
            state.isPending = true;
        },
        resetPassword(state, action: PayloadAction<ResetPasswordRequest>) {
            state.isPending = true;
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
export const selectIsPending = (state: RootState) => state.forgotPasswordState.isPending;
export const selectOtp = (state: RootState) => state.forgotPasswordState.otp;
