import { Icon } from "@iconify/react";
import React, { useState } from "react";
import { Button, ButtonGroup, Dropdown, DropdownButton } from "react-bootstrap";
import { colors } from "../../../constants";
import classes from "./paginator.module.css";

interface PaginatorProps {
    currentPage: number;
    totalPages: number;
    onNextClicked?: (page: number) => void;
    onPrevClicked?: (page: number) => void;
    onItemSelected?: (page: number) => void;
}

export const Paginator = (props: PaginatorProps) => {
    let { currentPage, totalPages, onNextClicked, onPrevClicked, onItemSelected } = props;

    const [page, setPage] = useState(currentPage);

    return (
        <div className="d-flex justify-content-center align-items-center">
            <button
                className={`mx-2 ${classes["paging-button"]}`}
                onClick={() => {
                    if (page > 1) {
                        setPage(page - 1);

                        if (onPrevClicked) {
                            onPrevClicked(page - 1);
                        }
                    }
                }}
            >
                <Icon icon="akar-icons:arrow-left" width="24" style={{ color: page > 1 ? colors.primary : "grey" }} />
            </button>

            <Dropdown as={ButtonGroup}>
                <Dropdown.Toggle>{page}</Dropdown.Toggle>

                <Dropdown.Menu>
                    {Array(totalPages)
                        .fill(0)
                        .map((_, index) => {
                            return (
                                <Dropdown.Item
                                    key={index + 1}
                                    eventKey={index + 1}
                                    as="button"
                                    active={index + 1 === page}
                                    className={classes["dropdown-item"]}
                                    onClick={() => {
                                        setPage(index + 1);

                                        if (onItemSelected) {
                                            onItemSelected(index + 1);
                                        }
                                    }}
                                >
                                    {index + 1}
                                </Dropdown.Item>
                            );
                        })}
                </Dropdown.Menu>
            </Dropdown>

            <Icon icon="ci:line-xl" className="mx-2" />

            <div>{totalPages}</div>

            <button
                className={`mx-2 ${classes["paging-button"]}`}
                onClick={() => {
                    if (page < totalPages) {
                        setPage(page + 1);

                        if (onNextClicked) {
                            onNextClicked(page + 1);
                        }
                    }
                }}
            >
                <Icon
                    icon="akar-icons:arrow-right"
                    width="24"
                    style={{ color: page < totalPages ? colors.primary : "grey" }}
                />
            </button>
        </div>
    );
};
