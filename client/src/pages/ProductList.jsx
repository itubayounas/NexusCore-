import React, { useEffect, useState } from "react";
import { useRedirectLoggedOutUser } from "../hook/useRedirectLoggedOutUser";
import axios from "axios";
import { FaEdit, FaTrashAlt, FaEye, FaPlus, FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import Swal from "sweetalert2";

const ProductList = () => {
	useRedirectLoggedOutUser("/login");

	const [products, setProducts] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [search, setSearch] = useState(""); // 1. Search State

	const getProducts = async () => {
		setIsLoading(true);
		try {
			const { data } = await axios.get("/api/products");
			setProducts(data);
			setIsLoading(false);
		} catch (error) {
			setIsLoading(false);
			toast.error(error.message);
		}
	};

	useEffect(() => {
		getProducts();
	}, []);

	// 2. Filter Logic (Search by Name or Category)
	const filteredProducts = products.filter(
		(product) =>
			product.name.toLowerCase().includes(search.toLowerCase()) ||
			product.category.toLowerCase().includes(search.toLowerCase())
	);

	const confirmDelete = (id) => {
		Swal.fire({
			title: "Delete this product?",
			text: "You won't be able to revert this!",
			icon: "warning",
			showCancelButton: true,
			confirmButtonColor: "#d33",
			cancelButtonColor: "#3085d6",
			confirmButtonText: "Yes, delete it!",
			background: "#1e293b",
			color: "#fff",
		}).then(async (result) => {
			if (result.isConfirmed) {
				await deleteProduct(id);
			}
		});
	};

	const deleteProduct = async (id) => {
		try {
			await axios.delete(`/api/products/${id}`);
			Swal.fire({
				title: "Deleted!",
				text: "Product has been deleted.",
				icon: "success",
				background: "#1e293b",
				color: "#fff",
				confirmButtonColor: "#3085d6",
			});
			getProducts();
		} catch (error) {
			toast.error(error.message);
		}
	};

	return (
		<div className="text-white">
			{/* --- HEADER & SEARCH --- */}
			<div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
				<h2 className="text-3xl font-bold">Inventory Items</h2>
				<Link to="/add-product">
					<button className="bg-brand-600 hover:bg-brand-700 text-white py-2 px-4 rounded-lg flex items-center gap-2 transition shadow-lg shadow-brand-500/30">
						<FaPlus /> Add New
					</button>
				</Link>
			</div>

			{/* Search Bar Container */}
			<div className="mb-6 relative max-w-md">
				<FaSearch className="absolute left-3 top-3 text-gray-400" />
				<input
					type="text"
					placeholder="Search by name or category..."
					value={search}
					onChange={(e) => setSearch(e.target.value)}
					className="w-full bg-slate-800 text-white pl-10 pr-4 py-2 rounded-lg border border-slate-600 focus:border-brand-500 focus:outline-none transition shadow-sm"
				/>
			</div>

			{/* --- LOADING STATE --- */}
			{isLoading && (
				<div className="flex justify-center items-center h-64">
					<div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brand-500"></div>
				</div>
			)}

			{/* --- EMPTY STATE (Totally Empty) --- */}
			{!isLoading && products.length === 0 && (
				<motion.div
					initial={{ opacity: 0, scale: 0.9 }}
					animate={{ opacity: 1, scale: 1 }}
					className="glass p-10 text-center flex flex-col items-center justify-center min-h-[300px]"
				>
					<div className="text-6xl mb-4">📦</div>
					<h3 className="text-2xl font-bold mb-2">
						Your inventory is empty
					</h3>
					<p className="text-gray-300 mb-6">
						Start tracking your items by adding your first product.
					</p>
					<Link to="/add-product">
						<button className="bg-brand-600 hover:bg-brand-500 text-white font-bold py-3 px-6 rounded-full transition shadow-lg">
							Create Product
						</button>
					</Link>
				</motion.div>
			)}

			{/* --- NO SEARCH RESULTS STATE --- */}
			{!isLoading &&
				products.length > 0 &&
				filteredProducts.length === 0 && (
					<div className="glass p-8 text-center">
						<p className="text-gray-400 text-lg">
							No products found matching "{search}"
						</p>
					</div>
				)}

			{/* --- PRODUCT TABLE --- */}
			{!isLoading && filteredProducts.length > 0 && (
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					className="glass overflow-hidden rounded-xl"
				>
					<div className="overflow-x-auto">
						<table className="w-full text-left border-collapse min-w-[600px]">
							<thead>
								<tr className="bg-brand-600/20 text-brand-100 uppercase text-sm leading-normal">
									<th className="py-4 px-6">S/N</th>
									<th className="py-4 px-6">Name</th>
									<th className="py-4 px-6">Category</th>
									<th className="py-4 px-6">Price</th>
									<th className="py-4 px-6">Quantity</th>
									<th className="py-4 px-6">Value</th>
									<th className="py-4 px-6 text-center">
										Action
									</th>
								</tr>
							</thead>
							<tbody className="text-gray-200 text-sm font-light">
								{filteredProducts.map((product, index) => {
									// Using filteredProducts here
									const {
										_id,
										name,
										category,
										price,
										quantity,
									} = product;
									return (
										<tr
											key={_id}
											className="border-b border-gray-700 hover:bg-white/5 transition duration-150"
										>
											<td className="py-4 px-6 whitespace-nowrap font-medium">
												{index + 1}
											</td>
											<td className="py-4 px-6 font-bold text-white truncate max-w-[150px]">
												{name}
											</td>
											<td className="py-4 px-6">
												{category}
											</td>
											<td className="py-4 px-6 text-green-400 font-mono">
												{"$"}
												{price}
											</td>
											<td className="py-4 px-6">
												<span
													className={`py-1 px-3 rounded-full text-xs font-bold ${
														quantity > 0
															? "bg-green-500/20 text-green-300"
															: "bg-red-500/20 text-red-300"
													}`}
												>
													{quantity}
												</span>
											</td>
											<td className="py-4 px-6 font-mono">
												{"$"}
												{price * quantity}
											</td>
											<td className="py-4 px-6 text-center">
												<div className="flex item-center justify-center gap-4">
													<Link
														to={`/product-detail/${_id}`}
													>
														<FaEye className="w-5 h-5 text-purple-400 hover:text-purple-300 transform hover:scale-110 transition" />
													</Link>
													<Link
														to={`/edit-product/${_id}`}
													>
														<FaEdit className="w-5 h-5 text-blue-400 hover:text-blue-300 transform hover:scale-110 transition" />
													</Link>
													<button
														onClick={() =>
															confirmDelete(_id)
														}
													>
														<FaTrashAlt className="w-5 h-5 text-red-400 hover:text-red-300 transform hover:scale-110 transition" />
													</button>
												</div>
											</td>
										</tr>
									);
								})}
							</tbody>
						</table>
					</div>
				</motion.div>
			)}
		</div>
	);
};

export default ProductList;
