import * as React from "react";
import { SubCategory } from "../../../../models";
import classes from "./CategoryFilterDropdown.module.css";
export interface CategoryFilterDropdownProps {
    subCategories: SubCategory[];
}

export default function CategoryFilterDropdown() {
    const dummySubCat: SubCategory[] = [];

    const renderSubcategories = () => {
        return dummySubCat.map((sub) => {
            return (
                <div className={classes.option} key={sub.id}>
                    <input type="checkbox" id={sub.name} name={sub.name} className={classes.input} />
                    <label htmlFor={sub.name} className={classes.label}>
                        {sub.name}
                    </label>
                </div>
            );
        });
    };
    return (
        <div className={classes.dropdown}>
            <div className={classes.option}>
                <input type="checkbox" id="all" name="all" className={classes.input} defaultChecked />
                <label htmlFor="all" className={classes.label}>
                    Tất cả
                </label>
            </div>
            <div className={classes.option}>
                <input type="checkbox" id="abc" name="abc" className={classes.input} />
                <label htmlFor="abc" className={classes.label}>
                    ABC
                </label>
            </div>
            <div className={classes.option}>
                <input type="checkbox" id="cde" name="cde" className={classes.input} />
                <label htmlFor="cde" className={classes.label}>
                    CDE
                </label>
            </div>
        </div>
    );
}
