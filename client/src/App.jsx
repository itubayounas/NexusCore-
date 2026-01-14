import React, { useState } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaBars } from "react-icons/fa";

// Pages
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import ProductList from "./pages/ProductList";
import AddProduct from "./pages/AddProduct";
import EditProduct from "./pages/EditProduct";
import ProductDetail from "./pages/ProductDetails";
import Login from "./pages/Login";
import Register from "./pages/Register";

// Components
import Sidebar from "./components/Sidebar";
// 1. IMPORT THE VOICE ASSISTANT
import VoiceAssistant from "./components/VoiceAssistant";

const Layout = ({ children }) => {
	const location = useLocation();
	const [isSidebarOpen, setIsSidebarOpen] = useState(false);

	// Define Public Routes
	const publicRoutes = ["/", "/login", "/register"];
	const isPublic = publicRoutes.includes(location.pathname);

	const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

	return (
		<div className="flex h-screen bg-slate-900 overflow-hidden">
			{/* Sidebar (Responsive) */}
			<Sidebar
				menuType={isPublic ? "public" : "private"}
				isOpen={isSidebarOpen}
				toggle={() => setIsSidebarOpen(false)}
			/>

			{/* Main Content Area */}
			<div className="flex-1 flex flex-col h-full overflow-hidden relative">
				{/* --- MOBILE HEADER --- */}
				<div className="md:hidden flex items-center justify-between bg-slate-900 p-4 border-b border-slate-700 text-white">
					<div className="flex items-center gap-2">
						<span className="text-2xl">📦</span>
						<h1 className="font-bold text-lg">NexusCore</h1>
					</div>
					<button
						onClick={toggleSidebar}
						className="text-white hover:text-brand-500 p-1"
					>
						<FaBars size={24} />
					</button>
				</div>

				{/* Page Content */}
				<div className="flex-1 overflow-y-auto p-4 md:p-8 scroll-smooth">
					{children}
				</div>

				{/* 2. GLOBAL VOICE ASSISTANT 
                    Only show this on private pages (Dashboard, Inventory, etc.)
                */}
				{!isPublic && (
					<VoiceAssistant
						onOperationSuccess={() => window.location.reload()}
					/>
				)}
			</div>
		</div>
	);
};

function App() {
	return (
		<BrowserRouter>
			<Layout>
				<Routes>
					{/* Public Routes */}
					<Route path="/" element={<Home />} />
					<Route path="/login" element={<Login />} />
					<Route path="/register" element={<Register />} />

					{/* Private Routes */}
					<Route path="/dashboard" element={<Dashboard />} />
					<Route path="/add-product" element={<AddProduct />} />
					<Route path="/inventory" element={<ProductList />} />
					<Route path="/edit-product/:id" element={<EditProduct />} />
					<Route
						path="/product-detail/:id"
						element={<ProductDetail />}
					/>
				</Routes>
			</Layout>
			<ToastContainer
				position="top-right"
				autoClose={3000}
				theme="dark"
			/>
		</BrowserRouter>
	);
}

export default App;
