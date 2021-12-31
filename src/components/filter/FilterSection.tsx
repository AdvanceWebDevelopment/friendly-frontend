import * as React from "react";
import SearchBar from "./search-bar/SearchBar";
import classes from "./FilterSection.module.css";
import CategoryFilterButton from "./category-filter-button/CategoryFilterButton";
import DateFilterButton from "./date-filter-button/DateFilterButton";
import { SubCategory } from "../../models";
import { useState } from "react";
import { SearchProductRequest, SortOption } from "../../services";

interface FilterSectionProps {
    onSearch?: (params: SearchProductRequest) => void;
}

export default function FilterSection({ onSearch }: FilterSectionProps) {
    const [currentSubCategory, setCurrentSubCategory] = useState<SubCategory>();
    const [currentSortedBy, setCurrentSortedBy] = useState<SortOption>("DATE");

    return (
        <div className={classes.container}>
            <SearchBar
                onSearch={(keyword) => {
                    if (onSearch) {
                        onSearch({
                            keyword: keyword,
                            subCategoryId: currentSubCategory?.id,
                            sortBy: currentSortedBy,
                        });
                    }
                }}
            />
            <CategoryFilterButton onSubcategoryChange={setCurrentSubCategory} />
            <DateFilterButton onSelectSortedBy={setCurrentSortedBy} />
        </div>
    );
}
