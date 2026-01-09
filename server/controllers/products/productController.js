

import Product from "../../models/Product.js";

// @access  Public (for now)
export const createProduct = async (req, res) => {
	try {
		// 1. Get data from the user/frontend
		const { name, sku, category, quantity, price, description } = req.body;

		// 2. Check if product with this SKU already exists
		const productExists = await Product.findOne({ sku });
		if (productExists) {
			return res
				.status(400)
				.json({ message: "Product with this SKU already exists" });
		}

		// 3. Create the product in the database
		const product = await Product.create({
			name,
			sku,
			category,
			quantity,
			price,
			description,
		});

		// 4. Send back the success message
		res.status(201).json(product);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};
