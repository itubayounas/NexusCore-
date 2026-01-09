import axios from "axios";

// Define the base URL for the API
const API_URL = "http://localhost:5000/api/products";

// Function to Create a new product
const createProduct = async (formData) => {
	const response = await axios.post(API_URL, formData);
	return response.data;
};

// Function to Get all products (We will use this later)
const getProducts = async () => {
	const response = await axios.get(API_URL);
	return response.data;
};

// Export all functions as a single object
const productService = {
	createProduct,
	getProducts,
};

export default productService;
