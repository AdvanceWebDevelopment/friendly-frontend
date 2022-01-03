import { PayloadAction } from "@reduxjs/toolkit";
import { all, call, put, take } from "redux-saga/effects";
import { userService } from "../../services";
import { changePasswordActions, ChangePasswordRequest } from "../reducers/change-password-slice";

function* changePasswordWatcher() {
    while (true) {
        const action: PayloadAction<ChangePasswordRequest> = yield take(changePasswordActions.changePassword);
        const request: ChangePasswordRequest = action.payload;
        yield call(changePassword, request);
    }
}

function* changePassword(request: ChangePasswordRequest) {
    try {
        const response: string = yield call(userService.changePassword, request);
        if (response) {
            yield put(changePasswordActions.changePasswordSuccess());
        } else {
            yield put(changePasswordActions.changePasswordFailure("Đổi mật khẩu thất bại"));
        }
    } catch (err) {
        yield put(changePasswordActions.changePasswordFailure("Lỗi hệ thống, xin thử lại sau"));
    }
}

export function* changePasswordSaga() {
    yield all([call(changePasswordWatcher)]);
}
