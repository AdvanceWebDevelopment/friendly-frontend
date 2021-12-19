import * as React from "react";
import classes from "./Banner.module.css";
/*
    Props contain banner message,
    button banner message
    and behavior function when click the button
*/

export interface BannerProps {
    bannerMsg?: string;
    buttonMsg?: string;
    onClick?: () => void;
}

export default function Banner(props: BannerProps) {
    const { bannerMsg, buttonMsg, onClick } = props;

    return (
        <div className={classes.banner}>
            <div className={classes["banner-msg"]}>{bannerMsg}</div>
            <button className={classes.button} onClick={onClick}>
                {buttonMsg}
            </button>
        </div>
    );
}
