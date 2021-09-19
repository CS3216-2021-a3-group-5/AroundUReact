import "./App.css";
import { useState } from "react";
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Redirect,
} from "react-router-dom";
import MainScreen from "./Screens/Buyer/Main/MainScreen";
import PromoScreen from "./Screens/Buyer/Promo/PromoScreen";
import SellerMainScreen from "./Screens/Seller/Rerouting/SellerReroutingScreen";
import { ThemeProvider } from "@material-ui/styles";
import { createTheme } from "@material-ui/core/styles";
import ScrollToTop from "./ScrollToTop";
import ShareAdapter from "./Screens/Buyer/Share/ShareAdapter";
import ImageSplashScreen from "./assets/Splashscreen_Lite.png";

export default function App() {
	// const [hasPermission, setPermission] = useState(false);

	// navigator.permissions.query({ name: "geolocation" }).then((result) => {
	// 	setPermission(result.state == "granted");
	// });

	// if (!hasPermission) {
	// 	return (
	// 		<div className="App">
	// 			<img
	// 				src={ImageSplashScreen}
	// 				className="Image__request-background"
	// 			/>
	// 			<div className="Container__footer" style={{ borderWidth: 0 }}>
	// 				<div className="Buffer__20px" />
	// 				<div className="Container__large-screen-optimize Container__horizontal-padding-20px">
	// 					<div
	// 						className="Toggle__large--primary"
	// 						onClick={() =>
	// 							navigator.geolocation.getCurrentPosition(
	// 								() => {
	// 									setPermission(true);
	// 								},
	// 								() => {
	// 									setPermission(false);
	// 								}
	// 							)
	// 						}
	// 					>
	// 						<p className="Text__medium--light">
	// 							Enable Location
	// 						</p>
	// 					</div>
	// 				</div>
	// 				<div className="Buffer__20px" />
	// 			</div>
	// 		</div>
	// 	);
	// }

	return (
		<ThemeProvider theme={theme}>
			<Router>
				<meta
					name="viewport"
					content="width = device-width, initial-scale = 1.0, maximum-scale = 1.0, user-scalable = 0"
				/>
				<ScrollToTop />
				<Switch>
					<Route path="/promo/:promoId">
						<ShareAdapter />
					</Route>
					<Route path="/promo/">
						<PromoScreen />
					</Route>
					<Route exact path="/">
						<MainScreen />
					</Route>
					<Route exact path="/seller/promo/">
						<SellerMainScreen screen={SellerScreens.PROMO} />
					</Route>
					<Route exact path="/seller/outlet/">
						<SellerMainScreen screen={SellerScreens.OUTLET} />
					</Route>
					<Route path="/seller/addpromo">
						<SellerMainScreen screen={SellerScreens.ADD_PROMO} />
					</Route>
					<Route path="/seller/addoutlet">
						<SellerMainScreen screen={SellerScreens.ADD_OUTLET} />
					</Route>
					<Route path="/seller/editpromo">
						<SellerMainScreen screen={SellerScreens.EDIT_PROMO} />
					</Route>
					<Route path="/seller/editoutlet">
						<SellerMainScreen screen={SellerScreens.EDIT_OUTLET} />
					</Route>
					<Route path="/seller/editprofile">
						<SellerMainScreen screen={SellerScreens.EDIT_PROFILE} />
					</Route>
					<Route exact path="/seller/signin">
						<SellerMainScreen screen={SellerScreens.LOGIN} />
					</Route>
					<Route exact path="/seller/signup">
						<SellerMainScreen screen={SellerScreens.REGISTER} />
					</Route>
					<Route exact path="/seller/settings">
						<SellerMainScreen screen={SellerScreens.SETTINGS} />
					</Route>
					<Route exact path="/seller/outlets">
						<SellerMainScreen screen={SellerScreens.OUTLETS} />
					</Route>
					<Route exact path="/seller">
						<SellerMainScreen screen={SellerScreens.HOME} />
					</Route>
					<Route path="*">
						<Redirect to={{ pathname: "/" }} />
					</Route>
				</Switch>
			</Router>
		</ThemeProvider>
	);
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

const theme = createTheme({
	palette: {
		primary: {
			main: "#e44a4a",
		},
		secondary: {
			main: "#eb9f11",
		},
	},
});
