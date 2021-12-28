import * as React from "react";
import ToggleInputField from "../../common/input-field/toggle/ToggleInputField";
import NextButton from "../../common/btn-next/NextButton";
import classes from "./NewPasswordForm.module.css";

export interface NewPasswordFormProps {
    goToNextStep: () => void;
}

export default function NewPasswordForm({ goToNextStep }: NewPasswordFormProps) {
    const [newPassword, setNewPassword] = React.useState("");
    const [confirmPassword, setConfirmPassword] = React.useState("");
    const onSubmitHandler = () => {
        if (newPassword === confirmPassword) {
            console.log("Submit");
            goToNextStep();
        } else {
            alert("Not match");
        }
    };

    const receiveNewPassword = (newPassword: string) => {
        setNewPassword(newPassword);
    };

    const receiveConfirmPassword = (confirmPassword: string) => {
        setConfirmPassword(confirmPassword);
    };

    return (
        <form className={classes.form}>
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
                <NextButton onSubmit={onSubmitHandler} />
            </div>
        </form>
    );
}
