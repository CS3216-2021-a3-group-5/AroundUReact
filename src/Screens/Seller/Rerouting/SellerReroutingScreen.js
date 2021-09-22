import { useState } from "react";
import NavBar from "./NavBar";
import { Redirect, useLocation } from "react-router";

import SignInScreen from "../SignIn/SignInScreen";
import SignUpScreen from "../SignUp/SignUpScreen";
import SellerHomeScreen from "../PromoList/SellerPromoListScreen";
import SellerOutletListScreen from "../OutletList/SellerOutletListScreen";
import SellerSettingsScreen from "../Settings/SellerSettingsScreen";
import SellerPromoScreen from "../Promo/SellerPromoScreen";
import SellerAddEditPromoScreen from "../AddEditPromo/SellerAddEditPromoScreen";
import SellerAddEditOutletScreen from "../AddEditOutlet/SellerAddEditOutletScreen";
import SellerEditProfileScreen from "../EditProfile/SellerEditProfileScreen";
import SellerOutletScreen from "../Outlet/SellerOutletScreen";

export default function SellerMainScreen({ screen }) {
	const [isLoggedIn, setLoggedIn] = useState(checkLogin());
	const location = useLocation();

	// Checks if already logged in
	function checkLogin() {
		return false;
	}

	function Screen() {
		switch (screen) {
			case SellerScreens.OUTLETS:
				return <SellerOutletListScreen />;
			case SellerScreens.SETTINGS:
				return <SellerSettingsScreen setLoggedIn={setLoggedIn} />;
			default:
				return <SellerHomeScreen />;
		}
	}

	if (!isLoggedIn) {
		switch (screen) {
			case SellerScreens.REGISTER:
				return <SignUpScreen />;
			case SellerScreens.LOGIN:
				return <SignInScreen setLoggedIn={setLoggedIn} />;
			default: {
				return <Redirect to="/seller/signin" />;
			}
		}
	}

	switch (screen) {
		case SellerScreens.PROMO: {
			return <SellerPromoScreen promo={location.state.promo} />;
		}
		case SellerScreens.OUTLET: {
			return <SellerOutletScreen store={location.state.store} />;
		}
		case SellerScreens.ADD_PROMO: {
			return <SellerAddEditPromoScreen />;
		}
		case SellerScreens.EDIT_PROMO: {
			return <SellerAddEditPromoScreen promo={location.state.data} />;
		}
		case SellerScreens.ADD_OUTLET: {
			return <SellerAddEditOutletScreen />;
		}
		case SellerScreens.EDIT_OUTLET: {
			return <SellerAddEditOutletScreen store={location.state.store} />;
		}
		case SellerScreens.EDIT_PROFILE: {
			return <SellerEditProfileScreen />;
		}
		default: {
			return (
				<div>
					{Screen()}
					<NavBar screen={screen} />
				</div>
			);
		}
	}
}

const SellerScreens = {
	HOME: "Home",
	OUTLETS: "Outlets",
	SETTINGS: "Settings",
	LOGIN: "Login",
	REGISTER: "Register",
	PROMO: "Promo",
	OUTLET: "Outlet",
	ADD_PROMO: "Add Promo",
	EDIT_PROMO: "Edit Promo",
	ADD_OUTLET: "Add Outlet",
	EDIT_OUTLET: "Edit Outlet",
	EDIT_PROFILE: "Edit Profile",
};
