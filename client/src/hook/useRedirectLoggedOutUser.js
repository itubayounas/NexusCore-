import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

export const useRedirectLoggedOutUser = (path = "/login") => {
	const navigate = useNavigate();

	useEffect(() => {
		const checkLoginStatus = async () => {
			try {
				const response = await axios.get("/api/users/loggedin");
				const isLoggedIn = response.data;

				if (!isLoggedIn) {
					toast.info("Session expired, please login to continue");
					navigate(path);
				}
			} catch (error) {
				console.log(error.message);
				navigate(path);
			}
		};

		checkLoginStatus();
	}, [navigate, path]);
};
