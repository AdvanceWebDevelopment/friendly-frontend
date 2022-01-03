import { Icon } from "@iconify/react";
import { ContentState, convertToRaw, EditorState } from "draft-js";
import draftToHtml from "draftjs-to-html";
import htmlToDraft from "html-to-draftjs";
import React, { useState } from "react";
import { Button, Col, Image, Row, Spinner } from "react-bootstrap";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hook";
import { requestUpdateProductDescription, setEditProduct } from "../../app/reducers/product-slice";
import { apiRoute, colors } from "../../constants";
import { Product } from "../../models";
import { formatPrice } from "../../utils";
import Bidder from "../product/bid-info/Bidder";
import BidButton from "../product/button/BidButton";
import ProductModal from "../product/modal/product/ProductBidModal";
import Heading from "../product/price-heading/Heading";
import ProductOptions from "../product/ProductOptions";
import classes from "./product-detail.module.css";

interface ProductDetailProps {
    product: Product;
}

export const ProductDetail = ({ product }: ProductDetailProps) => {
    const dispatch = useAppDispatch();
    const { isEditProduct, isUpdatingProductDescription } = useAppSelector((state) => state.productState);

    const [editorState, setEditorState] = useState(EditorState.createEmpty());
    const onEditorStateChange = (editorState: EditorState) => {
        setEditorState(editorState);
    };

    const [showBidModal, setShowBidModal] = useState(false);

    const showBidModalHandler = () => {
        setShowBidModal(true);
    };

    const closeBidModalHandler = () => {
        setShowBidModal(false);
    };

    const onCancelEdit = () => {
        dispatch(setEditProduct(false));
    };

    const onSave = () => {
        dispatch(setEditProduct(false));

        const newDescription = draftToHtml(convertToRaw(editorState.getCurrentContent()));
        if (newDescription.trim().length > 0) {
            dispatch(requestUpdateProductDescription({ product, description: newDescription.trim() }));
        }
    };

    return (
        <div>
            <Row className="mb-5">
                <Col className={`p-3 mx-2 ${classes["field-content"]}`} sm={9}>
                    <div className="d-flex justify-content-between">
                        <div>
                            <Link className={classes["breadcrumb-item"]} to={`/${apiRoute.CATEGORY}/1`}>
                                Danh mục
                            </Link>
                            <span className={`mx-1`}>/</span>
                            <Link
                                className={classes["breadcrumb-item"]}
                                to={`/${apiRoute.CATEGORY}/${product?.category?.id}`}
                            >
                                {product?.category?.name}
                            </Link>
                            <span className={`mx-1`}>/</span>
                            <Link
                                className={classes["breadcrumb-item"]}
                                to={`/${apiRoute.CATEGORY}/${product?.category?.id}`}
                                state={{ subCategoryId: product?.subCategory?.id }}
                            >
                                {product?.subCategory?.name}
                            </Link>
                        </div>

                        <div>
                            <ProductOptions product={product} />
                        </div>
                    </div>

                    <div>
                        <div className={`${classes["product-name"]}`}>{product?.name}</div>
                    </div>

                    <div className="mb-3">
                        <Image
                            src={product?.seller?.avatar}
                            width={30}
                            height={30}
                            className={`rounded-circle mx-1 ${classes["avatar"]}`}
                        />

                        <span className={`${classes["seller-name"]}`}>{product?.seller?.name}</span>

                        <span className={`${classes["middle-dot"]} mx-1`}>•</span>

                        <span className={`${classes["seller-point"]}`}>{product?.seller?.points?.toFixed(1)}</span>

                        <span className={`${classes["middle-dot"]} mx-1`}>•</span>

                        <span className={`${classes["post-date"]}`}>
                            đăng từ {product?.postDate?.toLocaleDateString("en-AU")}
                        </span>
                    </div>

                    <div className={`${classes["product-content-wrapper"]}`}>
                        {product?.description?.map((productDescription, index) => {
                            const blocksFromHtml = htmlToDraft(productDescription?.content ?? "");
                            const { contentBlocks, entityMap } = blocksFromHtml;
                            const contentState = ContentState.createFromBlockArray(contentBlocks, entityMap);
                            const editorState = EditorState.createWithContent(contentState);

                            return (
                                <div key={index}>
                                    <div className={`${classes["description-label"]}`}>
                                        <Icon icon="bx:bx-pen" />
                                        <span>{productDescription?.createdAt?.toLocaleDateString("en-AU")}</span>
                                    </div>

                                    <div className={`${classes["description-content"]}`}>
                                        {<Editor editorState={editorState} readOnly toolbarHidden />}
                                    </div>
                                </div>
                            );
                        })}
                        {isUpdatingProductDescription && (
                            <Spinner animation="border" variant="primary" className="d-block mx-auto" />
                        )}
                    </div>

                    {isEditProduct && (
                        <div>
                            <Editor
                                editorState={editorState}
                                onEditorStateChange={onEditorStateChange}
                                editorClassName={`${classes["editor"]} px-3`}
                            />

                            <div className="d-flex justify-content-end mt-3">
                                <Button className="mx-1" style={{ backgroundColor: colors.primary }} onClick={onSave}>
                                    Lưu Thay Đổi
                                </Button>

                                <Button
                                    className="mx-1"
                                    style={{
                                        backgroundColor: colors.subPrimary,
                                        color: colors.subSecondary,
                                        borderColor: colors.primary,
                                    }}
                                    onClick={onCancelEdit}
                                >
                                    Hủy
                                </Button>
                            </div>
                        </div>
                    )}
                </Col>

                <Col className={`p-3 mx-2 d-inline-block h-25 ${classes["field-content"]}`}>
                    <div className="d-flex flex-column justify-content-center align-items-center">
                        <div className={`${classes["endDate-label"]}`}>Kết thúc</div>
                        <div className={`${classes["endDate"]}`}>{product?.endDate?.toLocaleDateString("en-AU")}</div>
                        <div className={`${classes["endDate-underline"]}`}></div>
                    </div>

                    <div className="d-flex justify-content-between align-items-center my-1">
                        <Bidder totalBidCount={product?.currentBids ?? 0} bidder={product?.highestBidder} />

                        <div className="text-end">
                            <Heading content="Giá hiện tại" color="#6fc47f" />
                            <div className={`${classes["price"]}`}>{formatPrice(product.currentPrice ?? 0)}</div>
                        </div>
                    </div>

                    <div className="d-flex justify-content-between align-items-center my-1">
                        <Icon icon="emojione-monotone:money-bag" color="#ee4730" width={42} height={45} />

                        <div className="text-end">
                            <Heading content="Mua ngay" color="#ee4730" />
                            <div className={`${classes["price"]}`}>{formatPrice(product.buyPrice ?? 0)}</div>
                        </div>
                    </div>

                    <div className="d-flex justify-content-between align-items-center mt-5">
                        <BidButton openModal={showBidModalHandler} />
                        <ProductOptions product={product} />
                    </div>
                </Col>
                <ProductModal show={showBidModal} handleClose={closeBidModalHandler} />
            </Row>
        </div>
    );
};
