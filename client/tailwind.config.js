/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			colors: {
				// "brand" is our main action color (Electric Blue)
				brand: {
					50: "#f0f9ff",
					100: "#e0f2fe",
					500: "#0ea5e9", // Sky 500
					600: "#0284c7", // Sky 600
					700: "#0369a1", // Sky 700
				},
				// "dark" is for our backgrounds (Deep Navy/Slate)
				dark: {
					bg: "#0f172a", // Slate 900 (Main BG)
					card: "#1e293b", // Slate 800 (Card BG)
					sidebar: "#020617", // Slate 950 (Darker Sidebar)
				},
			},
			fontFamily: {
				sans: ["Inter", "system-ui", "sans-serif"], // Ensure you have a clean font
			},
		},
	},
	plugins: [],
};
