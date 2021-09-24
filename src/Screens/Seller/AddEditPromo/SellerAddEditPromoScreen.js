import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import TextField from "@material-ui/core/TextField";
import DateFnsUtils from "@date-io/date-fns";
import {
	MuiPickersUtilsProvider,
	KeyboardDatePicker,
} from "@material-ui/pickers";
import StoreSelector from "./StoreSelector";
import { useState } from "react";
import { useHistory, useLocation } from "react-router";
import { API_URL, NEW_PROMO, PROMO, PROMO_IMAGE } from "../../../constants.js";
import { getPromotions } from "../../SharedComponents/SellerInitialization";

import ImageTapToUpload from "../../../assets/Tap_To_Select.png";

export default function SellerAddEditPromoScreen({ promo }) {
	const history = useHistory();
	const location = useLocation();

	const [image, setImage] = useState(
		location.state.image == null ? ImageTapToUpload : location.state.image
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

	const storeImage = async (image, id) => {
		console.log("store image in add edit promo");
		const data = await new FormData();
		var blob = await new Blob([image], { type: "img/png" });
		data.append("image", blob);
		const rawResponse = await fetch(API_URL + PROMO_IMAGE + id, {
			method: "POST",
			headers: {
				Authorization: localStorage.getItem("accessToken"),
			},
			body: {
				body: data,
			},
		});
		console.log(`Promo image upload status code: ${rawResponse.status}`);
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
		let currentDate = new Date();
		let date = new Date(endDate);
		if (date < currentDate) {
			alert("Please select a date which is not expired.");
			return;
		}
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
			await getPromotions();
			history.goBack();
		} else {
			alert("Unable to create.");
		}
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
		let currentDate = new Date();
		currentDate.setDate(currentDate.getDate() - 1);
		let date = new Date(endDate);
		if (date < currentDate) {
			alert("Please select a date which is not expired.");
			return;
		}
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
			await updateLocal(storeIds, date);
			history.goBack();
			history.goBack();
		} else {
			alert("Unable to create.");
		}
	};

	async function updateLocal(storeIds, date) {
		const current = localStorage.getItem("promos");
		if (current === null) {
			await getPromotions();
			return;
		}
		const currentPromotions = JSON.parse(current);
		let index = -1;
		for (let i = 0; i < currentPromotions.length; i++) {
			if (currentPromotions[i].promotion_id == promo.promotion_id) {
				index = i;
				console.log(index);
				break;
			}
		}
		if (index === -1) {
			await getPromotions();
			return;
		}
		currentPromotions[index].promo_name = promo_name;
		currentPromotions[index].end_date = date;
		currentPromotions[index].storeIDs = storeIds;

		await localStorage.setItem("promos", JSON.stringify(currentPromotions));
	}

	return (
		<div className="App">
			<div className="Container__after-header Container__large-screen-optimize">
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
				<div className="Container__horizontal-padding-20px">
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
								handleAddPromo().then((id) =>
									storeImage(image, id)
								);
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
