import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

export enum REGISTER_STATUS {
    CREATED = "CREATED",
    FAILED = "409",
}

export enum ACTIVATE_STATUS {
    OK = "OK",
    FAILED = "417",
}

export interface RegisterRequest {
    name: string;
    email: string;
    password: string;
    captchaToken: string;
}

export interface RegisterResponse {
    timestamp: string;
    status: REGISTER_STATUS;
    message: string;
}

export interface ActivateRequest {
    email: string;
    otp: string;
}

export interface ActivateResponse {
    timestamp: string;
    status: ACTIVATE_STATUS;
    message: string;
}

export interface RegisterState {
    email: string;
    otp: string;
    password: string;
    name: string;
    isRegisterPending: boolean;
    isActivatePending: boolean;
    error: string;
}

export interface LoginState {
    email: string;
    password: string;
    name: string;
}

const initialState: RegisterState = {
    email: "",
    otp: "",
    password: "",
    name: "",
    isRegisterPending: true,
    isActivatePending: true,
    error: "",
};

const registerSlice = createSlice({
    name: "register-slice",
    initialState,
    reducers: {
        sendInfo(state, action: PayloadAction<RegisterRequest>) {
            state.isRegisterPending = true;
        },

        sendInfoSuccess(state, action: PayloadAction<LoginState>) {
            state.email = action.payload.email;
            state.password = action.payload.password;
            state.name = action.payload.name;
            state.isRegisterPending = false;
            state.error = "";
        },

        sendFailure(state, action: PayloadAction<string>) {
            state.error = action.payload;
            state.isRegisterPending = false;
        },

        sendOtp(state, action: PayloadAction<ActivateRequest>) {
            state.isActivatePending = true;
        },

        sendOtpSuccess(state, action: PayloadAction<string>) {
            state.otp = action.payload;
            state.isActivatePending = false;
            state.error = "";
        },
    },
});

// Reducer
export const registerReducer = registerSlice.reducer;

// Actions
export const registerActions = registerSlice.actions;

// Selector
export const selectRegisterEmail = (state: RootState) => state.registerState.email;
export const selectRegisterPassword = (state: RootState) => state.registerState.password;
export const selectRegisterName = (state: RootState) => state.registerState.name;
export const selectRegisterOtp = (state: RootState) => state.registerState.otp;
export const selectRegisterPending = (state: RootState) => state.registerState.isRegisterPending;
export const selectActivatePending = (state: RootState) => state.registerState.isActivatePending;
export const selectRegisterError = (state: RootState) => state.registerState.error;
