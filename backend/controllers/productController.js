import asyncHandler from '../middleware/asyncHandler.js';
import Product from '../models/products.js';

// desc   Fetch all products
//@route  GET /api/products
//access  Public
const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({});
  res.json(products);
});

// desc   Fetch all products
//@route  GET /api/products
//access  Public
const getProductById = asyncHandler(async (req, res) => {
  const product = await Product?.findById(req.params.id);
  if (product) {
    res.json(product);
  } else {
    res.status(404);
    throw new Error(`Resource not found!`);
  }
});

// desc   Create a product
//@route  POST/api/products
//access  Private/Admin
const createProduct = asyncHandler(async (req, res) => {
  const product = new Product({
    name: 'Sample name',
    price: 0,
    user: req.user?._id,
    image: '/images/sample.jpg',
    brand: 'Sample brand',
    category: 'Sample Category',
    countInStock: 0,
    numReviews: 0,
    description: 'Sample Description'
  });

  const createdProduct = await product.save();
  res.status(201).json(createdProduct);
});

// desc   Update a products
//@route  PUT /api/products/:id
//access  Private/Admin
const updateProducts = asyncHandler(async (req, res) => {
  const { name, price, description, image, brand, category, countInStock } =
    req.body;
  const product = await Product.findById(req.params.id);
  if (product) {
    product.name = name || product.name;
    product.price = price || product.price;
    product.description = description || product.description;
    product.image = image || product.image;
    product.brand = brand || product.brand;
    product.category = category || product.category;
    product.countInStock = countInStock || product.countInStock;

    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } else {
    res.status(404);
    throw new Error('Resource not found');
  }
});

const deleteProducts = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    await product.remove({ _id: product._id });
    res.json(200).json({ messag: 'Product deleted' });
    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } else {
    res.status(404);
    throw new Error('Resource not found');
  }
});

export {
  getProducts,
  getProductById,
  createProduct,
  updateProducts,
  deleteProducts
};
