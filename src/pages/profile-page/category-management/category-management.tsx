import { Icon } from "@iconify/react";
import React, { useEffect, useState } from "react";
import { Button, ButtonGroup, ListGroup, ListGroupItem, Spinner } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "../../../app/hook";
import { requestAddCategory, requestDeleteCategory, requestGetCategories } from "../../../app/reducers/category-slice";
import { ConfirmModal } from "../../../components/common/confirm-modal/confirm-modal";
import { colors } from "../../../constants";
import { Category, SubCategory } from "../../../models";
import classes from "./category-management.module.css";
import { AddCategoryModal } from "./modals/add-category-modal";

export const CategoryManagement = () => {
    const { categories, isLoadingCategories, isAddingCategory } = useAppSelector((state) => state.categoryState);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (!isAddingCategory) {
            dispatch(requestGetCategories());
        }
    }, [isAddingCategory]);

    const [showAddCategoryModal, setShowCategoryModal] = useState(false);
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [category, setCategory] = useState<Category>();
    const [tobeDeleteCategory, setTobeDeleteCategory] = useState<Category>();
    const [tobeDeleteSubCategory, setTobeDeleteSubCategory] = useState<SubCategory>();

    const onAddCategory = () => {
        setShowCategoryModal(true);
    };

    const onUpdateCategory = (category: Category) => {
        setCategory(category);
        setShowCategoryModal(true);
    };

    const onCancelCategoryModal = () => {
        closeCategoryModal();
    };

    const onSubmitCategoryModal = (category: Category) => {
        closeCategoryModal();

        if (!category.id) {
            dispatch(requestAddCategory(category));
        }
    };

    const closeCategoryModal = () => {
        setShowCategoryModal(false);
        setCategory(undefined);
    };

    const onCancelDelete = () => {
        closeDeleteConfirmModal();
    };

    const onDeleteCategory = (category: Category) => {
        setTobeDeleteCategory(category);
        setShowConfirmModal(true);
    };

    const onConfirmDelete = () => {
        if (tobeDeleteCategory) {
            dispatch(requestDeleteCategory(tobeDeleteCategory));
        }

        closeDeleteConfirmModal();
    };

    const closeDeleteConfirmModal = () => {
        setShowConfirmModal(false);
        setTobeDeleteCategory(undefined);
        setTobeDeleteSubCategory(undefined);
    };

    return (
        <>
            <div className="d-flex justify-content-end align-items-center">
                <ButtonGroup>
                    <Button className="mx-1" style={{ backgroundColor: colors.primary }} onClick={onAddCategory}>
                        Thêm Danh Mục Chính
                    </Button>

                    <Button className="mx-1" style={{ backgroundColor: colors.primary }}>
                        Thêm Danh Mục Phụ
                    </Button>
                </ButtonGroup>
            </div>
            {isLoadingCategories && <Spinner animation="border" variant="primary" className="d-block mx-auto" />}
            {!isLoadingCategories && (
                <div>
                    <ListGroup as="ol" className={`${classes["text"]}`}>
                        {categories.map((category, index) => {
                            return (
                                <ListGroupItem key={category.id} as="li" className="my-2">
                                    <div className={`${classes["category-name"]} d-flex justify-content-between my-1`}>
                                        <div>
                                            {index + 1}. {category.name}
                                        </div>
                                        <div className="d-flex">
                                            <div
                                                className={`${classes["clickable"]} mx-1`}
                                                onClick={() => {
                                                    onUpdateCategory(category);
                                                }}
                                            >
                                                <Icon icon="bx:bxs-edit" style={{ color: colors.primary }} />
                                            </div>

                                            <div
                                                className={`${classes["clickable"]} mx-1`}
                                                onClick={() => {
                                                    onDeleteCategory(category);
                                                }}
                                            >
                                                <Icon icon="fluent:delete-24-regular" style={{ color: colors.red }} />
                                            </div>
                                        </div>
                                    </div>
                                    {category.subCategories && category.subCategories.length > 0 && (
                                        <ListGroup as="ol">
                                            {category.subCategories.map((subCategory) => {
                                                return (
                                                    <ListGroupItem
                                                        as="li"
                                                        key={subCategory.id}
                                                        className="d-flex justify-content-between"
                                                    >
                                                        <div>{subCategory.name}</div>

                                                        <div className="d-flex">
                                                            <div className={`${classes["clickable"]} mx-1`}>
                                                                <Icon
                                                                    icon="bx:bxs-edit"
                                                                    style={{ color: colors.primary }}
                                                                />
                                                            </div>

                                                            <div className={`${classes["clickable"]} mx-1`}>
                                                                <Icon
                                                                    icon="fluent:delete-24-regular"
                                                                    style={{ color: colors.red }}
                                                                />
                                                            </div>
                                                        </div>
                                                    </ListGroupItem>
                                                );
                                            })}
                                        </ListGroup>
                                    )}
                                </ListGroupItem>
                            );
                        })}
                    </ListGroup>
                </div>
            )}
            <AddCategoryModal
                show={showAddCategoryModal}
                onComfirm={onSubmitCategoryModal}
                onCancel={onCancelCategoryModal}
                headingTitle="Quản Lý Danh Mục"
                category={category}
            />
            <ConfirmModal
                show={showConfirmModal}
                headingTitle="Xác Nhận"
                bodyContent="Bạn Chắc Chứ?"
                onCancel={onCancelDelete}
                onComfirm={onConfirmDelete}
            />
        </>
    );
};
