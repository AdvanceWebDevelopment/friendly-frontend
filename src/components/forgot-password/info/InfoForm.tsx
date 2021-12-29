import * as React from "react";
import InputField from "../../common/input-field/InputField";
import Label from "../../common/label/Label";
import NextButton from "../../common/btn-next/NextButton";
import classes from "./InfoForm.module.css";
import { validateEmail } from "../../../utils/helpers";
import { useAppDispatch, useAppSelector } from "../../../app/hook";
import {
    forgotPasswordActions,
    ForgotPasswordRequest,
    selectError,
    selectIsError,
} from "../../../app/reducers/forgot-pwd-slice";
export interface InfoFormProps {
    goToNextStep: () => void;
}

export default function InfoForm({ goToNextStep }: InfoFormProps) {
    const [email, setEmail] = React.useState("");
    const dispatch = useAppDispatch();
    const isError = useAppSelector(selectIsError);
    const errorMessage = useAppSelector(selectError);

    const onSubmitHandler = () => {
        if (!validateEmail(email)) {
            alert("Email not valid");
            return;
        }
        const request: ForgotPasswordRequest = {
            email: email,
        };
        dispatch(forgotPasswordActions.getOtp(request));

        if (isError && errorMessage.length !== 0) {
            console.log("Alert message");
            alert(errorMessage);
            return;
        } else {
            console.log("Go to next steps");
            goToNextStep();
        }
    };

    const receiveValue = (value: string) => {
        setEmail(value);
    };

    return (
        <form className={classes.form}>
            <div className={classes["input-group"]}>
                <Label htmlFor="email" content="Email" />
                <div className={classes["input-wrapper"]}>
                    <InputField id="email" type="email" receiveValue={receiveValue} />
                </div>
            </div>
            <NextButton onSubmit={onSubmitHandler} />
        </form>
    );
}
