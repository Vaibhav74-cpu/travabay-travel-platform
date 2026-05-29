import { useLoginMutation } from "@/redux/slices/adminApiSlice";
import { setOtpEmail } from "@/redux/slices/authSlice";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "sonner";

function LoginScreen() {
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.auth);
  const [login, { isLoading }] = useLoginMutation();

  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get("redirect") || "/";

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [userInfo, navigate, redirect]);

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const res = await login({ email }).unwrap();
      dispatch(setOtpEmail(res.email));
      toast.success(
        res?.data?.message || res?.data || "Otp sent on your email - check it",
      );
      navigate("/admin/verify-email");
    } catch (error) {
      toast.error(error?.data?.message || "Email is Invalid");
    }
  };

  return (
    <div className="min-h-screen bg-gray-200 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Admin Login</h1>

        <p className="text-gray-500 text-base mb-8">
          Enter your authorized admin email to receive a one-time password.
        </p>

        <form onSubmit={submitHandler} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Admin email
            </label>

            <input
              type="email"
              value={email}
              placeholder="admin@example.com"
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-400"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 rounded-full text-white font-semibold text-lg bg-gradient-to-r from-indigo-500 to-purple-600 shadow-lg hover:opacity-90 transition duration-300 disabled:opacity-70"
          >
            send otp
          </button>
        </form>
      </div>
    </div>
  );
}

export default LoginScreen;
