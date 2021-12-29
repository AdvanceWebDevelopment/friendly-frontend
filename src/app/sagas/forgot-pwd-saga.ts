import { PayloadAction } from "@reduxjs/toolkit";
import { all, call, put, take } from "redux-saga/effects";
import { forgotPasswordService } from "../../services/forgot-pwd-service";
import {
    forgotPasswordActions,
    ForgotPasswordRequest,
    ForgotPasswordResponse,
    STATUS,
} from "../reducers/forgot-pwd-slice";

function* getOtpWatcher() {
    const action: PayloadAction<ForgotPasswordRequest> = yield take(forgotPasswordActions.getOtp);
    const request: ForgotPasswordRequest = action.payload;
    yield call(getOtp, request);
}

function* getOtp(request: ForgotPasswordRequest) {
    try {
        const response: ForgotPasswordResponse = yield call(forgotPasswordService.getOtp, request);
        if (response?.status === STATUS.SUCCESS) {
            yield put(forgotPasswordActions.setEmail(request.email));
        } else {
            yield put(forgotPasswordActions.setError("Your email not exists, please register"));
        }
    } catch (e) {
        yield put(forgotPasswordActions.setError("Sorry something wrong"));
    }
}

export function* forgotPasswordSaga() {
    yield all([call(getOtpWatcher)]);
}
