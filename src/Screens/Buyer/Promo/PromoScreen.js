import { useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import ShareIcon from "@material-ui/icons/Share";
import { Map, Overlay } from "pigeon-maps";
import IndicatorSelected from "../../../assets/Indicator_Selected.png";

export default function PromoScreen() {
	const history = useHistory();
	const location = useLocation();
	const data = location.state.store;
	const position = location.state.position;

	const [promo] = useState(data.promos[position]);

	function share() {}

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
			<div className="Container_after_header">
				<img className="Image_promo" />
				<div className="Container_large-screen-optimize Container_horizontal-padding-20px">
					<div className="Buffer_20px" />
					<div className="Container_row">
						<p className="Text_extra-large--dark-multiline">
							{data.sellerName}
						</p>
						<div className="Container_range-text">
							<p className="Text_medium--dark">
								{data.range} min
							</p>
						</div>
					</div>
					<div className="Buffer_5px" />
					<p className="Text_large--dark-multiline">
						{promo.promoName}
					</p>
					<div className="Buffer_5px" />
					<p className="Text_medium--grey-multiline">
						Until {getFormattedDate()}
					</p>
					<div className="Buffer_30px" />
					<p className="Text_medium--dark-multiline-bold">
						Description
					</p>
					<div className="Buffer_10px" />
					<p className="Text_medium--dark-multiline">
						{promo.description}
					</p>
					<div className="Buffer_30px" />
					<div
						className="Map_small"
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
									className="Indicator_promo"
								/>
							</Overlay>
						</Map>
					</div>
					<div className="Buffer_30px" />
					<p className="Text_medium--dark-multiline-bold">
						{"Address & Opening Hours"}
					</p>
					<div className="Buffer_10px" />
					<p className="Text_medium--dark-multiline">
						{data.address}
					</p>
					<div className="Buffer_5px" />
					<p className="Text_medium--dark-multiline">
						{data.openingHours}
					</p>
					<div className="Buffer_30px" />
				</div>
			</div>
			<div className="Container_header Container_horizontal-padding-20px">
				<div className="Container_row">
					<ArrowBackIcon
						className="Toggle_header"
						onClick={() => history.push("/")}
					/>
					<ShareIcon
						className="Toggle_header"
						onClick={() => share()}
					/>
				</div>
			</div>
		</div>
	);
}
