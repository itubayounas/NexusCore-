import React from "react";

const Dashboard = () => {
	return (
		<div>
			<h2>Dashboard Overview</h2>

			<div className="dashboard-grid">
				<StatusCard
					title="Total Products"
					value="120"
					borderColor="#3498db"
				/>
				<StatusCard
					title="Total Store Value"
					value="$45,200"
					borderColor="#2ecc71"
				/>
				<StatusCard
					title="Out of Stock"
					value="3"
					borderColor="#e74c3c"
				/>
				<StatusCard
					title="Categories"
					value="5"
					borderColor="#f1c40f"
				/>
			</div>
		</div>
	);
};

// Reusable Component
const StatusCard = ({ title, value, borderColor }) => (
	<div className="status-card" style={{ borderTopColor: borderColor }}>
		<h3 className="card-title">{title}</h3>
		<p className="card-value">{value}</p>
	</div>
);

export default Dashboard;
