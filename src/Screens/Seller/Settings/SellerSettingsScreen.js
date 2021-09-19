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
			<div className="Buffer__110px" />
			<div className="Container__center--horizontal">
				<Avatar src={avatar} style={{ height: 100, width: 100 }} />
				<div className="Buffer__30px" />
				<p className="Text__extra-large--dark-multiline">Store Name</p>
				<div className="Buffer__5px" />
				<p className="Text__large--dark-multiline">Category</p>
				<div className="Container__large-screen-optimize Container__horizontal-padding-20px">
					<div className="Buffer__50px" />
					<div
						className="Toggle__large--primary"
						onClick={() => history.push("/seller/editprofile")}
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
