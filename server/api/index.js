import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path";
import { fileURLToPath } from "url";

import productRoutes from "../routes/productRoute.js";
import userRoute from "../routes/userRoute.js";
import errorHandler from "../middleware/errorMiddleware.js";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser());

app.use(
	cors({
		origin: [
			"http://localhost:5173",
			"https://nexus-core-frontened.vercel.app",
		],
		credentials: true,
	})
);

// ---------------- DATABASE (Serverless Safe) ----------------
let isConnected = false;

const connectDB = async () => {
	if (isConnected) return;

	const conn = await mongoose.connect(process.env.MONGO_URI);
	isConnected = true;
	console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
};

connectDB();

// ---------------- STATIC FILES ----------------
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

// ---------------- ROUTES ----------------
app.use("/api/products", productRoutes);
app.use("/api/users", userRoute);

// ---------------- ERROR HANDLER ----------------
app.use(errorHandler);

// ❌ NO app.listen() on Vercel
export default app;
