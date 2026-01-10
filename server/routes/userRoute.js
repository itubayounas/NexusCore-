import express from "express";
import { getLoginStatus, getUser, loginUser, logoutUser, registerUser } from "../controllers/user/userController.js";
import upload from "../middleware/uploadMiddleware.js";
import protect from "../middleware/authMiddleware.js";


const router = express.Router();

// router.post("/register", registerUser);
router.post("/register", upload.single("photo"), registerUser);
router.post("/login", loginUser); // <--- Add this line
router.get("/logout", logoutUser);
router.get("/getuser", protect, getUser); // <--- Protected Route!
router.get("/loggedin", getLoginStatus);

export default router;
