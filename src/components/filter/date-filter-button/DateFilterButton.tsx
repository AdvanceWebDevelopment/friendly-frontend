import { Icon } from "@iconify/react";
import * as React from "react";
import classes from "./DateFilterButton.module.css";
import DateFilterDropdown from "./dropdown/DateFilterDropdown";

export default function DateFilterButton() {
    const [isDropdownOpen, setIsDropdownOpen] = React.useState(false);
    const [sort, setSort] = React.useState("Ngày đăng");
    const [order, setOrder] = React.useState("mới nhất");
    return (
        <div className={classes["date-filter-container"]}>
            <button className={classes["btn-date-filter"]} onClick={() => setIsDropdownOpen((prev) => !prev)}>
                <Icon icon="bx:bx-filter" className={classes["icon-filter"]} />
                <span>{sort}</span>
            </button>
            {isDropdownOpen && <DateFilterDropdown onSortedBy={setSort} onOrderedBy={setOrder} />}
        </div>
    );
}
