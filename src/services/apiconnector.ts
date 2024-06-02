import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";

// Define the Axios instance
const axiosInstance: AxiosInstance = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
});

// Define the generic ResponseData interface
interface ResponseData<T = any> {
    success: boolean;
    message: string;
    data: T;
    user?: User | null; 
    token?: string | null; 
}

// Define the specific data interfaces
interface User {
    id: number;
    name: string;
    email: string;
    createdAt: string;
    updatedAt: string;
}

interface Item {
    id: number;
    name: string;
    description: string;
    price: number;
}

interface Pagination {
    currentPage: number;
    totalPages: number;
    pageSize: number;
    totalItems: number;
}

interface PaginatedResponse<T = any> {
    items: T[];
    pagination: Pagination;
}

// Define the apiConnector function
type ApiConnector = <T = any>(
    method: AxiosRequestConfig['method'],
    url: string,
    bodyData?: any,
    headers?: AxiosRequestConfig['headers'],
    params?: AxiosRequestConfig['params']
) => Promise<AxiosResponse<ResponseData<T>>>;

export const apiConnector: ApiConnector = (method, url, bodyData, headers, params) => {
    return axiosInstance({
        method: method,
        url: url,
        data: bodyData,
        headers: headers,
        params: params
    });
};
