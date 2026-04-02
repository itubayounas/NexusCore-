import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
<<<<<<< HEAD
import { FaEnvelope, FaLock } from "react-icons/fa";
=======
import { FaEnvelope, FaLock, FaEye, FaEyeSlash, FaSpinner } from "react-icons/fa";
>>>>>>> 8805885 (fixed the database connection error)

const Login = () => {
	const navigate = useNavigate();
	const [formData, setFormData] = useState({
		email: "",
		password: "",
	});
<<<<<<< HEAD

	const { email, password } = formData;
=======
	const { email, password } = formData;

	const [showPassword, setShowPassword] = useState(false);
>>>>>>> 8805885 (fixed the database connection error)
	const [isLoading, setIsLoading] = useState(false);

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setFormData({ ...formData, [name]: value });
	};

	const loginUser = async (e) => {
		e.preventDefault();
		if (!email || !password) return toast.error("All fields are required");

		setIsLoading(true);
		try {
			const { data } = await axios.post("/api/users/login", formData);
			if (data) {
				setIsLoading(false);
				navigate("/dashboard");
			}
		} catch (error) {
			setIsLoading(false);
<<<<<<< HEAD

			// --- SMART ERROR HANDLING ---
			const message = error.response?.data?.message || error.message;

			// Check if the error is "User not found"
			if (message.toLowerCase().includes("user not found")) {
				toast.error(
					"Account does not exist. Redirecting to Register...",
					{
						autoClose: 2000,
					}
				);
				// Auto-redirect after 2 seconds
				setTimeout(() => {
					navigate("/register");
				}, 2500);
=======
			const message = error.response?.data?.message || error.message;

			if (message.toLowerCase().includes("user not found")) {
				toast.error(
					"Account does not exist. Redirecting to Register...",
					{ autoClose: 2000 }
				);
				setTimeout(() => navigate("/register"), 2500);
>>>>>>> 8805885 (fixed the database connection error)
			} else if (message.toLowerCase().includes("invalid")) {
				toast.error("Wrong email or password. Please try again.");
			} else {
				toast.error(message);
			}
		}
	};

	return (
<<<<<<< HEAD
		// Replaced bg-slate-100 with transparent to show the animated CSS background
=======
>>>>>>> 8805885 (fixed the database connection error)
		<div className="min-h-screen flex items-center justify-center p-4">
			<motion.div
				initial={{ opacity: 0, scale: 0.8 }}
				animate={{ opacity: 1, scale: 1 }}
				transition={{ duration: 0.5 }}
<<<<<<< HEAD
				// Added 'glass' class here
				className="glass p-10 rounded-2xl w-full max-w-md text-white"
			>
				<div className="text-center mb-8">
					<h2 className="text-4xl font-bold mb-2">Welcome Back</h2>
					<p className="text-gray-100 opacity-80">
=======
				className="glass w-full max-w-md rounded-2xl p-6 sm:p-10 flex flex-col justify-center"
				style={{ minHeight: "100vh" }}
			>
				<div className="text-center mb-6">
					<h2 className="text-3xl sm:text-4xl font-bold mb-2 text-white">
						Welcome Back
					</h2>
					<p className="text-gray-100 opacity-80 text-sm sm:text-base">
>>>>>>> 8805885 (fixed the database connection error)
						Login to manage your inventory
					</p>
				</div>

<<<<<<< HEAD
				<form onSubmit={loginUser} className="space-y-6">
					<div className="relative">
						<FaEnvelope className="absolute left-3 top-4 text-white opacity-70" />
=======
				<form onSubmit={loginUser} className="space-y-4 sm:space-y-6">
					{/* Email Input */}
					<div className="relative">
						<FaEnvelope className="absolute left-3 top-3.5 sm:top-4 text-white opacity-70" />
>>>>>>> 8805885 (fixed the database connection error)
						<input
							type="email"
							placeholder="Email"
							required
							name="email"
							value={email}
							onChange={handleInputChange}
<<<<<<< HEAD
							className="w-full pl-10 pr-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-gray-200 focus:outline-none focus:ring-2 focus:ring-white transition"
						/>
					</div>

					<div className="relative">
						<FaLock className="absolute left-3 top-4 text-white opacity-70" />
						<input
							type="password"
=======
							className="w-full pl-10 pr-4 py-2 sm:py-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-gray-200 focus:outline-none focus:ring-2 focus:ring-white transition text-sm sm:text-base"
						/>
					</div>

					{/* Password Input with toggle */}
					<div className="relative">
						<FaLock className="absolute left-3 top-3.5 sm:top-4 text-white opacity-70" />
						<input
							type={showPassword ? "text" : "password"}
>>>>>>> 8805885 (fixed the database connection error)
							placeholder="Password"
							required
							name="password"
							value={password}
							onChange={handleInputChange}
<<<<<<< HEAD
							className="w-full pl-10 pr-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-gray-200 focus:outline-none focus:ring-2 focus:ring-white transition"
						/>
					</div>

					<button
						type="submit"
						disabled={isLoading}
						className="w-full bg-white text-blue-600 font-bold py-3 rounded-lg hover:bg-opacity-90 transition transform hover:scale-[1.02] shadow-lg"
					>
						{isLoading ? "Logging in..." : "Login"}
=======
							className="w-full pl-10 pr-10 py-2 sm:py-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-gray-200 focus:outline-none focus:ring-2 focus:ring-white transition text-sm sm:text-base"
						/>
						<span
							onClick={() => setShowPassword(!showPassword)}
							className="absolute right-3 top-3.5 sm:top-4 cursor-pointer text-white opacity-80 select-none"
						>
							{showPassword ? <FaEyeSlash /> : <FaEye />}
						</span>
					</div>

					{/* Submit Button with spinner */}
					<button
						type="submit"
						disabled={isLoading}
						className="w-full bg-white text-blue-600 font-bold py-2 sm:py-3 rounded-lg hover:bg-opacity-90 transition transform hover:scale-[1.02] shadow-lg flex items-center justify-center text-sm sm:text-base"
					>
						{isLoading && <FaSpinner className="animate-spin mr-2" />}
						{isLoading ? "Logging in" : "Login"}
>>>>>>> 8805885 (fixed the database connection error)
					</button>
				</form>

				<div className="mt-6 text-center">
<<<<<<< HEAD
					<p className="text-sm opacity-90">
=======
					<p className="text-sm sm:text-base opacity-90 text-white">
>>>>>>> 8805885 (fixed the database connection error)
						New here?
						<Link
							to="/register"
							className="font-bold underline ml-1 hover:text-gray-200"
						>
							Create an account
						</Link>
					</p>
				</div>
			</motion.div>
		</div>
	);
};

<<<<<<< HEAD
export default Login;
=======
export default Login;
>>>>>>> 8805885 (fixed the database connection error)
