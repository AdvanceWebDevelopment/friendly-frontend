import * as React from "react";
import ToggleInputField from "../../common/input-field/toggle/ToggleInputField";
import BackButton from "../btn-back/BackButton";
import NextButton from "../btn-next/NextButton";
import classes from "./NewPasswordForm.module.css";

export interface NewPasswordFormProps {
    goToNextStep: () => void;
}

export default function NewPasswordForm({ goToNextStep }: NewPasswordFormProps) {
    const onSubmitHandler = () => {
        console.log("Submit");
        goToNextStep();
    };

    return (
        <form className={classes.form}>
            <div className={classes["input-group"]}>
                <label htmlFor="new-pwd" className={classes.labels}>
                    MẬT KHẨU MỚI
                </label>
                <ToggleInputField id="new-pwd" />
            </div>
            <div className={classes["input-group"]}>
                <label htmlFor="confirm-pwd" className={classes.labels}>
                    NHẬP LẠI MẬT KHẨU
                </label>
                <ToggleInputField id="confirm-pwd" />
            </div>
            <div className={classes.redirects}>
                <NextButton onSubmit={onSubmitHandler} />
            </div>
        </form>
    );
}
