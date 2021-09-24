import React, { useState, useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import { useHistory } from "react-router";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { API_URL, LOGIN_ROUTE } from "../../../constants.js";
import { getSellerContent } from "../../SharedComponents/SellerInitialization.js";

export default function SignInScreen({ setLoggedIn }) {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const history = useHistory();

	const handleLogin = async () => {
		const isAnyNotFilled = email === "" || password === "";
		if (isAnyNotFilled) {
			alert("please fill up all the fieldssss");
			return;
		}
		const rawResponse = await fetch(API_URL + LOGIN_ROUTE, {
			method: "POST",
			body: JSON.stringify({
				email: email,
				password: password,
			}),
		});
		const content = await rawResponse.json();
		if (rawResponse.status === 200) {
			localStorage.setItem("accessToken", content.accessToken);
			await getSellerContent().then(setLoggedIn(true));
		} else {
			alert(content.message);
		}
	};

	return (
		<div className="App">
			<div className="Container__after-header Container__large-screen-optimize Container__horizontal-padding-20px">
				<div className="Buffer__110px" />
				<p className="Text__extra-large--dark-multiline">
					Seller's Console
				</p>
				<div className="Buffer__30px" />
				<form noValidate>
					<TextField
						value={email}
						onChange={(event) => setEmail(event.target.value)}
						variant="outlined"
						margin="normal"
						fullWidth
						id="email"
						label="Email Address"
						name="email"
						autoComplete="email"
						autoFocus
					/>
					<TextField
						value={password}
						onChange={(event) => setPassword(event.target.value)}
						variant="outlined"
						margin="normal"
						fullWidth
						name="password"
						label="Password"
						type="password"
						id="password"
						autoComplete="current-password"
					/>
				</form>
				<div className="Buffer__50px" />
				<div
					className="Toggle__large--primary"
					onClick={() => {
						handleLogin();
					}}
				>
					<p className="Text__medium--light">Login</p>
				</div>
				<div className="Buffer__20px" />
				<div
					className="Toggle__large--hollow"
					onClick={() => history.push("/seller/signup")}
				>
					<p className="Text__medium--dark">Register</p>
				</div>
				<div className="Buffer__50px" />
			</div>
			<div
				className="Container__header Container__horizontal-padding-20px"
				style={{ borderWidth: 0 }}
			>
				<div className="Container__row">
					<ArrowBackIcon
						className="Toggle__header"
						onClick={() => history.push("/")}
					/>
				</div>
			</div>
		</div>
	);
}
