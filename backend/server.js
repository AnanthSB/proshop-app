import dotenv from "dotenv";
dotenv.config();
import express from "express";
import products from "./data/products.js";
import cors from "cors";
// const port = 5000;
const port = process?.env?.PORT || 5000;
const app = express();
app.use(cors());

app.get("/", (req, res) => {
  res.send("API is Running...");
});

app.get("/products", (req, res) => {
  res.json(products);
});

app.get("/api/products", (req, res) => {
  res.json(products);
});

app.get("/api/products/:id", (req, res) => {
  const id = req.params.id;
  const product = products?.find((product) => product?._id === id);
  res.json(product);
});

app.listen(port, () => console.log(`Server is running on the port: ${port}`));
