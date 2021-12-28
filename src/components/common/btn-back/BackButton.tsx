import * as React from "react";
import classes from "./BackButton.module.css";

export interface BackButtonProps {
    goBack: () => void;
}

export default function BackButton({ goBack }: BackButtonProps) {
    return (
        <div className={classes.wrapper}>
            <button className={classes["btn-back"]} onClick={goBack}>
                Quay lại
            </button>
        </div>
    );
}
