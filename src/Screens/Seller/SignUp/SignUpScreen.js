import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import { useHistory } from "react-router";
import { API_URL, REGISTER_ROUTE } from "../../../constants.js";
import { Categories } from "../../../constants.js";
import CategorySeletor from "../../SharedComponents/CategorySelector";

export default function SignUpScreen() {
	const history = useHistory();
	const [email, setEmail] = useState("");
	const [contact, setContact] = useState("");
	const [password, setPassword] = useState("");
	const [repeatPassword, setRepeatPassword] = useState("");
	const [name, setName] = useState("");
	const [category, setCategory] = useState(Categories.WELLNESS);

	const handleRegister = async () => {
		const isAnyNotFilled =
			name === "" ||
			email === "" ||
			contact === "" ||
			password === "" ||
			repeatPassword === "";
		if (isAnyNotFilled) {
			alert("please fill up all the fields");
			return;
		} else if (password !== repeatPassword) {
			alert("password and repeat password don't match");
			return;
		}

		const rawResponse = await fetch(API_URL + REGISTER_ROUTE, {
			method: "POST",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				email: email,
				password: password,
				contact_no: contact,
				company_name: name,
			}),
		});
		const content = await rawResponse.json();
		if (content.error_code === 0) {
			history.push("/seller/signin");
		} else {
			alert(content.message);
		}
		console.log(content);
	};

	return (
		<div className="App">
			<div className="Container__banner--primary">
				<p className="Text__extra-large--light-multiline">Register</p>
			</div>
			<div className="Buffer__20px" />
			<div className="Container__large-screen-optimize Container__horizontal-padding-20px">
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
					<div className="Buffer__10px" />
					<CategorySeletor
						category={category}
						setCategory={setCategory}
						includeAll={false}
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
						onChange={(event) => setPassword(event.target.value)}
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
				<div className="Buffer__50px" />
				<div
					className="Toggle__large--primary"
					onClick={() => handleRegister()}
				>
					<p className="Text__medium--light">Create</p>
				</div>
				<div className="Buffer__20px" />
				<div className="Container__center--horizontal">
					<Link onClick={() => history.push("/seller/signin")}>
						Already have an account? Sign in
					</Link>
				</div>
				<div className="Buffer__30px" />
			</div>
		</div>
	);
}
