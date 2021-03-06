import * as React from "react";
import { Spinner } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "../../app/hook";
import {
    flowStepsActions,
    FlowStepsState,
    selectCurrentStep,
    selectSteps,
} from "../../app/reducers/account-flow-steps-slice";
import classes from "./register-page.module.css";

const InfoForm = React.lazy(() => import("../../components/register/info/InfoForm"));
const OtpForm = React.lazy(() => import("../../components/register/otp/OtpForm"));
const Finish = React.lazy(() => import("../../components/register/finish/Finish"));

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
                <React.Suspense fallback={<Spinner animation="border" variant="primary" className="d-block mx-auto" />}>
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
                    <Finish message="đăng ký" />
                </React.Suspense>
            )}
        </div>
    );
};
