import Product from "../../models/Product.js";

export const updateProduct = async (req, res) => {
	try {
		const { id } = req.params;

		const product = await Product.findByIdAndUpdate(id, req.body, {
			new: true,
			runValidators: true,
		});

		if (!product) {
			res.status(404);
			throw new Error("Product not found");
		}

		res.status(200).json(product);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};
