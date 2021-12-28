import * as React from "react";
import { classicNameResolver } from "typescript";
import { useAppDispatch, useAppSelector } from "../../app/hook";
import { getCategories, selectCategories } from "../../app/reducers/category-slice";
import { Category, SubCategory } from "../../models";
import classes from "./SearchBarDropdown.module.css";

export interface SearchBarDropdownProps {
    changeFilterHandler: (category: string) => void;
}

export default function SearchBarDropdown(props: SearchBarDropdownProps) {
    const categories = useAppSelector(selectCategories);
    const dispatch = useAppDispatch();

    React.useEffect(() => {
        dispatch(getCategories());
    }, []);

    const updateFilter = React.useCallback((category: string) => {
        console.log("Click");
        props.changeFilterHandler(category);
    }, []);

    const renderCategories = React.useCallback(() => {
        return categories?.map((category: Category) => {
            return (
                <li
                    className={classes["dropdown-item"]}
                    key={category.id}
                    onClick={() => updateFilter(category.name ?? "")}
                >
                    {category.name}
                    <ul className={classes["sub-dropdown"]}>{renderSubcategories(category.subCategories ?? [])}</ul>
                </li>
            );
        });
    }, []);
    const renderSubcategories = React.useCallback((subCategories: SubCategory[]) => {
        return subCategories.map((subCategory: SubCategory) => {
            return (
                <li
                    className={classes["sub-dropdown-item"]}
                    key={subCategory.id}
                    onClick={() => updateFilter(subCategory.name ?? "")}
                >
                    {subCategory.name}
                </li>
            );
        });
    }, []);

    return (
        <div>
            <ul className={classes.dropdown}>{renderCategories()}</ul>
        </div>
    );
}
