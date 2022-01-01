import * as React from "react";
import classes from "./NextButton.module.css";

export interface NextButtonProps {
    onSubmit: () => void;
}

export default function NextButton({ onSubmit }: NextButtonProps) {
    return (
        <div className={classes.wrapper}>
            <button type="submit" className={classes["btn-next"]}>
                Đi tiếp
            </button>
        </div>
    );
}
