import asyncHandler from "express-async-handler";
import Product from "../../models/Product.js";

export const deleteProduct = asyncHandler(async (req, res) => {
	const product = await Product.findById(req.params.id);

	// 1. Check if product exists
	if (!product) {
		res.status(404);
		throw new Error("Product not found");
	}

	// 2. Security Check: Ownership
	if (product.user.toString() !== req.user.id) {
		res.status(401);
		throw new Error("User not authorized to delete this product");
	}

	// 3. Delete
	await product.deleteOne(); // Use deleteOne() instead of remove()
	res.status(200).json({ message: "Product deleted successfully" });
});
