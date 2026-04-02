import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
<<<<<<< HEAD
=======
import { FaEye, FaEyeSlash } from "react-icons/fa";
>>>>>>> 8805885 (fixed the database connection error)

const Register = () => {
	const navigate = useNavigate();
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		password: "",
		confirmPassword: "",
	});

	const { name, email, password, confirmPassword } = formData;

<<<<<<< HEAD
=======
	// Password toggle states
	const [showPassword, setShowPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);

>>>>>>> 8805885 (fixed the database connection error)
	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setFormData({ ...formData, [name]: value });
	};

	const registerUser = async (e) => {
		e.preventDefault();

<<<<<<< HEAD
		// 1. Validation
=======
		// Validation
>>>>>>> 8805885 (fixed the database connection error)
		if (!name || !email || !password) {
			return toast.error("All fields are required");
		}
		if (password.length < 6) {
			return toast.error("Password must be up to 6 characters");
		}
		if (password !== confirmPassword) {
			return toast.error("Passwords do not match");
		}

<<<<<<< HEAD
		// 2. Prepare Data (Sending simple JSON now, not FormData)
		const userData = {
			name,
			email,
			password,
		};

		try {
			const { data } = await axios.post("/api/users/register", userData);

=======
		const userData = { name, email, password };

		try {
			const { data } = await axios.post("/api/users/register", userData);
>>>>>>> 8805885 (fixed the database connection error)
			if (data) {
				toast.success("Registration Successful!");
				navigate("/dashboard");
			}
		} catch (error) {
<<<<<<< HEAD
			// 1. Get the error message from the backend
			const message =
				(error.response &&
					error.response.data &&
					error.response.data.message) ||
				error.message ||
				error.toString();

			// 2. Smart Check: Is the user already registered?
=======
			const message =
				error.response?.data?.message || error.message || error.toString();

>>>>>>> 8805885 (fixed the database connection error)
			if (message.toLowerCase().includes("already been registered")) {
				toast.info("User already registered. Redirecting to login...", {
					autoClose: 2000,
				});
<<<<<<< HEAD

=======
>>>>>>> 8805885 (fixed the database connection error)
				setTimeout(() => {
					navigate("/login");
				}, 2500);
			} else {
				toast.error(message);
			}
		}
	};

	return (
<<<<<<< HEAD
		<div className="min-h-screen flex items-center justify-center bg-slate-100 py-12 px-4 sm:px-6 lg:px-8">
=======
		<div className="min-h-screen flex items-center justify-center ">
>>>>>>> 8805885 (fixed the database connection error)
			<motion.div
				initial={{ opacity: 0, scale: 0.9 }}
				animate={{ opacity: 1, scale: 1 }}
				transition={{ duration: 0.3 }}
<<<<<<< HEAD
				className="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-2xl"
			>
				<div className="text-center">
					<h2 className="mt-6 text-3xl font-extrabold text-gray-900">
						Create an Account
					</h2>
					<p className="mt-2 text-sm text-gray-600">
=======
				className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8 sm:p-10 flex flex-col justify-center"
				style={{ minHeight: "100vh" }} // fill screen
			>
				<div className="text-center mb-6">
					<h2 className="text-3xl font-extrabold text-gray-900 mb-2">
						Create an Account
					</h2>
					<p className="text-gray-600">
>>>>>>> 8805885 (fixed the database connection error)
						Join us and manage your inventory
					</p>
				</div>

<<<<<<< HEAD
				<form className="mt-8 space-y-6" onSubmit={registerUser}>
					<div className="rounded-md shadow-sm space-y-4">
						{/* Name Input */}
						<div>
							<input
								type="text"
								name="name"
								value={name}
								onChange={handleInputChange}
								required
								className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
								placeholder="Name"
							/>
						</div>

						{/* Email Input */}
						<div>
							<input
								type="email"
								name="email"
								value={email}
								onChange={handleInputChange}
								required
								className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
								placeholder="Email address"
							/>
						</div>

						{/* Password Input */}
						<div>
							<input
								type="password"
								name="password"
								value={password}
								onChange={handleInputChange}
								required
								className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
								placeholder="Password"
							/>
						</div>

						{/* Confirm Password Input */}
						<div>
							<input
								type="password"
								name="confirmPassword"
								value={confirmPassword}
								onChange={handleInputChange}
								required
								className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
								placeholder="Confirm Password"
							/>
						</div>
					</div>

					<div>
						<button
							type="submit"
							className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
						>
							Sign up
						</button>
					</div>
				</form>

				<div className="text-center mt-4">
					<p className="text-sm text-gray-600">
						Already have an account?
						<Link
							to="/login"
							className="font-medium text-blue-600 hover:text-blue-500 ml-1"
=======
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
							onClick={() => setShowConfirmPassword(!showConfirmPassword)}
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
>>>>>>> 8805885 (fixed the database connection error)
						>
							Login
						</Link>
					</p>
				</div>
			</motion.div>
		</div>
	);
};

<<<<<<< HEAD
export default Register;
=======
export default Register;
>>>>>>> 8805885 (fixed the database connection error)
