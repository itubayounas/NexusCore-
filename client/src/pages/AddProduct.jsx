import React, { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import productService from "../services/productService";
import {
	validateProductForm,
	formatCurrency,
} from "../utils/productValidation"; // <--- IMPORT UTILS

const AddProduct = () => {
	const navigate = useNavigate();
	const [isLoading, setIsLoading] = useState(false);

	const [formData, setFormData] = useState({
		name: "",
		sku: "",
		category: "",
		quantity: "",
		price: "",
		description: "",
	});

	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		// --- CLEAN VALIDATION CALL ---
		const validation = validateProductForm(formData);
		if (!validation.isValid) {
			toast.error(validation.error); // Show the specific error from the util file
			return;
		}

		setIsLoading(true);

		try {
			const data = await productService.createProduct(formData);
			toast.success(`Product "${data.name}" added successfully!`);
			navigate("/");
		} catch (error) {
			const message = error.response?.data?.message || error.message;
			toast.error(`Error: ${message}`);
		} finally {
			setIsLoading(false);
		}
	};

	// Calculate total value
	const totalValue = Number(formData.quantity) * Number(formData.price);

	return (
		<div className="form-container">
			<h2 style={{ marginBottom: "20px", color: "#2c3e50" }}>
				Add New Inventory
			</h2>

			<form onSubmit={handleSubmit}>
				{/* ... Inputs for Name, SKU, Category ... */}

				{/* I am omitting the top inputs to save space, they stay the same */}
				<div className="form-group">
					<label>Product Name</label>
					<input
						type="text"
						name="name"
						className="form-input"
						value={formData.name}
						onChange={handleChange}
					/>
				</div>
				<div className="form-grid">
					<div className="form-group">
						<label>SKU</label>
						<input
							type="text"
							name="sku"
							className="form-input"
							value={formData.sku}
							onChange={handleChange}
						/>
					</div>
					<div className="form-group">
						<label>Category</label>
						<input
							type="text"
							name="category"
							className="form-input"
							value={formData.category}
							onChange={handleChange}
						/>
					</div>
				</div>

				<div className="form-grid">
					<div className="form-group">
						<label>Quantity</label>
						<input
							type="number"
							name="quantity"
							className="form-input"
							value={formData.quantity}
							onChange={handleChange}
						/>
					</div>
					<div className="form-group">
						<label>Price Per Unit ($)</label>
						<input
							type="number"
							name="price"
							className="form-input"
							value={formData.price}
							onChange={handleChange}
						/>

						{/* UX Feature: Using the Helper Function */}
						{formData.quantity && formData.price && (
							<p
								style={{
									marginTop: "5px",
									fontSize: "0.85rem",
									color: "#7f8c8d",
								}}
							>
								Total Asset Value:{" "}
								<strong>{formatCurrency(totalValue)}</strong>
							</p>
						)}
					</div>
				</div>

				<div className="form-group">
					<label>Description</label>
					<textarea
						name="description"
						className="form-textarea"
						rows="4"
						value={formData.description}
						onChange={handleChange}
					></textarea>
				</div>

				<button
					type="submit"
					className="btn-primary"
					disabled={isLoading}
					style={{ opacity: isLoading ? 0.8 : 1, minHeight: "45px" }}
				>
					{isLoading ? (
						<div className="skeleton-loader"></div>
					) : (
						"Save Product"
					)}
				</button>
			</form>
		</div>
	);
};

export default AddProduct;
