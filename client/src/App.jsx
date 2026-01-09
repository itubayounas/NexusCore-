import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Dashboard from "./pages/Dashboard";
import AddProduct from "./pages/AddProduct";
import Sidebar from "./components/Sidebar";


function App() {
	return (
		<BrowserRouter>
			<div className="layout-container">
				<Sidebar />

				<div className="main-content">
					<Routes>
						<Route path="/" element={<Dashboard />} />
						<Route path="/add-product" element={<AddProduct />} />
					</Routes>
				</div>
			</div>
			<ToastContainer />
		</BrowserRouter>
	);
}

export default App;
