import * as React from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { useAppDispatch, useAppSelector } from "../../../app/hook";
import {
    registerActions,
    RegisterRequest,
    selectRegisterError,
    selectRegisterPending,
} from "../../../app/reducers/register-slice";
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

export interface InputField {
    value: string;
    error: string;
}

export default function InfoForm({ goToNextStep }: InfoFormProps) {
    const [name, setName] = React.useState<InputField>({ value: "", error: "" });
    const [email, setEmail] = React.useState<InputField>({ value: "", error: "" });
    const [password, setPassword] = React.useState<InputField>({ value: "", error: "" });
    const [confirmPwd, setConfirmPwd] = React.useState<InputField>({ value: "", error: "" });
    const [isAgree, setIsAgree] = React.useState(false);
    const reCaptchaRef = React.useRef<ReCAPTCHA>(null);
    const [isSubmitClick, setIsSubmitClick] = React.useState(false);
    const dispatch = useAppDispatch();
    const pending = useAppSelector(selectRegisterPending);
    const error = useAppSelector(selectRegisterError);

    React.useEffect(() => {
        if (!pending) {
            if (error.length > 0) {
                alert(error);
            } else {
                goToNextStep();
            }
        }
    }, [isSubmitClick, pending]);

    const onSubmitHandler = (e: React.SyntheticEvent) => {
        e.preventDefault();
        setIsSubmitClick(true);
        if (
            name.value.length !== 0 &&
            validateEmail(email.value) &&
            validatePassword(password.value) &&
            password.value === confirmPwd.value &&
            isAgree &&
            reCaptchaRef.current?.getValue()
        ) {
            const req: RegisterRequest = {
                email: email.value,
                name: name.value,
                password: password.value,
                captcha: reCaptchaRef.current?.getValue() || "",
            };
            dispatch(registerActions.sendInfo(req));
        } else {
            if (name.value.length === 0) {
                name.error = "Tên không được để trống";
            }
            if (!validateEmail(email.value)) {
                email.error = "Email không hợp lệ";
            }
            if (!validatePassword(password.value)) {
                password.error = "Password phải có tối thiểu 6 ký tự bao gồm ký tự in hoa, in thường và chữ số";
            }
            if (password.value !== confirmPwd.value) {
                confirmPwd.error = "Mã xác nhận không trùng khớp";
            }
            if (!isAgree) {
                alert("Bạn chưa đồng ý với điều khoản sử dụng");
            }
            if (reCaptchaRef.current?.getValue()?.length === 0) {
                alert("Vui lòng xác nhận captcha");
            }
        }
    };

    const receiveName = (name: string) => {
        setName({ value: name } as InputField);
    };

    const receiveEmail = (email: string) => {
        setEmail({ value: email } as InputField);
    };

    const receivePassword = (password: string) => {
        setPassword({ value: password } as InputField);
    };

    const receiveConfirmPassword = (confirmPassword: string) => {
        setConfirmPwd({ value: confirmPassword } as InputField);
    };

    const handleCheckboxOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setIsAgree(e.target.checked);
    };

    return (
        <form className={classes.form} onSubmit={onSubmitHandler}>
            <div className={classes["single-input-wrapper"]}>
                <div className={classes["last-name"]}>
                    <Label htmlFor="last-name" content="Họ và tên" />
                    <InputField id="last-name" type="text" receiveValue={receiveName} />
                    {name.error && <span className={classes.error}>{name.error}</span>}
                </div>
            </div>
            <div className={classes["single-input-wrapper"]}>
                <Label htmlFor="email" content="Email" />
                <InputField id="email" type="email" receiveValue={receiveEmail} />
                {email.error && <span className={classes.error}>{email.error}</span>}
            </div>
            <div className={classes["single-input-wrapper"]}>
                <Label htmlFor="password" content="Mật khẩu" />
                <ToggleInputField id="password" receiveValue={receivePassword} />
                {password.error && <span className={classes.error}>{password.error}</span>}
            </div>
            <div className={classes["single-input-wrapper"]}>
                <Label htmlFor="confirm-pwd" content="Nhập lại mật khẩu" />
                <ToggleInputField id="confirm-pwd" receiveValue={receiveConfirmPassword} />
                {confirmPwd.error && <span className={classes.error}>{confirmPwd.error}</span>}
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
                <NextButton />
            </div>
        </form>
    );
}
