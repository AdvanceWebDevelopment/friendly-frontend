import * as React from "react";
import Label from "../../common/label/Label";
import NextButton from "../../common/btn-next/NextButton";
import ToggleInputField from "../../common/input-field/toggle/ToggleInputField";
import classes from "./InfoForm.module.css";
import { useAppDispatch, useAppSelector } from "../../../app/hook";
import { changePasswordActions, ChangePasswordRequest, selectChangePasswordError, selectChangePasswordPending } from "../../../app/reducers/change-password-slice";
export interface InfoFormProps {
    goToNextStep: () => void;
}

export default function InfoForm({ goToNextStep }: InfoFormProps) {
    const [password, setPassword] = React.useState("");
    const [newPassword, setNewPassword] = React.useState("");
    const [confirmPassword, setConfirmPassword] = React.useState("");
    const [isSubmitClicked, setIsSubmitClicked] = React.useState(false);

    const dispatch = useAppDispatch();

    const errorMessage = useAppSelector(selectChangePasswordError);
    const isPending = useAppSelector(selectChangePasswordPending);

    React.useEffect(() => {
        if (!isPending) {
            if (errorMessage) {
                alert(errorMessage);
            }
            else {
                goToNextStep();
            }
        }
    }, [isPending, isSubmitClicked])

    const onSubmitHandler = (e: React.SyntheticEvent) => {
        e.preventDefault();
        setIsSubmitClicked(true);
        if (newPassword !== password && newPassword === confirmPassword) {
            alert("Not valid");
        }
        else {
            const request: ChangePasswordRequest = {
                password: password,
                newPassword: newPassword,
                confirmPassword: confirmPassword,
            }
            dispatch(changePasswordActions.changePassword(request));
        }
    };

    const receivePassword = (pwd: string) => {
        setPassword(pwd);
    };

    const receiveNewPassword = (newPwd: string) => {
        setNewPassword(newPwd);
    };

    const receiveConfirmPassword = (confPwd: string) => {
        setConfirmPassword(confPwd);
    };

    return (
        <form className={classes.form} onSubmit={onSubmitHandler}>
            <div className={classes["input-group"]}>
                <Label htmlFor="pwd" content="Mật khẩu hiện tại" />
                <div className={classes["input-wrapper"]}>
                    <ToggleInputField id="pwd" receiveValue={receivePassword} />
                </div>
            </div>
            <div className={classes["input-group"]}>
                <Label htmlFor="new-pwd" content="Mật khẩu mới" />
                <div className={classes["input-wrapper"]}>
                    <ToggleInputField id="new-pwd" receiveValue={receiveNewPassword} />
                </div>
            </div>
            <div className={classes["input-group"]}>
                <Label htmlFor="conf-pwd" content="Xác nhận mật khẩu" />
                <div className={classes["input-wrapper"]}>
                    <ToggleInputField id="conf-pwd" receiveValue={receiveConfirmPassword} />
                </div>
            </div>
            <NextButton />
        </form>
    );
}
