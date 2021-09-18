import { Avatar } from "@material-ui/core";
import { useHistory } from "react-router";
import { useState } from "react";

export default function SellerSettingsScreen({ setLoggedIn }) {
	const history = useHistory();
	const [avatar, setAvatar] = useState();

	function logout() {
		setLoggedIn(false);
		history.replace("/seller");
	}

	return (
		<div className="App">
			<div className="Buffer_110px" />
			<div className="Container_center--horizontal">
				<Avatar src={avatar} style={{ height: 100, width: 100 }} />
				<div className="Buffer_30px" />
				<p className="Text_extra-large--dark-multiline">Store Name</p>
				<div className="Buffer_5px" />
				<p className="Text_large--dark-multiline">Category</p>
				<div className="Container_large-screen-optimize Container_horizontal-padding-20px">
					<div className="Buffer_50px" />
					<div
						className="Toggle_large--primary"
						onClick={() => history.push("/seller/editprofile")}
					>
						<p className="Text_medium--light">Edit Profile</p>
					</div>
					<div className="Buffer_20px" />
					<div
						className="Toggle_large--hollow"
						onClick={() => logout()}
					>
						<p className="Text_medium--dark">Logout</p>
					</div>
					<div className="Buffer_50px" />
				</div>
			</div>
		</div>
	);
}
