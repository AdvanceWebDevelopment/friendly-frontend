import React, { useState } from "react";
import { Button, FormControl, InputGroup, Modal } from "react-bootstrap";
import { colors } from "../../../../constants";
import { Category } from "../../../../models";

interface AddCategoryModalProps {
    show?: boolean;
    headingTitle?: string;
    onComfirm?: (category: Category) => void;
    onCancel?: () => void;
    category?: Category;
}

export const AddCategoryModal = ({ headingTitle, show, onComfirm, onCancel, category }: AddCategoryModalProps) => {
    const [categoryName, setCategoryName] = useState(category?.name);

    return (
        <Modal show={show}>
            <Modal.Header closeButton onHide={onCancel}>
                <Modal.Title>{headingTitle}</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <InputGroup>
                    <FormControl
                        autoFocus={true}
                        placeholder="Tên Danh Mục"
                        defaultValue={category?.name}
                        onChange={(e) => setCategoryName(e.target.value)}
                    />
                </InputGroup>
            </Modal.Body>

            <Modal.Footer>
                <Button
                    onClick={() => {
                        if (onComfirm) {
                            if (categoryName && categoryName.length === 0) {
                                alert("Không được bỏ trống tên danh mục");
                                return;
                            }

                            onComfirm({ ...category, name: categoryName });
                        }
                    }}
                    style={{ backgroundColor: colors.primary }}
                >
                    Xác Nhận
                </Button>
                <Button
                    onClick={onCancel}
                    style={{
                        backgroundColor: colors.subPrimary,
                        color: colors.primary,
                        borderColor: colors.primary,
                    }}
                >
                    Hủy
                </Button>
            </Modal.Footer>
        </Modal>
    );
};
