import * as React from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../app/hook";
import { apiRoute, authConstants } from "../../constants";
import { UserRole } from "../../models";
import classes from "./ProfileDropdown.module.css";

interface DummyData {
    title: string;
    link?: string;
    role?: UserRole;
}

export default function ProfileDropdowm() {
    const { user } = useAppSelector((state) => state.userState);

    const [list, setList] = React.useState([
        {
            title: "Hồ Sơ",
            link: `/${apiRoute.PROFILE}/user-info`,
        },
        {
            title: "Đăng Bán",
            link: `/${apiRoute.POST_PRODUCT}`,
            role: UserRole.SELLER,
        },
        {
            title: "Đăng Xuất",
        },
    ] as DummyData[]);

    const navigate = useNavigate();

    const renderItem = React.useCallback(() => {
        return list.map((item, index) => {
            if (item.role && user.role !== item.role) {
                return;
            }

            return (
                <li
                    className={classes["dropdown-item"]}
                    key={index}
                    onClick={() => {
                        if (item.link) {
                            navigate(item.link);
                        } else {
                            localStorage.removeItem(authConstants.ACCESS_TOKEN);
                            localStorage.removeItem(authConstants.REFRESH_TOKEN);
                            navigate(`/`);
                        }
                    }}
                >
                    {item.title}
                </li>
            );
        });
    }, []);

    return <ul className={classes.dropdown}>{renderItem()}</ul>;
}
