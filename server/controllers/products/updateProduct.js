import asyncHandler from "express-async-handler";
import Product from "../../models/Product.js";

export const updateProduct = asyncHandler(async (req, res) => {
	const { name, category, quantity, price, description } = req.body;
	const { id } = req.params;

	const product = await Product.findById(id);

	// 1. Check if product exists
	if (!product) {
		res.status(404);
		throw new Error("Product not found");
	}

	// 2. Security Check: Ownership
	if (product.user.toString() !== req.user.id) {
		res.status(401);
		throw new Error("User not authorized to update this product");
	}

	// 3. Update Product
	const updatedProduct = await Product.findByIdAndUpdate(
		id,
		{
			name,
			category,
			quantity,
			price,
			description,
			// Note: We don't update 'user' field, so ownership never changes
		},
		{
			new: true, // Return the updated document
			runValidators: true, // Ensure data is valid
		}
	);

	res.status(200).json(updatedProduct);
});
