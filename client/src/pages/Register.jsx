import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Register = () => {
	const navigate = useNavigate();
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		password: "",
		confirmPassword: "",
	});

	const { name, email, password, confirmPassword } = formData;

	// Password toggle states
	const [showPassword, setShowPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setFormData({ ...formData, [name]: value });
	};

	const registerUser = async (e) => {
		e.preventDefault();

		// Validation
		if (!name || !email || !password) {
			return toast.error("All fields are required");
		}
		if (password.length < 6) {
			return toast.error("Password must be up to 6 characters");
		}
		if (password !== confirmPassword) {
			return toast.error("Passwords do not match");
		}

		const userData = { name, email, password };

		try {
			const { data } = await axios.post("/api/users/register", userData);
			if (data) {
				toast.success("Registration Successful!");
				navigate("/dashboard");
			}
		} catch (error) {
			const message =
				error.response?.data?.message ||
				error.message ||
				error.toString();

			if (message.toLowerCase().includes("already been registered")) {
				toast.info("User already registered. Redirecting to login...", {
					autoClose: 2000,
				});
				setTimeout(() => {
					navigate("/login");
				}, 2500);
			} else {
				toast.error(message);
			}
		}
	};

	return (
		<div className="min-h-screen flex items-center justify-center bg-slate-100">
			<motion.div
				initial={{ opacity: 0, scale: 0.9 }}
				animate={{ opacity: 1, scale: 1 }}
				transition={{ duration: 0.3 }}
				className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8 sm:p-10 flex flex-col justify-center"
				style={{ minHeight: "100vh" }} // fill screen
			>
				<div className="text-center mb-6">
					<h2 className="text-3xl font-extrabold text-gray-900 mb-2">
						Create an Account
					</h2>
					<p className="text-gray-600">
						Join us and manage your inventory
					</p>
				</div>

				<form className="space-y-5" onSubmit={registerUser}>
					{/* Name */}
					<div className="relative">
						<input
							type="text"
							name="name"
							value={name}
							onChange={handleInputChange}
							required
							placeholder="Name"
							className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 placeholder-gray-500"
						/>
					</div>

					{/* Email */}
					<div className="relative">
						<input
							type="email"
							name="email"
							value={email}
							onChange={handleInputChange}
							required
							placeholder="Email"
							className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 placeholder-gray-500"
						/>
					</div>

					{/* Password */}
					<div className="relative">
						<input
							type={showPassword ? "text" : "password"}
							name="password"
							value={password}
							onChange={handleInputChange}
							required
							placeholder="Password"
							className="w-full px-4 py-3 pr-10 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 placeholder-gray-500"
						/>
						<span
							onClick={() => setShowPassword(!showPassword)}
							className="absolute right-3 top-3 cursor-pointer text-gray-500 select-none"
						>
							{showPassword ? <FaEyeSlash /> : <FaEye />}
						</span>
					</div>

					{/* Confirm Password */}
					<div className="relative">
						<input
							type={showConfirmPassword ? "text" : "password"}
							name="confirmPassword"
							value={confirmPassword}
							onChange={handleInputChange}
							required
							placeholder="Confirm Password"
							className="w-full px-4 py-3 pr-10 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 placeholder-gray-500"
						/>
						<span
							onClick={() =>
								setShowConfirmPassword(!showConfirmPassword)
							}
							className="absolute right-3 top-3 cursor-pointer text-gray-500 select-none"
						>
							{showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
						</span>
					</div>

					{/* Submit */}
					<button
						type="submit"
						className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition transform hover:scale-[1.02]"
					>
						Sign Up
					</button>
				</form>

				<div className="mt-6 text-center">
					<p className="text-gray-600">
						Already have an account?
						<Link
							to="/login"
							className="font-medium text-blue-600 ml-1 hover:text-blue-500"
						>
							Login
						</Link>
					</p>
				</div>
			</motion.div>
		</div>
	);
};

export default Register;
