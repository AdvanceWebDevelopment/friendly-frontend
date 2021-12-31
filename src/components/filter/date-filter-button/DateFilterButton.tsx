import { Icon } from "@iconify/react";
import * as React from "react";
import { SortOption } from "../../../services";
import classes from "./DateFilterButton.module.css";
import DateFilterDropdown from "./dropdown/DateFilterDropdown";

interface DateFilterButtonProps {
    onSelectSortedBy?: (sort: SortOption) => void;
}

export default function DateFilterButton({ onSelectSortedBy }: DateFilterButtonProps) {
    const [isDropdownOpen, setIsDropdownOpen] = React.useState(false);
    const [sort, setSort] = React.useState("Ngày đăng");
    const [order, setOrder] = React.useState("mới nhất");

    return (
        <div className={classes["date-filter-container"]}>
            <button className={classes["btn-date-filter"]} onClick={() => setIsDropdownOpen((prev) => !prev)}>
                <Icon icon="bx:bx-filter" className={classes["icon-filter"]} />
                <span>{sort}</span>
            </button>
            {isDropdownOpen && (
                <DateFilterDropdown
                    onSortedBy={(sort) => {
                        setSort(sort);

                        if (onSelectSortedBy) {
                            if (sort.includes("Ngày")) {
                                onSelectSortedBy("DATE");
                            } else {
                                onSelectSortedBy("PRICE");
                            }
                        }
                    }}
                    onOrderedBy={setOrder}
                />
            )}
        </div>
    );
}
