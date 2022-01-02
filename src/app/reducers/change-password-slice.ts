import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { stat } from "fs";
import { RootState } from "../store";

export enum CHANGE_STATUS {
    OK = "OK",
    FAILED = "407",
}

Object.freeze(CHANGE_STATUS);

export interface ChangePasswordRequest {
    password: string;
    newPassword: string;
    confirmPassword: string;
}

export interface ChangePasswordResponse {
    timeStamp: string;
    status: CHANGE_STATUS;
    message: string;
}

export interface ChangePasswordState {
    isChangePending: boolean;
    ChangeError: string;
}

const initialState: ChangePasswordState = {
    isChangePending: true,
    ChangeError: "",
};

const changePasswordSlice = createSlice({
    name: "change-password",
    initialState,
    reducers: {
        changePassword(state, action: PayloadAction<ChangePasswordRequest>) {
            state.isChangePending = true;
        },
        changePasswordSuccess(state) {
            state.isChangePending = false;
        },
        changePasswordFailure(state, action: PayloadAction<string>) {
            state.isChangePending = false;
            state.ChangeError = action.payload;
        },
    },
});

// Reducer
export const changePasswordReducer = changePasswordSlice.reducer;

// Actions
export const changePasswordActions = changePasswordSlice.actions;

// Selectors
export const selectChangePasswordPending = (state: RootState) => state.changePasswordState.isChangePending;
export const selectChangePasswordError = (state: RootState) => state.changePasswordState.ChangeError;
