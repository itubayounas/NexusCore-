import expressAsyncHandler from "express-async-handler";
import Product from "../../models/Product.js";


export const createProduct = expressAsyncHandler(async (req, res) => {
	const { name, sku, category, quantity, price, description } = req.body;

	// 1. Validation
	if (!name || !sku || !category || !quantity || !price || !description) {
		res.status(400);
		throw new Error("Please fill in all fields");
	}

	// 2. Check if THIS user already has a product with this SKU
	// We check for both 'sku' AND 'user'
	const productExists = await Product.findOne({ sku, user: req.user.id });

	if (productExists) {
		res.status(400);
		throw new Error(
			"Product with this SKU already exists in your inventory"
		);
	}

	// 3. Create Product
	const product = await Product.create({
		user: req.user.id, // <--- Links the product to the logged-in user
		name,
		sku,
		category,
		quantity,
		price,
		description,
		image: {}, // Placeholder for now until we add image upload logic here too
	});

	res.status(201).json(product);
});
