import { useHistory, useLocation, Redirect } from "react-router-dom";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import ShareIcon from "@material-ui/icons/Share";
import { Map, Overlay } from "pigeon-maps";
import IndicatorSelected from "../../../assets/Indicator_Selected.png";
import { useEffect } from "react";
import ReactGA from "react-ga";

export default function PromoScreen() {
	const history = useHistory();
	const location = useLocation();

	useEffect(() => {
		if (location.state !== undefined) {
			ReactGA.pageview("/promo/" + location.store.store_id);
		}
	}, []);

	if (location.state === undefined) {
		return <Redirect to="/" />;
	}

	const data = location.state.store;
	const position = location.state.position;
	const promo = data.promotions[position];

	function share() {
		if (navigator.share) {
			navigator.share({
				title: "AroundU | " + data.company_name,
				text: "Check out this promo!",
				url:
					document.location.href +
					data.promotions[position].promotion_id,
			});
		}
	}

	function getFormattedDate() {
		const splitResult = promo.end_date.split("T");
		return splitResult[0];
	}

	function openOnGoogleMaps() {
		console.log("Opening");
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
				<img className="Image__promo" />
				<div className="Container__large-screen-optimize Container__horizontal-padding-20px">
					<div className="Buffer__20px" />
					<div className="Container__row">
						<p className="Text__extra-large--dark-multiline">
							{data.company_name}
						</p>
						<div className="Container__range-text">
							<p className="Text__medium--dark">
								{data.range} min
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
								anchor={[data.location.lat, data.location.lon]}
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
