import React, { useEffect, useState } from "react";
import { useRedirectLoggedOutUser } from "../hook/useRedirectLoggedOutUser";
import axios from "axios";
import { motion } from "framer-motion";
import {
	FaUser,
	FaBoxOpen,
	FaDollarSign,
	FaClipboardList,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
	Legend,
	ArcElement,
} from "chart.js";
import { Bar, Doughnut } from "react-chartjs-2";

// 1. Register ChartJS Components
ChartJS.register(
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
	Legend,
	ArcElement
);

// Helper to add commas
const formatNumber = (x) => {
	return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

const Dashboard = () => {
	useRedirectLoggedOutUser("/login");

	const [user, setUser] = useState(null);
	const [products, setProducts] = useState([]);

	// Stats State
	const [totalValue, setTotalValue] = useState(0);
	const [outOfStock, setOutOfStock] = useState(0);
	const [categoryCount, setCategoryCount] = useState(0);

	// Chart Data State
	const [categoryChartData, setCategoryChartData] = useState(null);
	const [stockChartData, setStockChartData] = useState(null);

	useEffect(() => {
		async function fetchData() {
			try {
				const userResponse = await axios.get("/api/users/getuser");
				setUser(userResponse.data);

				const productResponse = await axios.get("/api/products");
				setProducts(productResponse.data);
			} catch (error) {
				console.log("Error fetching data");
			}
		}
		fetchData();
	}, []);

	// --- CALCULATION ENGINE ---
	useEffect(() => {
		if (products.length > 0) {
			// 1. Basic Stats
			const value = products.reduce(
				(acc, item) => acc + Number(item.price) * Number(item.quantity),
				0
			);
			setTotalValue(value);

			const outOfStockItems = products.filter(
				(item) => Number(item.quantity) === 0
			);
			setOutOfStock(outOfStockItems.length);

			const allCategories = products.map((item) => item.category);
			const uniqueCategories = [...new Set(allCategories)];
			setCategoryCount(uniqueCategories.length);

			// 2. Prepare Chart Data

			// --- BAR CHART: Products per Category ---
			// Count how many items in each category
			const categoryCounts = {};
			products.forEach((item) => {
				const cat = item.category;
				categoryCounts[cat] = (categoryCounts[cat] || 0) + 1;
			});

			setCategoryChartData({
				labels: Object.keys(categoryCounts), // ["Electronics", "Shoes", ...]
				datasets: [
					{
						label: "Product Count",
						data: Object.values(categoryCounts), // [5, 2, ...]
						backgroundColor: "rgba(14, 165, 233, 0.7)", // Brand-500
						borderColor: "#0ea5e9",
						borderWidth: 1,
						borderRadius: 5,
					},
				],
			});

			// --- DOUGHNUT CHART: In Stock vs Out of Stock ---
			const inStockCount = products.length - outOfStockItems.length;
			setStockChartData({
				labels: ["In Stock", "Out of Stock"],
				datasets: [
					{
						data: [inStockCount, outOfStockItems.length],
						backgroundColor: [
							"rgba(34, 197, 94, 0.7)", // Green
							"rgba(239, 68, 68, 0.7)", // Red
						],
						borderColor: ["#22c55e", "#ef4444"],
						borderWidth: 1,
					},
				],
			});
		}
	}, [products]);

	// Animations
	const containerVariants = {
		hidden: { opacity: 0 },
		visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
	};

	const itemVariants = {
		hidden: { y: 20, opacity: 0 },
		visible: { y: 0, opacity: 1 },
	};

	return (
		<div className="text-white pb-10">
			<motion.div
				className="p-4"
				variants={containerVariants}
				initial="hidden"
				animate="visible"
			>
				{/* Welcome Banner */}
				<motion.div
					variants={itemVariants}
					className="bg-brand-600 text-white p-8 rounded-xl shadow-lg mb-8 shadow-brand-500/30"
				>
					<h2 className="text-3xl font-bold mb-2">
						Welcome back, {user ? user.name : "Guest"}! 👋
					</h2>
					<p className="opacity-90">
						Here is your real-time inventory overview.
					</p>
				</motion.div>

				{/* Stats Grid */}
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
					<DashboardCard
						icon={<FaBoxOpen size={30} className="text-white" />}
						title="Total Products"
						value={products.length}
						color="bg-purple-600"
						variants={itemVariants}
					/>
					<DashboardCard
						icon={<FaDollarSign size={30} className="text-white" />}
						title="Total Value"
						value={`$${formatNumber(totalValue.toFixed(2))}`}
						color="bg-green-600"
						variants={itemVariants}
					/>
					<DashboardCard
						icon={
							<FaClipboardList size={30} className="text-white" />
						}
						title="Out of Stock"
						value={outOfStock}
						color="bg-red-500"
						variants={itemVariants}
					/>
					<DashboardCard
						icon={<FaUser size={30} className="text-white" />}
						title="Categories"
						value={categoryCount}
						color="bg-orange-500"
						variants={itemVariants}
					/>
				</div>

				{/* --- CHARTS SECTION --- */}
				{products.length > 0 && (
					<div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
						{/* Bar Chart */}
						<motion.div
							variants={itemVariants}
							className="glass p-6 rounded-xl border border-white/10 shadow-xl"
						>
							<h3 className="text-xl font-bold mb-4">
								Inventory by Category
							</h3>
							{categoryChartData && (
								<Bar
									options={options}
									data={categoryChartData}
								/>
							)}
						</motion.div>

						{/* Doughnut Chart */}
						<motion.div
							variants={itemVariants}
							className="glass p-6 rounded-xl border border-white/10 shadow-xl flex flex-col items-center"
						>
							<h3 className="text-xl font-bold mb-4">
								Availability Status
							</h3>
							<div className="w-full max-w-[300px]">
								{stockChartData && (
									<Doughnut data={stockChartData} />
								)}
							</div>
						</motion.div>
					</div>
				)}

				{/* Quick Actions */}
				<motion.div variants={itemVariants} className="mt-10">
					<h3 className="text-xl font-bold mb-4">Quick Actions</h3>
					<div className="flex gap-4">
						<Link to="/add-product">
							<button className="bg-brand-600 px-6 py-3 rounded-lg hover:bg-brand-500 transition font-bold shadow-lg shadow-brand-500/20">
								+ Add New Product
							</button>
						</Link>
					</div>
				</motion.div>
			</motion.div>
		</div>
	);
};

// Chart Config Options (Dark Mode Friendly)
const options = {
	responsive: true,
	plugins: {
		legend: {
			position: "top",
			labels: { color: "white" }, // White text for Legend
		},
		title: {
			display: false,
		},
	},
	scales: {
		y: {
			ticks: { color: "#cbd5e1" }, // Light gray text
			grid: { color: "#334155" }, // Dark gray grid lines
		},
		x: {
			ticks: { color: "#cbd5e1" },
			grid: { display: false },
		},
	},
};

// Reusable Card Component
const DashboardCard = ({ icon, title, value, color, variants }) => {
	return (
		<motion.div
			variants={variants}
			whileHover={{ scale: 1.05 }}
			className={`p-6 rounded-xl shadow-lg text-white ${color} flex items-center justify-between cursor-pointer border border-white/10`}
		>
			<div>
				<h3 className="text-sm font-medium opacity-80 uppercase tracking-wider">
					{title}
				</h3>
				<p className="text-3xl font-bold mt-1">{value}</p>
			</div>
			<div className="bg-white/20 p-3 rounded-full backdrop-blur-sm">
				{icon}
			</div>
		</motion.div>
	);
};

export default Dashboard;
