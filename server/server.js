import express from "express";
import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";
import cors from "cors";
import productRoutes from "./routes/productRoute.js";
import userRoute from "./routes/userRoute.js";
import path from "path";
import { fileURLToPath } from "url"; // Needed for ES6 __dirname
import cookieParser from "cookie-parser";
import errorHandler from "./middleware/errorMiddleware.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// dotenv.config();
const app = express();
app.use(cookieParser());

// --- MIDDLEWARE ---
app.use(express.json());
app.use(cors());

// --- DATABASE ---
const connectDB = async () => {
	try {
		const conn = await mongoose.connect(process.env.MONGO_URI);
		console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
	} catch (error) {
		console.error(`❌ Error: ${error.message}`);
		process.exit(1);
	}
};
connectDB();

app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/api/products", productRoutes);
app.use("/api/users", userRoute);
app.use(errorHandler);

// --- START SERVER ---
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
