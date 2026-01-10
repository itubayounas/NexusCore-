import asyncHandler from "express-async-handler";
import Product from "../../models/Product.js";

export const getProduct = asyncHandler(async (req, res) => {
	const product = await Product.findById(req.params.id);

	// 1. Check if product exists
	if (!product) {
		res.status(404);
		throw new Error("Product not found");
	}

	// 2. Security Check: Does this product belong to the logged-in user?
	if (product.user.toString() !== req.user.id) {
		res.status(401);
		throw new Error("User not authorized to view this product");
	}

	res.status(200).json(product);
});
