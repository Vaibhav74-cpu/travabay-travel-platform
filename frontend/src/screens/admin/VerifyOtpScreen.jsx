import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { setCredentials } from "@/redux/slices/authSlice";
import { toast } from "sonner";
import { useVerifyOtpMutation } from "@/redux/slices/adminApiSlice";

function VerifyOtpScreen() {
  const [verifyOtp] = useVerifyOtpMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [otp, setOtp] = useState("");
  const { otpEmail } = useSelector((state) => state.auth);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      // const res = await axios.post(
      //   `https://travabay-travel-platform.onrender.com/api/admin/verify-email`,
      //   {
      //     email: otpEmail,
      //     otp,
      //   },
      //   { withCredentials: true },
      // );

      const res = await verifyOtp({ email: otpEmail, otp }).unwrap();
      dispatch(setCredentials(res.data));
      toast.success(res?.data?.message || res?.message || "Login Sucessfully");
      navigate("/admin/packages");
    } catch (error) {
      toast.error(error?.data?.message || error?.data || "Invalid Otp");
    }
  };

  return (
    <div className="min-h-screen bg-gray-200 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Verify OTP</h1>

        <p className="text-gray-500 text-base mb-8">
          Enter the one-time password sent to your email.
        </p>

        <form onSubmit={submitHandler} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Enter OTP
            </label>

            <input
              type="text"
              value={otp}
              placeholder="Enter OTP"
              onChange={(e) => setOtp(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-400"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-full text-white font-semibold text-lg bg-gradient-to-r from-indigo-500 to-purple-600 shadow-lg hover:opacity-90 transition duration-300"
          >
            Verify OTP
          </button>
        </form>
      </div>
    </div>
  );
}

export default VerifyOtpScreen;
