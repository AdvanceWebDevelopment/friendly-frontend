import { PayloadAction } from "@reduxjs/toolkit";
import { all, call, put, take } from "redux-saga/effects";
import { authConstants } from "../../constants";
import { authService } from "../../services/authenticate-service";
import { authUtils } from "../../utils";
import { authActions, ErrorResponse, LoginRequest, LoginResponse } from "../reducers/auth-slice";

function* loginWatcher() {
    while (true) {
        const action: PayloadAction<LoginRequest> = yield take(authActions.login.type);
        const payload = action.payload;
        yield call(login, payload);
    }
}

function* login(data: LoginRequest) {
    try {
        const response: LoginResponse | ErrorResponse = yield call(authService.login, data);
        if ("accessToken" in response) {
            authUtils.updateAccessToken(response?.accessToken);
            localStorage.setItem(authConstants.REFRESH_TOKEN, response.refreshToken);
            yield put(authActions.loginSuccess(response));
        } else {
            yield put(authActions.loginFailure(response.message));
        }
    } catch (e) {
        yield put(authActions.loginFailure("Error login"));
    }
}

export function* authSaga() {
    yield all([call(loginWatcher)]);
}
