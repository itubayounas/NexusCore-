import express from "express";
import {
	getLoginStatus,
	getUser,
	loginUser,
	logoutUser,
	registerUser,
} from "../controllers/user/userController.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/logout", logoutUser);
router.get("/getuser", protect, getUser); // Protected route
router.get("/loggedin", getLoginStatus);

export default router;
