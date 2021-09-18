import { useState } from "react";
import { useHistory } from "react-router";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import TextField from "@material-ui/core/TextField";
import { Map, Draggable } from "pigeon-maps";
import IndicatorSelected from "../../../assets/Indicator_Selected.png";
import CoordinatesSearch from "./CoordinatesSearch";

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

	function submit() {}

	return (
		<div className="App">
			<div className="Container_after_header">
				<div className="Container_large-screen-optimize">
					<div className="Container_horizontal-padding-20px">
						<TextField
							value={openingHours}
							onChange={(event) =>
								setOpeningHours(event.target.value)
							}
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
							onChange={(event) =>
								setStoreAddress(event.target.value)
							}
							color="secondary"
							margin="normal"
							fullWidth
							id="address"
							label="Address"
							name="address"
							autoComplete="address"
						/>
						<div className="Buffer_20px" />
						<p className="Text_medium--grey-multiline">
							Tap on the text field below to search for the rough
							coordinates, then drag the red marker in the map to
							the actual location of your store.
						</p>
						<div className="Buffer_5px" />
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
						<div className="Buffer_20px" />
						<div className="Map_small">
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
										className="Indicator_promo"
									/>
								</Draggable>
							</Map>
						</div>
						<div className="Buffer_20px" />
						<div
							className="Toggle_large--secondary"
							onClick={() => submit()}
						>
							<p className="Text_medium--light">Create</p>
						</div>
						<div className="Buffer_30px" />
					</div>
				</div>
			</div>
			<div className="Container_header">
				<div className="Container_horizontal-padding-20px">
					<div className="Container_row">
						<ArrowBackIcon
							className="Toggle_header"
							onClick={() => history.goBack()}
						/>
						<p className="Text_large--dark">Add/Edit Outlet</p>
						<ArrowBackIcon
							className="Toggle_header"
							style={{ opacity: 0 }}
						/>
					</div>
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
