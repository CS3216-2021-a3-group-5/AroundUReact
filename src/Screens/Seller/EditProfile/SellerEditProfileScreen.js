import { useState } from "react";
import { useHistory } from "react-router";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { Avatar } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";

import CategorySelector from "../../SharedComponents/CategorySelector";

export default function SellerEditProfileScreen({ sellerId }) {
	const history = useHistory();
	const [image, setImage] = useState();
	const [email, setEmail] = useState();
	const [contactNumber, setContactNumber] = useState();
	const [category, setCategory] = useState();

	function save() {}
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
						value={email}
						onChange={(event) => setEmail(event.target.value)}
						variant="outlined"
						fullWidth
						id="email"
						label="Email"
						name="email"
						autoComplete="email"
					/>
					<div className="Buffer__20px" />
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
						onClick={() => save()}
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
