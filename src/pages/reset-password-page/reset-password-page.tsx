import * as React from "react";
import Finish from "../../components/reset-password/finish/Finish";
import InfoForm from "../../components/reset-password/info/InfoForm";

import classes from "./reset-password-page.module.css";

// export interface ResetPasswordPage {

// }

export const ResetPasswordPage = () => {
    const prodSteps = [1, 2];
    const [currentStep, setCurrentStep] = React.useState(prodSteps[0]);
    const goToNextStep = () => {
        if (currentStep >= prodSteps[prodSteps.length - 1]) {
            return;
        }
        setCurrentStep(currentStep + 1);
    };

    return (
        <div className={classes["page-wrapper"]}>
            <div className={classes["step-container"]}>
                <div className={currentStep === prodSteps[0] ? `${classes["step-active"]}` : `${classes["step"]}`}>
                    Nhập Thông Tin
                </div>
                <div className={currentStep === prodSteps[1] ? `${classes["step-active"]}` : `${classes["step"]}`}>
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
                    <Finish message="reset mật khẩu" userLastName="ABC" />
                </React.Suspense>
            )}
        </div>
    );
};
