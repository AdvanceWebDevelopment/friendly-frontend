import * as React from "react";
import { classicNameResolver } from "typescript";
import classes from "./SearchBarDropdown.module.css";
interface DummyData {
    id: number;
    name: string;
}

export interface SearchBarDropdownProps {
    changeFilterHandler: (category: string) => void;
}

export default function SearchBarDropdown(props: SearchBarDropdownProps) {
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

    const [list2, setList2] = React.useState([
        {
            id: 3,
            name: "Name3",
        },
        {
            id: 4,
            name: "Name4",
        },
    ] as DummyData[]);

    const updateFilter = React.useCallback((category: string) => {
        console.log("Click");
        props.changeFilterHandler(category);
    }, []);

    const renderCategories = React.useCallback(() => {
        return list.map((item) => {
            return (
                <li className={classes["dropdown-item"]} key={Number(item.id)}>
                    <div onClick={() => updateFilter(item.name)}>{item.name}</div>
                    <ul className={classes["sub-dropdown"]}>{renderSubCategories(list2)}</ul>
                </li>
            );
        });
    }, []);

    const renderSubCategories = React.useCallback((list: DummyData[]) => {
        return list.map((subItem: DummyData) => {
            return (
                <li className={classes["sub-dropdown-item"]} key={Number(subItem.id)}>
                    <div onClick={() => updateFilter(subItem.name)}>{subItem.name}</div>
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
