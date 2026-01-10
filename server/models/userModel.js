import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = mongoose.Schema(
	{
		name: {
			type: String,
			required: [true, "Please add a name"],
		},
		email: {
			type: String,
			required: [true, "Please add a email"],
			unique: true,
			trim: true,
			match: [
				/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
				"Please enter a valid email",
			],
		},
		password: {
			type: String,
			required: [true, "Please add a password"],
			minLength: [6, "Password must be up to 6 characters"],
		},
		photo: {
			type: String,
			required: [true, "Please add a photo"],
			default: "https://i.ibb.co/4pDNDk1/avatar.png",
		},
		bio: {
			type: String,
			maxLength: [250, "Bio must not be more than 250 characters"],
			default: "bio",
		},
	},
	{
		timestamps: true,
	}
);

// --- ENCRYPTION MIDDLEWARE ---
// Note: We MUST use a regular function here (not an arrow function)
// so that 'this' refers to the document being saved.
userSchema.pre("save", async function (next) {
	if (!this.isModified("password")) {
		return next();
	}

	const salt = await bcrypt.genSalt(10);
	const hashedPassword = await bcrypt.hash(this.password, salt);
	this.password = hashedPassword;
	next();
});

const User = mongoose.model("User", userSchema);
export default User;
