import * as React from "react";
import InputField from "../../common/input-field/InputField";
import Label from "../../common/label/Label";
import NextButton from "../../common/btn-next/NextButton";
import classes from "./InfoForm.module.css";
export interface InfoFormProps {
    goToNextStep: () => void;
}

export default function InfoForm({ goToNextStep }: InfoFormProps) {
    const [email, setEmail] = React.useState("");
    const [isEmailValid, setIsEmailValid] = React.useState(true);
    const onSubmitHandler = () => {
        if (isEmailValid) {
            console.log("Submit");
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
