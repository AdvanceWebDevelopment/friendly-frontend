import { Icon } from "@iconify/react";
import * as React from "react";
import classes from "./SearchBar.module.css";
import SearchBarDropdown from "./SearchBarDropdown";

export default function SearchBar() {
    const [isDropdownOpen, setIsDropdownOpen] = React.useState(false);
    const [currentCategory, setCurrentCategory] = React.useState("Current");

    const ref = React.useRef<HTMLDivElement>(null);

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

    const changeFilterHandler = (category: string) => {
        setCurrentCategory(category);
    };
    return (
        <div className={classes["input-group"]}>
            <div className={classes["input-form"]} ref={ref}>
                <button className={classes["btn-dropdown"]} onClick={() => setIsDropdownOpen((prev) => !prev)}>
                    {currentCategory}
                    {isDropdownOpen && <SearchBarDropdown changeFilterHandler={changeFilterHandler} />}
                    <Icon icon="ant-design:caret-down-filled" className={classes["icon-dropdown"]} />
                </button>
                <input
                    aria-label="Product input field"
                    placeholder="Tìm kiếm mọi thứ ..."
                    className={classes["input-field"]}
                />
            </div>
            <button className={classes["btn-search"]}>
                <Icon icon="akar-icons:search" width={20} height={20} className={classes["btn-icon-search"]} />
            </button>
        </div>
    );
}
