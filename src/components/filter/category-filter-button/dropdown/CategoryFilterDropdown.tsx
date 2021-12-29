import * as React from "react";
import { Prev } from "react-bootstrap/esm/PageItem";
import { useAppDispatch, useAppSelector } from "../../../../app/hook";
import { getCategories, selectCategories } from "../../../../app/reducers/category-slice";
import { Category, SubCategory } from "../../../../models";
import classes from "./CategoryFilterDropdown.module.css";
export interface CategoryFilterDropdownProps {
    getFilterCategories: (categories: number[]) => void;
}

export default function CategoryFilterDropdown({ getFilterCategories }: CategoryFilterDropdownProps) {
    const dispatch = useAppDispatch();
    const categories = useAppSelector(selectCategories);
    // const [filteredCategories, setFilteredCategories] = React.useState([] as number[]);

    React.useEffect(() => {
        dispatch(getCategories());
    }, []);

    // TODO: Change checkbox to component to manage ticked/unticked state to add to list
    const renderCategories = () => {
        return categories.map((cat: Category) => {
            return (
                <div className={classes.option} key={cat.id}>
                    <input
                        type="checkbox"
                        id={cat.name}
                        name={cat.name}
                        className={classes.input}
                        // onChange={onChangeHandler}
                        value={cat.id}
                    />
                    <label htmlFor={cat.name} className={classes.label}>
                        {cat.name}
                    </label>
                </div>
            );
        });
    };
    return <div className={classes.dropdown}>{renderCategories()}</div>;
}
