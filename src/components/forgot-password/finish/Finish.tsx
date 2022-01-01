import { Icon } from "@iconify/react";
import * as React from "react";
import { authActions, LoginRequest, selectAuthError, selectIsAuthenticated } from "../../../app/reducers/auth-slice";
import { useAppDispatch, useAppSelector } from "../../../app/hook";
import classes from "./Finish.module.css";
import { useNavigate } from "react-router";
import {
    selectForgotPasswordEmail,
    selectForgotPasswordError,
    selectForgotPasswordNew,
} from "../../../app/reducers/forgot-pwd-slice";
import { apiRoute } from "../../../constants";
export interface FinishProps {
    userLastName: string;
    message: string;
}

export default function Finish({ userLastName, message }: FinishProps) {
    const [counter, setCounter] = React.useState(5);
    const navigate = useNavigate();
    const isAuthenticated = useAppSelector(selectIsAuthenticated);
    const loginError = useAppSelector(selectAuthError);
    const newPasswordError = useAppSelector(selectForgotPasswordError);
    const email = useAppSelector(selectForgotPasswordEmail);
    const password = useAppSelector(selectForgotPasswordNew);
    const dispatch = useAppDispatch();

    React.useEffect(() => {
        if (isAuthenticated) {
            navigate(apiRoute.HOME);
        } else {
            if (loginError) {
                alert(loginError);
            }
        }
    }, [isAuthenticated]);

    React.useEffect(() => {
        counter > 0 && !newPasswordError ? setTimeout(() => setCounter(counter - 1), 1000) : login();
    }, [counter]);

    const login = () => {
        const req: LoginRequest = {
            email: email,
            password: password,
        };
        dispatch(authActions.login(req));
    };

    return newPasswordError ? (
        <div className={classes.wrapper}>
            <div className={classes.inform}>
                <Icon icon="akar-icons:circle-x-fill" className={classes["icon-invalid"]} />
                <div className={classes.content}>
                    {userLastName} thân mến,
                    <div>Thay đổi mật khẩu thất bại, vui lòng thử lại</div>
                </div>
            </div>
        </div>
    ) : (
        <div className={classes.wrapper}>
            <div className={classes.inform}>
                <Icon icon="akar-icons:circle-check-fill" className={classes.icon} />
                <div className={classes.content}>
                    {userLastName} thân mến,
                    <div>Chúc mừng bạn đã {message} thành công</div>
                </div>
            </div>
            <div className={classes["btn-wrapper"]}>
                <button className={classes["btn-auto-log"]} onClick={login}>
                    Tự động đăng nhập ({counter})
                </button>
            </div>
        </div>
    );
}
