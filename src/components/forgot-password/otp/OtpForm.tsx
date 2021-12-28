import { Icon } from "@iconify/react";
import * as React from "react";
import InputField from "../../common/input-field/InputField";
import BackButton from "../../common/btn-back/BackButton";
import NextButton from "../../common/btn-next/NextButton";
import classes from "./OtpForm.module.css";

export interface OtpFormProps {
    goToNextStep: () => void;
    goToPrevStep: () => void;
}

export default function OtpForm({ goToNextStep, goToPrevStep }: OtpFormProps) {
    const [otp, setOtp] = React.useState("");
    const onSubmitHandler = () => {
        console.log(otp);
        console.log("Submit");
        goToNextStep();
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
