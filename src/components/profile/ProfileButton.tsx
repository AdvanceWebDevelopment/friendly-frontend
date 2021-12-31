import { Icon } from "@iconify/react";
import * as React from "react";
import { Image } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { apiRoute } from "../../constants/api-routes";
import classes from "./ProfileButton.module.css";
import ProfileDropdowm from "./ProfileDropdown";

export interface ProfileButtonProps {
    name: string;
    avatar: string;
}

export default function ProfileButton({ name, avatar }: ProfileButtonProps) {
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
                <span className={classes["username"]}>{name.substring(0, name.indexOf(" "))}</span>
                <Icon icon="ant-design:caret-down-filled" />
                {isDropdownOpen && <ProfileDropdowm />}
            </button>
            <img src={avatar} className={classes["user-img"]} onClick={() => navigate(apiRoute.PROFILE)} />
        </div>
    );
}
