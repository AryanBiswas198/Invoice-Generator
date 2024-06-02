import React, { useState, ChangeEvent, FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signUp, sendOtp } from "../services/operations/authAPI";
import ThinkMemoji from "../assets/ThinkMemoji.png"; // Import the ThinkMemoji image
import { RootState } from "../reducer"; // Import RootState from your store

export default function VerifyEmail() {
  const [otp, setOtp] = useState<string>("");
  const { signupData } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleOtpChange = (e: ChangeEvent<HTMLInputElement>) => {
    setOtp(e.target.value);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const { firstName, lastName, email, password, confirmPassword } =
      signupData;

    dispatch(
      signUp(
        firstName,
        lastName,
        email,
        password,
        confirmPassword,
        otp,
        navigate
      ) as any
    );
  };

  const handleResend = () => {
    dispatch(sendOtp(signupData.email, navigate) as any);
  };

  const handleClose = () => {
    navigate("/");
  };

  return (
    <div className="bg-black min-h-screen flex flex-col md:flex-row items-center justify-center p-4">
      <div className="order-1 md:order-2 md:w-66 md:mr-20 mb-10 md:mb-0 flex items-center justify-center">
        <img
          src={ThinkMemoji}
          alt="Think Memoji"
          className="w-64 md:w-full"
          style={{ margin: "0 auto" }}
        />
      </div>
      <div className="order-2 md:order-1 bg-black p-8 md:p-12 rounded-2xl w-full md:max-w-lg shadow-lg-purple md:mr-14">
        <h2 className="font-bold text-white text-4xl mb-6">
          Two-Step Verification
        </h2>
        <div className="mb-4 flex flex-col items-center">
          <SmartphoneIcon className="mb-3 h-12 w-12 text-white" />
          <p className="my-4 text-center text-sm text-white">
            {`Please enter the OTP (one-time password) to verify your account. A Code has been sent to ${signupData.email}`}
          </p>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              placeholder="Enter your OTP"
              type="text"
              value={otp}
              onChange={handleOtpChange}
              className="w-full px-4 py-3 mb-1 bg-gray-950 rounded-md border border-gray-50 focus:outline-none text-white"
            />
          </div>
          <div className="mb-4">
            <button
              type="submit"
              className="w-full my-3 border font-semibold border-gray-50 bg-white text-black hover:bg-black hover:text-white px-4 py-2 rounded-md"
            >
              Verify
            </button>
          </div>
        </form>
        <div className="flex flex-col items-center space-y-2">
          <button className="text-sm text-white my-2" onClick={handleResend}>
            Not received your code?
            <span
              style={{
                background: "linear-gradient(to right, #667EEA, #764BA2)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              {" "}
              Resend Code
            </span>
          </button>
          <Link to="/signupPage" className="text-sm text-white hover:underline">
            Back To SignUp
          </Link>
        </div>
      </div>
    </div>
  );
}

interface SmartphoneIconProps extends React.SVGProps<SVGSVGElement> {}

function SmartphoneIcon(props: SmartphoneIconProps) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="14" height="20" x="5" y="2" rx="2" ry="2" />
      <path d="M12 18h.01" />
    </svg>
  );
}
