import cors from "cors";
import express from "express";
import { Product } from "./Model/ProductModel.js";
import userRoutes from "./Routes/userRoutes.js";
import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

app.use(cors());
app.use(express.json({ limit: "1mb" }));

app.use("/api/users", userRoutes);

app.get("/health", (_req, res) => {
  res.status(200).json({
    status: "ok",
    service: "backend",
    database: mongoose.connection.readyState === 1 ? "connected" : "disconnected",
  });
});

app.get("/products", async (_req, res) => {
  try {
    const result = await Product.find().sort({ createdAt: -1 });
    res.status(200).json(result);
  } catch (error) {
    console.error("Error fetching products", error);
    res.status(500).json({
      message: "Unable to fetch products",
      error: error.message,
    });
  }
});

app.post("/products", async (req, res) => {
  try {
    const savedProduct = await Product.create(req.body);
    res.status(201).json({
      message: "Product created successfully",
      product: savedProduct,
    });
  } catch (error) {
    console.error("Error creating product", error);
    res.status(500).json({
      message: "Something went wrong",
      error: error.message,
    });
  }
});

app.get("/products/:id", async (req, res) => {
  try {
    const singleProduct = await Product.findById(req.params.id);

    if (!singleProduct) {
      return res.status(404).json({ message: "No product found" });
    }

    res.status(200).json({
      message: "Product fetched successfully",
      product: singleProduct,
    });
  } catch (error) {
    console.error("Error fetching product", error);
    res.status(400).json({
      message: "Invalid product id",
      error: error.message,
    });
  }
});

app.delete("/products/:id", async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);

    if (!deletedProduct) {
      return res
        .status(404)
        .json({ message: "No product matches specified id" });
    }

    res.status(200).json({
      message: "Product deleted successfully",
      product: deletedProduct,
    });
  } catch (error) {
    console.error("Error deleting product", error);
    res.status(400).json({
      message: "Invalid product id",
      error: error.message,
    });
  }
});

app.put("/products/:id", async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedProduct) {
      return res
        .status(404)
        .json({ message: "No product matches specified id." });
    }

    res.status(200).json({
      message: "Product updated successfully",
      product: updatedProduct,
    });
  } catch (error) {
    console.error("Error updating product", error);
    res.status(400).json({
      message: "Unable to update product",
      error: error.message,
    });
  }
});

app.patch("/products/:id", async (req, res) => {
  try {
    const updatedField = await Product.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true, runValidators: true }
    );

    if (!updatedField) {
      return res
        .status(404)
        .json({ message: "No product matches specified id." });
    }

    res.status(200).json({
      message: "Field successfully updated",
      product: updatedField,
    });
  } catch (error) {
    console.error("Error updating field", error);
    res.status(400).json({
      message: "Unable to update product",
      error: error.message,
    });
  }
});

if (!MONGO_URI) {
  console.warn("MONGO_URI is not set. The API will start, but database requests will fail.");
}

mongoose
  .connect(MONGO_URI || "mongodb://127.0.0.1:27017/trendify")
  .then(() => console.log("Mongodb successfully connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});