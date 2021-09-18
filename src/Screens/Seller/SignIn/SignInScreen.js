import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import { useHistory } from "react-router";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";

export default function SignInScreen({ setLoggedIn }) {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const history = useHistory();

	function login() {
		setLoggedIn(true);
	}

	return (
		<div className="App">
			<div className="Container_after_header Container_large-screen-optimize Container_horizontal-padding-20px">
				<div className="Buffer_110px" />
				<p className="Text_extra-large--dark-multiline">
					Seller's Console
				</p>
				<div className="Buffer_30px" />
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
				<div className="Buffer_50px" />
				<div className="Toggle_large--primary" onClick={() => login()}>
					<p className="Text_medium--light">Login</p>
				</div>
				<div className="Buffer_20px" />
				<div
					className="Toggle_large--hollow"
					onClick={() => history.push("/seller/signup")}
				>
					<p className="Text_medium--dark">Register</p>
				</div>
				<div className="Buffer_50px" />
			</div>
			<div
				className="Container_header Container_horizontal-padding-20px"
				style={{ borderWidth: 0 }}
			>
				<div className="Container_row">
					<ArrowBackIcon
						className="Toggle_header"
						onClick={() => history.push("/")}
					/>
				</div>
			</div>
		</div>
	);
}
