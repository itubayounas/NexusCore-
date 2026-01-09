import React from "react";
import { NavLink } from "react-router-dom";
import { FaChartPie, FaPlus, FaBoxOpen } from "react-icons/fa";

const Sidebar = () => {
	const menuItems = [
		{ path: "/", name: "Dashboard", icon: <FaChartPie /> },
		{ path: "/add-product", name: "Add Product", icon: <FaPlus /> },
		{ path: "/inventory", name: "Inventory List", icon: <FaBoxOpen /> },
	];

	return (
		<div className="sidebar">
			<div className="sidebar-logo">
				<h3>📦 NexusCore</h3>
			</div>

			<ul className="menu-list">
				{menuItems.map((item, index) => (
					<li key={index}>
						<NavLink
							to={item.path}
							className={({ isActive }) =>
								isActive ? "menu-link active" : "menu-link"
							}
						>
							<span className="icon">{item.icon}</span>
							{/* NEW: Wrapped text in a span with a class name */}
							<span className="menu-text">{item.name}</span>
						</NavLink>
					</li>
				))}
			</ul>
		</div>
	);
};

export default Sidebar;
