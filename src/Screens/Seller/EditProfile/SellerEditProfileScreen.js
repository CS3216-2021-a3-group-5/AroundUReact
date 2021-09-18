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
			<div className="Container_after_header">
				<div className="Container_center--horizontal">
					<div className="Buffer_50px" />
					<Avatar src={image} style={{ height: 100, width: 100 }} />
					<input
						className="Toggle_profile-image-input"
						accept="image/*"
						type="file"
						onChange={(event) => uploadImage(event)}
					/>
					<div className="Buffer_20px" />
					<p className="Text_medium--dark">
						Tap on image to upload new image.
					</p>
					<div className="Container_large-screen-optimize">
						<div className="Container_horizontal-padding-20px">
							<div className="Buffer_30px" />
							<TextField
								value={email}
								onChange={(event) =>
									setEmail(event.target.value)
								}
								variant="outlined"
								fullWidth
								id="email"
								label="Email"
								name="email"
								autoComplete="email"
							/>
							<div className="Buffer_20px" />
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
							<div className="Buffer_20px" />
							<CategorySelector
								category={category}
								setCategory={setCategory}
							/>
							<div className="Buffer_50px" />
							<div
								className="Toggle_large--primary"
								onClick={() => save()}
							>
								<p className="Text_medium--light">Update</p>
							</div>
							<div className="Buffer_30px" />
						</div>
					</div>
				</div>
			</div>
			<div className="Container_header">
				<div className="Container_horizontal-padding-20px">
					<div className="Container_row">
						<ArrowBackIcon
							className="Toggle_header"
							onClick={() => history.goBack()}
						/>
						<p className="Text_large--dark">Edit Profile</p>
						<ArrowBackIcon
							className="Toggle_header"
							style={{ opacity: 0 }}
						/>
					</div>
				</div>
			</div>
		</div>
	);
}
