import * as React from "react";
import { User } from "../../../models";
import InputField from "../../common/input-field/InputField";
import ToggleInputField from "../../common/input-field/toggle/ToggleInputField";
import Label from "../../common/label/Label";
import NextButton from "../../common/btn-next/NextButton";
import DropdownInputField from "../dropdown/DropdownInput";
import classes from "./InfoForm.module.css";
import { validateEmail, validatePassword } from "../../../utils/helpers";
import { GoogleReCaptcha } from "react-google-recaptcha-v3";
export interface InfoFormProps {
    goToNextStep: () => void;
}

export default function InfoForm({ goToNextStep }: InfoFormProps) {
    const [name, setName] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [confirmPwd, setConfirmPwd] = React.useState("");
    const [isAgree, setIsAgree] = React.useState(false);
    const [recaptchaToken, setRecaptchaToken] = React.useState("");
    const [dummyFlag, setDummyFlag] = React.useState(true);

    const onSubmitHandler = () => {
        if (
            name.length === 0 ||
            !validateEmail(email) ||
            !validatePassword(password) ||
            password === confirmPwd ||
            !recaptchaToken ||
            !isAgree
        ) {
            alert("Có lỗi xảy ra");
        } else {
        }
    };

    const receiveName = (name: string) => {
        setName(name);
    };

    const receiveEmail = (email: string) => {
        setEmail(email);
    };

    const receivePassword = (password: string) => {
        setPassword(password);
    };

    const receiveConfirmPassword = (confirmPassword: string) => {
        setConfirmPwd(confirmPassword);
    };

    const handleCheckboxOnChange = () => {
        setIsAgree(!isAgree);
    };

    const handleCaptchaVerify = (token: any) => {
        setRecaptchaToken(token);
    };

    return (
        <form className={classes.form}>
            <div className={classes["single-input-wrapper"]}>
                <div className={classes["last-name"]}>
                    <Label htmlFor="last-name" content="Họ" />
                    <InputField id="last-name" type="text" receiveValue={receiveName} />
                </div>
            </div>
            <div className={classes["single-input-wrapper"]}>
                <Label htmlFor="email" content="Email" />
                <InputField id="email" type="email" receiveValue={receiveEmail} />
            </div>
            <div className={classes["single-input-wrapper"]}>
                <Label htmlFor="password" content="Mật khẩu" />
                <ToggleInputField id="password" receiveValue={receivePassword} />
            </div>
            <div className={classes["single-input-wrapper"]}>
                <Label htmlFor="confirm-pwd" content="Nhập lại mật khẩu" />
                <ToggleInputField id="confirm-pwd" receiveValue={receiveConfirmPassword} />
            </div>
            <div className={classes["terms-of-service-checkbox"]}>
                <input
                    type="checkbox"
                    id="terms"
                    name="terms"
                    className={classes.checkbox}
                    checked={isAgree}
                    onChange={handleCheckboxOnChange}
                />
                <label htmlFor="terms" className={classes.label}>
                    Tôi đồng ý với <span className={classes["terms-of-service"]}>Điều khoản sử dụng</span>
                </label>
            </div>
            <div className={classes.bottom}>
                <GoogleReCaptcha onVerify={handleCaptchaVerify} />
                <NextButton onSubmit={onSubmitHandler} />
            </div>
        </form>
    );
}
