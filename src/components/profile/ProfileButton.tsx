import { Icon } from "@iconify/react";
import * as React from "react";
import { Link, useNavigate } from "react-router-dom";
import { apiRoute } from "../../constants/api-routes";
import classes from "./ProfileButton.module.css";
import ProfileDropdowm from "./ProfileDropdown";
export default function ProfileButton() {
    const navigate = useNavigate();

    const [isDropdownVisible, setIsDropdownVisible] = React.useState(false);

    const handleOnMouseEvent = (state: boolean) => {
        console.log(state ? "Enter" : "Leave");
        setIsDropdownVisible(state);
    };

    return (
        <div className={classes["btn-profile-comp"]}>
            <button
                className={classes["btn-dropdown"]}
                onMouseEnter={() => handleOnMouseEvent(true)}
                onMouseLeave={() => handleOnMouseEvent(false)}
            >
                <span className={classes["username"]}>Andy</span>
                <Icon icon="ant-design:caret-down-filled" />
                <ProfileDropdowm visibility={isDropdownVisible} />
            </button>
            <div className={classes["user-img"]} onClick={() => navigate(apiRoute.PROFILE)}></div>
        </div>
    );
}
