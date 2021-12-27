import * as React from "react";
import Finish from "../../components/forgot-password/finish/Finish";
import classes from "./register-page.module.css";
const InfoForm = React.lazy(() => import("../../components/register/info/InfoForm"));
const OtpForm = React.lazy(() => import("../../components/forgot-password/otp/OtpForm"));
const Finist = React.lazy(() => import("../../components/forgot-password/finish/Finish"));

// export interface RegisterPageProps { }

export const RegisterPage = () => {
    const prodSteps = [1, 2, 3];
    const [currentStep, setCurrentStep] = React.useState(prodSteps[0]);

    const goToNextStep = () => {
        if (currentStep >= prodSteps[prodSteps.length - 1]) {
            return;
        }
        console.log("A");
        setCurrentStep(currentStep + 1);
    };

    const goToPrevStep = () => {
        if (currentStep <= 0) {
            return;
        }

        setCurrentStep(currentStep - 1);
    };
    return (
        <div className={classes["page-wrapper"]}>
            <div className={classes["step-container"]}>
                <div className={currentStep === prodSteps[0] ? `${classes["step-active"]}` : `${classes["step"]}`}>
                    Nhập Thông Tin
                </div>
                <div className={currentStep === prodSteps[1] ? `${classes["step-active"]}` : `${classes["step"]}`}>
                    Xác Nhận Email
                </div>
                <div className={currentStep === prodSteps[2] ? `${classes["step-active"]}` : `${classes["step"]}`}>
                    Hoàn Tất
                </div>
            </div>
            {currentStep === prodSteps[0] && (
                <React.Suspense fallback={<div>Loading...</div>}>
                    <InfoForm goToNextStep={goToNextStep} />
                </React.Suspense>
            )}
            {currentStep === prodSteps[1] && (
                <React.Suspense fallback={<div>Loading...</div>}>
                    <OtpForm goToNextStep={goToNextStep} goToPrevStep={goToPrevStep} />
                </React.Suspense>
            )}
            {currentStep === prodSteps[2] && (
                <React.Suspense fallback={<div>Loading...</div>}>
                    <Finish message="đăng ký" userLastName="Andy" />
                </React.Suspense>
            )}
        </div>
    );
};
