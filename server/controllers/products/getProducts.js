import asyncHandler from "express-async-handler";
import Product from "../../models/Product.js";

export const getProducts = asyncHandler(async (req, res) => {
	// 1. Fetch products where 'user' matches the logged-in user's ID
	const products = await Product.find({ user: req.user.id }).sort(
		"-createdAt"
	);

	// 2. Send data
	res.status(200).json(products);
});
