import { Icon } from "@iconify/react";
import * as React from "react";
import InputField from "../../common/input-field/InputField";
import BackButton from "../../common/btn-back/BackButton";
import NextButton from "../../common/btn-next/NextButton";
import classes from "./OtpForm.module.css";
import { useAppDispatch, useAppSelector } from "../../../app/hook";
import {
    forgotPasswordActions,
    OtpRequest,
    selectEmail,
    selectError,
    selectIsPending,
} from "../../../app/reducers/forgot-pwd-slice";

export interface OtpFormProps {
    goToNextStep: () => void;
    goToPrevStep: () => void;
}

export default function OtpForm({ goToNextStep, goToPrevStep }: OtpFormProps) {
    const [otp, setOtp] = React.useState("");
    const [isSubmitClick, setIsSubmitClick] = React.useState(false);

    const dispatch = useAppDispatch();

    const errorMessage = useAppSelector(selectError);
    const pending = useAppSelector(selectIsPending);
    const email = useAppSelector(selectEmail);

    React.useEffect(() => {
        console.log(pending);
        if (!pending) {
            if (errorMessage.length > 0) {
                alert(errorMessage);
            } else {
                goToNextStep();
            }
        }
    }, [isSubmitClick, pending]);

    const onSubmitHandler = () => {
        setIsSubmitClick(true);
        if (otp.length !== 6) {
            alert("OTP not valid");
            return;
        } else {
            const otpRequest: OtpRequest = {
                otp,
                email,
            };
            dispatch(forgotPasswordActions.sendOtp(otpRequest));
        }
    };

    const receiveOtp = (otp: string) => {
        setOtp(otp);
    };

    return (
        <form className={classes.form}>
            <div className={classes.inform}>Mã xác nhận đã được gửi tới email của bạn!</div>
            <div className={classes["input-group"]}>
                <label htmlFor="otp" className={classes.label}>
                    Nhập mã
                </label>
                <div className={classes.wrapper}>
                    <div className={classes["input-wrapper"]}>
                        <InputField id="otp" type="text" receiveValue={receiveOtp} />
                    </div>
                    <button className={classes["btn-refresh"]}>
                        <Icon icon="oi:reload" className={classes.icon} />
                    </button>
                </div>
            </div>
            <div className={classes.redirects}>
                <NextButton onSubmit={onSubmitHandler} />
                <BackButton goBack={goToPrevStep} />
            </div>
        </form>
    );
}
