export const validateProductForm = (formData) => {
	const { name, sku, category, quantity, price } = formData;

	// 1. Required Fields
	if (!name || !sku || !category || !quantity || !price) {
		return { isValid: false, error: "Please fill in all required fields" };
	}

	// 2. Quantity Logic
	if (Number(quantity) < 0) {
		return { isValid: false, error: "Quantity cannot be negative" };
	}
	// NEW: Limit Quantity to 8 digits (Max: 99,999,999)
	if (quantity.toString().length > 8) {
		return {
			isValid: false,
			error: "Quantity is too large (Max 8 digits)",
		};
	}

	// 3. Price Logic
	if (Number(price) <= 0) {
		return { isValid: false, error: "Price must be greater than $0" };
	}
	// NEW: Limit Price to 8 digits (Max: $99,999,999)
	if (price.toString().length > 8) {
		return { isValid: false, error: "Price is too large (Max 8 digits)" };
	}

	return { isValid: true, error: null };
};

// ... keep formatCurrency as is ...
export const formatCurrency = (amount) => {
	return Number(amount).toLocaleString("en-US", {
		style: "currency",
		currency: "USD",
		maximumFractionDigits: 2,
		notation: "compact",
		compactDisplay: "short",
	});
};
