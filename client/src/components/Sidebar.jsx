import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
	FaTh,
	FaBoxOpen,
	FaPlusSquare,
	FaSignOutAlt,
	FaSignInAlt,
	FaUserPlus,
	FaHome,
	FaTimes,
} from "react-icons/fa";
import axios from "axios";
import { toast } from "react-toastify";

// Received 'isOpen' and 'toggle' to control mobile behavior
const Sidebar = ({ menuType, isOpen, toggle }) => {
	const navigate = useNavigate();

	const logoutUser = async () => {
		await axios.get("/api/users/logout");
		navigate("/login");
		toast.success("Logged out successfully");
	};

	// --- RESPONSIVE CLASSES ---
	// fixed: floats on top on mobile
	// z-50: ensures it's above everything
	// md:static: on desktop, it sits normally in the layout
	// -translate-x-full: hidden to the left by default on mobile
	const sidebarClasses = `
    fixed inset-y-0 left-0 z-50 w-64 bg-slate-900 text-white transition-transform duration-300 ease-in-out
    ${isOpen ? "translate-x-0 shadow-2xl" : "-translate-x-full"} 
    md:translate-x-0 md:static md:shadow-none
  `;

	return (
		<>
			{/* Mobile Overlay (Darkens background when menu is open) */}
			{isOpen && (
				<div
					className="fixed inset-0 bg-black/50 z-40 md:hidden backdrop-blur-sm"
					onClick={toggle}
				></div>
			)}

			<div className={sidebarClasses}>
				{/* Header Section */}
				<div className="flex items-center justify-between p-5 pt-8 border-b border-slate-700">
					<div className="flex items-center gap-x-2 text-brand-500">
						<span className="text-3xl">📦</span>
						<h1 className="text-2xl font-bold tracking-wide">
							NexusCore
						</h1>
					</div>
					{/* Close Button (Mobile Only) */}
					<button
						onClick={toggle}
						className="md:hidden text-gray-400 hover:text-white"
					>
						<FaTimes size={24} />
					</button>
				</div>

				{/* Menu Items */}
				<div className="flex flex-col justify-between flex-1 h-[calc(100%-80px)] p-4">
					<ul className="space-y-3 mt-4">
						{menuType === "public" ? (
							<>
								<MenuItem
									to="/"
									icon={<FaHome />}
									label="Home"
									onClick={toggle}
								/>
								<MenuItem
									to="/login"
									icon={<FaSignInAlt />}
									label="Login"
									onClick={toggle}
								/>
								<MenuItem
									to="/register"
									icon={<FaUserPlus />}
									label="Register"
									onClick={toggle}
								/>
							</>
						) : (
							<>
								<MenuItem
									to="/dashboard"
									icon={<FaTh />}
									label="Dashboard"
									onClick={toggle}
								/>
								<MenuItem
									to="/inventory"
									icon={<FaBoxOpen />}
									label="Inventory"
									onClick={toggle}
								/>
								<MenuItem
									to="/add-product"
									icon={<FaPlusSquare />}
									label="Add Product"
									onClick={toggle}
								/>
							</>
						)}
					</ul>

					{/* Logout Button (Only for private) */}
					{menuType !== "public" && (
						<div className="border-t border-slate-700 pt-4">
							<button
								onClick={() => {
									logoutUser();
									toggle();
								}}
								className="flex items-center gap-x-2 text-red-400 hover:bg-red-500/10 hover:text-red-300 p-3 rounded-md w-full transition duration-200"
							>
								<FaSignOutAlt />
								<span>Logout</span>
							</button>
						</div>
					)}
				</div>
			</div>
		</>
	);
};

const MenuItem = ({ to, icon, label, onClick }) => (
	<li>
		<NavLink
			to={to}
			onClick={onClick} // Close menu when link clicked
			className={({ isActive }) =>
				`flex items-center gap-x-3 p-3 rounded-xl transition-all duration-200
                ${
					isActive
						? "bg-brand-600 text-white shadow-lg shadow-brand-500/30"
						: "text-gray-400 hover:bg-slate-800 hover:text-white"
				}`
			}
		>
			{icon}
			<span className="font-medium">{label}</span>
		</NavLink>
	</li>
);

export default Sidebar;
