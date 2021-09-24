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
		getLocalProfile();
		getImage();
	}, []);

	function getLocalProfile() {
		const checkProfile = localStorage.getItem("profile");
		if (checkProfile === null) {
			handleProfile();
		} else {
			setProfile(JSON.parse(checkProfile));
		}
	}

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
			const newProfile = {
				email: content.email,
				category: content.category,
				company_name: content.company_name,
				contact_number: content.contact_number,
			};
			setProfile(newProfile);
			localStorage.setItem("profile", JSON.stringify(newProfile));
		} else {
			alert(content.message);
		}
	};

	const getImage = async () => {
		const company_name = JSON.parse(
			localStorage.getItem("profile")
		).company_name;
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
		localStorage.removeItem("accessToken");
	}

	return (
		<div className="App">
			<div className="Buffer__110px" />
			<div className="Container__center--horizontal">
				<Avatar src={image} style={{ height: 100, width: 100 }} />
				<div className="Buffer__20px" />
				<p className="Text__extra-large--dark">
					{profile.company_name}
				</p>
				<div className="Buffer__10px" />
				<p className="Text__large--dark">Email: {profile.email}</p>
				<div className="Buffer__5px" />
				<p className="Text__medium--grey">
					Contact Number: {profile.contact_number}
				</p>
				<div className="Buffer__5px" />
				<p className="Text__medium--grey">
					Category: {profile.category}
				</p>

				<div className="Container__large-screen-optimize">
					<div className="Buffer__50px" />
					<div className="Line" />
					<div
						onClick={() =>
							history.push("/seller/editprofile", {
								profile,
								image,
							})
						}
					>
						<div className="Buffer__20px" />
						<div className="Container__row Container__horizontal-padding-20px">
							<p className="Text__large--dark">Edit Profile</p>
							<p className="Text__arrow">{">"}</p>
						</div>
						<div className="Buffer__20px" />
						<div className="Line" />
					</div>
					<div onClick={() => history.push("/")}>
						<div className="Buffer__20px" />
						<div className="Container__row Container__horizontal-padding-20px">
							<p className="Text__large--dark">Consumer View</p>
							<p className="Text__arrow">{">"}</p>
						</div>
						<div className="Buffer__20px" />
						<div className="Line" />
					</div>
					<div className="Buffer__50px" />
					<div className="Container__horizontal-padding-20px">
						<div
							className="Toggle__large--hollow"
							onClick={() => logout()}
						>
							<p className="Text__medium--dark">Logout</p>
						</div>
					</div>
					<div className="Buffer__110px" />
				</div>
			</div>
		</div>
	);
}
