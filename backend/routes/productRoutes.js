import express from 'express';
// import products from "../data/products.js";
import asyncHandler from '../middleware/asyncHandler.js';
import Product from '../models/products.js';
import {
  createProduct,
  getProductById,
  getProducts
} from '../controllers/productController.js';
import { admin, protect } from '../middleware/authMiddleWare.js';
const router = express.Router();

router.route('/').get(getProducts).post(protect, admin, createProduct);
router.route('/:id').get(getProductById);

// router.get(
//   "/",
//   asyncHandler(async (req, res) => {
//     const products = await Product?.find({});
//     throw new Error('Something went wrong!');

//     res.json(products);
//   })
// );

// router.get(
//   "/:id",
//   asyncHandler(async (req, res) => {
//     const product = await Product?.findById(req.params.id);
//     if (product) {
//       res.json(product);
//     }else{
//       res.status(404);
//       throw new Error(`Resource not found!`);
//     }
//   })
// );

export default router;
