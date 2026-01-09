// Check if the product data is valid
// Returns an object: { isValid: boolean, error: string }

export const validateProductForm = (formData) => {
	const { name, sku, category, quantity, price } = formData;

	// 1. Check for empty fields
	if (!name || !sku || !category || !quantity || !price) {
		return { isValid: false, error: "Please fill in all required fields" };
	}

	// 2. Check for negative quantity
	if (Number(quantity) < 0) {
		return { isValid: false, error: "Quantity cannot be negative" };
	}

	// 3. Check for price range
	if (Number(price) <= 0 || Number(price) > 100000) {
		return {
			isValid: false,
			error: "Price must be between $0.01 and $100,000",
		};
	}

	// 4. Valid
	return { isValid: true, error: null };
};

// Helper to format currency (Optional, but good practice)
export const formatCurrency = (amount) => {
	return Number(amount).toLocaleString("en-US", {
		style: "currency",
		currency: "USD",
	});
};
