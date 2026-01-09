import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Dashboard from "./pages/Dashboard";

import ProductList from "./pages/ProductList";
import Sidebar from "./components/Sidebar";
import AddProduct from "./pages/AddProduct";
import EditProduct from "./pages/EditProduct"; 

function App() {
	return (
		<BrowserRouter>
			<div className="flex h-screen bg-slate-100">
				<Sidebar />
				<div className="flex-1 overflow-y-auto p-8">
					<Routes>
						<Route path="/" element={<Dashboard />} />
						<Route path="/add-product" element={<AddProduct />} />
						<Route path="/inventory" element={<ProductList />} />
						<Route
							path="/edit-product/:id"
							element={<EditProduct />}
						/>
					</Routes>
				</div>
			</div>

			<ToastContainer position="top-right" autoClose={3000} />
		</BrowserRouter>
	);
}

export default App;
