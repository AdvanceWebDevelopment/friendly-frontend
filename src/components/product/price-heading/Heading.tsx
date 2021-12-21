import * as React from "react";
import classes from "./Heading.module.css";
export interface HeadingProps {
    content: string;
    color: string;
}

export default function Heading({ content, color }: HeadingProps) {
    return (
        <div className={classes.heading} style={{ color: color }}>
            {content}
        </div>
    );
}
