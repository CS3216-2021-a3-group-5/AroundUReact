import React from "react";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import { useHistory } from "react-router";

import SettingsIcon from "@material-ui/icons/Settings";
import StoreIcon from "@material-ui/icons/Store";
import MonetizationOnIcon from "@material-ui/icons/MonetizationOn";

export default function NavBar({ screen }) {
	const [value, setValue] = React.useState(getScreenValue());

	const history = useHistory();

	function getScreenValue() {
		switch (screen) {
			case SellerScreens.OUTLETS:
				return 1;
			case SellerScreens.SETTINGS:
				return 2;
			default:
				return 0;
		}
	}

	function updatePage(newValue) {
		if (newValue === value) return;
		switch (newValue) {
			case 1: {
				history.replace("/seller/outlets");
				return;
			}
			case 2: {
				history.replace("/seller/settings");
				return;
			}
			default: {
				history.replace("/seller");
				return;
			}
		}
	}

	return (
		<div>
			<div className="Container_footer">
				<BottomNavigation
					value={value}
					onChange={(event, newValue) => {
						setValue(newValue);
						updatePage(newValue);
					}}
					showLabels
				>
					<BottomNavigationAction
						label="Promotions"
						icon={<MonetizationOnIcon />}
					/>
					<BottomNavigationAction
						label="Outlets"
						icon={<StoreIcon />}
					/>
					<BottomNavigationAction
						label="Settings"
						icon={<SettingsIcon />}
					/>
				</BottomNavigation>
			</div>
		</div>
	);
}

const SellerScreens = {
	HOME: "Home",
	OUTLETS: "Outlets",
	SETTINGS: "Settings",
};
