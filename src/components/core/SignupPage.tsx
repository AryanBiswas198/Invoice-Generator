import React from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { setSignupData } from "../../slices/authSlice";
import { sendOtp } from "../../services/operations/authAPI";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import SignupMemoji from "../../assets/SignupMemoji.png";

import { AppDispatch } from "../../services/operations/authAPI";

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const SignupPage: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const onSubmit = async (data: FormData) => {
    if (data.password !== data.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    dispatch(setSignupData(data)); 
    dispatch(sendOtp(data.email, navigate));
  };

  return (
    <div className="bg-black min-h-screen flex flex-col md:flex-row items-center justify-center p-4">
      <div className="md:w-66 md:mr-20 mb-10 md:mb-0 ">
        <img
          src={SignupMemoji}
          alt="Signup Memoji"
          className="w-64 md:w-full"
          style={{ margin: "0 auto" }}
        />
      </div>
      <div className="bg-gray-950 p-8 md:p-12 rounded-2xl w-full md:max-w-md shadow-lg-purple">
        {/* Adjusted width to 80 Tailwind CSS units */}
        <h2 className="font-bold text-white text-4xl mb-6">Sign Up</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="w-full">
          <input
            type="text"
            {...register("firstName", { required: true })}
            placeholder="Enter your first name"
            className="w-full px-4 py-3 mb-7 bg-gray-950 text-white border border-pure-greys-5 rounded-md focus:outline-none"
            style={{ borderWidth: ".1px" }}
          />
          {errors.firstName && (
            <span className="text-white">First Name is required</span>
          )}
          <input
            type="text"
            {...register("lastName", { required: true })}
            placeholder="Enter your last name"
            className="w-full px-4 py-3 mb-7 bg-gray-950 text-white border border-pure-greys-5 rounded-md focus:outline-none"
            style={{ borderWidth: ".1px" }}
          />
          {errors.lastName && (
            <span className="text-white">Last Name is required</span>
          )}
          <input
            type="email"
            {...register("email", { required: true })}
            placeholder="Enter your email"
            className="w-full px-4 py-3 mb-7 bg-gray-950 text-white border border-pure-greys-5 rounded-md focus:outline-none"
            style={{ borderWidth: ".1px" }}
          />
          {errors.email && (
            <span className="text-white">Email is required</span>
          )}
          <input
            type="password"
            {...register("password", { required: true })}
            placeholder="Enter your password"
            className="w-full px-4 py-3 mb-7 bg-gray-950 text-white border border-pure-greys-5 rounded-md focus:outline-none"
            style={{ borderWidth: ".1px" }}
          />
          {errors.password && (
            <span className="text-white">Password is required</span>
          )}
          <input
            type="password"
            {...register("confirmPassword", { required: true })}
            placeholder="Please confirm the password"
            className="w-full px-4 py-3 mb-11 bg-gray-950 text-white border border-pure-greys-5 rounded-md focus:outline-none"
            style={{ borderWidth: ".1px" }}
          />
          {errors.confirmPassword && (
            <span className="text-white">Confirm Password is required</span>
          )}
          <button
            type="submit"
            className="w-full px-4 py-2 mb-2 border border-black text-white font-semibold rounded-md focus:outline-none transition-all duration-300 ease-in-out"
            style={{
              background: "linear-gradient(to right, #667EEA, #764BA2)",
              backgroundSize: "200% auto",
              backgroundPosition: "right center",
            }}
            onMouseEnter={(e) =>
              ((e.target as HTMLElement).style.backgroundPosition =
                "right center")
            }
            onMouseLeave={(e) =>
              ((e.target as HTMLElement).style.backgroundPosition =
                "left center")
            }
          >
            Sign Up
          </button>
          <p className="text-center my-2 text-white py-2">or</p>
          <h2 className="text-center text-white mb-6">
            Already have an account?
            <Link to="/loginPage">
              <span
                style={{
                  background: "linear-gradient(to right, #667EEA, #764BA2)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                {" "}
                Login
              </span>
            </Link>
          </h2>
        </form>
      </div>
    </div>
  );
};

export default SignupPage;
