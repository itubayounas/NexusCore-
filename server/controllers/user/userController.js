import asyncHandler from "express-async-handler";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../../models/userModel.js";

// Generate Token
const generateToken = (id) => {
	return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1d" });
};



export const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  // Validation
  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please fill in all required fields");
  }
  if (password.length < 6) {
    res.status(400);
    throw new Error("Password must be up to 6 characters");
  }

  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("Email has already been registered");
  }

  // --- HANDLE FILE UPLOAD HERE ---
  let fileData = {};
  if (req.file) {
    // If a file was sent, save its path
    // We add 'http://localhost:5000/' so the frontend gets a full clickable link
    // Note: Adjust port 5000 if yours is different
    fileData = {
      filePath: req.file.path,
      fileName: req.file.filename,
      fileType: req.file.mimetype,
      fileSize: formatFileSize(req.file.size), // Optional helper function
    };
  }

  // Create new user
  const user = await User.create({
    name,
    email,
    password,
    photo: req.file ? req.file.path : undefined, // Use file path if exists, else default from Model
  });

  // ... (Generate Token & Cookie logic remains exactly the same) ...
  const token = generateToken(user._id);

  res.cookie("token", token, {
    path: "/",
    httpOnly: true,
    expires: new Date(Date.now() + 1000 * 86400),
    sameSite: "none",
    secure: true,
  });

  if (user) {
    const { _id, name, email, photo, bio } = user;
    res.status(201).json({
      _id,
      name,
      email,
      photo,
      bio,
      token,
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

// Helper (Optional)
const formatFileSize = (bytes) => {
  if (bytes === 0) return "0 Bytes";
  const k = 1000;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
};
// ... existing imports and registerUser function ...

// --- LOGIN USER ---
export const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // 1. Validate Request
  if (!email || !password) {
    res.status(400);
    throw new Error("Please add email and password");
  }

  // 2. Check if user exists
  const user = await User.findOne({ email });

  // 3. Check password
  if (!user) {
    res.status(400);
    throw new Error("User not found, please sign up");
  }

  // bcrypt.compare(enteredPassword, encryptedPassword)
  const passwordIsCorrect = await bcrypt.compare(password, user.password);

  // 4. If credentials are valid, generate token
  if (user && passwordIsCorrect) {
    const token = generateToken(user._id);

    // Send HTTP-Only Cookie
    res.cookie("token", token, {
      path: "/",
      httpOnly: true,
      expires: new Date(Date.now() + 1000 * 86400), // 1 Day
      sameSite: "none",
      secure: true,
    });

    const { _id, name, email, photo, bio } = user;
    res.status(200).json({
      _id,
      name,
      email,
      photo,
      bio,
      token,
    });
  } else {
    res.status(400);
    throw new Error("Invalid email or password");
  }
});
// ... (after loginUser function)

// --- LOGOUT USER ---
export const logoutUser = asyncHandler(async (req, res) => {
  // We expire the cookie immediately by setting expires to a past date
  res.cookie("token", "", {
    path: "/",
    httpOnly: true,
    expires: new Date(0), // Expire immediately
    sameSite: "none",
    secure: true,
  });
  return res.status(200).json({ message: "Successfully Logged Out" });
});

// --- GET USER DATA ---
export const getUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    const { _id, name, email, photo, bio } = user;
    res.status(200).json({
      _id,
      name,
      email,
      photo,
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
  if (!token) {
    return res.json(false);
  }
  // Verify Token
  const verified = jwt.verify(token, process.env.JWT_SECRET);
  if (verified) {
    return res.json(true);
  }
  return res.json(false);
});
