import { Icon } from "@iconify/react";
import * as React from "react";
import classes from "../../forgot-password/finish/Finish.module.css";
import { useNavigate } from "react-router";
import { useAppDispatch, useAppSelector } from "../../../app/hook";
import { authActions, LoginRequest, selectAuthError, selectIsAuthenticated } from "../../../app/reducers/auth-slice";
import { selectRegisterEmail, selectRegisterName, selectRegisterPassword } from "../../../app/reducers/register-slice";
import { apiRoute } from "../../../constants";

export interface FinishProps {
    message: string;
}

export default function Finish({ message }: FinishProps) {
    const [counter, setCounter] = React.useState(5);
    const isAuthenticated = useAppSelector(selectIsAuthenticated);
    const loginError = useAppSelector(selectAuthError);
    const email = useAppSelector(selectRegisterEmail);
    const password = useAppSelector(selectRegisterPassword);
    const name = useAppSelector(selectRegisterName);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    React.useEffect(() => {
        if (isAuthenticated) {
            navigate(apiRoute.HOME);
        } else {
            alert(loginError);
        }
    }, [isAuthenticated]);

    React.useEffect(() => {
        counter > 0 ? setTimeout(() => setCounter(counter - 1), 1000) : login();
    }, [counter]);

    const login = () => {
        const req: LoginRequest = {
            email: email,
            password: password,
        };
        dispatch(authActions.login(req));
    };

    return (
        <div className={classes.wrapper}>
            <div className={classes.inform}>
                <Icon icon="akar-icons:circle-check-fill" className={classes.icon} />
                <div className={classes.content}>
                    {name} thân mến,
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
