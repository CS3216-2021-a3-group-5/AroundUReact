import { useHistory, useLocation, Redirect } from "react-router-dom";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import ShareIcon from "@material-ui/icons/Share";
import { Map, Overlay } from "pigeon-maps";
import IndicatorSelected from "../../../assets/Indicator_Selected.png";

export default function PromoScreen() {
	const history = useHistory();
	const location = useLocation();

	if (location.state === undefined) {
		return <Redirect to="/" />;
	}

	const data = location.state.store;
	const position = location.state.position;
	const promo = data.promos[position];

	function share() {
		if (navigator.share) {
			navigator.share({
				title: "AroundU | " + data.sellerName,
				text: "Check out this promo!",
				url: document.location.href + data.promos[position].promoId,
			});
		}
	}

	function getFormattedDate() {
		const dateSplit = new Date(data.endDate).toUTCString().split(" ");
		return dateSplit[1] + " " + dateSplit[2] + " " + dateSplit[3];
	}

	function openOnGoogleMaps() {
		console.log("Opening");
		window.open(
			"https://www.google.com/maps/search/" +
				data.latitude +
				"," +
				data.longtitude +
				"/@" +
				data.latitude +
				"," +
				data.longtitude +
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
							{data.sellerName}
						</p>
						<div className="Container__range-text">
							<p className="Text__medium--dark">
								{data.range} min
							</p>
						</div>
					</div>
					<div className="Buffer__5px" />
					<p className="Text__large--dark-multiline">
						{promo.promoName}
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
						{promo.description}
					</p>
					<div className="Buffer__30px" />
					<div
						className="Map__small"
						onClick={() => openOnGoogleMaps()}
					>
						<Map
							center={[data.latitude, data.longtitude]}
							mouseEvents={false}
							touchEvents={false}
							defaultZoom={18}
							minZoom={18}
							maxZoom={19}
						>
							<Overlay
								anchor={[data.latitude, data.longtitude]}
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
						{data.openingHours}
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
