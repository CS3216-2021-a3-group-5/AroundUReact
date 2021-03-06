import "./App.css";
import { useEffect } from "react";
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
import ReactGA from "react-ga";
import { Helmet } from "react-helmet";
import ServiceWorkerRegistration from "./serviceWorkerRegistration";
import { getSellerContent } from "./Screens/SharedComponents/SellerInitialization";

export default function App() {
	if (
		!window.location.host.startsWith("localhost:3000") &&
		window.location.protocol != "https:"
	) {
		window.location.protocol = "https";
	}

	// Get service worker
	ServiceWorkerRegistration();

	useEffect(() => {
		getSellerContent();
		ReactGA.initialize("UA-128751523-2", {
			debug: true,
			titleCase: false,
		});
	}, []);

	return (
		<ThemeProvider theme={theme}>
			<Helmet>
				<meta charSet="utf-8" />
				<title>AroundU</title>
				<meta
					name="description"
					content="Search for deals AroundU"
					data-rh="true"
				/>
				<meta
					property="og:image"
					content="https://www.aroundu.shop/Share.png"
					data-rh="true"
				/>
				<meta
					property="og:title"
					content="AroundU | Search for Deals"
					data-rh="true"
				/>
			</Helmet>
			<Router>
				<ScrollToTop />
				<Switch>
					<Route path="/promo/:ids">
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
