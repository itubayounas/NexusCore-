import asyncHandler from "express-async-handler";
import Product from "../../models/Product.js";

export const updateProduct = asyncHandler(async (req, res) => {
	// 1. Get data from Frontend
	const { name, category, quantity, price, description } = req.body;
	const { id } = req.params;

	const product = await Product.findById(id);

	// 2. Check if product exists
	if (!product) {
		res.status(404);
		throw new Error("Product not found");
	}

	// 3. Security Check: Ownership
	if (product.user.toString() !== req.user.id) {
		res.status(401);
		throw new Error("User not authorized to update this product");
	}

	// 4. Update Product
	const updatedProduct = await Product.findByIdAndUpdate(
		id,
		{
			// Fallback logic: If frontend didn't send 'name', keep the old 'product.name'
			name: name || product.name,
			category: category || product.category,
			price: price || product.price,
			description: description || product.description,

			// ⚠️ THE IMPORTANT CHANGE FOR QUANTITY ⚠️
			// We check specifically if quantity is undefined.
			// This ensures that if you send '0', it saves '0' instead of ignoring it.
			quantity: quantity !== undefined ? quantity : product.quantity,
		},
		{
			new: true, // Return the updated document
			runValidators: true, // Ensure data is valid
		}
	);

	res.status(200).json(updatedProduct);
});
