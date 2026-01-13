import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";

import productRoutes from "../routes/productRoute.js";
import userRoute from "../routes/userRoute.js";
import errorHandler from "../middleware/errorMiddleware.js";

dotenv.config();

const app = express();

// --- MIDDLEWARE ---
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));

// --- CORS CONFIGURATION ---
app.use(
	cors({
		origin: [
			"http://localhost:5173", // Localhost
			"https://nexus-core-frontened.vercel.app", // Live Frontend
		],
		credentials: true,
		methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
		allowedHeaders: ["Content-Type", "Authorization"],
	})
);

// --- ROBUST DATABASE CONNECTION ---
let isConnected = false;

const connectDB = async () => {
	if (isConnected) {
		return;
	}
	try {
		const conn = await mongoose.connect(process.env.MONGO_URI);
		isConnected = true;
		console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
	} catch (error) {
		console.error("❌ MongoDB Connection Error:", error);
	}
};

// --- DB CONNECTION MIDDLEWARE ---
// Forces app to wait for DB before handling requests
app.use(async (req, res, next) => {
	await connectDB();
	next();
});

// --- ROUTES ---
// (We removed the static /uploads route here)
app.use("/api/products", productRoutes);
app.use("/api/users", userRoute);

// --- ERROR HANDLER ---
app.use(errorHandler);

// --- LOCAL SERVER START ---
if (process.env.NODE_ENV !== "production") {
	const PORT = process.env.PORT || 5000;
	app.listen(PORT, () => {
		console.log(`🚀 Server running locally on port ${PORT}`);
	});
}

export default app;
