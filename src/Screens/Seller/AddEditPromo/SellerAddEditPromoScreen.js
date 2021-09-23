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
import { API_URL, NEW_PROMO, USER_STORE_INFO } from "../../../constants.js";

import ImageTapToUpload from "../../../assets/Tap_To_Select.png";

export default function SellerAddEditPromoScreen({ promo }) {
	const history = useHistory();
	const location = useLocation();

	const [image, setImage] = useState(ImageTapToUpload);
	const [promo_name, setPromo_name] = useState(
		promo == null ? "" : promo.promo_name
	);
	const [details, setDetails] = useState(promo == null ? "" : promo.details);
	const [endDate, setEndDate] = useState(new Date());
	const [stores] = useState(location.state.stores);

	const [selectedStoreIds, setSelectedStoreIds] = useState(
		getSelectedStores()
	);

	function getSelectedStores() {
		const selectedStores = new Array(stores.length).fill(false);
		const selectedIds = [];
		if (promo != null) {
			stores.forEach((store) => {
				console.log("object");
				selectedIds.push(store.store_id);
			});
		}
		for (let i = 0; i < stores.length; i++) {
			if (selectedIds.includes(stores[i].storeId)) {
				selectedStores[i] = true;
				console.log("HI");
			}
		}
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

	const handleAddPromo = async () => {
		const storeIds = [];
		for (let i = 0; i < selectedStoreIds.length; i++) {
			if (selectedStoreIds[i]) {
				storeIds.push(stores[i].store_id);
			}
		}
		console.log(storeIds);
		const rawResponse = await fetch(API_URL + NEW_PROMO, {
			method: "POST",
			headers: {
				Authorization: localStorage.getItem("accessToken"),
			},
			body: JSON.stringify({
				promo_name: promo_name,
				end_date: endDate,
				details: details,
				store_ids: storeIds,
			}),
		});
		const content = await rawResponse.json();
		alert(content.message);
	};

	return (
		<div className="App">
			<div className="Container__after-header">
				<div className="Container__center--horizontal">
					<form
						action="http://localhost:3080/uploadLogo"
						method="post"
						enctype="multipart/form-data"
					>
						<input
							accept="image/*"
							type="file"
							onChange={(event) => uploadImage(event)}
							className="Toggle__promo-image-input"
						/>
					</form>
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
							handleAddPromo();
							history.goBack();
						}}
					>
						<p className="Text__medium--light">Create</p>
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
