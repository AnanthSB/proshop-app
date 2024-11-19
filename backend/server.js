import dotenv from 'dotenv';
import express from 'express';
import products from './data/products.js';
import connectDB from './config/db.js';
import productRoutes from './routes/productRoutes.js';
import userRoutes from './routes/userRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import { errorHandler, notFound } from './middleware/errorMiddleWare.js';
import logger from './utils/logger.js';

dotenv.config();
connectDB();

const port = process?.env?.PORT || 5000;
const app = express();

// Body Parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// app.use(logger);

app.get('/', (req, res) => {
  res.send('API is Running...');
});

app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);

app.get('/api/config/paypal', (req, res) =>
  res.send({ clientId: process.env.PAYPAL_CLIENT_ID })
);

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => console.log(`Server is running on the port: ${port}`));
