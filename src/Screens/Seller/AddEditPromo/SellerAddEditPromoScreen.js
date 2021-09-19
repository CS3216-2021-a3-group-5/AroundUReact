import { useState } from "react";
import { useHistory } from "react-router";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import TextField from "@material-ui/core/TextField";
import DateFnsUtils from "@date-io/date-fns";
import {
	MuiPickersUtilsProvider,
	KeyboardDatePicker,
} from "@material-ui/pickers";
import StoreSelector from "./StoreSelector";

import ImageTapToUpload from "../../../assets/Tap_To_Select.png";

export default function SellerAddEditPromoScreen({ promo }) {
	const history = useHistory();

	const [image, setImage] = useState(ImageTapToUpload);
	const [promoName, setPromoName] = useState(
		promo == null ? "" : promo.promoName
	);
	const [description, setDescription] = useState(
		promo == null ? "" : promo.description
	);
	const [endDate, setEndDate] = useState(new Date());
	const [stores] = useState(getAllStores());
	const [selectedStoreIds, setSelectedStoreIds] = useState(
		getSelectedStores()
	);

	function getSelectedStores() {
		const selectedStores = new Array(stores.length).fill(false);
		const selectedIds = [];
		if (promo != null) {
			promo.stores.forEach((store) => {
				selectedIds.push(store.storeId);
			});
		}
		for (let i = 0; i < stores.length; i++) {
			if (selectedIds.includes(stores[i].storeId)) {
				selectedStores[i] = true;
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

	function getAllStores() {
		return testDataStores;
	}

	function submit() {}

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
						value={promoName}
						onChange={(event) => setPromoName(event.target.value)}
						margin="normal"
						fullWidth
						id="name"
						label="Name"
						name="name"
						autoComplete="promo name"
						autoFocus
					/>
					<TextField
						value={description}
						onChange={(event) => setDescription(event.target.value)}
						margin="normal"
						fullWidth
						id="description"
						label="Description"
						name="description"
						autoComplete="description"
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
						onClick={() => submit()}
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
