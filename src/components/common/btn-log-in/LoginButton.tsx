import * as React from "react";
import { useNavigate } from "react-router";
import { classicNameResolver } from "typescript";
import { apiRoute } from "../../../constants";
import classes from "./LoginButton.module.css";
export default function LoginButton() {
    const navigate = useNavigate();
    const onNavigateToRegister = () => {
        navigate(`/${apiRoute.LOGIN}`);
    };
    return (
        <button onClick={onNavigateToRegister} className={classes.button}>
            Đăng nhập
        </button>
    );
}
