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
    selectEmailPending,
    selectForgotPasswordError,
} from "../../../app/reducers/forgot-pwd-slice";
export interface InfoFormProps {
    goToNextStep: () => void;
}

export default function InfoForm({ goToNextStep }: InfoFormProps) {
    const [email, setEmail] = React.useState("");
    const [isSubmitClick, setIsSubmitClick] = React.useState(false);
    const dispatch = useAppDispatch();

    const errorMessage = useAppSelector(selectForgotPasswordError);
    const pending = useAppSelector(selectEmailPending);

    React.useEffect(() => {
        if (!pending) {
            if (errorMessage.length > 0) {
                alert(errorMessage);
            } else {
                goToNextStep();
            }
        }
    }, [isSubmitClick, pending]);
    const onSubmitHandler = (e: React.SyntheticEvent) => {
        e.preventDefault();
        setIsSubmitClick(true);
        if (!validateEmail(email)) {
            alert("Email not valid");
            return;
        }
        const request: ForgotPasswordRequest = {
            email: email,
        };
        dispatch(forgotPasswordActions.getOtp(request));
    };

    const receiveValue = (value: string) => {
        setEmail(value);
    };

    return (
        <form className={classes.form} onSubmit={onSubmitHandler}>
            <div className={classes["input-group"]}>
                <Label htmlFor="email" content="Email" />
                <div className={classes["input-wrapper"]}>
                    <InputField id="email" type="email" receiveValue={receiveValue} />
                </div>
            </div>
            <NextButton />
        </form>
    );
}
