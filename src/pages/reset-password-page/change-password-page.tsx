import * as React from "react";
import { Spinner } from "react-bootstrap";
const Finish = React.lazy(() => import("../../components/change-password/finish/Finish"));
const InfoForm = React.lazy(() => import("../../components/change-password/info/InfoForm"));
import { useAppDispatch, useAppSelector } from "../../app/hook";
import {
    flowStepsActions,
    FlowStepsState,
    selectCurrentStep,
    selectSteps,
} from "../../app/reducers/account-flow-steps-slice";
import { selectUserName } from "../../app/reducers/user-slice";
import classes from "./change-password-page.module.css";

// export interface ResetPasswordPage {

// }

export const ChangePasswordPage = () => {
    const dispatch = useAppDispatch();
    const steps = useAppSelector(selectSteps);
    const currentStep = useAppSelector(selectCurrentStep);
    const userName = useAppSelector(selectUserName);

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
                    <InfoForm goToNextStep={goToNextStep} />
                </React.Suspense>
            )}
            {currentStep === steps[1] && (
                <React.Suspense fallback={<Spinner animation="border" variant="primary" className="d-block mx-auto" />}>
                    <Finish message="reset mật khẩu" userLastName={userName ?? ""} />
                </React.Suspense>
            )}
        </div>
    );
};
