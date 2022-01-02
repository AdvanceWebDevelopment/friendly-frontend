import { PayloadAction } from "@reduxjs/toolkit";
import { all, call, put, take } from "redux-saga/effects";
import { userService } from "../../services";
import {
    changePasswordActions,
    ChangePasswordRequest,
    ChangePasswordResponse,
    CHANGE_STATUS,
} from "../reducers/change-password-slice";

function* changePasswordWatcher() {
    while (true) {
        const action: PayloadAction<ChangePasswordRequest> = yield take(changePasswordActions.changePassword);
        const request: ChangePasswordRequest = action.payload;
        yield call(changePassword, request);
    }
}

function* changePassword(request: ChangePasswordRequest) {
    try {
        const response: ChangePasswordResponse = yield call(userService.changePassword, request);
        if (response?.status === CHANGE_STATUS.OK) {
            yield put(changePasswordActions.changePasswordSuccess);
        } else {
            yield put(changePasswordActions.changePasswordFailure(response?.message));
        }
    } catch (err) {
        yield put(changePasswordActions.changePasswordFailure("Something wrong"));
    }
}

export function* changePasswordSaga() {
    yield all([call(changePasswordWatcher)]);
}
