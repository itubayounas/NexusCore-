import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
	FaDollarSign,
	FaShoppingCart,
	FaExclamationTriangle,
	FaBoxOpen,
	FaArrowRight,
} from "react-icons/fa";
import productService from "../services/productService";
import { formatCurrency } from "../utils/productValidation";

const Dashboard = () => {
	const [products, setProducts] = useState([]);
	const [isLoading, setIsLoading] = useState(true);

	// --- 1. Calculate Live Stats ---
	// Total money value of all items in stock
	const totalStoreValue = products.reduce(
		(acc, item) => acc + Number(item.price) * Number(item.quantity),
		0
	);

	// Count of items with 0 quantity
	const outOfStock = products.filter(
		(item) => Number(item.quantity) === 0
	).length;

	// Count of items with less than 5 quantity (but not 0)
	const lowStock = products.filter(
		(item) => Number(item.quantity) > 0 && Number(item.quantity) < 5
	).length;

	// Count of unique categories
	const totalCategories = [...new Set(products.map((p) => p.category))]
		.length;

	useEffect(() => {
		const fetchStats = async () => {
			try {
				const data = await productService.getProducts();
				setProducts(data);
			} catch (error) {
				console.error("Failed to load stats");
			} finally {
				setIsLoading(false);
			}
		};
		fetchStats();
	}, []);

	// --- 2. Reusable Stat Card Component ---
	const StatCard = ({ icon, label, value, color, linkText, linkTo }) => (
		<div className="bg-white p-6 rounded-2xl shadow-md border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
			<div className="flex items-center justify-between mb-4">
				<div
					className={`p-4 rounded-full ${color} text-white text-2xl shadow-lg`}
				>
					{icon}
				</div>
				<div className="text-right">
					<p className="text-gray-500 text-sm font-medium uppercase tracking-wider">
						{label}
					</p>
					<h3 className="text-3xl font-extrabold text-gray-800 mt-1">
						{value}
					</h3>
				</div>
			</div>
			<div className="border-t border-gray-100 pt-4">
				<Link
					to={linkTo}
					className="text-sm font-bold text-blue-600 hover:text-blue-800 flex items-center gap-2 group"
				>
					{linkText}{" "}
					<FaArrowRight className="group-hover:translate-x-1 transition-transform" />
				</Link>
			</div>
		</div>
	);

	return (
		<div className="max-w-7xl mx-auto">
			{/* Header */}
			<div className="mb-10">
				<h2 className="text-4xl font-extrabold text-gray-800">
					Dashboard Overview
				</h2>
				<p className="text-gray-500 mt-2 text-lg">
					Welcome back. Here is your live inventory status.
				</p>
			</div>

			{isLoading ? (
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 animate-pulse">
					{[1, 2, 3, 4].map((i) => (
						<div
							key={i}
							className="h-40 bg-gray-200 rounded-2xl"
						></div>
					))}
				</div>
			) : (
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
					{/* Card 1: Total Value (Live) */}
					<StatCard
						icon={<FaDollarSign />}
						label="Total Asset Value"
						value={formatCurrency(totalStoreValue)}
						color="bg-emerald-500"
						linkText="View Financials"
						linkTo="/inventory"
					/>

					{/* Card 2: Total Products (Live) */}
					<StatCard
						icon={<FaShoppingCart />}
						label="Total Products"
						value={products.length}
						color="bg-blue-500"
						linkText="Manage Inventory"
						linkTo="/inventory"
					/>

					{/* Card 3: Out of Stock (Live) */}
					<StatCard
						icon={<FaExclamationTriangle />}
						label="Out of Stock"
						value={outOfStock}
						color="bg-red-500"
						linkText="Restock Now"
						linkTo="/inventory"
					/>

					{/* Card 4: Categories (Live) */}
					<StatCard
						icon={<FaBoxOpen />}
						label="Categories"
						value={totalCategories}
						color="bg-purple-500"
						linkText="View Categories"
						linkTo="/inventory"
					/>
				</div>
			)}

			{/* --- Quick Action Buttons --- */}
			<div className="mt-12 bg-white rounded-2xl shadow-lg border border-gray-100 p-8 flex flex-col md:flex-row items-center justify-between gap-4">
				<div>
					<h3 className="text-xl font-bold text-gray-800">
						Quick Actions
					</h3>
					<p className="text-gray-500">
						Manage your stock immediately
					</p>
				</div>
				<div className="flex gap-4 w-full md:w-auto">
					<Link
						to="/add-product"
						className="flex-1 md:flex-none text-center px-6 py-3 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 transition shadow-md"
					>
						+ Add New Stock
					</Link>
					<Link
						to="/inventory"
						className="flex-1 md:flex-none text-center px-6 py-3 bg-white border border-gray-300 text-gray-700 rounded-lg font-bold hover:bg-gray-50 transition"
					>
						View Full List
					</Link>
				</div>
			</div>
		</div>
	);
};

export default Dashboard;
