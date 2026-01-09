import express from "express";
import { createProduct } from "../controllers/products/productController.js";
import { getProducts } from "../controllers/products/getProducts.js";
import { getProduct } from "../controllers/products/getProduct.js";
import { deleteProduct } from "../controllers/products/deleteproduct.js";
import { updateProduct } from "../controllers/products/updateProduct.js";


const router = express.Router();

router.get("/", getProducts);

// Create a new product
router.post("/", createProduct);

// -------------------------------------------
// Specific Routes (ID required)
// -------------------------------------------

// Get a single product by ID
router.get("/:id", getProduct);

// Delete a single product by ID
router.delete("/:id", deleteProduct);

// Update a single product by ID
router.patch("/:id", updateProduct);

export default router;
