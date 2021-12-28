import { Icon } from "@iconify/react";
import * as React from "react";
import classes from "./ToggleInputField.module.css";
export interface ToggleInputFieldProps {
    id: string;
    receiveValue: (val: string) => void;
}

export default function ToggleInputField({ id, receiveValue }: ToggleInputFieldProps) {
    const [isShown, setIsShown] = React.useState(false);
    const togglePassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        setIsShown((prev) => !prev);
    };

    const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        receiveValue(e.target.value);
        console.log("Here");
    };

    return (
        <>
            <div className={classes["pwd-field"]}>
                <input
                    type={isShown ? "text" : "password"}
                    id={id}
                    className={classes.input}
                    onChange={onChangeHandler}
                />
            </div>
            <button className={classes["btn-toggle"]} onClick={togglePassword}>
                <Icon
                    icon={isShown ? "ant-design:eye-filled" : "ant-design:eye-invisible-filled"}
                    className={classes["pwd-icon"]}
                />
            </button>
        </>
    );
}
