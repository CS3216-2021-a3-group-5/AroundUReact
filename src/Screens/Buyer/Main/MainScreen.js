import { useState, useEffect } from "react";
import { useHistory } from "react-router";
import { Map, Overlay } from "pigeon-maps";

import Logo from "../../../assets/Logo.png";
import Indicator from "./Indicator";
import PromoListItem from "./PromoListItem";
import PromoOverlay from "./PromoOverlay";
import CategorySelector from "../../SharedComponents/CategorySelector";
import RangeSelector from "./RangeSelector";

import UserTestData from "../../TestData/UserTestData";

export default function MainScreen() {
	const history = useHistory();

	const [userPosition, setUserPosition] = useState([
		1.3976242810264037, 103.74739520517032,
	]);
	var lastUpdatedCoords = [1.3976242810264037, 103.74739520517032];
	const [promos, setPromos] = useState(
		UserTestData().sort((promo1, promo2) => {
			return promo2.latitude - promo1.latitude;
		})
	);
	const [selectedStoreId, setSelectedStoreId] = useState(-1);
	const [viewingIndex, setViewingIndex] = useState(0);
	const [catFilter, setCatFilter] = useState("all");
	const [rangeFilter, setRangeFilter] = useState(10);

	// Gets location every 30s
	useEffect(() => {
		getLocation();
		const interval = setInterval(() => {
			getLocation();
		}, 30000);
		return () => clearInterval(interval);
	});

	function getLocation() {
		navigator.geolocation.getCurrentPosition((position) => {
			setUserPosition([
				position.coords.latitude,
				position.coords.longitude,
			]);
			getPromos();
		});
	}

	function openPromo(store, position) {
		history.push("/promo/", { store, position });
	}

	// Pulls promo data from server
	function getPromos() {
		if (userPosition[0] == null || userPosition[1] == null) return;
		if (
			Math.abs(userPosition[0] - lastUpdatedCoords[0]) > 0.0002 ||
			Math.abs(userPosition[1] - lastUpdatedCoords[1]) > 0.0002
		) {
			lastUpdatedCoords = userPosition;
			setPromos(
				UserTestData().sort((promo1, promo2) => {
					return promo2.latitude - promo1.latitude;
				})
			);
		}
	}

	function getFilteredPromo() {
		const filteredPromos = [];
		promos.forEach((store) => {
			if (catFilter !== "all" && store.category !== catFilter) {
				return;
			}
			if (store.range > rangeFilter) {
				return;
			}
			filteredPromos.push(store);
		});
		return filteredPromos.sort(
			(store1, store2) => store1.range - store2.range
		);
	}

	// Creates indicators on map for promotions
	function MapIndicators() {
		const indicators = [];
		var selected = null;
		getFilteredPromo().forEach((promo) => {
			if (promo.storeId === selectedStoreId) {
				selected = promo;
			}
			indicators.push(
				Indicator({
					promo: promo,
					setViewingIndex: setViewingIndex,
					setSelectedId: setSelectedStoreId,
					isSelected: promo.storeId === selectedStoreId,
				})
			);
		});
		if (selected != null) {
			indicators.push(
				PromoOverlay({
					store: selected,
					viewingIndex: viewingIndex,
					setViewingIndex: setViewingIndex,
					openPromo: openPromo,
				})
			);
		}
		return indicators;
	}

	// Creates items for promo list
	function PromoListItems() {
		const items = [];
		getFilteredPromo().forEach((store) => {
			items.push(<PromoListItem store={store} openPromo={openPromo} />);
		});
		return items;
	}

	return (
		<div className="App">
			<div className="Container_after_header">
				<div className="Map_large">
					<Map
						center={userPosition}
						defaultZoom={18}
						minZoom={18}
						maxZoom={19}
						onClick={() => setSelectedStoreId(-1)}
					>
						<Overlay anchor={userPosition} offset={[12, 12]}>
							<div className="Indicator_user-position" />
						</Overlay>
						{MapIndicators()}
					</Map>
				</div>
				<div className="Container_large-screen-optimize">
					<div className="Buffer_10px" />
					<div className="Container_row">
						<div className="Container_category-selector">
							<CategorySelector
								category={catFilter}
								setCategory={setCatFilter}
								includeAll
							/>
						</div>
						<div className="Container_range-selector">
							<RangeSelector
								range={rangeFilter}
								setRange={setRangeFilter}
							/>
						</div>
					</div>
					<div className="Buffer_10px" />
					<div className="Line" />
					{PromoListItems()}
				</div>
			</div>
			<div className="Container_header">
				<div className="Container_horizontal-padding-20px">
					<div className="Container_row">
						<img
							className="Image_logo--small"
							alt={"App Logo"}
							src={Logo}
						/>
						<div
							className="Toggle_small"
							onClick={() => history.push("/seller")}
						>
							<p className="Text_medium--dark">Seller Portal</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
