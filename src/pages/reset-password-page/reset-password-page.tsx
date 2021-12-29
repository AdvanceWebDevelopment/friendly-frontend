import * as React from "react";
import { Spinner } from "react-bootstrap";
const Finish = React.lazy(() => import("../../components/reset-password/finish/Finish"));
const InfoForm = React.lazy(() => import("../../components/reset-password/info/InfoForm"));
import { useAppDispatch, useAppSelector } from "../../app/hook";
import {
    flowStepsActions,
    FlowStepsState,
    selectCurrentStep,
    selectSteps,
} from "../../app/reducers/account-flow-steps-slice";
import classes from "./reset-password-page.module.css";

// export interface ResetPasswordPage {

// }

export const ResetPasswordPage = () => {
    const dispatch = useAppDispatch();
    const steps = useAppSelector(selectSteps);
    const currentStep = useAppSelector(selectCurrentStep);

    React.useEffect(() => {
        const flowSteps: FlowStepsState = {
            steps: [1, 2],
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
                    Hoàn Tất
                </div>
            </div>
            {currentStep === steps[0] && (
                <React.Suspense fallback={<Spinner animation="border" variant="primary" className="d-block mx-auto" />}>
                    {" "}
                    <InfoForm goToNextStep={goToNextStep} />
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
