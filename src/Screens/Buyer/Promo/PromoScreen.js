import { useHistory, useLocation, Redirect } from "react-router-dom";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import ShareIcon from "@material-ui/icons/Share";
import { Map, Overlay } from "pigeon-maps";
import IndicatorSelected from "../../../assets/Indicator_Selected.png";
import { useEffect, useState } from "react";
import ReactGA from "react-ga";
import { API_URL, PROMO_IMAGE } from "../../../constants";

export default function PromoScreen() {
	const history = useHistory();
	const location = useLocation();
	const [image, setImage] = useState(null);

	useEffect(() => {
		if (location.state !== undefined) {
			ReactGA.pageview("/promo/" + location.state.store.store_id);
			getImage();
		}
	}, []);

	if (location.state === undefined) {
		return <Redirect to="/" />;
	}

	const data = location.state.store;
	const position = location.state.position;
	const promo = data.promotions[position];

	async function getImage() {
		if (location.state === undefined) {
			return null;
		}
		const promoId =
			location.state.store.promotions[location.state.position]
				.promotion_id;
		const response = await fetch(API_URL + PROMO_IMAGE + promoId, {
			method: "GET",
		});
		const blob = await response.blob();
		const loadedImage = URL.createObjectURL(blob);
		setImage(loadedImage);
	}

	function share() {
		ReactGA.event({
			category: "Social",
			action: "Clicked on share",
		});
		if (navigator.share) {
			navigator.share({
				title: "AroundU | " + data.company_name,
				text: "Check out this promo!",
				url:
					document.location.href +
					data.store_id +
					"&" +
					data.promotions[position].promotion_id,
			});
		}
	}

	function getFormattedDate() {
		let date = new Date(promo.end_date);
		date.setDate(date.getDate());
		const dateSplit = date.toUTCString().split(" ");
		return dateSplit[1] + " " + dateSplit[2] + " " + dateSplit[3];
	}

	function openOnGoogleMaps() {
		window.open(
			"https://www.google.com/maps/search/" +
				data.location.lat +
				"," +
				data.location.lon +
				"/@" +
				data.location.lat +
				"," +
				data.location.lon +
				",20z"
		);
	}

	return (
		<div className="App">
			<div className="Container__after-header">
				<div className="Container__large-screen-optimize ">
					<img className="Image__promo" src={image} />
					<div className="Container__horizontal-padding-20px">
						<div className="Buffer__20px" />
						<div className="Container__row">
							<p className="Text__extra-large--dark-multiline">
								{data.company_name}
							</p>
							<div className="Container__range-text">
								<p className="Text__medium--dark">
									{Math.floor(data.distanceFrom / 70)} min
								</p>
							</div>
						</div>
						<div className="Buffer__5px" />
						<p className="Text__large--dark-multiline">
							{promo.promo_name}
						</p>
						<div className="Buffer__5px" />
						<p className="Text__medium--grey-multiline">
							Until {getFormattedDate()}
						</p>
						<div className="Buffer__30px" />
						<p className="Text__medium--dark-multiline-bold">
							Description
						</p>
						<div className="Buffer__10px" />
						<p className="Text__medium--dark-multiline">
							{promo.details}
						</p>
						<div className="Buffer__30px" />
						<div
							className="Map__small"
							onClick={() => openOnGoogleMaps()}
						>
							<Map
								center={[data.location.lat, data.location.lon]}
								mouseEvents={false}
								touchEvents={false}
								defaultZoom={18}
								minZoom={18}
								maxZoom={19}
							>
								<Overlay
									anchor={[
										data.location.lat,
										data.location.lon,
									]}
									offset={[15, 47]}
								>
									<img
										src={IndicatorSelected}
										className="Indicator__promo"
									/>
								</Overlay>
							</Map>
						</div>
						<div className="Buffer__30px" />
						<p className="Text__medium--dark-multiline-bold">
							{"Address & Opening Hours"}
						</p>
						<div className="Buffer__10px" />
						<p className="Text__medium--dark-multiline">
							{data.address}
						</p>
						<div className="Buffer__5px" />
						<p className="Text__medium--dark-multiline">
							{data.opening_hours}
						</p>
						<div className="Buffer__30px" />
					</div>
				</div>
			</div>
			<div className="Container__header Container__horizontal-padding-20px">
				<div className="Container__row">
					<ArrowBackIcon
						className="Toggle__header"
						onClick={() => history.push("/")}
					/>
					<ShareIcon
						className="Toggle__header"
						onClick={() => share()}
					/>
				</div>
			</div>
		</div>
	);
}
