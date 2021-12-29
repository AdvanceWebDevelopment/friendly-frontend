import * as React from "react";
import { useAppDispatch, useAppSelector } from "../../app/hook";
import {
    flowStepsActions,
    FlowStepsState,
    selectCurrentStep,
    selectSteps,
} from "../../app/reducers/account-flow-steps-slice";
import classes from "./register-page.module.css";

const InfoForm = React.lazy(() => import("../../components/register/info/InfoForm"));
const OtpForm = React.lazy(() => import("../../components/forgot-password/otp/OtpForm"));
const Finish = React.lazy(() => import("../../components/forgot-password/finish/Finish"));

// export interface RegisterPageProps { }

export const RegisterPage = () => {
    const dispatch = useAppDispatch();
    const steps = useAppSelector(selectSteps);
    const currentStep = useAppSelector(selectCurrentStep);

    React.useEffect(() => {
        const flowSteps: FlowStepsState = {
            steps: [1, 2, 3],
            currentStep: 1,
        };
        dispatch(flowStepsActions.setState(flowSteps));
    }, []);

    const goToNextStep = () => {
        dispatch(flowStepsActions.goNext());
    };

    const goToPrevStep = () => {
        dispatch(flowStepsActions.goBack());
    };
    return (
        <div className={classes["page-wrapper"]}>
            <div className={classes["step-container"]}>
                <div className={currentStep === steps[0] ? `${classes["step-active"]}` : `${classes["step"]}`}>
                    Nhập Thông Tin
                </div>
                <div className={currentStep === steps[1] ? `${classes["step-active"]}` : `${classes["step"]}`}>
                    Xác Nhận Email
                </div>
                <div className={currentStep === steps[2] ? `${classes["step-active"]}` : `${classes["step"]}`}>
                    Hoàn Tất
                </div>
            </div>
            {currentStep === steps[0] && (
                <React.Suspense fallback={<div>Loading...</div>}>
                    <InfoForm goToNextStep={goToNextStep} />
                </React.Suspense>
            )}
            {currentStep === steps[1] && (
                <React.Suspense fallback={<div>Loading...</div>}>
                    <OtpForm goToNextStep={goToNextStep} goToPrevStep={goToPrevStep} />
                </React.Suspense>
            )}
            {currentStep === steps[2] && (
                <React.Suspense fallback={<div>Loading...</div>}>
                    <Finish message="đăng ký" userLastName="Andy" />
                </React.Suspense>
            )}
        </div>
    );
};
