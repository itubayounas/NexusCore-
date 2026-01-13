import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import axios from "axios";
import "./index.css";
import App from "./App.jsx";

// --- SMART CONNECTION SETTINGS ---

// 1. If running locally (npm run dev), use Localhost port 5000.
// 2. If deployed on Vercel (production), use your LIVE Backend URL.
axios.defaults.baseURL = import.meta.env.DEV
	? "http://localhost:5000"
	: "https://nexus-core-brown.vercel.app";

// --- CRITICAL SETTING ---
// Enable cookies (JWT) to travel between Frontend and Backend
axios.defaults.withCredentials = true;

createRoot(document.getElementById("root")).render(
	// <StrictMode>
	<App />
	// </StrictMode>,
);
