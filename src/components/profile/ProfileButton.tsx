import { Icon } from "@iconify/react";
import * as React from "react";
import classes from "./ProfileButton.module.css";
import ProfileDropdowm from "./ProfileDropdown";
export default function ProfileButton() {
    const [isDropdownVisible, setIsDropdownVisible] = React.useState(false);
    return (
        <div className={classes["btn-profile-comp"]}>
            <button
                className={classes["btn-dropdown"]}
                onMouseEnter={() => setIsDropdownVisible(true)}
                onMouseLeave={() => setIsDropdownVisible(false)}
            >
                <span className={classes["username"]}>Andy</span>
                <Icon icon="ant-design:caret-down-filled" className={classes["icon-dropdown"]} />
                <ProfileDropdowm visibility={isDropdownVisible} />
            </button>
            <div className={classes["user-img"]}>
                <Icon icon="ant-design:caret-down-filled" className={classes["icon-dropdown"]} />
            </div>
        </div>
    );
}
