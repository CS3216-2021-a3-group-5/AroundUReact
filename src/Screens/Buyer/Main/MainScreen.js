import { useState, useEffect } from "react";
import { useHistory } from "react-router";
import { Map, Overlay } from "pigeon-maps";
import {
	API_URL,
	STORE_FROM_ID,
	NEARBY_STORE_ID,
	PROMO_IMAGE,
} from "../../../constants";
import ReactGA from "react-ga";

import Logo from "../../../assets/Logo_Words.png";
import Indicator from "./Indicator";
import PromoListItem from "./PromoListItem";
import PromoOverlay from "./PromoOverlay";
import CategorySelector from "../../SharedComponents/CategorySelector";
import RangeSelector from "./RangeSelector";

export default function MainScreen() {
	const history = useHistory();

	const [userPosition, setUserPosition] = useState([0, 0]);
	const [promos, setPromos] = useState([]);
	const [selectedStoreId, setSelectedStoreId] = useState(-1);
	const [viewingIndex, setViewingIndex] = useState(0);
	const [catFilter, setCatFilter] = useState("all");
	const [rangeFilter, setRangeFilter] = useState(15);
	const [overlayImage, setOverlayImage] = useState(null);

	// Gets location every 30s
	useEffect(() => {
		ReactGA.pageview("/");
		getPromos();
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
			getPromos(position.coords.latitude, position.coords.longitude);
		});
	}

	function openPromo(store, position) {
		history.push("/promo/", { store, position });
	}

	// Pulls promo data from server
	async function getPromos(lat, lon) {
		if (lat == null || lon == null) return;
		const url = API_URL + NEARBY_STORE_ID + "?lat=" + lat + "&lon=" + lon;
		const response = await fetch(url, {
			method: "GET",
		});
		const result = await response.json();
		const newPromos = [];
		await result.store_id.reduce(async (promise, store) => {
			await promise;
			const id = store.store_id;
			var promo = promos.find((promo) => promo.store_id === id);
			if (promo === undefined) {
				const newPromo = await getNewPromo(id);
				newPromo.stores.distanceFrom = store.distanceFrom;
				newPromos.push(newPromo.stores);
			} else {
				promo.distanceFrom = store.distanceFrom;
				newPromos.push(promo);
			}
		});
		setPromos(newPromos);
	}

	async function getNewPromo(id) {
		const response = await fetch(API_URL + STORE_FROM_ID + id, {
			method: "GET",
		});
		return await response.json();
	}

	// Obtain image for overlay
	async function getOverlayImage(promoId) {
		if (promoId === null) {
			setOverlayImage(null);
			return;
		}
		const response = await fetch(API_URL + PROMO_IMAGE + promoId, {
			method: "GET",
		});
		const blob = await response.blob();
		const loadedImage = URL.createObjectURL(blob);
		setOverlayImage(loadedImage);
	}

	// Filter promos
	function getFilteredPromo() {
		const filteredPromos = [];
		promos.forEach((store) => {
			if (catFilter !== "all" && store.category_name !== catFilter) {
				return;
			}
			if (store.distanceFrom / 70 > rangeFilter) {
				return;
			}
			filteredPromos.push(store);
		});
		return filteredPromos.sort(
			(store1, store2) => store1.distanceFrom - store2.distanceFrom
		);
	}

	// Creates indicators on map for promotions
	function MapIndicators() {
		const indicators = [];
		var selected = null;
		getFilteredPromo().forEach((promo) => {
			if (promo.store_id === selectedStoreId) {
				selected = promo;
			}
			indicators.push(
				Indicator({
					promo: promo,
					setViewingIndex: setViewingIndex,
					setSelectedId: setSelectedStoreId,
					isSelected: promo.store_id === selectedStoreId,
					getOverlayImage: getOverlayImage,
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
					getOverlayImage: getOverlayImage,
					image: overlayImage,
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
					key={store.store_id}
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
						defaultZoom={15}
						minZoom={15}
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
