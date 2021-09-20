import { useState, useEffect } from "react";
import { useHistory } from "react-router";
import { Map, Overlay } from "pigeon-maps";
import { API_URL } from "../../../constants";

import Logo from "../../../assets/Logo_Words.png";
import Indicator from "./Indicator";
import PromoListItem from "./PromoListItem";
import PromoOverlay from "./PromoOverlay";
import CategorySelector from "../../SharedComponents/CategorySelector";
import RangeSelector from "./RangeSelector";

import { testData } from "../../TestData/UserTestData";

export default function MainScreen() {
	const history = useHistory();

	const [userPosition, setUserPosition] = useState([
		1.3976242810264037, 103.74739520517032,
	]);
	var [lastUpdatedCoords, setLastUpdatedCoords] = useState([0, 0]);
	var storeIds = [];
	const [promos, setPromos] = useState(
		testData.sort((promo1, promo2) => {
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
	}, []);

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
	async function getPromos() {
		if (userPosition[0] == null || userPosition[1] == null) return;
		if (
			Math.abs(userPosition[0] - lastUpdatedCoords[0]) > 0.0002 ||
			Math.abs(userPosition[1] - lastUpdatedCoords[1]) > 0.0002
		) {
			setLastUpdatedCoords(userPosition);
			const response = await fetch(API_URL + "/nearbystores", {
				method: "POST",
				mode: "no-cors",
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					lat: userPosition[0],
					lon: userPosition[1],
				}),
			});
			const result = await response.json();
			console.log(result);

			setPromos(
				testData.sort((promo1, promo2) => {
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
			items.push(
				<PromoListItem
					store={store}
					openPromo={openPromo}
					key={store.storeId}
				/>
			);
		});
		return items;
	}

	return (
		<div className="App">
			<div className="Container__after-header">
				<div className="Map__large">
					<Map
						center={userPosition}
						defaultZoom={18}
						minZoom={18}
						maxZoom={19}
						onClick={() => setSelectedStoreId(-1)}
					>
						<Overlay anchor={userPosition} offset={[12, 12]}>
							<div className="Indicator__user-position" />
						</Overlay>
						{MapIndicators()}
					</Map>
				</div>
				<div className="Container__large-screen-optimize">
					<div className="Buffer__10px" />
					<div className="Container__row">
						<div className="Container__category-selector">
							<CategorySelector
								category={catFilter}
								setCategory={setCatFilter}
								includeAll
							/>
						</div>
						<div className="Container__range-selector">
							<RangeSelector
								range={rangeFilter}
								setRange={setRangeFilter}
							/>
						</div>
					</div>
					<div className="Buffer__20px" />
					{PromoListItems()}
				</div>
			</div>
			<div className="Container__header Container__horizontal-padding-20px">
				<div className="Container__row">
					<img
						className="Image__logo--small"
						alt={"App Logo"}
						src={Logo}
					/>
					<div
						className="Toggle__small"
						onClick={() => history.push("/seller")}
					>
						<p className="Text__medium--dark">Seller's Console</p>
					</div>
				</div>
			</div>
		</div>
	);
}
