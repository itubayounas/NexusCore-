import mongoose from "mongoose";

const productSchema = mongoose.Schema(
	{
		// --- ADD THIS NEW FIELD ---
		user: {
			type: mongoose.Schema.Types.ObjectId, // It stores a User ID
			required: true,
			ref: "User", // It references the 'User' collection
		},
		// --------------------------
		name: {
			type: String,
			required: [true, "Please add a name"],
			trim: true,
		},
		sku: {
			type: String,
			required: true,
			default: "SKU",
			trim: true,
		},
		category: {
			type: String,
			required: [true, "Please add a category"],
			trim: true,
		},
		quantity: {
			type: String,
			required: [true, "Please add a quantity"],
			trim: true,
		},
		price: {
			type: String,
			required: [true, "Please add a price"],
			trim: true,
		},
		description: {
			type: String,
			required: [true, "Please add a description"],
			trim: true,
		},
		image: {
			type: Object,
			default: {},
		},
	},
	{
		timestamps: true,
	}
);

const Product = mongoose.model("Product", productSchema);
export default Product;
