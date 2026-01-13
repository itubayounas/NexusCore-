import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { motion } from "framer-motion";

const Register = () => {
	const navigate = useNavigate();
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		password: "",
		confirmPassword: "",
	});

	const { name, email, password, confirmPassword } = formData;

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setFormData({ ...formData, [name]: value });
	};

	const registerUser = async (e) => {
		e.preventDefault();

		// 1. Validation
		if (!name || !email || !password) {
			return toast.error("All fields are required");
		}
		if (password.length < 6) {
			return toast.error("Password must be up to 6 characters");
		}
		if (password !== confirmPassword) {
			return toast.error("Passwords do not match");
		}

		// 2. Prepare Data (Sending simple JSON now, not FormData)
		const userData = {
			name,
			email,
			password,
		};

		try {
			const { data } = await axios.post("/api/users/register", userData);

			if (data) {
				toast.success("Registration Successful!");
				navigate("/dashboard");
			}
		} catch (error) {
			// 1. Get the error message from the backend
			const message =
				(error.response &&
					error.response.data &&
					error.response.data.message) ||
				error.message ||
				error.toString();

			// 2. Smart Check: Is the user already registered?
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
		<div className="min-h-screen flex items-center justify-center bg-slate-100 py-12 px-4 sm:px-6 lg:px-8">
			<motion.div
				initial={{ opacity: 0, scale: 0.9 }}
				animate={{ opacity: 1, scale: 1 }}
				transition={{ duration: 0.3 }}
				className="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-2xl"
			>
				<div className="text-center">
					<h2 className="mt-6 text-3xl font-extrabold text-gray-900">
						Create an Account
					</h2>
					<p className="mt-2 text-sm text-gray-600">
						Join us and manage your inventory
					</p>
				</div>

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
