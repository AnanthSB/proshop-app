import dotenv from "dotenv";
import express from "express";
import products from "./data/products.js";
import cors from "cors";
import connectDB from "./config/db.js";
import productRoutes from "./routes/productRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import { errorHandler, notFound } from "./middleware/errorMiddleWare.js";
import cookieParser from "cookie-parser";
import logger from "./utils/logger.js";

dotenv.config();
connectDB();
// const port = 5000;

const port = process?.env?.PORT || 5000;
const app = express();

// Body Parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// cookie-parser middleware
app.use(cookieParser());

app.use(cors());

// app.use(logger);

app.get("/", (req, res) => {
  res.send("API is Running...");
});

app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => console.log(`Server is running on the port: ${port}`));
