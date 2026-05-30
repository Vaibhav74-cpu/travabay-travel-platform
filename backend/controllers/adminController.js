import { sendOtpEmail } from "../config/emailConfig.js";
import asyncHandler from "../middleware/asyncHandler.js";
import Admin from "../model/adminModel.js";
import generateToken from "../util/generateToken.js";
// import jwt from "jsonwebtoken";
// import cookie from "cookie-parser";

//      @desc    get token and get auth user
//      @routes  POST /api/admin/login
//      @access  /public
export const authAdmin = asyncHandler(async (req, res) => {
  const { email } = req.body;
  const admin = await Admin.findOne({ email });

  if (admin) {
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    admin.otp = otp;
    admin.otpExpire = Date.now() + 2 * 60 * 1000;

    await admin.save();
    await sendOtpEmail(admin, otp);

    res.status(200).json({
      _id: admin._id,
      email: admin.email,
      isAdmin: admin.isAdmin,
      message: "otp sent on your email",
    });
  } else {
    res.status(401);
    throw new Error("Invalid email");
  }
});

//      @desc    logout the admin & destroy token/cookie
//      @routes  POST /api/admin/logout
//      @access  /private
export const logoutAdmin = asyncHandler(async (req, res) => {
  //logout -> clear token inside cookied
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
    secure: process.env.NODE_ENV !== "development",
    sameSite: "strict",
  });

  res.status(200).json("Logged Out Succesfully");
});

//      @desc    verify email with otp
//      @routes  post /api/admin/verify-email
//      @access  /private user
export const verifyEmailOtp = asyncHandler(async (req, res) => {
  const { email, otp } = req.body;

  const admin = await Admin.findOne({ email });

  if (!admin) {
    return res.status(404).json({
      success: false,
      message: "Admin not found",
    });
  }

  if (!admin.otp) {
    res.status(400);
    throw new Error("otp did not send on mail");
  }

  if (admin.otp !== otp) {
    res.status(400);
    throw new Error("Invalid OTP");
  }

  if (admin.otpExpire < Date.now()) {
    res.status(400);
    throw new Error("OTP expired");
  }

  admin.otp = undefined;
  admin.otpExpire = undefined;
  await admin.save();

  generateToken(res, admin._id);

  res.status(200).json({
    success: true,
    adminId: admin._id,
    email: admin.email,
    isAdmin: admin.isAdmin,
    message: "Email verified successfully",
  });
});
