import { Icon } from "@iconify/react";
import classes from "./NotificationButton.module.css";
import * as React from "react";

export default function NotificationButton() {
    return (
        <button className={classes["notification-btn"]}>
            <Icon icon="clarity:bell-line" className={classes["notification-icon"]} />
        </button>
    );
}
