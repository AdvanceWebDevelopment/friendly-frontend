import * as React from "react";
import classes from "./Banner.module.css";
/*
    Props contain banner message,
    button banner message
    and behavior function when click the button
*/

export interface BannerProps {
    bannerMsg: string;
    buttonMsg: string;
    doSomething: (params: any) => void;
}

export default function Banner() {
    const dummyBannerMsg = "Tham gia đấu giá theo dõi sản phẩm";
    const dummyButtonMsg = "Đăng ký tài khoản";
    const dummyBehavior = () => {
        console.log("Button clicked");
    };
    return (
        <div className={classes.banner}>
            <div className={classes["banner-msg"]}>{dummyBannerMsg}</div>
            <button className={classes.button} onClick={dummyBehavior}>
                {dummyButtonMsg}
            </button>
        </div>
    );
}
