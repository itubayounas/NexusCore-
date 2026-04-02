import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
	plugins: [react()],
	server: {
<<<<<<< HEAD
		port: 3000, // Explicitly set frontend to 3000
		proxy: {
=======
		port: 3000,
		proxy: {
			// 1. Keep Login Working (Connects to your Backend)
>>>>>>> 8805885 (fixed the database connection error)
			"/api": {
				target: "http://localhost:5000",
				changeOrigin: true,
				secure: false,
			},
<<<<<<< HEAD
=======
			// 2. Fix Voice Assistant (Connects to n8n Tunnel)
			"/webhook-test": {
				target: "http://localhost:5678", // Your current Tunnel URL
				changeOrigin: true,
				secure: false,
			},
>>>>>>> 8805885 (fixed the database connection error)
		},
	},
});
