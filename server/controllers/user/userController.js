import asyncHandler from "express-async-handler";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../../models/userModel.js";

// Generate Token
const generateToken = (id) => {
	return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1d" });
};

// --- REGISTER USER ---
export const registerUser = asyncHandler(async (req, res) => {
	const { name, email, password } = req.body;

	// Validation
	if (!name || !email || !password) {
		res.status(400);
		throw new Error("Please fill in all required fields");
	}
	if (password.length < 6) {
		res.status(400);
		throw new Error("Password must be at least 6 characters");
	}

	const userExists = await User.findOne({ email });
	if (userExists) {
		res.status(400);
		throw new Error("Email has already been registered");
	}

	// Create new user
	const user = await User.create({
		name,
		email,
		password,
	});

	const token = generateToken(user._id);

	// Send HTTP-Only Cookie
	res.cookie("token", token, {
		path: "/",
		httpOnly: true,
		expires: new Date(Date.now() + 1000 * 86400), // 1 Day
		sameSite: "none",
		secure: true,
	});

	if (user) {
		const { _id, name, email, bio } = user;
		res.status(201).json({
			_id,
			name,
			email,
			bio,
			token,
		});
	} else {
		res.status(400);
		throw new Error("Invalid user data");
	}
});

// --- LOGIN USER ---
export const loginUser = asyncHandler(async (req, res) => {
	const { email, password } = req.body;

	if (!email || !password) {
		res.status(400);
		throw new Error("Please add email and password");
	}

	const user = await User.findOne({ email });

	if (!user) {
		res.status(400);
		throw new Error("User not found, please sign up");
	}

	const passwordIsCorrect = await bcrypt.compare(password, user.password);

	if (user && passwordIsCorrect) {
		const token = generateToken(user._id);

		res.cookie("token", token, {
			path: "/",
			httpOnly: true,
			expires: new Date(Date.now() + 1000 * 86400), // 1 Day
			sameSite: "none",
			secure: true,
		});

		const { _id, name, email, bio } = user;
		res.status(200).json({
			_id,
			name,
			email,
			bio,
			token,
		});
	} else {
		res.status(400);
		throw new Error("Invalid email or password");
	}
});

// --- LOGOUT USER ---
export const logoutUser = asyncHandler(async (req, res) => {
	res.cookie("token", "", {
		path: "/",
		httpOnly: true,
		expires: new Date(0),
		sameSite: "none",
		secure: true,
	});
	return res.status(200).json({ message: "Successfully Logged Out" });
});

// --- GET USER DATA ---
export const getUser = asyncHandler(async (req, res) => {
	const user = await User.findById(req.user._id);

	if (user) {
		const { _id, name, email, bio } = user;
		res.status(200).json({
			_id,
			name,
			email,
			bio,
		});
	} else {
		res.status(400);
		throw new Error("User not found");
	}
});

// --- GET LOGIN STATUS ---
export const getLoginStatus = asyncHandler(async (req, res) => {
	const token = req.cookies.token;
	if (!token) return res.json(false);

	const verified = jwt.verify(token, process.env.JWT_SECRET);
	if (verified) return res.json(true);

	return res.json(false);
});
