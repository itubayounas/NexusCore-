import React, { useState } from "react";
import { useRedirectLoggedOutUser } from "../hook/useRedirectLoggedOutUser";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaSpinner, FaSyncAlt } from "react-icons/fa";

const AddProduct = () => {
	useRedirectLoggedOutUser("/login");
	const navigate = useNavigate();

	const [product, setProduct] = useState({
		name: "",
		sku: "",
		category: "",
		quantity: "",
		price: "",
		description: "",
	});

	const [isLoading, setIsLoading] = useState(false);
	const { name, sku, category, quantity, price, description } = product;

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		// Validation logic
		if (name === "price" || name === "quantity") {
			if (value < 0) return;
			if (value.length > 8) return;
		}
		setProduct({ ...product, [name]: value });
	};

	const generateSKU = () => {
		const categoryPrefix = category
			? category.slice(0, 3).toUpperCase()
			: "SKU";
		const numberPart = Date.now().toString().slice(-6);
		const newSKU = `${categoryPrefix}-${numberPart}`;

		setProduct({ ...product, sku: newSKU });
		toast.info("SKU Auto-Generated!");
	};

	const saveProduct = async (e) => {
		e.preventDefault();
		setIsLoading(true);

		if (!name || !category || !quantity || !price || !description || !sku) {
			setIsLoading(false);
			return toast.error("Please fill in all fields");
		}

		try {
			await axios.post("/api/products", product);
			toast.success("Product Added Successfully!");
			navigate("/inventory");
			setIsLoading(false);
		} catch (error) {
			setIsLoading(false);
			toast.error(error.response?.data?.message || error.message);
		}
	};

	return (
		<div className="flex justify-center items-center min-h-[80vh] text-white p-4">
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				// UPDATED: Reduced padding on mobile (p-5), larger on desktop (md:p-10)
				className="glass w-full max-w-3xl p-5 md:p-10 shadow-2xl"
			>
				<h2 className="text-3xl font-bold mb-6 text-center text-white border-b border-gray-600 pb-4">
					Add New Product
				</h2>

				<form onSubmit={saveProduct} className="space-y-6">
					{/* UPDATED: Grid layout. 1 col on mobile, 2 cols on small screens+ */}
					<div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
						{/* Name (Spans 2 columns on sm+) */}
						<div className="sm:col-span-2">
							<label className="block text-sm font-medium text-gray-300 mb-2">
								Product Name
							</label>
							<input
								type="text"
								name="name"
								value={name}
								onChange={handleInputChange}
								placeholder="e.g. Nike Air Jordan"
								className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-3 text-white focus:border-brand-500 focus:outline-none transition"
							/>
						</div>

						{/* Category */}
						<div>
							<label className="block text-sm font-medium text-gray-300 mb-2">
								Category
							</label>
							<input
								type="text"
								name="category"
								value={category}
								onChange={handleInputChange}
								placeholder="e.g. Shoes"
								className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-3 text-white focus:border-brand-500 focus:outline-none transition"
							/>
						</div>

						{/* SKU */}
						<div>
							<label className="block text-sm font-medium text-gray-300 mb-2">
								SKU (Barcode)
							</label>
							<div className="flex items-center gap-2">
								<input
									type="text"
									name="sku"
									value={sku}
									onChange={handleInputChange}
									placeholder="Scan or Type SKU"
									className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-3 text-white focus:border-brand-500 focus:outline-none transition font-mono uppercase"
								/>
								<button
									type="button"
									onClick={generateSKU}
									className="bg-slate-700 hover:bg-slate-600 text-white p-3 rounded-lg transition"
									title="Auto Generate SKU"
								>
									<FaSyncAlt />
								</button>
							</div>
						</div>

						{/* Price */}
						<div>
							<label className="block text-sm font-medium text-gray-300 mb-2">
								Price ($)
							</label>
							<input
								type="number"
								name="price"
								value={price}
								onChange={handleInputChange}
								min="0"
								placeholder="0.00"
								className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-3 text-white focus:border-brand-500 focus:outline-none transition"
							/>
						</div>

						{/* Quantity */}
						<div>
							<label className="block text-sm font-medium text-gray-300 mb-2">
								Quantity
							</label>
							<input
								type="number"
								name="quantity"
								value={quantity}
								onChange={handleInputChange}
								min="0"
								placeholder="0"
								className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-3 text-white focus:border-brand-500 focus:outline-none transition"
							/>
						</div>

						{/* Description (Spans 2 columns on sm+) */}
						<div className="sm:col-span-2">
							<label className="block text-sm font-medium text-gray-300 mb-2">
								Description
							</label>
							<textarea
								name="description"
								value={description}
								onChange={handleInputChange}
								rows="4"
								placeholder="Description..."
								className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-3 text-white focus:border-brand-500 focus:outline-none transition resize-none"
							></textarea>
						</div>
					</div>

					{/* Submit Button */}
					<div className="mt-8">
						<button
							type="submit"
							disabled={isLoading}
							className="w-full bg-brand-600 hover:bg-brand-500 text-white font-bold py-4 rounded-xl shadow-lg transition flex justify-center items-center"
						>
							{isLoading ? (
								<FaSpinner className="animate-spin text-2xl" />
							) : (
								"Save Product"
							)}
						</button>
					</div>
				</form>
			</motion.div>
		</div>
	);
};

export default AddProduct;
