import * as React from "react";
import { useAppDispatch, useAppSelector } from "../../../app/hook";
import {
    forgotPasswordActions,
    ResetPasswordRequest,
    selectForgotPasswordEmail,
    selectForgotPasswordError,
    selectForgotPasswordOtp,
    selectNewPasswordPending,
} from "../../../app/reducers/forgot-pwd-slice";
import { validatePassword } from "../../../utils";
import NextButton from "../../common/btn-next/NextButton";
import ToggleInputField from "../../common/input-field/toggle/ToggleInputField";
import classes from "./NewPasswordForm.module.css";

export interface NewPasswordFormProps {
    goToNextStep: () => void;
}

export default function NewPasswordForm({ goToNextStep }: NewPasswordFormProps) {
    const [newPassword, setNewPassword] = React.useState("");
    const [confirmPassword, setConfirmPassword] = React.useState("");
    const [isSubmitClick, setIsSubmitClick] = React.useState(false);

    const dispatch = useAppDispatch();

    const errorMessage = useAppSelector(selectForgotPasswordError);
    const pending = useAppSelector(selectNewPasswordPending);
    const otp = useAppSelector(selectForgotPasswordOtp);
    const email = useAppSelector(selectForgotPasswordEmail);

    React.useEffect(() => {
        if (!pending) {
            if (errorMessage) {
                alert(errorMessage);
            } else {
                goToNextStep();
            }
        }
    }, [isSubmitClick, pending]);

    const onSubmitHandler = (e: React.SyntheticEvent) => {
        e.preventDefault();
        setIsSubmitClick(true);
        if (newPassword !== confirmPassword && !validatePassword(newPassword)) {
            alert("Password and confirm password not match");
            return;
        } else {
            const request: ResetPasswordRequest = {
                email: email,
                password: newPassword,
                confirmPassword: confirmPassword,
                otp: otp,
            };
            dispatch(forgotPasswordActions.sendNewPassword(request));
        }
    };

    const receiveNewPassword = (newPassword: string) => {
        setNewPassword(newPassword);
    };

    const receiveConfirmPassword = (confirmPassword: string) => {
        setConfirmPassword(confirmPassword);
    };

    return (
        <form className={classes.form} onSubmit={onSubmitHandler}>
            <div className={classes["input-group"]}>
                <label htmlFor="new-pwd" className={classes.labels}>
                    MẬT KHẨU MỚI
                </label>
                <ToggleInputField id="new-pwd" receiveValue={receiveNewPassword} />
            </div>
            <div className={classes["input-group"]}>
                <label htmlFor="confirm-pwd" className={classes.labels}>
                    NHẬP LẠI MẬT KHẨU
                </label>
                <ToggleInputField id="confirm-pwd" receiveValue={receiveConfirmPassword} />
            </div>
            <div className={classes.redirects}>
                <NextButton />
            </div>
        </form>
    );
}
