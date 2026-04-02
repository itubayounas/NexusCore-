import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
	FaWarehouse,
	FaChartLine,
	FaShieldAlt,
	FaCheckCircle,
	FaTimesCircle,
} from "react-icons/fa";

const Home = () => {
	return (
		<div className="text-white min-h-screen overflow-x-hidden">
			{/* --- HERO SECTION --- */}
			<section className="min-h-[90vh] flex flex-col md:flex-row items-center justify-center px-4 md:px-12 pt-24 md:pt-0">
				<div className="max-w-7xl w-full grid md:grid-cols-2 gap-8 md:gap-12 items-center">
					{/* LEFT: Text Content */}
					<div className="text-center md:text-left z-10">
						<motion.div
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							transition={{ duration: 1 }}
						>
							<span className="bg-blue-600/20 text-blue-300 py-1 px-3 rounded-full text-xs sm:text-sm font-mono border border-blue-500/30 mb-4 inline-block">
								🚀 V1.0 Now Live
							</span>

							{/* TYPEWRITER TITLE */}
							<h1 className="text-3xl sm:text-5xl md:text-7xl font-extrabold mb-6 leading-tight">
								<Typewriter
									text="Master Your Inventory."
									delay={100}
								/>
							</h1>
						</motion.div>

						<motion.p
							initial={{ opacity: 0, x: -50 }}
							animate={{ opacity: 1, x: 0 }}
							transition={{ delay: 1.5, duration: 0.8 }}
							className="text-sm sm:text-base md:text-lg text-gray-300 mb-6 md:mb-8 leading-relaxed max-w-full md:max-w-lg mx-auto md:mx-0"
						>
							Stop using spreadsheets. Switch to the modern,
							real-time stock management system designed for
							accuracy.
						</motion.p>

						<motion.div
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: 2, duration: 0.5 }}
							className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start"
						>
							<Link to="/register" className="w-full sm:w-auto">
								<button className="bg-brand-600 hover:bg-brand-500 text-white font-bold py-3 sm:py-4 px-6 sm:px-8 rounded-xl shadow-lg shadow-brand-500/30 transition transform hover:-translate-y-1 w-full sm:w-auto">
									Start Free
								</button>
							</Link>
							<Link to="/login" className="w-full sm:w-auto">
								<button className="glass hover:bg-white/10 text-white font-bold py-3 sm:py-4 px-6 sm:px-8 rounded-xl border border-white/20 transition transform hover:-translate-y-1 w-full sm:w-auto">
									Login
								</button>
							</Link>
						</motion.div>
					</div>

					{/* RIGHT: Dashboard Preview */}
					<motion.div
						initial={{ opacity: 0, x: 50 }}
						animate={{ opacity: 1, x: 0 }}
						transition={{ duration: 1 }}
						className="relative hidden md:block"
					>
						{/* Abstract Blobs behind image */}
						<div className="absolute top-0 -left-4 w-56 h-56 sm:w-72 sm:h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
						<div className="absolute -bottom-8 right-0 w-56 h-56 sm:w-72 sm:h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>

						<motion.img
							animate={{ y: [0, -10, 0] }}
							transition={{
								repeat: Infinity,
								duration: 6,
								ease: "easeInOut",
							}}
							src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80"
							alt="Dashboard Preview"
							className="relative z-10 w-full max-w-md rounded-xl shadow-2xl border border-white/10"
						/>
					</motion.div>
				</div>
			</section>

			{/* --- SECTION 2: THE PROBLEM VS SOLUTION --- */}
			<section className="py-16 md:py-24 bg-slate-900/50 px-4 md:px-6">
				<div className="max-w-6xl mx-auto">
					<div className="text-center mb-12 md:mb-16">
						<h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
							Why upgrade?
						</h2>
						<p className="text-gray-400 text-sm sm:text-base">
							The difference is clear.
						</p>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
						{/* The Old Way */}
						<motion.div
							whileHover={{ scale: 1.02 }}
							className="p-6 sm:p-8 rounded-2xl bg-red-500/5 border border-red-500/20"
						>
							<h3 className="text-2xl sm:text-3xl font-bold text-red-400 mb-4 sm:mb-6 flex items-center gap-2">
								<FaTimesCircle /> The Old Way
							</h3>
							<ul className="space-y-3 text-gray-400 text-sm sm:text-base">
								<li className="flex gap-2 sm:gap-3">
									<span className="text-red-500">✗</span>{" "}
									Messy Excel spreadsheets
								</li>
								<li className="flex gap-2 sm:gap-3">
									<span className="text-red-500">✗</span>{" "}
									"Where is that item?" panic
								</li>
								<li className="flex gap-2 sm:gap-3">
									<span className="text-red-500">✗</span>{" "}
									Manual counting errors
								</li>
								<li className="flex gap-2 sm:gap-3">
									<span className="text-red-500">✗</span> No
									data backups
								</li>
							</ul>
						</motion.div>

						{/* The Nexus Way */}
						<motion.div
							whileHover={{ scale: 1.02 }}
							className="p-6 sm:p-8 rounded-2xl bg-brand-500/10 border border-brand-500/30 relative overflow-hidden"
						>
							<div className="absolute top-0 right-0 bg-brand-500 text-xs sm:text-sm font-bold px-2 sm:px-3 py-1 rounded-bl-lg text-white">
								RECOMMENDED
							</div>
							<h3 className="text-2xl sm:text-3xl font-bold text-brand-400 mb-4 sm:mb-6 flex items-center gap-2">
								<FaCheckCircle /> The NexusCore Way
							</h3>
							<ul className="space-y-3 text-gray-300 text-sm sm:text-base">
								<li className="flex gap-2 sm:gap-3">
									<span className="text-brand-500">✓</span>{" "}
									Real-time Item Counts
								</li>
								<li className="flex gap-2 sm:gap-3">
									<span className="text-brand-500">✓</span>{" "}
									Total Asset Value Calculation
								</li>
								<li className="flex gap-2 sm:gap-3">
									<span className="text-brand-500">✓</span>{" "}
									Low Stock Indicators
								</li>
								<li className="flex gap-2 sm:gap-3">
									<span className="text-brand-500">✓</span>{" "}
									Secure Cloud Storage
								</li>
							</ul>
						</motion.div>
					</div>
				</div>
			</section>

			{/* --- SECTION 3: FEATURES GRID --- */}
			<section className="py-16 md:py-24 px-4 md:px-6">
				<div className="max-w-7xl mx-auto">
					<h2 className="text-3xl sm:text-4xl md:text-4xl font-bold text-center mb-12 md:mb-16">
						Everything you need
					</h2>
					<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
						<FeatureCard
							icon={
								<FaWarehouse
									size={32}
									className="text-blue-400"
								/>
							}
							title="Centralized Inventory"
							desc="One place for all your products, categories, and stock levels."
						/>
						<FeatureCard
							icon={
								<FaShieldAlt
									size={32}
									className="text-purple-400"
								/>
							}
							title="Product Security"
							desc="Only authorized users can access and edit your inventory data."
						/>
						<FeatureCard
							icon={
								<FaChartLine
									size={32}
									className="text-green-400"
								/>
							}
							title="Financial Overview"
							desc="Instantly see the total monetary value of your stock in hand."
						/>
					</div>
				</div>
			</section>

			{/* --- CALL TO ACTION FOOTER --- */}
			<section className="py-16 md:py-20 text-center relative overflow-hidden px-4 md:px-0">
				<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 sm:w-[500px] h-72 sm:h-[500px] bg-brand-600/20 rounded-full blur-[100px] -z-10"></div>

				<h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6">
					Ready to get organized?
				</h2>
				<p className="text-base sm:text-xl text-gray-300 mb-6 sm:mb-8 max-w-full sm:max-w-2xl mx-auto">
					Join us and start managing your inventory the smart way.
				</p>
				<Link to="/register">
					<button className="bg-white text-blue-900 font-extrabold py-3 sm:py-4 px-8 sm:px-12 rounded-full hover:bg-gray-100 transition shadow-xl transform hover:scale-105 w-full sm:w-auto">
						Get Started Now
					</button>
				</Link>
			</section>
		</div>
	);
};

// --- SUB-COMPONENTS --- //
const Typewriter = ({ text, delay }) => {
	const [currentText, setCurrentText] = React.useState("");
	const [currentIndex, setCurrentIndex] = React.useState(0);

	React.useEffect(() => {
		if (currentIndex < text.length) {
			const timeout = setTimeout(() => {
				setCurrentText((prev) => prev + text[currentIndex]);
				setCurrentIndex((prev) => prev + 1);
			}, delay);
			return () => clearTimeout(timeout);
		}
	}, [currentIndex, delay, text]);

	return (
		<span>
			{currentText}
			<span className="animate-pulse">|</span>
		</span>
	);
};

const FeatureCard = ({ icon, title, desc }) => {
	return (
		<motion.div
			whileHover={{ y: -5 }}
			className="glass p-6 sm:p-8 rounded-2xl border border-white/5 hover:border-brand-500/30 transition-colors"
		>
			<div className="w-14 h-14 bg-slate-800 rounded-xl flex items-center justify-center mb-4 sm:mb-6 shadow-inner">
				{icon}
			</div>
			<h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3">
				{title}
			</h3>
			<p className="text-gray-400 text-sm sm:text-base leading-relaxed">
				{desc}
			</p>
		</motion.div>
	);
};

export default Home;
