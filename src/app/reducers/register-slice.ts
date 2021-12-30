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
    isPending: boolean;
    error: string;
}

const initialState: RegisterState = {
    email: "",
    otp: "",
    isPending: false,
    error: "",
};

const registerSlice = createSlice({
    name: "register-slice",
    initialState,
    reducers: {
        sendInfo(state, action: PayloadAction<RegisterRequest>) {
            state.isPending = true;
        },

        sendInfoSuccess(state, action: PayloadAction<string>) {
            state.email = action.payload;
            state.isPending = false;
            state.error = "";
        },

        sendFailure(state, action: PayloadAction<string>) {
            state.error = action.payload;
            state.isPending = false;
        },

        sendOtp(state, action: PayloadAction<ActivateRequest>) {
            state.isPending = true;
        },

        sendOtpSuccess(state, action: PayloadAction<string>) {
            state.otp = action.payload;
            state.isPending = true;
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
export const selectRegisterOtp = (state: RootState) => state.registerState.otp;
export const selectRegisterPending = (state: RootState) => state.registerState.isPending;
export const selectRegisterError = (state: RootState) => state.registerState.error;
