import { Icon } from "@iconify/react";
import * as React from "react";
import classes from "./ProfileButton.module.css";
export default function ProfileButton() {
    return (
        <div className={classes["btn-profile-comp"]}>
            <button className={classes["btn-dropdown"]}>
                <span className={classes["username"]}>Andy</span>
                <Icon icon="ant-design:caret-down-filled" className={classes["icon-dropdown"]} />
            </button>
            <div className={classes["user-img"]}>
                <Icon icon="ant-design:caret-down-filled" className={classes["icon-dropdown"]} />
            </div>
        </div>
    );
}
