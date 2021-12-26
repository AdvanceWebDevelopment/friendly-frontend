import * as React from "react";
import InputField from "../../common/input-field/InputField";
import NextButton from "../btn-next/NextButton";
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

    const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    };

    return (
        <form className={classes.form}>
            <div className={classes["input-group"]}>
                <label className={classes.label} htmlFor="email">
                    Email
                </label>
                <div className={classes["input-wrapper"]}>
                    <InputField id="email" type="email" />
                </div>
            </div>
            <NextButton onSubmit={onSubmitHandler} />
        </form>
    );
}
