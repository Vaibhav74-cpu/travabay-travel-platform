import asyncHandler from "./asyncHandler.js";
// import cookieParser from "cookie-parser";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import Admin from "../model/adminModel.js";

dotenv.config();

export const protect = asyncHandler(async (req, res, next) => {
  let token;
  token = req.cookies.jwt;

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
     

      const adminId = decoded.adminId;

      req.admin = await Admin.findById(adminId);
      next();
    } catch (error) {
      res.status(401);
      throw new Error("unauthorised user, token failed");
    }
  } else {
    res.status(401);
    throw new Error("unauthorised user, no token");
  }
});

export const admin = (req, res, next) => {
  if (req.admin && req.admin.isAdmin === true) {
    next();
  } else {
    throw new Error("not authorized as admin");
  }
};
