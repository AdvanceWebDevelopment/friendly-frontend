import * as React from "react";
import { useNavigate } from "react-router-dom";
import { apiRoute } from "../../constants";
import classes from "./ProfileDropdown.module.css";

interface DummyData {
    title: string;
    link?: string;
}

export default function ProfileDropdowm() {
    const [list, setList] = React.useState([
        {
            title: "Hồ Sơ",
            link: `/${apiRoute.PROFILE}/user-info`,
        },
        {
            title: "Đăng Bán",
            link: `/${apiRoute.POST_PRODUCT}`,
        },
        {
            title: "Đăng Xuất",
        },
    ] as DummyData[]);

    const navigate = useNavigate();

    const renderItem = React.useCallback(() => {
        return list.map((item, index) => {
            return (
                <li
                    className={classes["dropdown-item"]}
                    key={index}
                    onClick={() => {
                        if (item.link) {
                            navigate(item.link);
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
