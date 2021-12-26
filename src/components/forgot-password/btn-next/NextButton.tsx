import * as React from "react";
import classes from "./NextButton.module.css";

export interface NextButtonProps {
    onSubmit: () => void;
}

export default function NextButton({ onSubmit }: NextButtonProps) {
    const onSubmitHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        onSubmit();
    };

    return (
        <div className={classes.wrapper}>
            <button className={classes["btn-next"]} onClick={onSubmitHandler}>
                Đi tiếp
            </button>
        </div>
    );
}
