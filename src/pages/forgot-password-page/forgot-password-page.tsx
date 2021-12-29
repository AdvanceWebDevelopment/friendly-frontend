import * as React from "react";
import { Spinner } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "../../app/hook";
import {
    flowStepsActions,
    FlowStepsState,
    selectCurrentStep,
    selectSteps,
} from "../../app/reducers/account-flow-steps-slice";
import classes from "./forgot-password-page.module.css";

const InfoForm = React.lazy(() => import("../../components/forgot-password/info/InfoForm"));
const OtpForm = React.lazy(() => import("../../components/forgot-password/otp/OtpForm"));
const NewPasswordForm = React.lazy(() => import("../../components/forgot-password/new-pwd/NewPasswordForm"));
const Finish = React.lazy(() => import("../../components/forgot-password/finish/Finish"));

export const ForgotPasswordPage = () => {
    const dispatch = useAppDispatch();
    const steps = useAppSelector(selectSteps);
    const currentStep = useAppSelector(selectCurrentStep);

    React.useEffect(() => {
        const flowSteps: FlowStepsState = {
            steps: [1, 2, 3, 4],
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
                    Mật Khẩu Mới
                </div>
                <div className={currentStep === steps[3] ? `${classes["step-active"]}` : `${classes["step"]}`}>
                    Hoàn Tất
                </div>
            </div>
            {currentStep === steps[0] && (
                <React.Suspense fallback={<Spinner animation="border" variant="primary" className="d-block mx-auto" />}>
                    {" "}
                    <InfoForm goToNextStep={goToNextStep} />
                </React.Suspense>
            )}
            {currentStep === steps[1] && (
                <React.Suspense fallback={<Spinner animation="border" variant="primary" className="d-block mx-auto" />}>
                    <OtpForm goToNextStep={goToNextStep} goToPrevStep={goToPrevStep} />
                </React.Suspense>
            )}
            {currentStep === steps[2] && (
                <React.Suspense fallback={<Spinner animation="border" variant="primary" className="d-block mx-auto" />}>
                    <NewPasswordForm goToNextStep={goToNextStep} />
                </React.Suspense>
            )}
            {currentStep === steps[3] && (
                <React.Suspense fallback={<Spinner animation="border" variant="primary" className="d-block mx-auto" />}>
                    <Finish message="reset mật khẩu" userLastName="Andy" />
                </React.Suspense>
            )}
        </div>
    );
};
