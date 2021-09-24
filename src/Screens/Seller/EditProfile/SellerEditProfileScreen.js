import { useState } from "react";
import { useHistory, useLocation } from "react-router";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { Avatar } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import { API_URL, UPDATE_USER_INFO, COMPANY_LOGO } from "../../../constants.js";

import CategorySelector from "../../SharedComponents/CategorySelector";

export default function SellerEditProfileScreen() {
	const history = useHistory();
	const location = useLocation();
	const profile = location.state.profile;
	const [image, setImage] = useState(location.state.image);
	const [companyName] = useState(profile.company_name);
	const [contactNumber, setContactNumber] = useState(profile.contact_number);
	const [category, setCategory] = useState(profile.category);

	const save = async () => {
		const isAnyNotFilled =
			companyName === "" || contactNumber === "" || category === "";
		if (isAnyNotFilled) {
			alert("please fill up all the fieldssss");
			return;
		}
		console.log(`Changing company info.`);

		const rawResponse = await fetch(API_URL + UPDATE_USER_INFO, {
			method: "PUT",
			headers: {
				Authorization: localStorage.getItem("accessToken"),
			},
			body: JSON.stringify({
				company_name: profile.company_name,
				contact_number: contactNumber,
				category: category,
				email: profile.email,
			}),
		});
		const content = await rawResponse.json();
		if (rawResponse.status === 200) {
			alert("Successfully updated!");
		} else {
			alert(content.message);
		}
	};

	const storeImage = async (image) => {
		const data = await new FormData();
		data.append("image", image);
		data.append("filename", profile.company_name);
		const response = await fetch(
			API_URL + COMPANY_LOGO + profile.company_name,
			{
				method: "POST",
				headers: {
					Authorization: localStorage.getItem("accessToken"),
				},
				body: {
					file: data,
				},
			}
		);
		// const blob = await response.blob();
		// const loadedImage = URL.createObjectURL(blob);
	};

	function uploadImage(event) {
		const file = event.target.files[0];
		const reader = new FileReader();
		const url = reader.readAsDataURL(file);
		reader.onloadend = () => {
			setImage(reader.result);
		};
	}

	return (
		<div className="App">
			<div className="Container__after-header Container__center--horizontal">
				<div className="Buffer__50px" />
				<Avatar src={image} style={{ height: 100, width: 100 }} />
				<input
					className="Toggle__profile-image-input"
					accept="image/*"
					type="file"
					onChange={(event) => uploadImage(event)}
				/>
				<div className="Buffer__20px" />
				<p className="Text__medium--dark">
					Tap on image to upload new image.
				</p>
				<div className="Container__large-screen-optimize Container__horizontal-padding-20px">
					<div className="Buffer__30px" />
					<TextField
						value={contactNumber}
						onChange={(event) =>
							setContactNumber(event.target.value)
						}
						variant="outlined"
						fullWidth
						id="contactNumber"
						label="Contact Number"
						name="contactNumber"
						autoComplete="phone number"
					/>
					<div className="Buffer__20px" />
					<CategorySelector
						category={category}
						setCategory={setCategory}
					/>
					<div className="Buffer__50px" />
					<div
						className="Toggle__large--primary"
						onClick={() => {
							save();
							//storeImage(image);
							history.goBack();
						}}
					>
						<p className="Text__medium--light">Update</p>
					</div>
					<div className="Buffer__30px" />
				</div>
			</div>
			<div className="Container__header Container__horizontal-padding-20px">
				<div className="Container__row">
					<ArrowBackIcon
						className="Toggle__header"
						onClick={() => history.goBack()}
					/>
					<p className="Text__large--dark">Edit Profile</p>
					<ArrowBackIcon
						className="Toggle__header"
						style={{ opacity: 0 }}
					/>
				</div>
			</div>
		</div>
	);
}
