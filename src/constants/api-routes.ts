export const apiRoute = {
    ADMIN: "admin",
    BUY: "buy",
    HOME: "/",
    CATEGORY: "category",
    SUB_CATEGORY: "subcategory",
    PRODUCT: "product",
    PRODUCTS: "products",
    PROFILE: "profile",
    LOGIN: "login",
    FORGOT: "forgot-pwd",
    REGISTER: "register",
    CHANGE: "change-pwd",
    POST_PRODUCT: "post-product",
    SELLER: "seller",
    USER: "user",
    USERS: "users",
    WATCH_LIST: "watch-list",
    BIDDER: "bidder",
    WINNER: "winner",
    WIN: "win",
    EVALUATION: "evaluation",
    AUTH: "host/auth",
    AUTO: "auto",
};

export const HOST = process.env.REACT_APP_API_HOST;

export const API_HOST = HOST + "/api";

export const IMAGE_HOST = "https://api.cloudinary.com/v1_1/nettruyenz/image/upload";
