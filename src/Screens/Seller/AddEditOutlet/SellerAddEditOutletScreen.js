import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import TextField from "@material-ui/core/TextField";
import { Map, Draggable } from "pigeon-maps";
import IndicatorSelected from "../../../assets/Indicator_Selected.png";
import CoordinatesSearch from "./CoordinatesSearch";
import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { API_URL, NEW_STORE } from "../../../constants.js";

export default function SellerAddEditOutletScreen({ store }) {
	const history = useHistory();

	const [storeAddress, setStoreAddress] = useState(
		store == null ? "" : store.address
	);
	const [storeCoords, setStoreCoords] = useState(
		store == null ? [null, null] : [store.latitude, store.longtitude]
	);
	const [openingHours, setOpeningHours] = useState(
		store == null ? "" : store.openingHours
	);

	const [showAddressSelector, setShowAddressSelector] = useState(false);

	const handleAddOutlet = async () => {
		console.log(storeAddress);
		console.log(openingHours);
		console.log(storeCoords[0]);
		console.log(storeCoords[1]);
		const rawResponse = await fetch(API_URL + NEW_STORE, {
			method: "POST",
			headers: {
				Authorization: localStorage.getItem("accessToken"),
			},
			body: JSON.stringify({
				longitude: storeCoords[0],
				latitude: storeCoords[1],
				address: storeAddress,
				opening_hours: openingHours,
			}),
		});
		const content = await rawResponse.json();
		alert(content.message);
	};

	return (
		<div className="App">
			<div className="Container__after-header Container__large-screen-optimize Container__horizontal-padding-20px">
				<TextField
					value={openingHours}
					onChange={(event) => setOpeningHours(event.target.value)}
					color="secondary"
					margin="normal"
					fullWidth
					id="openingHours"
					label="Opening Hours"
					name="openingHours"
					autoComplete="opening hours"
				/>
				<TextField
					value={storeAddress}
					onChange={(event) => setStoreAddress(event.target.value)}
					color="secondary"
					margin="normal"
					fullWidth
					id="address"
					label="Address"
					name="address"
					autoComplete="address"
				/>
				<div className="Buffer__20px" />
				<p className="Text__medium--grey-multiline">
					Tap on the text field below to search for the rough
					coordinates, then drag the red marker in the map to the
					actual location of your store.
				</p>
				<div className="Buffer__5px" />
				<TextField
					value={
						storeCoords[0] == null
							? "Tap here to search coordinates"
							: storeCoords
					}
					color="secondary"
					margin="normal"
					fullWidth
					id="coords"
					label="Coordinates"
					name="coords"
					onClick={() => setShowAddressSelector(true)}
				/>
				<div className="Buffer__20px" />
				<div className="Map__small">
					<Map
						center={storeCoords}
						defaultZoom={18}
						minZoom={18}
						maxZoom={19}
					>
						<Draggable
							anchor={storeCoords}
							offset={[15, 47]}
							onDragEnd={setStoreCoords}
						>
							<img
								src={IndicatorSelected}
								className="Indicator__promo"
							/>
						</Draggable>
					</Map>
				</div>
				<div className="Buffer__20px" />
				<div
					className="Toggle__large--secondary"
					onClick={() => {
						handleAddOutlet();
						history.goBack();
					}}
				>
					<p className="Text__medium--light">Create</p>
				</div>
				<div className="Buffer__30px" />
			</div>
			<div className="Container__header Container__horizontal-padding-20px">
				<div className="Container__row">
					<ArrowBackIcon
						className="Toggle__header"
						onClick={() => history.goBack()}
					/>
					<p className="Text__large--dark">Add/Edit Outlet</p>
					<ArrowBackIcon
						className="Toggle__header"
						style={{ opacity: 0 }}
					/>
				</div>
			</div>
			{showAddressSelector && (
				<CoordinatesSearch
					setStoreCoords={setStoreCoords}
					setShowAddressSelector={setShowAddressSelector}
				/>
			)}
		</div>
	);
}
