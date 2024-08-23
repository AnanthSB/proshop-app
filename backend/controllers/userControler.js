import asyncHandler from "../middleware/asyncHandler.js";
import user from "../models/userModels.js";

// desc   Auth user & get token
//@route  GET /api/users/login
//access  Public
const authUser = asyncHandler(async (req, res) => {
  res.send("auth user");
});

// desc   Register user
//@route  POST /api/users
//access  Public
const registerUser = asyncHandler(async (req, res) => {
  res.send("Register user");
});

// desc   Logout user and clear cookies
//@route  POST /api/users/logout
//access  Private
const logoutUser = asyncHandler(async (req, res) => {
  res.send("Logout user");
});

// desc   Get user profile
//@route  GET /api/users/profile
//access  Private
const getUserProfile = asyncHandler(async (req, res) => {
  res.send("Get user Profile");
});

// desc   Update user profile
//@route  PUT /api/users/profile
//access  Private
const updateUserProfile = asyncHandler(async (req, res) => {
  res.send("Update Profile");
});

// desc   Get all users
//@route  GET /api/users
//access  Private/Admin
const getUsers = asyncHandler(async (req, res) => {
  res.send("Get All USers");
});

// desc   Get user by id
//@route  GET /api/users/:id
//access  Private/Admin
const getUserByID = asyncHandler(async (req, res) => {
  res.send("Get user by id");
});

// desc   Delete user
//@route  Delete /api/users/:id
//access  Private/Admin
const deleteUser = asyncHandler(async (req, res) => {
  res.send("Delete User");
});

// desc   Update user
//@route  PUT /api/users/:id
//access  Private/Admin
const updateUser = asyncHandler(async (req, res) => {
  res.send("Update USers");
});

export {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  getUserByID,
  deleteUser,
  updateUser,
};
