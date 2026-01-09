import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
	FaEdit,
	FaTrashAlt,
	FaPlus,
	FaSearch,
	FaFilter,
	FaSort,
} from "react-icons/fa";
import { toast } from "react-toastify";
import productService from "../services/productService";
import { formatCurrency } from "../utils/productValidation";


const CustomConfirm = ({ closeToast, onConfirm }) => (
	<div className="flex flex-col gap-3">
		<h3 className="font-semibold text-gray-800 text-sm">
			Are you sure you want to delete this item?
		</h3>
		<div className="flex justify-end gap-2">
			<button
				onClick={closeToast}
				className="px-3 py-1 text-xs border border-gray-300 rounded text-gray-600 hover:bg-gray-50 transition"
			>
				Cancel
			</button>
			<button
				onClick={() => {
					onConfirm();
					closeToast();
				}}
				className="px-3 py-1 text-xs bg-red-500 text-white rounded hover:bg-red-600 shadow-sm transition"
			>
				Yes, Delete
			</button>
		</div>
	</div>
);

const ProductList = () => {
	const [products, setProducts] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [searchTerm, setSearchTerm] = useState("");

	// Load Data
	const loadProducts = async () => {
		setIsLoading(true);
		try {
			const data = await productService.getProducts();
			setProducts(data);
		} catch (error) {
			toast.error("Connection failed");
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		loadProducts();
	}, []);

	// --- DELETE LOGIC WITH CUSTOM TOAST ---
	const handleDelete = (id) => {
		toast(
			({ closeToast }) => (
				<CustomConfirm
					closeToast={closeToast}
					onConfirm={async () => {
						try {
							await productService.deleteProduct(id);
							toast.success("Product deleted successfully");
							loadProducts(); // Refresh the list
						} catch (error) {
							toast.error("Delete failed");
						}
					}}
				/>
			),
			{
				position: "top-center",
				autoClose: false, 
				closeOnClick: false,
				draggable: false,
			}
		);
	};

	// --- SEARCH FUNCTIONALITY ---
	const filteredProducts = products.filter(
		(product) =>
			product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
			product.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
			product.category.toLowerCase().includes(searchTerm.toLowerCase())
	);

	// --- STOCK BADGE COMPONENT ---
	const StockBadge = ({ qty }) => {
		if (qty === 0)
			return (
				<span className="px-3 py-1 rounded-full text-xs font-bold bg-red-100 text-red-700 border border-red-200">
					Out of Stock
				</span>
			);
		if (qty < 5)
			return (
				<span className="px-3 py-1 rounded-full text-xs font-bold bg-orange-100 text-orange-700 border border-orange-200">
					Low Stock
				</span>
			);
		return (
			<span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-700 border border-emerald-200">
				In Stock
			</span>
		);
	};

	return (
		<div className="max-w-7xl mx-auto">
			{/* --- HEADER & ACTIONS --- */}
			<div className="flex flex-col md:flex-row justify-between items-end mb-6 gap-4">
				<div>
					<h2 className="text-3xl font-extrabold text-slate-800">
						Inventory
					</h2>
					<p className="text-slate-500 mt-1 text-sm">
						Manage, track, and organize your assets.
					</p>
				</div>
				<div className="flex gap-3">
					{/* Removed Export Button */}
					<Link
						to="/add-product"
						className="flex items-center gap-2 px-5 py-2 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 transition shadow-md"
					>
						<FaPlus /> Add Item
					</Link>
				</div>
			</div>

			{/* --- TOOLBAR (Search & Filter) --- */}
			<div className="bg-white p-4 rounded-t-xl border-b border-slate-200 flex flex-col md:flex-row gap-4 items-center justify-between shadow-sm">
				{/* Search Input */}
				<div className="relative w-full md:w-96">
					<FaSearch className="absolute left-3 top-3 text-slate-400" />
					<input
						type="text"
						placeholder="Search by name, SKU, or category..."
						className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
						value={searchTerm}
						onChange={(e) => setSearchTerm(e.target.value)}
					/>
				</div>

				{/* Filter Mockup (Visual Only) */}
				{/* <div className="flex gap-2 w-full md:w-auto">
					<button className="flex items-center gap-2 px-4 py-2 bg-slate-100 text-slate-600 rounded-lg text-sm font-medium hover:bg-slate-200 transition">
						<FaFilter /> Filter
					</button>
					<button className="flex items-center gap-2 px-4 py-2 bg-slate-100 text-slate-600 rounded-lg text-sm font-medium hover:bg-slate-200 transition">
						<FaSort /> Sort
					</button>
				</div> */}
			</div>

			{/* --- ENTERPRISE DATA TABLE --- */}
			<div className="bg-white rounded-b-xl shadow-lg border border-slate-200 overflow-hidden">
				{isLoading ? (
					<div className="p-12 text-center text-slate-400 animate-pulse">
						Loading inventory data...
					</div>
				) : filteredProducts.length === 0 ? (
					<div className="p-12 text-center text-slate-500">
						<p>No products found matching "{searchTerm}"</p>
					</div>
				) : (
					<div className="overflow-x-auto">
						<table className="w-full text-left border-collapse">
							<thead className="bg-slate-50 text-slate-500 uppercase text-xs font-bold tracking-wider">
								<tr>
									<th className="px-6 py-4 border-b border-slate-200">
										Product Name
									</th>
									<th className="px-6 py-4 border-b border-slate-200">
										SKU
									</th>
									<th className="px-6 py-4 border-b border-slate-200">
										Category
									</th>
									<th className="px-6 py-4 border-b border-slate-200">
										Price
									</th>
									<th className="px-6 py-4 border-b border-slate-200">
										Quantity
									</th>
									<th className="px-6 py-4 border-b border-slate-200">
										Value
									</th>
									<th className="px-6 py-4 border-b border-slate-200 text-right">
										Actions
									</th>
								</tr>
							</thead>
							<tbody className="divide-y divide-slate-100 text-sm">
								{filteredProducts.map((item) => (
									<tr
										key={item._id}
										className="hover:bg-blue-50/50 transition-colors duration-200"
									>
										<td className="px-6 py-4 font-semibold text-slate-800">
											{item.name}
										</td>
										<td className="px-6 py-4 font-mono text-slate-500 text-xs">
											{item.sku}
										</td>
										<td className="px-6 py-4">
											<span className="px-2 py-1 bg-slate-100 text-slate-600 rounded text-xs font-medium">
												{item.category}
											</span>
										</td>
										<td className="px-6 py-4 font-medium text-slate-700">
											{formatCurrency(item.price)}
										</td>
										<td className="px-6 py-4">
											<StockBadge
												qty={Number(item.quantity)}
											/>
											<span className="ml-2 text-xs text-slate-400">
												({item.quantity})
											</span>
										</td>
										<td className="px-6 py-4 font-bold text-slate-700">
											{formatCurrency(
												item.price * item.quantity
											)}
										</td>
										<td className="px-6 py-4 text-right">
											<div className="flex justify-end gap-3">
												<Link
													to={`/edit-product/${item._id}`}
													className="text-blue-500 hover:text-blue-700 transition"
												>
													<FaEdit size={18} />
												</Link>
												<button
													onClick={() =>
														handleDelete(item._id)
													}
													className="text-red-400 hover:text-red-600 transition"
												>
													<FaTrashAlt size={18} />
												</button>
											</div>
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				)}

				{/* --- PAGINATION FOOTER (Visual Only) --- */}
				<div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex justify-between items-center">
					<span className="text-sm text-slate-500">
						Showing{" "}
						<span className="font-bold text-slate-800">
							{filteredProducts.length}
						</span>{" "}
						results
					</span>
					<div className="flex gap-2">
						<button
							className="px-3 py-1 border border-slate-300 rounded-md text-sm text-slate-500 bg-white hover:bg-slate-50 disabled:opacity-50"
							disabled
						>
							Previous
						</button>
						<button
							className="px-3 py-1 border border-slate-300 rounded-md text-sm text-slate-500 bg-white hover:bg-slate-50 disabled:opacity-50"
							disabled
						>
							Next
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ProductList;
