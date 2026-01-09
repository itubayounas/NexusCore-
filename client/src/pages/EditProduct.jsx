import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"; // If you use Redux, otherwise ignore
import { useNavigate, useParams } from "react-router-dom"; // useParams grabs the ID from URL
import { toast } from "react-toastify";
import {
	FaTag,
	FaBarcode,
	FaLayerGroup,
	FaBoxes,
	FaDollarSign,
	FaAlignLeft,
	FaSave,
	FaArrowLeft,
} from "react-icons/fa";
import productService from "../services/productService";
import {
	formatCurrency,
	validateProductForm,
} from "../utils/productValidation";

const EditProduct = () => {
	const { id } = useParams(); // Get ID from the URL (e.g., /edit-product/123)
	const navigate = useNavigate();

	const [isLoading, setIsLoading] = useState(false);
	// Initial state is empty, will be filled by useEffect
	const [product, setProduct] = useState({
		name: "",
		sku: "",
		category: "",
		quantity: "",
		price: "",
		description: "",
	});

	// --- 1. FETCH DATA ON LOAD ---
	useEffect(() => {
		const getProductData = async () => {
			setIsLoading(true);
			try {
				const data = await productService.getProduct(id);
				// Pre-fill the form with fetched data
				setProduct({
					name: data.name,
					sku: data.sku,
					category: data.category,
					quantity: data.quantity,
					price: data.price,
					description: data.description,
				});
			} catch (error) {
				toast.error("Could not load product details.");
				console.error(error);
			} finally {
				setIsLoading(false);
			}
		};
		getProductData();
	}, [id]);

	const handleChange = (e) => {
		setProduct({ ...product, [e.target.name]: e.target.value });
	};

	// --- 2. HANDLE UPDATE ---
	const handleUpdate = async (e) => {
		e.preventDefault();
		const validation = validateProductForm(product);
		if (!validation.isValid) return toast.error(validation.error);

		setIsLoading(true);
		try {
			await productService.updateProduct(id, product);
			toast.success("Product updated successfully!");
			navigate("/inventory");
		} catch (error) {
			toast.error("Failed to update product");
			console.error(error);
		} finally {
			setIsLoading(false);
		}
	};

	const totalValue = Number(product.quantity) * Number(product.price);

	// Styling Constants (Same as AddProduct)
	const labelClass = "block text-sm font-bold text-gray-700 mb-2";
	const inputWrapperClass = "relative flex items-center";
	const iconClass = "absolute left-4 text-gray-400 z-10 pointer-events-none";
	const inputClass =
		"w-full pl-11 pr-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-gray-700 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none transition-all duration-300 shadow-sm hover:border-gray-300";

	return (
		<div className="max-w-4xl mx-auto mt-6">
			{/* Header */}
			<div className="mb-6 flex items-center gap-4">
				<button
					onClick={() => navigate("/inventory")}
					className="p-2 bg-white rounded-full text-gray-500 hover:text-blue-600 hover:bg-blue-50 transition shadow-sm"
				>
					<FaArrowLeft />
				</button>
				<div>
					<h2 className="text-3xl font-extrabold text-gray-800">
						Edit Product
					</h2>
					<p className="text-gray-500 mt-1">
						Update inventory details
					</p>
				</div>
			</div>

			<div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100 relative overflow-hidden">
				{/* Decorative Top Border (Orange/Red gradient to distinguish from Add Page) */}
				<div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-orange-400 via-pink-500 to-purple-500"></div>

				<form onSubmit={handleUpdate} className="space-y-8 mt-4">
					{/* Row 1: Name */}
					<div>
						<label className={labelClass}>Product Name</label>
						<div className={inputWrapperClass}>
							<FaTag className={iconClass} />
							<input
								type="text"
								name="name"
								className={inputClass}
								value={product.name}
								onChange={handleChange}
							/>
						</div>
					</div>

					{/* Row 2: SKU & Category */}
					<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
						<div>
							<label className={labelClass}>
								SKU (Stock Keeping Unit)
							</label>
							<div className={inputWrapperClass}>
								<FaBarcode className={iconClass} />
								<input
									type="text"
									name="sku"
									className={inputClass}
									value={product.sku}
									onChange={handleChange}
									disabled // Usually SKU should not be changed, remove 'disabled' if you want to allow it
								/>
							</div>
						</div>
						<div>
							<label className={labelClass}>Category</label>
							<div className={inputWrapperClass}>
								<FaLayerGroup className={iconClass} />
								<input
									type="text"
									name="category"
									className={inputClass}
									value={product.category}
									onChange={handleChange}
								/>
							</div>
						</div>
					</div>

					{/* Row 3: Qty & Price */}
					<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
						<div>
							<label className={labelClass}>Quantity</label>
							<div className={inputWrapperClass}>
								<FaBoxes className={iconClass} />
								<input
									type="number"
									name="quantity"
									className={inputClass}
									value={product.quantity}
									onChange={handleChange}
								/>
							</div>
						</div>
						<div>
							<div className="flex justify-between items-center mb-2">
								<label className="text-sm font-bold text-gray-700">
									Price
								</label>
								{product.quantity && product.price && (
									<span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-3 py-1 rounded-full">
										Value: {formatCurrency(totalValue)}
									</span>
								)}
							</div>
							<div className={inputWrapperClass}>
								<FaDollarSign className={iconClass} />
								<input
									type="number"
									name="price"
									className={inputClass}
									value={product.price}
									onChange={handleChange}
								/>
							</div>
						</div>
					</div>

					{/* Row 4: Description */}
					<div>
						<label className={labelClass}>Description</label>
						<div className="relative">
							<FaAlignLeft className="absolute left-4 top-4 text-gray-400 z-10" />
							<textarea
								name="description"
								rows="4"
								className={`${inputClass} pt-4`}
								value={product.description}
								onChange={handleChange}
							></textarea>
						</div>
					</div>

					{/* Row 5: Action Buttons */}
					<div className="flex items-center gap-4 pt-4 border-t border-gray-100">
						<button
							type="button"
							onClick={() => navigate("/inventory")}
							className="w-1/3 py-4 rounded-xl font-bold text-gray-600 bg-gray-100 hover:bg-gray-200 transition-colors"
						>
							Cancel
						</button>

						<button
							type="submit"
							disabled={isLoading}
							className={`w-2/3 py-4 rounded-xl font-bold text-lg text-white shadow-lg shadow-orange-500/30 transform transition-all duration-300 hover:scale-[1.02] active:scale-95 flex justify-center items-center gap-2 ${
								isLoading
									? "bg-orange-300 cursor-not-allowed"
									: "bg-gradient-to-r from-orange-500 to-pink-600 hover:to-pink-700"
							}`}
						>
							{isLoading ? (
								"Saving..."
							) : (
								<>
									<FaSave className="text-xl" /> Update
									Product
								</>
							)}
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default EditProduct;
