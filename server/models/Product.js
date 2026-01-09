import mongoose from "mongoose";

const productSchema = mongoose.Schema(
	{
		name: {
			type: String,
			required: [true, "Please add a product name"],
			trim: true,
		},
		sku: {
			type: String,
			required: true,
			unique: true, // No two products can have the same Barcode/SKU
			trim: true,
		},
		category: {
			type: String,
			required: true,
			default: "General",
		},
		quantity: {
			type: Number,
			required: true,
			default: 0,
		},
		price: {
			type: Number,
			required: true,
			default: 0.0,
		},
		description: {
			type: String,
			required: false,
		},
		// This adds a timestamp for when the product was created and last updated
	},
	{
		timestamps: true,
	}
);

const Product = mongoose.model("Product", productSchema);

export default Product;
