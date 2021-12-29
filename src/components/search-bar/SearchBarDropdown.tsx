import * as React from "react";
import { classicNameResolver } from "typescript";
import { useAppDispatch, useAppSelector } from "../../app/hook";
import { getCategories, selectCategories } from "../../app/reducers/category-slice";
import { Category, SubCategory } from "../../models";
import classes from "./SearchBarDropdown.module.css";

export interface SearchBarDropdownProps {
    changeFilterHandler: (category: string) => void;
}

export default function SearchBarDropdown({ changeFilterHandler }: SearchBarDropdownProps) {
    const categories = useAppSelector(selectCategories);
    const dispatch = useAppDispatch();

    React.useEffect(() => {
        dispatch(getCategories());
    }, []);

    const updateFilter = React.useCallback(
        (category: string) => {
            console.log(category);
            changeFilterHandler(category);
        },
        [changeFilterHandler],
    );

    const renderCategories = React.useCallback(() => {
        return categories?.map((category: Category) => {
            return (
                <li className={classes["dropdown-item"]} key={category.id}>
                    <div onClick={() => updateFilter(category.name ?? "")}>{category.name}</div>
                    <ul className={classes["sub-dropdown"]}>{renderSubcategories(category.subCategories ?? [])}</ul>
                </li>
            );
        });
    }, []);
    const renderSubcategories = React.useCallback((subCategories: SubCategory[]) => {
        return subCategories.map((subCategory: SubCategory) => {
            return (
                <li className={classes["sub-dropdown-item"]} key={subCategory.id}>
                    <div onClick={() => updateFilter(subCategory.name ?? "")}>{subCategory.name}</div>
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
