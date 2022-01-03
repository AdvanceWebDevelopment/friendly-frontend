import React, { useEffect, useState } from "react";
import { Button, ButtonGroup, Col, Dropdown, FormControl, FormGroup, InputGroup, Modal, Row } from "react-bootstrap";
import { useAppSelector } from "../../../../app/hook";
import { colors } from "../../../../constants";
import { Category, SubCategory } from "../../../../models";

interface AddSubCategoryModalProps {
    show?: boolean;
    headingTitle?: string;
    onComfirm?: (category?: Category, subCategory?: SubCategory) => void;
    onCancel?: () => void;
    category?: Category;
    subCategory?: SubCategory;
}

export const AddSubCategoryModal = ({
    show,
    headingTitle,
    onComfirm,
    onCancel,
    category,
    subCategory,
}: AddSubCategoryModalProps) => {
    const [subCategoryName, setSubCategoryName] = useState(subCategory?.name);
    const [selectedCategory, setSelectedCategory] = useState<Category>();

    useEffect(() => {
        setSelectedCategory(category);
    }, [category]);

    const { categories } = useAppSelector((state) => state.categoryState);

    return (
        <Modal show={show}>
            <Modal.Header closeButton onHide={onCancel}>
                <Modal.Title>{headingTitle}</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Row>
                    <Col>
                        <InputGroup>
                            <FormControl
                                autoFocus={true}
                                placeholder="Tên Danh Mục Phụ"
                                defaultValue={subCategory?.name}
                                onChange={(e) => setSubCategoryName(e.target.value)}
                            />
                        </InputGroup>
                    </Col>

                    <Col>
                        <FormGroup>
                            <Dropdown
                                as={ButtonGroup}
                                className="w-100"
                                style={{ backgroundColor: colors.primary, color: colors.primary }}
                            >
                                <Dropdown.Toggle>{selectedCategory?.name ?? "Danh Mục Chính * "}</Dropdown.Toggle>

                                <Dropdown.Menu>
                                    {categories.map((item, index) => {
                                        if (item.id !== 1)
                                            return (
                                                <Dropdown.Item
                                                    key={index}
                                                    className="w-100"
                                                    onClick={() => setSelectedCategory(item)}
                                                >
                                                    {item.name}
                                                </Dropdown.Item>
                                            );
                                    })}
                                </Dropdown.Menu>
                            </Dropdown>
                        </FormGroup>
                    </Col>
                </Row>
            </Modal.Body>

            <Modal.Footer>
                <Button
                    onClick={() => {
                        if (onComfirm) {
                            if (!subCategoryName || subCategoryName.trim().length === 0) {
                                alert("Không được bỏ trống tên danh mục phụ");
                                return;
                            }

                            if (!selectedCategory) {
                                alert("Không được bỏ trống danh mục chính");
                                return;
                            }

                            onComfirm(selectedCategory, { ...subCategory, name: subCategoryName });
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
