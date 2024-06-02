import { toast } from "react-hot-toast";
import { ThunkDispatch } from "@reduxjs/toolkit";
import { AnyAction } from "redux";
import { RootState } from "../../reducer";
import { endpoints } from "../apis";
import { apiConnector } from "../apiconnector";
import { setLoading, setToken } from "../../slices/authSlice";
import { setUser } from "../../slices/profileSlice";

export type AppDispatch = ThunkDispatch<RootState, void, AnyAction>;


// Define the endpoints
const {
    SENDOTP_API,
    SIGNUP_API,
    LOGIN_API,
} = endpoints;



export const sendOtp = (email: string, navigate: (path: string) => void) => {
    return async (dispatch: AppDispatch) => {
      const toastId = toast.loading("Loading...");
      dispatch(setLoading(true));
      try {
        const response = await apiConnector("POST", SENDOTP_API, {
          email,
          checkUserPresent: true,
        });
  
        console.log("SEND_OTP API RESPONSE -> ", response);
  
        if (!response.data.success) {
          throw new Error(response.data.message);
        }
  
        toast.success("OTP Sent Successfully");
        navigate("/verify-email");
      } catch (error) {
        console.log("SEND_OTP_API_ERROR................", error);
        toast.error("Could not send OTP");
      }
      dispatch(setLoading(false));
      toast.dismiss(toastId);
    };
  };


// Define the function to sign up
export const signUp = (
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    confirmPassword: string,
    otp: string,
    navigate: (path: string) => void
) => async (dispatch: AppDispatch) => {
    const toastId = toast.loading("Loading...");
    dispatch(setLoading(true));

    try {
        const response = await apiConnector("POST", SIGNUP_API, {
            firstName,
            lastName,
            email,
            password,
            confirmPassword,
            otp,
        });

        console.log("SIGNUP API RESPONSE............", response);

        if (!response.data.success) {
            throw new Error(response.data.message);
        }
        toast.success("Signup Successful");
        navigate("/loginPage");
    } 
    catch (error) {
        console.log("SIGNUP API ERROR............", error);
        toast.error("Signup Failed");
        navigate("/signupPage");
    }

    dispatch(setLoading(false));
    toast.dismiss(toastId);
};




export const login = (
    email: string,
    password: string,
    navigate: (path: string) => void
) => async (dispatch: AppDispatch) => {
    const toastId = toast.loading("Loading...");
    dispatch(setLoading(true));

    try {
        const response = await apiConnector("POST", LOGIN_API, {
            email,
            password,
        });

        console.log("LOGIN API RESPONSE............", response);

        if (!response.data.success) {
            throw new Error(response.data.message);
        }

        toast.success("Login Successful");
        dispatch(setToken(response.data?.token));
        const userImage =
            response.data.data?.user?.image ||
            `https://api.dicebear.com/5.x/initials/svg?seed=${response.data?.data?.user?.firstName} ${response.data?.data?.user?.lastName}`;
        dispatch(
            setUser({ ...response.data?.data?.user, image: userImage })
        );

        localStorage.setItem(
            "token",
            JSON.stringify(response.data.token)
        );

        localStorage.setItem("user", JSON.stringify(response.data.user));

        navigate("/product-page");
    } catch (error) {
        console.log("LOGIN API ERROR............", error);
        toast.error("Login Failed");
    }

    dispatch(setLoading(false));
    toast.dismiss(toastId);
};