import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import { useHistory } from "react-router";

export default function SignUpScreen() {
	const history = useHistory();
	const [email, setEmail] = useState("");
	const [contact, setContact] = useState("");
	const [password, setPassword] = useState("");
	const [repeatPassword, setRepeatPassword] = useState("");
	const [name, setName] = useState("");

	function create() {}

	return (
		<div className="App">
			<div className="Container_banner--primary">
				<p className="Text_extra-large--light-multiline">Register</p>
			</div>
			<div className="Buffer_20px" />
			<div className="Container_large-screen-optimize">
				<div className="Container_horizontal-padding-20px">
					<form noValidate>
						<TextField
							autoComplete="shopname"
							name="shopname"
							variant="outlined"
							fullWidth
							margin="normal"
							id="shopname"
							label="Shop Name"
							autoFocus
							value={name}
							onChange={(event) => setName(event.target.value)}
						/>
						<TextField
							autoComplete="email"
							name="email"
							variant="outlined"
							fullWidth
							margin="normal"
							id="email"
							label="Email Address"
							autoFocus
							value={email}
							onChange={(event) => setEmail(event.target.value)}
						/>
						<TextField
							variant="outlined"
							fullWidth
							margin="normal"
							name="contact"
							label="Contact Number"
							type="contact"
							id="contact"
							autoComplete="contact"
							value={contact}
							onChange={(event) => setContact(event.target.value)}
						/>
						<TextField
							variant="outlined"
							fullWidth
							margin="normal"
							name="password"
							label="Password"
							type="password"
							id="password"
							autoComplete="current-password"
							value={password}
							onChange={(event) =>
								setPassword(event.target.value)
							}
						/>
						<TextField
							variant="outlined"
							fullWidth
							margin="normal"
							name="repeatPassword"
							label="Repeat Password"
							type="password"
							id="repeatPassword"
							autoComplete="current-password"
							value={repeatPassword}
							onChange={(event) =>
								setRepeatPassword(event.target.value)
							}
						/>
					</form>
					<div className="Buffer_50px" />
					<div
						className="Toggle_large--primary"
						onClick={() => create()}
					>
						<p className="Text_medium--light">Create</p>
					</div>
					<div className="Buffer_20px" />
					<div className="Container_center--horizontal">
						<Link onClick={() => history.push("/seller/signin")}>
							Already have an account? Sign in
						</Link>
					</div>
					<div className="Buffer_30px" />
				</div>
			</div>
		</div>
	);
}
