import asyncHandler from '../middleware/asyncHandler.js';
import { errorHandler } from '../middleware/errorMiddleWare.js';
import User from '../models/userModels.js';
import jwt from 'jsonwebtoken';
import generateToken from '../utils/generateToken.js';

// desc   Auth user & get token
//@route  GET /api/users/login
//access  Public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req?.body;
  const user = await User?.findOne({ email });

  if (user && (await user?.matchPassword(password))) {
    // generateToken(res, user);
    const token = jwt.sign({ userId: user?._id }, process.env.JWT_SECRET, {
      expiresIn: '30d'
    });

    //Set JWT as HTTP-only cookie
    res.cookie('jwt', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== 'development',
      sameSite: 'strict',
      maxAge: 30 * 24 * 60 * 60 * 1000 //30 days
    });
    res.status(200).json({
      _id: user?._id,
      name: user?.name,
      email: user?.email,
      password: user?.password,
      isAdmin: user?.isAdmin
    });
  } else {
    res.status(401);
    throw new Error('Invalid email or password');
    res.send('No user found');
  }
});

// desc   Register user
//@route  POST /api/users
//access  Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req?.body;
  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error('User already exists');
  }

  const user = await User.create({
    name,
    email,
    password
  });

  if (user) {
    generateToken(res, user?._id);
    res.status(201).json({
      _id: user?._id,
      name: user?.name,
      email: user?.email,
      isAdmin: user?.isAdmin
    });
  } else {
    res.status(400);
    throw new Error('Invalid user data');
  }
  res.send('Register user');
});

// desc   Logout user and clear cookies
//@route  POST /api/users/logout
//access  Private
const logoutUser = asyncHandler(async (req, res) => {
  res.cookie('jwt', '', { httpsOnly: true, expires: new Date(0) });
  res.status(200).json({ message: 'Logged Out Succesfully' });
  // res.send("Logout user");
});

// desc   Get user profile
//@route  GET /api/users/profile
//access  Private
const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req?.body?._id);
  if (user) {
    res.status(200).json({
      _id: user?._id,
      name: user?.name,
      email: user?.email,
      isAdmin: user?.isAdmin
    });
  } else {
    res.status(404);
    throw new Error(`User data not found\n${user}`);
    // throw new Error("User data not found.");
  }
});

// desc   Update user profile
//@route  PUT /api/users/profile
//access  Private
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req?.body?._id);
  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;

    if (req.body.password) {
      user.password = req?.body.password;
    }
    const updatedUser = await user.save();
    res.status(200).json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin
    });
  } else {
    res.status(404);
    throw new Error('User data not found.');
  }
});

// desc   Get all users
//@route  GET /api/users
//access  Private/Admin
const getUsers = asyncHandler(async (req, res) => {
  res.send('Get All USers');
});

// desc   Get user by id
//@route  GET /api/users/:id
//access  Private/Admin
const getUserByID = asyncHandler(async (req, res) => {
  res.send('Get user by id');
});

// desc   Delete user
//@route  Delete /api/users/:id
//access  Private/Admin
const deleteUser = asyncHandler(async (req, res) => {
  res.send('Delete User');
});

// desc   Update user
//@route  PUT /api/users/:id
//access  Private/Admin
const updateUser = asyncHandler(async (req, res) => {
  res.send('Update Users');
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
  updateUser
};
