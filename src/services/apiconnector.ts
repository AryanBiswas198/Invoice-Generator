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
    token?: any; 
    products?: [] | null;
    product?: any | null;
    BlobPart?: any | null;
}

// Define the specific data interfaces
interface User {
    id: number;
    name: string;
    email: string;
    createdAt: string;
    updatedAt: string;
}

// Define the apiConnector function
type ApiConnector = <T = any>(
    method: AxiosRequestConfig['method'],
    url: string,
    bodyData?: any,
    headers?: AxiosRequestConfig['headers'],
    params?: AxiosRequestConfig['params'],
    responseType?: AxiosRequestConfig['responseType']
) => Promise<AxiosResponse<ResponseData<T>>>;

export const apiConnector: ApiConnector = (method, url, bodyData, headers, params, responseType) => {
    return axiosInstance({
        method: method,
        url: url,
        data: bodyData,
        headers: headers,
        params: params,
        responseType: responseType
    });
};
