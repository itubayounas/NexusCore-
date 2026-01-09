import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import {
	FaTh,
	FaPlusCircle,
	FaBoxOpen,
	FaCog,
	FaBars, // Hamburger Icon
	FaTimes, // Close Icon
} from "react-icons/fa";

const Sidebar = () => {
	
	const [isOpen, setIsOpen] = useState(false);

	const toggleSidebar = () => setIsOpen(!isOpen);

	
	const getLinkClass = ({ isActive }) =>
		`flex items-center gap-3 px-4 py-3 mx-3 rounded-lg transition-all duration-200 group ${
			isActive
				? "bg-blue-600 text-white shadow-lg shadow-blue-900/20"
				: "text-slate-400 hover:bg-slate-800 hover:text-white"
		}`;

	return (
		<>
			
			<button
				onClick={toggleSidebar}
				className="fixed top-4 left-4 z-50 p-2 bg-slate-900 text-white rounded-md shadow-lg md:hidden hover:bg-slate-800 transition"
			>
				{isOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
			</button>

			{/* --- MOBILE OVERLAY --- */}
			{/* Dims the background when menu is open on mobile */}
			{isOpen && (
				<div
					className="fixed inset-0 bg-black/50 z-30 md:hidden backdrop-blur-sm"
					onClick={() => setIsOpen(false)}
				></div>
			)}

		
			<div
				className={`
        fixed inset-y-0 left-0 z-40 w-72 bg-slate-900 flex flex-col border-r border-slate-800 
        transition-transform duration-300 ease-in-out
        ${isOpen ? "translate-x-0" : "-translate-x-full"} 
        md:translate-x-0 md:static
      `}
			>
				{/* 1. Brand Logo Area */}
				<div className="h-20 flex items-center px-8 border-b border-slate-800 mb-6 mt-10 md:mt-0">
					<FaBoxOpen className="text-3xl text-blue-500 mr-3" />
					<div>
						<h1 className="text-xl font-bold text-white tracking-wide">
							Nexus<span className="text-blue-500">Core</span>
						</h1>
					</div>
				</div>

				{/* 2. Navigation Menu */}
				<nav className="flex-1 overflow-y-auto space-y-2">
					<NavLink
						to="/"
						className={getLinkClass}
						onClick={() => setIsOpen(false)}
					>
						<FaTh className="text-lg" />
						<span className="text-sm font-medium">Dashboard</span>
					</NavLink>

					<NavLink
						to="/inventory"
						className={getLinkClass}
						onClick={() => setIsOpen(false)}
					>
						<FaBoxOpen className="text-lg" />
						<span className="text-sm font-medium">Inventory</span>
					</NavLink>

					<NavLink
						to="/add-product"
						className={getLinkClass}
						onClick={() => setIsOpen(false)}
					>
						<FaPlusCircle className="text-lg" />
						<span className="text-sm font-medium">Add Product</span>
					</NavLink>

					{/* Separator */}
					<div className="my-4 border-t border-slate-800 mx-4"></div>

					{/* <NavLink
						to="/settings"
						className={getLinkClass}
						onClick={() => setIsOpen(false)}
					>
						<FaCog className="text-lg" />
						<span className="text-sm font-medium">Settings</span>
					</NavLink> */}
				</nav>

				{/* Mobile Close Helper (Optional visual cue) */}
				<div className="p-4 md:hidden text-center text-slate-500 text-xs">
					Tap outside to close
				</div>
			</div>
		</>
	);
};

export default Sidebar;
