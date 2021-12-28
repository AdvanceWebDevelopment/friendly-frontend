import * as React from "react";
import Label from "../../common/label/Label";
import NextButton from "../../common/btn-next/NextButton";
import ToggleInputField from "../../common/input-field/toggle/ToggleInputField";
import classes from "./InfoForm.module.css";
export interface InfoFormProps {
    goToNextStep: () => void;
}

export default function InfoForm({ goToNextStep }: InfoFormProps) {
    const [password, setPassword] = React.useState("");
    const [newPassword, setNewPassword] = React.useState("");
    const [confirmPassword, setConfirmPassword] = React.useState("");
    const onSubmitHandler = () => {
        if (newPassword !== password && newPassword === confirmPassword) {
            console.log("Submit");
            goToNextStep();
        } else {
            alert("Nhập sai đâu đó, vui lòng kiểm tra lại :D");
            setPassword("");
            setNewPassword("");
            setConfirmPassword("");
        }
    };

    const receivePassword = (pwd: string) => {
        setPassword(pwd);
    };

    const receiveNewPassword = (newPwd: string) => {
        setNewPassword(newPwd);
    };

    const receiveConfirmPassword = (confPwd: string) => {
        setConfirmPassword(confirmPassword);
    };

    return (
        <form className={classes.form}>
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
            <NextButton onSubmit={onSubmitHandler} />
        </form>
    );
}
