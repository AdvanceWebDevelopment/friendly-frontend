import * as React from "react";
import { validateEmail } from "../../../utils/helpers";
import classes from "./InputField.module.css";
export interface InputFieldProps {
    id: string;
    type: string;
    receiveValue: (val: string) => void;
}

export default function InputField({ id, type, receiveValue }: InputFieldProps) {
    const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        receiveValue(e.target.value);
    };
    return <input type={type} id={id} className={classes.input} onChange={onChangeHandler} required />;
}
