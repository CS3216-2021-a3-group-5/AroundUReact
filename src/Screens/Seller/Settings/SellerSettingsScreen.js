import { Avatar } from "@material-ui/core";
import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { API_URL, USER_INFO, COMPANY_LOGO } from "../../../constants.js";

export default function SellerSettingsScreen({ setLoggedIn }) {
	const history = useHistory();
	const [image, setImage] = useState(null);
	const [profile, setProfile] = useState({
		email: "",
		category: "",
		company_name: "",
		contact_number: "",
	});

	useEffect(() => {
		handleProfile().then((name) => getImage(name));
	}, []);

	const handleProfile = async () => {
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
			return content.company_name;
		} else {
			alert(content.message);
		}
	};

	const getImage = async (company_name) => {
		const response = await fetch(API_URL + COMPANY_LOGO + company_name, {
			method: "GET",
		});
		const blob = await response.blob();
		const loadedImage = URL.createObjectURL(blob);
		setImage(loadedImage);
	};

	function logout() {
		setLoggedIn(false);
		history.replace("/seller");
	}

	return (
		<div className="App">
			<div className="Buffer__110px" />
			<div className="Container__center--horizontal">
				<Avatar src={image} style={{ height: 100, width: 100 }} />
				<div className="Buffer__30px" />
				<p className="Text__extra-large--dark-multiline">
					{profile.company_name}
				</p>
				<div className="Buffer__5px" />
				<div className="Buffer__5px" />
				<p className="Text__large--dark-multiline">
					Category: {profile.category}
				</p>
				<div className="Buffer__5px" />
				<p className="Text__large--dark-multiline">
					Email: {profile.email}
				</p>
				<div className="Buffer__5px" />
				<p className="Text__large--dark-multiline">
					Contact Number: {profile.contact_number}
				</p>
				<div className="Container__large-screen-optimize Container__horizontal-padding-20px">
					<div className="Buffer__50px" />
					<div
						className="Toggle__large--primary"
						onClick={() =>
							history.push("/seller/editprofile", {
								profile,
								image,
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
