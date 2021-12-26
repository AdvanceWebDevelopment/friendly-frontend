import * as React from "react";
import classes from "./forgot-password-page.module.css";
import InfoForm from "../../components/forgot-password/info/InfoForm";
import OtpForm from "../../components/forgot-password/otp/OtpForm";
import NewPasswordForm from "../../components/forgot-password/new-pwd/NewPasswordForm";
import Finish from "../../components/forgot-password/finish/Finish";
export const ForgotPasswordPage = () => {
    const prodSteps = [1, 2, 3, 4];
    const [currentStep, setCurrentStep] = React.useState(prodSteps[0]);

    const goToNextStep = () => {
        if (currentStep >= prodSteps[prodSteps.length - 1]) {
            return;
        }

        setCurrentStep(currentStep + 1);
    };

    const goToPrevStep = () => {
        if (currentStep <= 0) {
            return;
        }

        setCurrentStep(currentStep - 1);
    };

    return (
        <div className={classes.container}>
            <div className={classes["step-container"]}>
                <div className={currentStep === prodSteps[0] ? `${classes["step-active"]}` : `${classes["step"]}`}>
                    Nhập Thông Tin
                </div>
                <div className={currentStep === prodSteps[1] ? `${classes["step-active"]}` : `${classes["step"]}`}>
                    Xác Nhận Email
                </div>
                <div className={currentStep === prodSteps[2] ? `${classes["step-active"]}` : `${classes["step"]}`}>
                    Mật Khẩu Mới
                </div>
                <div className={currentStep === prodSteps[3] ? `${classes["step-active"]}` : `${classes["step"]}`}>
                    Hoàn Tất
                </div>
            </div>
            {currentStep === prodSteps[0] && <InfoForm goToNextStep={goToNextStep} />}
            {currentStep === prodSteps[1] && <OtpForm goToNextStep={goToNextStep} goToPrevStep={goToPrevStep} />}
            {currentStep === prodSteps[2] && <NewPasswordForm goToNextStep={goToNextStep} />}
            {currentStep === prodSteps[3] && <Finish />}
        </div>
    );
};
