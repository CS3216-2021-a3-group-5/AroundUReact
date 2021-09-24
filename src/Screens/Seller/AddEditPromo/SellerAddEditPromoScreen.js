import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import TextField from "@material-ui/core/TextField";
import DateFnsUtils from "@date-io/date-fns";
import {
	MuiPickersUtilsProvider,
	KeyboardDatePicker,
} from "@material-ui/pickers";
import StoreSelector from "./StoreSelector";
import { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router";
import { API_URL, NEW_PROMO, PROMO, PROMO_IMAGE } from "../../../constants.js";

import ImageTapToUpload from "../../../assets/Tap_To_Select.png";

export default function SellerAddEditPromoScreen({ promo }) {
	const history = useHistory();
	const location = useLocation();

	const [image, setImage] = useState(
		location.state.image == null ? "" : ImageTapToUpload
	);
	const [promo_name, setPromo_name] = useState(
		promo == null ? "" : promo.promo_name
	);
	const [details, setDetails] = useState(promo == null ? "" : promo.details);
	const [endDate, setEndDate] = useState(
		promo == null ? new Date() : promo.end_date
	);
	const [stores] = useState(location.state.stores);

	const [selectedStoreIds, setSelectedStoreIds] = useState(
		getSelectedStores()
	);

	function getSelectedStores() {
		const selectedStores = new Array(stores.length).fill(false);
		const selectedIds = [];
		if (promo != null) {
			for (let i = 0; i < stores.length; i++) {
				if (promo.storeIDs.includes(stores[i].store_id)) {
					selectedStores[i] = true;
				}
			}
		}
		console.log(selectedStores);
		return selectedStores;
	}

	function uploadImage(event) {
		const file = event.target.files[0];
		const reader = new FileReader();
		const url = reader.readAsDataURL(file);
		reader.onloadend = () => {
			setImage(reader.result);
		};
	}

	const storeImage = async (image) => {
		const data = await new FormData();
		data.append("image", image);
		// data.append("filename", profile.company_name);
		const response = await fetch(
			API_URL + PROMO_IMAGE + promo.promotion_id,
			{
				method: "POST",
				headers: {
					Authorization: localStorage.getItem("accessToken"),
				},
				body: {
					file: data,
				},
			}
		);
		// const blob = await response.blob();
		// const loadedImage = URL.createObjectURL(blob);
	};

	const handleAddPromo = async () => {
		const isAnyNotFilled =
			promo_name === "" || endDate === "" || details === "";
		if (isAnyNotFilled) {
			alert("Please fill up all the fields.");
			return;
		} else if (selectedStoreIds.length == 0) {
			alert("Please create an outlet first.");
			return;
		}
		const storeIds = [];
		for (let i = 0; i < selectedStoreIds.length; i++) {
			if (selectedStoreIds[i]) {
				storeIds.push(stores[i].store_id);
			}
		}
		if (storeIds.length == 0) {
			alert("Please select at least one outlet.");
			return;
		}
		let date = new Date(endDate);
		date.setHours(date.getHours() + 8);
		const rawResponse = await fetch(API_URL + NEW_PROMO, {
			method: "POST",
			headers: {
				Authorization: localStorage.getItem("accessToken"),
			},
			body: JSON.stringify({
				promo_name: promo_name,
				end_date: date,
				details: details,
				store_ids: storeIds,
			}),
		});
		if (rawResponse.status === 200) {
			alert("Creation success.");
		}
		history.goBack();
	};

	const handleEditPromo = async () => {
		const isAnyNotFilled =
			promo_name === "" || endDate === "" || details === "";
		if (isAnyNotFilled) {
			alert("Please fill up all the fields.");
			return;
		} else if (selectedStoreIds.length == 0) {
			alert("Please create an outlet first.");
			return;
		}
		const storeIds = [];
		for (let i = 0; i < selectedStoreIds.length; i++) {
			if (selectedStoreIds[i]) {
				storeIds.push(stores[i].store_id);
			}
		}
		if (storeIds.length == 0) {
			alert("Please select at least one outlet.");
			return;
		}
		let date = new Date(endDate);
		date.setHours(date.getHours() + 8);
		const rawResponse = await fetch(API_URL + PROMO, {
			method: "PUT",
			headers: {
				Authorization: localStorage.getItem("accessToken"),
			},
			body: JSON.stringify({
				promotion_id: promo.promotion_id,
				promo_name: promo_name,
				end_date: date,
				details: details,
				store_ids: storeIds,
			}),
		});
		if (rawResponse.status === 200) {
			alert("Update success.");
		}
		history.goBack();
		history.goBack();
	};

	return (
		<div className="App">
			<div className="Container__after-header">
				<div className="Container__center--horizontal">
					<input
						accept="image/*"
						type="file"
						onChange={(event) => uploadImage(event)}
						className="Toggle__promo-image-input"
					/>
				</div>

				<img className="Image__promo" src={image} />

				<div className="Buffer__30px" />
				<div className="Container__large-screen-optimize Container__horizontal-padding-20px">
					<TextField
						value={promo_name}
						onChange={(event) => setPromo_name(event.target.value)}
						margin="normal"
						fullWidth
						id="name"
						label="Name"
						name="name"
						autoComplete="promo name"
						autoFocus
					/>
					<TextField
						value={details}
						onChange={(event) => setDetails(event.target.value)}
						margin="normal"
						fullWidth
						id="details"
						label="Details"
						name="details"
						autoComplete="details"
						multiline
					/>
					<div className="Buffer__20px" />
					<MuiPickersUtilsProvider utils={DateFnsUtils}>
						<KeyboardDatePicker
							label="End Date"
							format="dd/MM/yyyy"
							fullWidth
							value={endDate}
							onChange={setEndDate}
						/>
					</MuiPickersUtilsProvider>
					<div className="Buffer__30px" />
					<p className="Text__medium--dark-multiline-bold">Stores</p>
					<div className="Buffer__10px" />
					<StoreSelector
						stores={stores}
						selectedStoreIds={selectedStoreIds}
						setSelectedStoreIds={setSelectedStoreIds}
					/>
					<div className="Buffer__30px" />
					<div
						className="Toggle__large--primary"
						onClick={() => {
							if (
								location.state != null &&
								location.state.isEdit
							) {
								handleEditPromo();
								//storeImage(image);
							} else {
								handleAddPromo();
								//storeImage(image);
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
			</div>
			<div className="Container__header Container__horizontal-padding-20px">
				<div className="Container__row">
					<ArrowBackIcon
						className="Toggle__header"
						onClick={() => history.goBack()}
					/>
					<p className="Text__large--dark">Add/Edit Promotion</p>
					<ArrowBackIcon
						className="Toggle__header"
						style={{ opacity: 0 }}
					/>
				</div>
			</div>
		</div>
	);
}

const testDataStores = [
	{
		storeId: 1,
		address: "21 Choa Chu Kang North 6, 01-44, Singapore 689578",
		openingHours: "10:30am to 9pm daily",
	},
	{
		storeId: 2,
		address: "1 Jelebu Rd, Singapore 677743",
		openingHours: "11:00am to 9pm daily",
	},
];
