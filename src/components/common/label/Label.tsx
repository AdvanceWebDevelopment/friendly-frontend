import * as React from "react";
import classes from "./Label.module.css";
export interface LabelProps {
    htmlFor: string;
    content: string;
}

export default function Label({ htmlFor, content }: LabelProps) {
    return (
        <label className={classes.label} htmlFor={htmlFor}>
            {content}
        </label>
    );
}
