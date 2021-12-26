import * as React from "react";
import classes from "./InputField.module.css";
export interface InputFieldProps {
    id: string;
    type: string;
}

export default function InputField({ id, type }: InputFieldProps) {
    const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log(e.target.value);
    };
    return <input type={type} id={id} className={classes.input} onChange={onChangeHandler} />;
}
