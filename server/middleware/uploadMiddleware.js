import multer from "multer";
import path from "path";

// 1. Define where to save the files (Disk Storage)
const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, "uploads/"); // Files will be saved in a folder named 'uploads'
	},
	filename: (req, file, cb) => {
		// Rename file to: fieldname-date.extension (e.g., photo-167889.jpg)
		// This prevents duplicates
		cb(
			null,
			file.fieldname + "-" + Date.now() + path.extname(file.originalname)
		);
	},
});

// 2. Define File Filters (Only images allowed)
const fileFilter = (req, file, cb) => {
	if (
		file.mimetype === "image/png" ||
		file.mimetype === "image/jpg" ||
		file.mimetype === "image/jpeg"
	) {
		cb(null, true);
	} else {
		cb(null, false); // Reject file
	}
};

const upload = multer({ storage, fileFilter });

export default upload;
