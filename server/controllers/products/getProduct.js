import Product from "../../models/Product.js";

export const getProduct = async (req, res) => {
	try {
		const { id } = req.params;
		const product = await Product.findById(id);

		if (!product) {
			res.status(404);
			throw new Error("Product not found");
		}

		res.status(200).json(product);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};
