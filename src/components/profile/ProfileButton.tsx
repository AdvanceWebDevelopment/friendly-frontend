import { Icon } from "@iconify/react";
import * as React from "react";
import { Link, useNavigate } from "react-router-dom";
import { apiRoute } from "../../constants/api-routes";
import classes from "./ProfileButton.module.css";
import ProfileDropdowm from "./ProfileDropdown";
export default function ProfileButton() {
    const navigate = useNavigate();
    const ref = React.useRef<HTMLDivElement>(null);
    const [isDropdownOpen, setIsDropdownOpen] = React.useState(false);

    React.useEffect(() => {
        const checkIfClickedOutside = (e: MouseEvent) => {
            if (isDropdownOpen && ref.current && !ref.current.contains(e.target as HTMLDivElement)) {
                setIsDropdownOpen(false);
            }
        };
        document.addEventListener("mousedown", checkIfClickedOutside);
        return () => {
            document.removeEventListener("mousedown", checkIfClickedOutside);
        };
    }, [isDropdownOpen]);

    return (
        <div className={classes["btn-profile-comp"]} ref={ref}>
            <button className={classes["btn-dropdown"]} onClick={() => setIsDropdownOpen((prev) => !prev)}>
                <span className={classes["username"]}>Andy</span>
                <Icon icon="ant-design:caret-down-filled" />
                {isDropdownOpen && <ProfileDropdowm />}
            </button>
            <div className={classes["user-img"]} onClick={() => navigate(apiRoute.PROFILE)}></div>
        </div>
    );
}
