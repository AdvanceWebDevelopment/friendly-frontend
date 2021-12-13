import * as React from "react";
import classes from "./CategoryDropdown.module.css";

export interface CategoryDropdownProps {
    visibility: boolean;
}
interface DummyData {
    id: number;
    name: string;
}

export default function CategoryDropdown(props: CategoryDropdownProps) {
    const [list, setList] = React.useState([
        {
            id: 1,
            name: "Name1",
        },
        {
            id: 2,
            name: "Name2",
        },
    ] as DummyData[]);
    const renderCategories = React.useCallback(() => {
        return list.map((item) => {
            return (
                <li className={classes["dropdown-item"]} key={Number(item.id)}>
                    {item.name}
                    <ul className={classes["sub-dropdown"]}>{renderSubcategories(list)}</ul>
                </li>
            );
        });
    }, []);

    const renderSubcategories = React.useCallback((list: DummyData[]) => {
        return list.map((subItem: DummyData) => {
            return (
                <li className={classes["sub-dropdown-item"]} key={Number(subItem.id)}>
                    {subItem.name}
                </li>
            );
        });
    }, []);

    return (
        <ul className={classes.dropdown} style={{ opacity: `${props.visibility ? "1" : "0"}` }}>
            {renderCategories()}
        </ul>
    );
}
