import jwt from "jsonwebtoken";
import asyncHandler from "./asyncHandler.js";
import User from "../models/userModels.js";

// Protect routes
export const protect = asyncHandler(async (req, res, next) => {
  let token;

  // Read jwt from cookie
  token = req.cookies.jwt;

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRETE);
      await User.findById(decoded.userId).select("-password");
      next();
    } catch (error) {
      console.log(error);
      res.status(401);
      throw Error("Not authorized, token failed");
    }
  } else {
    res.status(401);
    throw Error("Not authorized, no token");
  }
});

// Admin middleware
export const admin = (req, res, next) => {
  if (req?.user && req?.user?.isAdmin) {
    next();
  } else {
    res.status(401);
    throw Error("N0 authorized as admin");
  }
};
