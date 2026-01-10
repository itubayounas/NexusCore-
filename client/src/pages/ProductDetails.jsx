import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom"; // Added Link import
import { useRedirectLoggedOutUser } from "../hook/useRedirectLoggedOutUser";
import axios from "axios";
import { motion } from "framer-motion";
import { FaSpinner, FaEdit, FaArrowLeft, FaCalendarAlt } from "react-icons/fa";


const ProductDetail = () => {
	useRedirectLoggedOutUser("/login");
	const { id } = useParams();
	const [product, setProduct] = useState(null);
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		const getProduct = async () => {
			setIsLoading(true);
			try {
				const { data } = await axios.get(`/api/products/${id}`);
				setProduct(data);
				setIsLoading(false);
			} catch (error) {
				setIsLoading(false);
				console.log(error);
			}
		};
		getProduct();
	}, [id]);

	const stockStatus = (quantity) => {
		if (quantity > 0) {
			return (
				<span className="bg-green-500/20 text-green-300 py-1 px-4 rounded-full text-sm font-bold border border-green-500/30">
					In Stock
				</span>
			);
		}
		return (
			<span className="bg-red-500/20 text-red-300 py-1 px-4 rounded-full text-sm font-bold border border-red-500/30">
				Out Of Stock
			</span>
		);
	};

	return (
		<div className="text-white min-h-[80vh] flex justify-center items-center p-4">
			{isLoading && (
				<FaSpinner className="animate-spin text-4xl text-brand-500" />
			)}

			{!isLoading && product && (
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					className="glass w-full max-w-3xl p-8 md:p-10 rounded-2xl shadow-2xl border border-white/10"
				>
					{/* --- Header --- */}
					<div className="flex justify-between items-start border-b border-gray-700 pb-6 mb-8">
						<div>
							<h2 className="text-4xl font-bold mb-2">
								{product.name}
							</h2>
							<div className="flex items-center gap-3 text-gray-400">
								<span className="bg-slate-800 px-3 py-1 rounded text-xs font-mono border border-slate-600">
									SKU: {product.sku}
								</span>
								<span className="text-sm">•</span>
								<span className="text-brand-400 font-medium">
									{product.category}
								</span>
							</div>
						</div>
						<Link
							to="/inventory"
							className="text-gray-400 hover:text-white transition flex items-center gap-2 text-sm bg-slate-800/50 px-4 py-2 rounded-lg hover:bg-slate-700"
						>
							<FaArrowLeft /> Back to List
						</Link>
					</div>

					{/* --- Stats Grid (Replaces Image) --- */}
					<div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
						<div className="bg-slate-800/40 p-5 rounded-xl border border-slate-700/50">
							<p className="text-gray-400 text-xs uppercase tracking-wider mb-1">
								Price
							</p>
							<p className="text-3xl font-bold text-green-400">
								${product.price}
							</p>
						</div>
						<div className="bg-slate-800/40 p-5 rounded-xl border border-slate-700/50">
							<p className="text-gray-400 text-xs uppercase tracking-wider mb-1">
								Quantity
							</p>
							<p className="text-3xl font-bold text-blue-400">
								{product.quantity}
							</p>
						</div>
						<div className="bg-slate-800/40 p-5 rounded-xl border border-slate-700/50">
							<p className="text-gray-400 text-xs uppercase tracking-wider mb-1">
								Total Value
							</p>
							<p className="text-3xl font-bold text-purple-400">
								$
								{Number(product.price) *
									Number(product.quantity)}
							</p>
						</div>
					</div>

					{/* --- Description & Status --- */}
					<div className="space-y-6">
						<div className="flex items-center justify-between">
							<h3 className="text-xl font-semibold">
								Product Status
							</h3>
							{stockStatus(product.quantity)}
						</div>

						<div className="bg-slate-900/30 p-6 rounded-xl border border-slate-700/50">
							<h4 className="text-gray-400 text-xs uppercase mb-3">
								Description
							</h4>
							<p className="text-gray-300 leading-relaxed whitespace-pre-wrap">
								{product.description}
							</p>
						</div>

						{/* Dates (Optional, if your DB has createdAt) */}
						<div className="flex gap-4 text-xs text-gray-500 pt-2">
							<div className="flex items-center gap-2">
								<FaCalendarAlt />
								<span>
									Added on:{" "}
									{product.createdAt
										? new Date(
												product.createdAt
										  ).toLocaleDateString()
										: "N/A"}
								</span>
							</div>
						</div>
					</div>

					{/* --- Action Buttons --- */}
					<div className="mt-10 pt-6 border-t border-gray-700">
						<Link to={`/edit-product/${product._id}`}>
							<button className="w-full bg-brand-600 hover:bg-brand-500 text-white py-4 rounded-xl font-bold transition flex justify-center items-center gap-2 shadow-lg shadow-brand-500/20 transform hover:-translate-y-1">
								<FaEdit /> Edit Product Details
							</button>
						</Link>
					</div>
				</motion.div>
			)}
		</div>
	);
};

export default ProductDetail;
