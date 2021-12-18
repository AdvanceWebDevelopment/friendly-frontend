import { Icon } from "@iconify/react";
import * as React from "react";
import { Link } from "react-router-dom";
import classes from "./CategoryButton.module.css";
import CategoryDropdown from "./CategoryDropdown";

export default function CategoryButton() {
    const [isDropdownVisible, setIsDropdownVisible] = React.useState(false);

    const handleDropdownVisibility = (state: boolean) => {
        setIsDropdownVisible(state);
    };
    return (
        <Link to="/category">
            <div className={classes["category-section"]}>
                <div
                    className={classes.category}
                    onMouseEnter={() => handleDropdownVisibility(true)}
                    onMouseLeave={() => handleDropdownVisibility(false)}
                >
                    <span>Danh mục</span>
                    <Icon icon="ant-design:caret-down-filled" className={classes["category-icon"]} />
                </div>
                <CategoryDropdown visibility={isDropdownVisible} onMouseEventHandler={handleDropdownVisibility} />
            </div>
        </Link>
    );
}
