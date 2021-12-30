import { PayloadAction } from "@reduxjs/toolkit";
import { all, call, put, take } from "redux-saga/effects";
import { forgotPasswordService } from "../../services/forgot-pwd-service";
import {
    forgotPasswordActions,
    ForgotPasswordRequest,
    ForgotPasswordResponse,
    OtpRequest,
    OtpResponse,
    ResetPasswordRequest,
    ResetPasswordResponse,
    STATUS,
} from "../reducers/forgot-pwd-slice";

function* getOtpWatcher() {
    while (true) {
        const action: PayloadAction<ForgotPasswordRequest> = yield take(forgotPasswordActions.getOtp);
        const request: ForgotPasswordRequest = action.payload;
        yield call(getOtp, request);
    }
}

function* sendOtpWatcher() {
    while (true) {
        const action: PayloadAction<OtpRequest> = yield take(forgotPasswordActions.sendOtp);
        const request: OtpRequest = action.payload;
        yield call(sendOtp, request);
    }
}

function* resetPasswordWatcher() {
    while (true) {
        const action: PayloadAction<ResetPasswordRequest> = yield take(forgotPasswordActions.resetPassword);
        const request: ResetPasswordRequest = action.payload;
        yield call(resetPassword, request);
    }
}

function* resetPassword(request: ResetPasswordRequest) {
    try {
        const response: ResetPasswordResponse = yield call(forgotPasswordActions.resetPassword, request);
        if (response?.status === STATUS.OK) {
            yield put(forgotPasswordActions.setIsPending(false));
        } else {
            yield put(forgotPasswordActions.setError("Xác nhận mật khẩu thất bại hoặc bạn đang dùng mật khẩu cũ"));
        }
    } catch (e) {
        yield put(forgotPasswordActions.setError("Lỗi hệ thống, vui lòng thử lại sau vài phút"));
    }
}

function* sendOtp(request: OtpRequest) {
    try {
        const response: OtpResponse = yield call(forgotPasswordService.sendOtp, request);
        if (response?.status === STATUS.ACCEPTED) {
            yield put(forgotPasswordActions.setOtp(request.otp));
        } else if (response?.status === STATUS.FAILED) {
            yield put(forgotPasswordActions.setError("Mã không hợp lệ"));
        }
    } catch (e) {
        yield put(forgotPasswordActions.setError("Lỗi hệ thống, vui lòng thử lại sau vài phút"));
    }
}

function* getOtp(request: ForgotPasswordRequest) {
    try {
        const response: ForgotPasswordResponse = yield call(forgotPasswordService.getOtp, request);
        if (response?.status === STATUS.ACCEPTED) {
            yield put(forgotPasswordActions.setEmail(request.email));
        } else if (response?.status === STATUS.FAILED) {
            yield put(forgotPasswordActions.setError("Email không tồn tại, xin hãy đăng ký"));
        }
    } catch (e) {
        yield put(forgotPasswordActions.setError("Lỗi hệ thống, xin thử lại sau vài phút"));
    }
}

export function* forgotPasswordSaga() {
    yield all([call(getOtpWatcher), call(sendOtpWatcher), call(resetPasswordWatcher)]);
}
