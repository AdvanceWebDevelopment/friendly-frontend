import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getOutputFileNames } from "typescript";
import { RootState } from "../store";
import { selectAuthError } from "./auth-slice";

export enum STATUS {
    ACCEPTED = "ACCEPTED",
    FAILED = "407",
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
    email: string;
    newPassword: string;
    error: string;
    isEmailPending: boolean;
    isOtpPending: boolean;
    isNewPasswordPending: boolean;
    otp: string;
}

const initialState: ForgotPasswordState = {
    email: "",
    newPassword: "",
    error: "",
    isEmailPending: true,
    isOtpPending: true,
    isNewPasswordPending: true,
    otp: "",
};

const forgotPasswordSlice = createSlice({
    name: "forgot-pwd",
    initialState,
    reducers: {
        getOtp(state, action: PayloadAction<ForgotPasswordRequest>) {
            state.isEmailPending = true;
        },
        getOtpSuccess(state, action: PayloadAction<string>) {
            state.email = action.payload;
            state.isEmailPending = false;
        },
        sendOtp(state, action: PayloadAction<OtpRequest>) {
            state.isOtpPending = true;
        },
        sendOtpSuccess(state, action: PayloadAction<string>) {
            state.otp = action.payload;
            state.isOtpPending = false;
        },
        sendNewPassword(state, action: PayloadAction<ResetPasswordRequest>) {
            state.isNewPasswordPending = true;
        },
        sendNewPasswordSuccess(state, action: PayloadAction<string>) {
            state.isNewPasswordPending = false;
            state.newPassword = action.payload;
        },
        failure(state, action: PayloadAction<string>) {
            state.error = action.payload;
        },
    },
});

// Reducers
export const forgotPasswordReducer = forgotPasswordSlice.reducer;

// Actions
export const forgotPasswordActions = forgotPasswordSlice.actions;

// Selectors
export const selectForgotPasswordEmail = (state: RootState) => state.forgotPasswordState.email;
export const selectForgotPasswordError = (state: RootState) => state.forgotPasswordState.error;
export const selectForgotPasswordNew = (state: RootState) => state.forgotPasswordState.newPassword;
export const selectForgotPasswordOtp = (state: RootState) => state.forgotPasswordState.otp;
export const selectEmailPending = (state: RootState) => state.forgotPasswordState.isEmailPending;
export const selectOtpPending = (state: RootState) => state.forgotPasswordState.isOtpPending;
export const selectNewPasswordPending = (state: RootState) => state.forgotPasswordState.isNewPasswordPending;
