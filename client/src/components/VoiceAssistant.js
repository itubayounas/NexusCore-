import React, { useState } from "react";
import SpeechRecognition, {
	useSpeechRecognition,
} from "react-speech-recognition";
import axios from "axios";

// ⚠️ REPLACE THIS with your specific Tunnel URL from the terminal
const N8N_URL = "https://orange-brooms-strive.loca.lt/webhook/voice-command";

const VoiceAssistant = ({ onOperationSuccess }) => {
	const { transcript, listening, resetTranscript } = useSpeechRecognition();
	const [isProcessing, setIsProcessing] = useState(false);

	const handleSend = async () => {
		if (!transcript) return;
		setIsProcessing(true);

		try {
			// 1. Send the text to n8n
			const response = await axios.post(N8N_URL, { command: transcript });

			// 2. Speak the response from AI
			const aiMessage = response.data.message;
			const speech = new SpeechSynthesisUtterance(aiMessage);
			window.speechSynthesis.speak(speech);

			// 3. Refresh the Dashboard
			if (onOperationSuccess) {
				onOperationSuccess();
			}
			resetTranscript();
		} catch (error) {
			console.error("Error sending voice command:", error);
			alert("Failed to connect to n8n. Check your Tunnel URL!");
		}
		setIsProcessing(false);
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
		boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
		zIndex: 1000,
		width: "300px",
	},
	status: { marginBottom: "10px", fontWeight: "bold" },
	transcript: {
		background: "#f0f0f0",
		padding: "8px",
		borderRadius: "5px",
		minHeight: "40px",
		marginBottom: "10px",
		fontSize: "14px",
	},
	buttons: { display: "flex", gap: "5px" },
	btn: { padding: "5px 10px", cursor: "pointer" },
};

export default VoiceAssistant;
