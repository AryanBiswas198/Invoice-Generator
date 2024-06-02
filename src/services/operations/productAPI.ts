import { toast } from "react-hot-toast";
import { ThunkDispatch } from "@reduxjs/toolkit";
import { AnyAction } from "redux";
import { RootState } from "../../reducer";
import { apiConnector } from "../apiconnector";
import { productEndpoints } from "../apis";
import { setLoading, addProduct, removeProduct, updateProductQuantity, setTotalGST, setTotalRate } from "../../slices/productsSlice";

const {
    ADDPRODUCT_API,
    REMOVEPRODUCT_API,
    UPDATE_PRODUCT_QUANTITY_API,
    CALCULATE_TOTAL_RATE_API,
    GET_ALL_USER_PRODUCTS_API,
} = productEndpoints;


export type AppDispatch = ThunkDispatch<RootState, void, AnyAction>;


export const addProductAPI = (productData: any, token: string | null) => {
    return async (dispatch: AppDispatch) => {
        const toastId = toast.loading("Adding product...");
        dispatch(setLoading(true));

        try {
            const response = await apiConnector("POST", ADDPRODUCT_API, productData, {
                Authorization: `Bearer ${token}`,
            });
            console.log("ADD PRODUCT API RESPONSE -> ", response);

            if (!response.data.success) {
                throw new Error(response.data.message);
            }

            dispatch(addProduct(response.data?.product));
            toast.success("Product added successfully");

            dispatch(setLoading(false));
            toast.dismiss(toastId);
            return response;
        } 
        catch (error) {
            console.error("ADD PRODUCT API ERROR -> ", error);
            toast.error("Failed to add product");
        }

        dispatch(setLoading(false));
        toast.dismiss(toastId);
    };
};



export const removeProductAPI = (id: string, token: string | null) => {
    return async (dispatch: AppDispatch) => {
        const toastId = toast.loading("Removing product...");
        dispatch(setLoading(true));
        try {
            const response = await apiConnector("DELETE", REMOVEPRODUCT_API, { id }, {
                Authorization: `Bearer ${token}`,
            });
            console.log("REMOVE PRODUCT API RESPONSE -> ", response);

            if (!response.data.success) {
                throw new Error(response.data.message);
            }

            dispatch(removeProduct(id));
            toast.success("Product removed successfully");
        } 
        catch (error) {
            console.error("REMOVE PRODUCT API ERROR -> ", error);
            toast.error("Failed to remove product");
        }
        dispatch(setLoading(false));
        toast.dismiss(toastId);
    };
};


export const updateProductQuantityAPI = (id: string, quantity: number, token: string | null) => {
    return async (dispatch: AppDispatch) => {
        const toastId = toast.loading("Updating product quantity...");
        dispatch(setLoading(true));

        try {
            console.log("Printing Quantity in Product API frontend: ", quantity);
            const response = await apiConnector("PUT", UPDATE_PRODUCT_QUANTITY_API, {
                id,
                quantity,
            }, {
                Authorization: `Bearer ${token}`,
            });
            console.log("UPDATE PRODUCT QUANTITY API RESPONSE -> ", response);

            if (!response.data.success) {
                throw new Error(response.data.message);
            }

            dispatch(updateProductQuantity({ id: id, quantity }));
            toast.success("Product quantity updated successfully");
        } 
        catch (error) {
            console.error("UPDATE PRODUCT QUANTITY API ERROR -> ", error);
            toast.error("Failed to update product quantity");
        }

        dispatch(setLoading(false));
        toast.dismiss(toastId);
    };
};



export interface TotalRateAndGST {
    totalRate: number;
    totalGST: number;
}

export const calculateTotalRateAPI = () => {
    return async (dispatch: AppDispatch) => {
        const toastId = toast.loading("Calculating total rate...");
        dispatch(setLoading(true));

        try {
            const response = await apiConnector("GET", CALCULATE_TOTAL_RATE_API);
            console.log("CALCULATE TOTAL RATE API RESPONSE -> ", response);

            if (!response.data.success) {
                throw new Error(response.data.message);
            }

            const { totalRate, totalGST }: TotalRateAndGST = response.data?.data;
            toast.success(`Total rate and GST calculated successfully`);
            // You can dispatch actions to store totalRate and totalGST in Redux state if needed
            dispatch(setTotalRate(totalRate));
            dispatch(setTotalGST(totalGST));
        } 
        catch (error) {
            console.error("CALCULATE TOTAL RATE API ERROR -> ", error);
            toast.error("Failed to calculate total rate and GST");
        }

        dispatch(setLoading(false));
        toast.dismiss(toastId);
    };
};


export const getAllUserProductsAPI = () => {
    return async (dispatch: AppDispatch) => {
      const toastId = toast.loading("Fetching user products...");
      dispatch(setLoading(true));
  
      try {
        const response = await apiConnector("GET", GET_ALL_USER_PRODUCTS_API);
        console.log("GET ALL USER PRODUCTS API RESPONSE -> ", response);
  
        if (!response.data.success) {
          throw new Error(response.data.message);
        }
  
        const userProducts = response.data?.data?.userProducts;
        if (userProducts) {
          userProducts.forEach((product: any) => {
            dispatch(addProduct(product));
          });
        }
        toast.success("User products fetched successfully");
      } catch (error) {
        console.error("GET ALL USER PRODUCTS API ERROR -> ", error);
        toast.error("Failed to fetch user products");
      }
  
      dispatch(setLoading(false));
      toast.dismiss(toastId);
    };
  };