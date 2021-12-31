import { Icon } from "@iconify/react";
import * as React from "react";
import { useRef } from "react";
import classes from "./SearchBar.module.css";

interface FilterSearchBarProps {
    onSearch?: (keyword: string) => void;
}

export default function FilterSearchBar({ onSearch }: FilterSearchBarProps) {
    const ref = useRef<HTMLInputElement>(null);
    return (
        <div className={classes["search-bar"]}>
            <Icon
                icon="akar-icons:search"
                className={classes["icon-search"]}
                onClick={() => {
                    if (onSearch) {
                        onSearch(ref.current?.value ?? "");
                    }
                }}
            />
            <input
                type="text"
                placeholder="Tên sản phẩm"
                className={classes["search-field"]}
                ref={ref}
                onKeyDown={(e) => {
                    if (e.key === "Enter" && onSearch) {
                        onSearch(e.currentTarget.value);
                    }
                }}
            />
        </div>
    );
}
