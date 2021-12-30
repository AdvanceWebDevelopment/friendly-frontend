import { Icon } from "@iconify/react";
import { EditorState, convertToRaw } from "draft-js";
import React, { useRef, useState } from "react";
import {
    Button,
    ButtonGroup,
    Col,
    Container,
    Dropdown,
    Form,
    FormControl,
    FormGroup,
    Image,
    InputGroup,
    Row,
} from "react-bootstrap";
import { Editor } from "react-draft-wysiwyg";
import htmlToDraft from "html-to-draftjs";
import draftToHtml from "draftjs-to-html";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { useAppDispatch, useAppSelector } from "../../app/hook";
import { apiRoute, colors } from "../../constants";
import { Category, Product, ProductDescription, SubCategory } from "../../models";
import classes from "./post-product-page.module.css";
import { imageService } from "../../services";
import { requestUploadProduct } from "../../app/reducers/product-slice";
import { useNavigate } from "react-router-dom";

interface PostError {
    name?: string;
    startingPrice?: string;
    stepPrice?: string;
    buyPrice?: string;
    category?: string;
    subCategory?: string;
    images?: string;
}

export const PostProductPage = () => {
    const [product, setProduct] = useState<Product>({});
    const [errors, setErrors] = useState<PostError>({});

    const errorsMsg = {
        name: "Tên sản phẩm phải nhiều hơn 1 ký tự.",
        startingPrice: "Sản phẩm phải có giá khởi điểm",
        stepPrice: "Sản phẩm phải có bước giá",
        buyPrice: "Giá mua ngay phải lớn hơn giá khởi điểm",
        category: "Danh mục chính không được trống",
        subCategory: "Danh mục phụ không được trống",
        images: "Phải có ít nhất 3 ảnh",
    };

    const [imageFiles, setImageFiles] = useState<File[]>([]);

    const imageInputRef = useRef<HTMLInputElement>(null);

    const onImageUploadClick = () => {
        imageInputRef.current?.click();
    };

    const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(event.target.files ?? []);
        if (files.length > 5) {
            alert("Chỉ có thể tải tối đa 5 ảnh");
            return;
        }
        setImageFiles(files);
    };

    const onImageRemove = (index: number) => {
        setImageFiles(imageFiles.filter((_, i) => i !== index));
    };

    const onNameChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setProduct({ ...product, name: event.target.value });

        if (event.target.value.trim().length < 1) {
            setErrors({ ...errors, name: errorsMsg.name });
        } else {
            setErrors({ ...errors, name: undefined });
        }
    };

    const onPriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setProduct({ ...product, currentPrice: parseInt(event.target.value) });

        if (event.target.value.length < 1) {
            setErrors({ ...errors, startingPrice: errorsMsg.startingPrice });
        } else {
            setErrors({ ...errors, startingPrice: undefined });
        }
    };

    const onStepPriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setProduct({ ...product, stepPrice: parseInt(event.target.value) });

        if (event.target.value.length < 1) {
            setErrors({ ...errors, stepPrice: errorsMsg.stepPrice });
        } else {
            setErrors({ ...errors, stepPrice: undefined });
        }
    };

    const [isHavingBuyPrice, setIsHavingBuyPrice] = useState(false);
    const buyPriceRef = useRef<HTMLInputElement>(null);

    const onBuyPriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const buyPrice = parseInt(event.target.value);

        if (isHavingBuyPrice && product.currentPrice && buyPrice < product.currentPrice) {
            setErrors({ ...errors, buyPrice: errorsMsg.buyPrice });
        } else {
            setErrors({ ...errors, buyPrice: undefined });
        }

        setProduct({ ...product, buyPrice: buyPrice });
    };

    const onBuyPriceEnable = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.checked) {
            buyPriceRef.current?.focus();
            setIsHavingBuyPrice(true);
        } else {
            setIsHavingBuyPrice(false);
            setErrors({ ...errors, buyPrice: undefined });
        }
    };

    const { categories } = useAppSelector((state) => state.categoryState);

    const onCategoryChange = (category: Category) => {
        if (category.id !== product.category?.id) {
            setProduct({ ...product, category: category, subCategory: undefined });
        }
    };

    const onSubcategoryChange = (subcategory: SubCategory) => {
        setProduct({ ...product, subCategory: subcategory });
    };

    const [editorState, setEditorState] = useState(EditorState.createEmpty());
    const onEditorStateChange = (editorState: EditorState) => {
        setEditorState(editorState);
    };

    const renderWarning = (msg: string) => {
        return (
            <div className={`${classes["errors"]} d-flex align-items-center`}>
                <Icon icon="ep:warning" />
                <span className="mx-2">{msg}</span>
            </div>
        );
    };

    const isValidated = (): boolean => {
        console.log(!product.name || product.name.trim().length === 0);
        if (!product.name || product.name.trim().length === 0) {
            alert(errorsMsg.name);
            return false;
        }

        if (!product.currentPrice) {
            alert(errorsMsg.startingPrice);
            return false;
        }

        if (!product.stepPrice) {
            alert(errorsMsg.stepPrice);
            return false;
        }

        if (isHavingBuyPrice && product.currentPrice && product.buyPrice && product.buyPrice < product.currentPrice) {
            alert(errorsMsg.buyPrice);
            return false;
        }

        if (!product.category) {
            alert(errorsMsg.category);
            return false;
        }

        if (!product.subCategory) {
            alert(errorsMsg.subCategory);
            return false;
        }

        if (imageFiles.length < 3) {
            alert(errorsMsg.images);
            return false;
        }

        return true;
    };

    const dispatch = useAppDispatch();

    const navigate = useNavigate();

    const onSubmit = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();

        if (isValidated()) {
            const description: ProductDescription = {
                content: draftToHtml(convertToRaw(editorState.getCurrentContent())),
                createdAt: new Date(),
            };

            setProduct({ ...product, description: [description], imageFiles: imageFiles });

            dispatch(
                requestUploadProduct({
                    ...product,
                    description: [description],
                    imageFiles: imageFiles,
                }),
            );

            alert("Sản phẩm của bạn đang được sử lý");
            navigate(`${apiRoute.HOME}`, { replace: true });
        }
    };

    return (
        <div className={`${classes["page-wrapper"]}`}>
            <Container className={`${classes["page-content"]}`}>
                <Row>
                    <Col sm={3} className={`${classes["img-group"]} p-3 d-inline-block h-25`}>
                        <div>
                            {imageFiles.length !== 0 &&
                                imageFiles.map((file, index) => {
                                    return (
                                        <div key={index} className={`my-2 d-flex align-items-end flex-column`}>
                                            <div
                                                className={`${classes["img-remove"]} mx-2`}
                                                onClick={() => onImageRemove(index)}
                                            >
                                                <Icon icon="bi:x-lg" />
                                            </div>
                                            <Image
                                                src={URL.createObjectURL(file)}
                                                className={`${classes["img-thumb"]}`}
                                            />
                                        </div>
                                    );
                                })}
                        </div>

                        {imageFiles.length < 5 && (
                            <div
                                className={`${classes["upload-btn"]} d-flex justify-content-around align-items-center p-2`}
                                onClick={onImageUploadClick}
                            >
                                <Icon icon="ant-design:upload-outlined" fontSize={40} />
                                <span className="text-end">CHỌN ẢNH</span>
                                <input
                                    type="file"
                                    accept="image/*"
                                    multiple
                                    ref={imageInputRef}
                                    onChange={onFileChange}
                                    hidden
                                />
                            </div>
                        )}
                    </Col>
                    <Col>
                        <div className={`${classes["info-form"]} p-3`}>
                            <Form>
                                <FormGroup>
                                    <InputGroup className={`${classes["text"]} my-2`}>
                                        <InputGroup.Text className={`${classes["label"]}`}>
                                            Tên Sản Phẩm *
                                        </InputGroup.Text>
                                        <FormControl
                                            autoFocus
                                            minLength={1}
                                            maxLength={100}
                                            onChange={onNameChange}
                                            isInvalid={errors.name !== undefined}
                                        />
                                        <InputGroup.Text className={`${classes["label"]}`}>
                                            {product.name?.length ?? 0}/100
                                        </InputGroup.Text>
                                        <FormControl.Feedback type="invalid">{errors.name}</FormControl.Feedback>
                                    </InputGroup>
                                </FormGroup>

                                <Row>
                                    <Col>
                                        <FormGroup>
                                            <InputGroup className={`${classes["text"]} my-2`}>
                                                <InputGroup.Text className={`${classes["label"]}`}>
                                                    Giá Khởi Điểm *
                                                </InputGroup.Text>
                                                <FormControl
                                                    minLength={1}
                                                    maxLength={12}
                                                    onChange={onPriceChange}
                                                    type="number"
                                                    isInvalid={errors.startingPrice !== undefined}
                                                />
                                                <InputGroup.Text className={`${classes["label"]}`}>VND</InputGroup.Text>
                                                <FormControl.Feedback type="invalid">
                                                    {errors.startingPrice}
                                                </FormControl.Feedback>
                                            </InputGroup>
                                        </FormGroup>
                                    </Col>

                                    <Col>
                                        <FormGroup>
                                            <InputGroup className={`${classes["text"]} my-2`}>
                                                <InputGroup.Text className={`${classes["label"]}`}>
                                                    Bước Giá *
                                                </InputGroup.Text>
                                                <FormControl
                                                    minLength={1}
                                                    maxLength={12}
                                                    onChange={onStepPriceChange}
                                                    type="number"
                                                    isInvalid={errors.stepPrice !== undefined}
                                                />
                                                <InputGroup.Text className={`${classes["label"]}`}>VND</InputGroup.Text>
                                                <FormControl.Feedback type="invalid">
                                                    {errors.stepPrice}
                                                </FormControl.Feedback>
                                            </InputGroup>
                                        </FormGroup>
                                    </Col>
                                </Row>

                                <FormGroup>
                                    <InputGroup className={`${classes["text"]} my-2`}>
                                        <InputGroup.Text className={`${classes["label"]}`}>
                                            Giá Mua Ngay
                                        </InputGroup.Text>
                                        <FormControl
                                            minLength={1}
                                            maxLength={15}
                                            onChange={onBuyPriceChange}
                                            type="number"
                                            disabled={!isHavingBuyPrice}
                                            ref={buyPriceRef}
                                            isInvalid={errors.buyPrice !== undefined}
                                        />
                                        <InputGroup.Text className={`${classes["label"]}`}>VND</InputGroup.Text>
                                        <FormControl.Feedback type="invalid">{errors.buyPrice}</FormControl.Feedback>
                                    </InputGroup>

                                    <div className="d-flex justify-content-end align-items-center">
                                        <input id="isHavingBuyPrice" type="checkbox" onChange={onBuyPriceEnable} />
                                        <label className="mx-2" htmlFor="isHavingBuyPrice">
                                            Có giá mua ngay
                                        </label>
                                    </div>
                                </FormGroup>

                                <Row className="my-3 d-flex justify-content-end align-items-center">
                                    <Col sm={3}>
                                        <FormGroup>
                                            <Dropdown
                                                as={ButtonGroup}
                                                className="w-100"
                                                style={{ backgroundColor: colors.primary, color: colors.primary }}
                                            >
                                                <Dropdown.Toggle>
                                                    {product.category?.name ?? "Danh Mục Chính * "}
                                                </Dropdown.Toggle>

                                                <Dropdown.Menu>
                                                    {categories.map((category, index) => {
                                                        if (category.id !== 1)
                                                            return (
                                                                <Dropdown.Item
                                                                    key={index}
                                                                    className="w-100"
                                                                    onClick={() => onCategoryChange(category)}
                                                                >
                                                                    {category.name}
                                                                </Dropdown.Item>
                                                            );
                                                    })}
                                                </Dropdown.Menu>
                                            </Dropdown>
                                        </FormGroup>
                                    </Col>

                                    <Col sm={3}>
                                        <FormGroup>
                                            <Dropdown as={ButtonGroup} className="w-100">
                                                <Dropdown.Toggle>
                                                    {product.subCategory?.name ?? "Danh Mục Phụ * "}
                                                </Dropdown.Toggle>

                                                <Dropdown.Menu>
                                                    {categories
                                                        .filter(
                                                            (category) =>
                                                                product.category &&
                                                                category.id === product.category?.id,
                                                        )
                                                        .flatMap((category) => category.subCategories ?? [])
                                                        .map((subCategory, index) => {
                                                            return (
                                                                <Dropdown.Item
                                                                    key={index}
                                                                    className="w-100"
                                                                    onClick={() => onSubcategoryChange(subCategory)}
                                                                >
                                                                    {subCategory?.name}
                                                                </Dropdown.Item>
                                                            );
                                                        })}
                                                </Dropdown.Menu>
                                            </Dropdown>
                                        </FormGroup>
                                    </Col>
                                </Row>

                                <div className="my-4">
                                    <Editor
                                        editorState={editorState}
                                        onEditorStateChange={onEditorStateChange}
                                        editorClassName={`${classes["editor"]} px-3`}
                                    />
                                </div>

                                <div>
                                    {errors.name && renderWarning(errorsMsg.name)}
                                    {errors.category && renderWarning(errorsMsg.category)}
                                    {errors.subCategory && renderWarning(errorsMsg.subCategory)}
                                    {errors.images && renderWarning(errorsMsg.images)}
                                </div>

                                <div className="d-flex justify-content-end">
                                    <Button
                                        type="submit"
                                        style={{ backgroundColor: colors.primary }}
                                        className={`${classes["submit-btn"]} px-4`}
                                        onClick={onSubmit}
                                    >
                                        Đăng Bán
                                    </Button>
                                </div>
                            </Form>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};
