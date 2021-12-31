import * as React from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { KEY } from "../../../constants";
import { validateEmail, validatePassword } from "../../../utils/helpers";
import NextButton from "../../common/btn-next/NextButton";
import InputField from "../../common/input-field/InputField";
import ToggleInputField from "../../common/input-field/toggle/ToggleInputField";
import Label from "../../common/label/Label";
import classes from "./InfoForm.module.css";
export interface InfoFormProps {
    goToNextStep: () => void;
}

export default function InfoForm({ goToNextStep }: InfoFormProps) {
    const [name, setName] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [confirmPwd, setConfirmPwd] = React.useState("");
    const [isAgree, setIsAgree] = React.useState(false);
    const reCaptchaRef = React.useRef<ReCAPTCHA>(null);

    const onSubmitHandler = async () => {
        const captchaToken = await reCaptchaRef.current?.executeAsync();
        reCaptchaRef.current?.reset();
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
                <ReCAPTCHA sitekey={KEY} ref={reCaptchaRef} size="normal" />
                <NextButton onSubmit={onSubmitHandler} />
            </div>
        </form>
    );
}
