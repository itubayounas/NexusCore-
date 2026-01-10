import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useRedirectLoggedOutUser } from "../hook/useRedirectLoggedOutUser";
import axios from "axios";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import { FaSpinner } from "react-icons/fa";

const EditProduct = () => {
	useRedirectLoggedOutUser("/login");
	const { id } = useParams();
	const navigate = useNavigate();
	const [isLoading, setIsLoading] = useState(false);

	const [product, setProduct] = useState({
		name: "",
		category: "",
		sku: "", // 1. Added SKU to state
		quantity: "",
		price: "",
		description: "",
	});

	// Fetch Data on Load
	useEffect(() => {
		const getProduct = async () => {
			setIsLoading(true);
			try {
				const { data } = await axios.get(`/api/products/${id}`);
				setProduct({
					name: data.name,
					category: data.category,
					sku: data.sku, // 2. Load existing SKU
					quantity: data.quantity,
					price: data.price,
					description: data.description,
				});
				setIsLoading(false);
			} catch (error) {
				setIsLoading(false);
				toast.error("Could not load product data");
			}
		};
		getProduct();
	}, [id]);

	const handleInputChange = (e) => {
		const { name, value } = e.target;

		// Validation: prevent negative numbers / limit length
		if (name === "price" || name === "quantity") {
			if (value < 0) return;
			if (value.length > 8) return;
		}

		setProduct({ ...product, [name]: value });
	};

	const updateProduct = async (e) => {
		e.preventDefault();
		setIsLoading(true);

		try {
			await axios.patch(`/api/products/${id}`, product);
			toast.success("Product Updated Successfully");
			navigate("/inventory");
		} catch (error) {
			setIsLoading(false);
			toast.error(error.response?.data?.message || error.message);
		}
	};

	return (
		<div className="flex justify-center items-center min-h-[80vh] text-white">
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				className="glass w-full max-w-3xl p-8 shadow-2xl"
			>
				<h2 className="text-3xl font-bold mb-8 text-center border-b border-gray-600 pb-4">
					Edit Product
				</h2>

				<form onSubmit={updateProduct} className="space-y-6">
					<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
						{/* Name */}
						<div className="col-span-2">
							<label className="block text-sm font-medium text-gray-300 mb-2">
								Product Name
							</label>
							<input
								type="text"
								name="name"
								value={product.name}
								onChange={handleInputChange}
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
								value={product.category}
								onChange={handleInputChange}
								className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-3 text-white focus:border-brand-500 focus:outline-none transition"
							/>
						</div>

						{/* SKU (Editable) */}
						<div>
							<label className="block text-sm font-medium text-gray-300 mb-2">
								SKU
							</label>
							<input
								type="text"
								name="sku"
								value={product.sku}
								onChange={handleInputChange}
								className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-3 text-white focus:border-brand-500 focus:outline-none transition font-mono uppercase"
							/>
						</div>

						{/* Price */}
						<div>
							<label className="block text-sm font-medium text-gray-300 mb-2">
								Price ($)
							</label>
							<input
								type="number"
								name="price"
								value={product.price}
								onChange={handleInputChange}
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
								value={product.quantity}
								onChange={handleInputChange}
								className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-3 text-white focus:border-brand-500 focus:outline-none transition"
							/>
						</div>

						{/* Description */}
						<div className="col-span-2">
							<label className="block text-sm font-medium text-gray-300 mb-2">
								Description
							</label>
							<textarea
								name="description"
								value={product.description}
								onChange={handleInputChange}
								rows="4"
								className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-3 text-white focus:border-brand-500 focus:outline-none transition"
							></textarea>
						</div>
					</div>

					{/* Submit Button */}
					<button
						type="submit"
						disabled={isLoading}
						className="w-full bg-brand-600 hover:bg-brand-500 text-white font-bold py-4 rounded-xl shadow-lg transition flex justify-center items-center"
					>
						{isLoading ? (
							<FaSpinner className="animate-spin text-2xl" />
						) : (
							"Update Product"
						)}
					</button>
				</form>
			</motion.div>
		</div>
	);
};

export default EditProduct;
