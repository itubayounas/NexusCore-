import express from "express";
// import protect from "../middleware/authMiddleware.js"; // <--- Import the Security Guard
import { createProduct } from "../controllers/products/productController.js";
import { getProducts } from "../controllers/products/getProducts.js";
import { getProduct } from "../controllers/products/getProduct.js";
import { deleteProduct } from "../controllers/products/deleteproduct.js";
import { updateProduct } from "../controllers/products/updateProduct.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

// -------------------------------------------
// Apply 'protect' to ALL routes
// -------------------------------------------

// Get All Products (User Specific)
router.get("/", protect, getProducts);

// Create a new product (User Specific)
router.post("/", protect, createProduct);

// Get a single product by ID
router.get("/:id", protect, getProduct);

// Delete a single product by ID
router.delete("/:id", protect, deleteProduct);

// Update a single product by ID
router.patch("/:id", protect, updateProduct);

export default router;
