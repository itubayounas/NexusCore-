import express from "express";
import { createProduct } from "../controllers/productController.js";


const router = express.Router();

// Define the route
// This matches POST requests to "/" (which will be "/api/products" in the main file)
router.post("/", createProduct);

export default router;
