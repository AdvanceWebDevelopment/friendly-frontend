import * as React from "react";
import SearchBar from "./search-bar/SearchBar";
import classes from "./FilterSection.module.css";
import CategoryFilterButton from "./category-filter-button/CategoryFilterButton";
import DateFilterButton from "./date-filter-button/DateFilterButton";

export default function FilterSection() {
    return (
        <div className={classes.container}>
            <SearchBar />
            <CategoryFilterButton />
            <DateFilterButton />
        </div>
    );
}
