import { Avatar } from "@material-ui/core";
import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { API_URL, USER_INFO } from "../../../constants.js";

export default function SellerSettingsScreen({ setLoggedIn }) {
	const history = useHistory();
	const [avatar, setAvatar] = useState();
	const [profile, setProfile] = useState({
		email: "",
		category: "",
		company_name: "",
		contact_number: "",
	});

	useEffect(() => {
		handleProfile();
	}, []);

	const handleProfile = async () => {
		console.log("Hi");
		const rawResponse = await fetch(API_URL + USER_INFO, {
			method: "GET",
			headers: {
				Authorization: localStorage.getItem("accessToken"),
			},
		});
		const content = await rawResponse.json();
		console.log(content);
		if (rawResponse.status === 200) {
			setProfile({
				email: content.email,
				category: content.category,
				company_name: content.company_name,
				contact_number: content.contact_number,
			});
		} else {
			alert(content.message);
		}
	};

	function logout() {
		setLoggedIn(false);
		history.replace("/seller");
	}

	return (
		<div className="App">
			<div className="Buffer__110px" />
			<div className="Container__center--horizontal">
				<Avatar src={avatar} style={{ height: 100, width: 100 }} />
				<div className="Buffer__30px" />
				<p className="Text__extra-large--dark-multiline">
					{profile.company_name}
				</p>
				<div className="Buffer__5px" />
				<p className="Text__large--dark-multiline">
					{profile.category}
				</p>
				<div className="Container__large-screen-optimize Container__horizontal-padding-20px">
					<div className="Buffer__50px" />
					<div
						className="Toggle__large--primary"
						onClick={() =>
							history.push({
								pathname: "/seller/editprofile",
								state: { profile: profile },
							})
						}
					>
						<p className="Text__medium--light">Edit Profile</p>
					</div>
					<div className="Buffer__20px" />
					<div
						className="Toggle__large--hollow"
						onClick={() => logout()}
					>
						<p className="Text__medium--dark">Logout</p>
					</div>
					<div className="Buffer__50px" />
				</div>
			</div>
		</div>
	);
}
