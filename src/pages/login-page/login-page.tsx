import { Icon } from "@iconify/react";
import * as React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hook";
import { authActions, LoginRequest, selectAuthError, selectIsAuthenticated } from "../../app/reducers/auth-slice";
import InputField from "../../components/common/input-field/InputField";
import ToggleInputField from "../../components/common/input-field/toggle/ToggleInputField";
import { apiRoute, authConstants } from "../../constants";
import classes from "./login-page.module.css";

export const LoginPage = () => {
    const [isShown, setIsShown] = React.useState(false);
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const dispatch = useAppDispatch();
    const isAuthenticated = useAppSelector(selectIsAuthenticated);
    const error = useAppSelector(selectAuthError);
    const navigate = useNavigate();
    const [isLoginClicked, setIsLoginClicked] = React.useState(false);

    React.useEffect(() => {
        console.log(isAuthenticated);
        if (isAuthenticated) {
            navigate(apiRoute.HOME);
        }
        if (error) {
            alert(error);
        }
    }, [isLoginClicked, isAuthenticated]);

    const onLogin = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        const loginRequest: LoginRequest = {
            email,
            password,
        };
        dispatch(authActions.login(loginRequest));
    };

    const receiveEmail = (email: string) => {
        setEmail(email);
    };

    const receivePassword = (password: string) => {
        setPassword(password);
    };

    const alternateLogin = (e: React.MouseEvent<SVGElement>) => {
        e.preventDefault();
    };

    const navigateToForgotPassword = () => {
        navigate(`/${apiRoute.FORGOT}`);
    };

    return (
        <div className={classes["page-wrapper"]}>
            <div className={classes.container}>
                <form className={classes["login-form"]}>
                    <div className={classes["input-group"]}>
                        <label htmlFor="email" className={classes.labels}>
                            EMAIL
                        </label>
                        <InputField id="email" type="email" receiveValue={receiveEmail} />
                    </div>
                    <div className={classes["input-group"]}>
                        <label htmlFor="pwd" className={classes.labels}>
                            MẬT KHẨU
                        </label>
                        <ToggleInputField id="pwd" receiveValue={receivePassword} />
                    </div>
                    <div className={classes.redirects}>
                        <button type="submit" className={classes["btn-submit"]} onClick={onLogin}>
                            Đăng nhập
                        </button>
                        <div onClick={navigateToForgotPassword} className={classes["forget-pwd"]}>
                            Quên mật khẩu
                        </div>
                    </div>
                </form>
                <div className={classes["alternate-login"]}>
                    <div className={classes.guidance}>Hoặc Đăng Nhập Với</div>
                    <div className={classes["login-methods"]}>
                        <Icon icon="bi:facebook" className={classes.icons} onClick={alternateLogin} />
                        <Icon
                            icon="akar-icons:google-contained-fill"
                            className={classes.icons}
                            onClick={alternateLogin}
                        />
                        <Icon icon="akar-icons:github-fill" className={classes.icons} onClick={alternateLogin} />
                    </div>
                </div>
            </div>
        </div>
    );
};
