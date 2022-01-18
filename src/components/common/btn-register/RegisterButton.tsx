import * as React from "react";
import { useNavigate } from "react-router";
import { classicNameResolver } from "typescript";
import { apiRoute } from "../../../constants";
import classes from "./RegisterButton.module.css";
export default function RegisterButton() {
    const navigate = useNavigate();
    const onNavigateToRegister = () => {
        navigate(`/${apiRoute.REGISTER}`);
    };
    return (
        <button type="button" onClick={onNavigateToRegister} className={classes.button}>
            Đăng kí
        </button>
    );
}
