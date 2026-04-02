import React, { useState } from "react";
import SpeechRecognition, {
	useSpeechRecognition,
} from "react-speech-recognition";
import axios from "axios";

// ✅ WE ONLY USE THE PATH NOW
const N8N_URL = "/webhook-test/voice-command";

const VoiceAssistant = ({ onOperationSuccess }) => {
	const { transcript, listening, resetTranscript } = useSpeechRecognition();
	const [isProcessing, setIsProcessing] = useState(false);
	const [result, setResult] = useState(null);

	const handleSend = async () => {
		if (!transcript) return;
		setIsProcessing(true);
		setResult(null);

		try {
			const response = await axios.post(
				N8N_URL,
				{ command: transcript },
				{ baseURL: window.location.origin }
			);

			// Save the data to the screen
			console.log("🤖 ROBOT REPLY:", response.data);
			setResult(response.data);

			// Speak the logic
			// 2. 🧠 SMART VOICE LOGIC
			let voiceMessage =
				"I didn't understand that command. Please try again."; // Better default
			const data = response.data;

			// CASE A: It found a list (Find)
			if (Array.isArray(data)) {
				if (data.length > 0) {
					const item = data[0];
					voiceMessage = `I found ${item.name}. The price is ${item.price} dollars.`;
				} else {
					voiceMessage = "I searched but found nothing.";
				}
			}
			// CASE B: It deleted something (Success)
			else if (data.deletedCount !== undefined && data.deletedCount > 0) {
				voiceMessage = `Done. Deleted ${data.deletedCount} items.`;
			}
			// CASE C: It added/updated (Success)
			else if (data.name && data.action !== "delete") {
				voiceMessage = `Success. ${data.name} has been processed.`;
			}
			// CASE D: MISSING NAME ERROR (New!)
			else if (data.name === null) {
				voiceMessage =
					"I heard the command, but you didn't say which product to use. Please specify a name.";
			}

			const speech = new SpeechSynthesisUtterance(voiceMessage);
			window.speechSynthesis.speak(speech);

			// 🛑 CHANGE 1: DO NOT wipe the text immediately
			// resetTranscript();  <-- Commented out so you can see what you said

			// 🛑 CHANGE 2: Delay the Dashboard Refresh by 3 seconds
			// This gives you time to read the black box before the main page updates
			if (onOperationSuccess) {
				setTimeout(() => {
					onOperationSuccess();
				}, 5000); // Waits 5 seconds before refreshing the background
			}
		} catch (error) {
			console.error(error);
			alert("ERROR: " + error.message);
		}
		setIsProcessing(false);
	};

	// 🆕 Helper to format the data nicely
	const renderResult = (data) => {
		if (!data) return null;

		if (Array.isArray(data)) {
			if (data.length === 0) return <div>No products found.</div>;
			return data.map((item, index) => (
				<div key={index} style={styles.resultItem}>
					<strong>{item.name}</strong> <br />
					💰 ${item.price} | 📦 {item.quantity} <br />
					<span style={{ fontSize: "10px", color: "#666" }}>
						{item.sku}
					</span>
				</div>
			));
		}

		if (typeof data === "object") {
			if (data.deletedCount !== undefined) {
				return (
					<div style={styles.successMsg}>
						🗑️ Deleted {data.deletedCount} item(s)
					</div>
				);
			}
			return (
				<div style={styles.resultItem}>
					<strong>{data.name || "Operation Complete"}</strong> <br />
					{data.price && (
						<span>
							💰 ${data.price} | 📦 {data.quantity}
						</span>
					)}
				</div>
			);
		}
		return <div>{JSON.stringify(data)}</div>;
	};

	if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
		return <span>Browser does not support speech recognition.</span>;
	}

	return (
		<div style={styles.container}>
			<div style={styles.status}>
				{listening ? "🎤 Listening..." : "🛑 Idle"}
				{isProcessing && " ⚙️ Processing..."}
			</div>

			<div style={styles.transcript}>
				{transcript || "Click Start and speak..."}
			</div>

			{/* 🆕 DEBUG RAW DATA DUMP (Black Box) */}
			{result && (
				<div style={styles.debugBox}>
					<strong style={{ color: "#fff" }}>⚡ DEBUG DATA:</strong>
					<pre style={{ margin: 0 }}>
						{JSON.stringify(result, null, 2)}
					</pre>
				</div>
			)}

			{/* Standard Result Display */}
			{result && (
				<div style={styles.resultBox}>
					<div
						style={{
							fontSize: "12px",
							color: "#1b5e20",
							marginBottom: "5px",
							fontWeight: "bold",
						}}
					>
						🤖 Response:
					</div>
					{renderResult(result)}
				</div>
			)}

			<div style={styles.buttons}>
				<button
					onClick={SpeechRecognition.startListening}
					style={styles.btn}
				>
					Start Mic
				</button>
				<button
					onClick={SpeechRecognition.stopListening}
					style={styles.btn}
				>
					Stop Mic
				</button>
				<button
					onClick={handleSend}
					disabled={!transcript || isProcessing}
					style={{
						...styles.btn,
						background: "#28a745",
						color: "white",
						opacity: !transcript || isProcessing ? 0.6 : 1,
						cursor:
							!transcript || isProcessing
								? "not-allowed"
								: "pointer",
					}}
				>
					🚀 Execute
				</button>
			</div>
		</div>
	);
};

const styles = {
	container: {
		position: "fixed",
		bottom: "20px",
		right: "20px",
		background: "white",
		padding: "15px",
		borderRadius: "10px",
		boxShadow: "0 4px 15px rgba(0,0,0,0.3)",
		zIndex: 1000,
		width: "300px",
		maxHeight: "80vh",
		overflowY: "auto",
		display: "flex",
		flexDirection: "column",
		gap: "10px",
		border: "1px solid #ddd",
	},
	status: {
		fontWeight: "bold",
		color: "#000000",
		marginBottom: "5px",
	},
	transcript: {
		background: "#f8f9fa",
		border: "2px solid #333", // High visibility border
		color: "#000000",
		padding: "10px",
		borderRadius: "5px",
		minHeight: "40px",
		fontSize: "15px",
		fontWeight: "500",
	},
	// 🆕 Hacker Style Debug Box
	debugBox: {
		background: "#000",
		color: "#0f0", // Matrix Green text
		padding: "10px",
		fontSize: "10px",
		fontFamily: "monospace",
		borderRadius: "5px",
		border: "2px solid red",
		overflowX: "hidden",
		whiteSpace: "pre-wrap",
	},
	resultBox: {
		background: "#e8f5e9",
		border: "2px solid #2e7d32",
		color: "#1b5e20",
		padding: "10px",
		borderRadius: "5px",
		fontSize: "14px",
	},
	resultItem: {
		marginBottom: "8px",
		paddingBottom: "8px",
		borderBottom: "1px solid #a5d6a7",
	},
	successMsg: {
		color: "#b71c1c",
		fontWeight: "bold",
	},
	buttons: { display: "flex", gap: "5px" },
	btn: {
		padding: "10px 15px",
		cursor: "pointer",
		backgroundColor: "#e0e0e0",
		border: "1px solid #999",
		borderRadius: "5px",
		fontWeight: "bold",
		color: "#000",
		flex: 1,
	},
};

export default VoiceAssistant;
