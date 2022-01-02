import * as React from "react";
import classes from "./NextButton.module.css";

export default function NextButton() {
    return (
        <div className={classes.wrapper}>
            <button type="submit" className={classes["btn-next"]}>
                Đi tiếp
            </button>
        </div>
    );
}
