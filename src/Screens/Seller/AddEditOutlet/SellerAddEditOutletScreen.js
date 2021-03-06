import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import TextField from "@material-ui/core/TextField";
import { Map, Draggable } from "pigeon-maps";
import IndicatorSelected from "../../../assets/Indicator_Selected.png";
import CoordinatesSearch from "./CoordinatesSearch";
import { useState } from "react";
import { useHistory, useLocation } from "react-router";
import { API_URL, NEW_STORE, STORE } from "../../../constants.js";
import { getStores } from "../../SharedComponents/SellerInitialization";

export default function SellerAddEditOutletScreen({ store }) {
	const history = useHistory();
	const location = useLocation();

	const [storeAddress, setStoreAddress] = useState(
		store == null ? "" : store.address
	);
	const [storeCoords, setStoreCoords] = useState(
		store == null ? [null, null] : [store.location.lat, store.location.lon]
	);
	const [openingHours, setOpeningHours] = useState(
		store == null ? "" : store.opening_hours
	);

	const [showAddressSelector, setShowAddressSelector] = useState(false);

	const handleAddOutlet = async () => {
		const isAnyNotFilled =
			storeAddress === "" ||
			openingHours === "" ||
			storeCoords[0] === null;
		if (isAnyNotFilled) {
			alert("Please fill up all the fields");
			return;
		}

		const rawResponse = await fetch(API_URL + NEW_STORE, {
			method: "POST",
			headers: {
				Authorization: localStorage.getItem("accessToken"),
			},
			body: JSON.stringify({
				latitude: storeCoords[0],
				longitude: storeCoords[1],
				address: storeAddress,
				opening_hours: openingHours,
			}),
		});
		if (rawResponse.status === 200) {
			await getStores();
			history.goBack();
		} else {
			alert("Unable to create.");
		}
	};

	const handleEditOutlet = async () => {
		const isAnyNotFilled =
			storeAddress === "" ||
			openingHours === "" ||
			storeCoords[0] === null;
		if (isAnyNotFilled) {
			alert("Please fill up all the fields.");
			return;
		}
		console.log(storeAddress);
		console.log(openingHours);
		console.log(storeCoords);
		const rawResponse = await fetch(API_URL + STORE, {
			method: "PUT",
			headers: {
				Authorization: localStorage.getItem("accessToken"),
			},
			body: JSON.stringify({
				store_id: store.store_id,
				address: storeAddress,
				location: {
					lat: storeCoords[0],
					lon: storeCoords[1],
				},
				opening_hours: openingHours,
				promotionIDs: [],
			}),
		});
		if (rawResponse.status === 200) {
			alert("Update success.");
			await updateLocal();
			history.goBack();
			history.goBack();
		} else {
			alert("Unable to edit.");
		}
	};

	async function updateLocal() {
		const current = localStorage.getItem("stores");
		if (current === null) {
			await getStores();
			return;
		}
		const currentStores = JSON.parse(current);
		console.log("currentStores" + currentStores);
		let index = -1;
		for (let i = 0; i < currentStores.length; i++) {
			if (currentStores[i].store_id == store.store_id) {
				index = i;
				console.log(index);
				break;
			}
		}
		if (index === -1) {
			await getStores();
			return;
		}
		currentStores[index] = {
			address: storeAddress,
			company_name: store.company_name,
			location: {
				lat: storeCoords[0],
				lon: storeCoords[1],
			},
			opening_hours: openingHours,
			promotionIDs: store.promotionIDs,
			store_id: store.store_id,
		};
		await localStorage.setItem("stores", JSON.stringify(currentStores));
		console.log("Updated");
	}

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
						if (location.state != null && location.state.isEdit) {
							handleEditOutlet();
						} else {
							handleAddOutlet();
						}
					}}
				>
					<p className="Text__medium--light">
						{location.state != null && location.state.isEdit
							? "Update"
							: "Create"}
					</p>
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
