const BASE_URL: string = import.meta.env.VITE_BASE_URL as string;

export const endpoints = {
    SENDOTP_API: BASE_URL + "/auth/sendotp",
    SIGNUP_API: BASE_URL + "/auth/signup",
    LOGIN_API: BASE_URL + "/auth/login",
};

export const productEndpoints = {
    ADDPRODUCT_API: BASE_URL + "/product/addProduct",
    REMOVEPRODUCT_API: BASE_URL + "/product/removeProduct",
    UPDATE_PRODUCT_QUANTITY_API: BASE_URL + "/product/updateProductQuantity",
    CALCULATE_TOTAL_RATE_API: BASE_URL + "/product/calculateTotalRate",
    GET_ALL_USER_PRODUCTS_API: BASE_URL + "/product/getAllUserProducts",
}