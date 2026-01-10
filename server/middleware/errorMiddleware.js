const errorHandler = (err, req, res, next) => {
	// If the status code is 200 (OK), change it to 500 (Server Error)
	// Otherwise use the existing error status (e.g., 400 for bad input)
	const statusCode = res.statusCode ? res.statusCode : 500;

	res.status(statusCode);

	res.json({
		message: err.message,
		stack: process.env.NODE_ENV === "development" ? err.stack : null,
	});
};

export default errorHandler;
