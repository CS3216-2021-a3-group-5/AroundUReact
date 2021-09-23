import { useState } from "react";
import { useHistory, useLocation } from "react-router-dom";

import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import EditIcon from "@material-ui/icons/Edit";
import { Categories } from "../../../constants";
import DeleteConfirmation from "../../SharedComponents/DeleteConfirmation";
import { API_URL, PROMO } from "../../../constants.js";

export default function SellerPromoScreen({ promo }) {
	const history = useHistory();
	const location = useLocation();
	const stores = location.state.stores;

	const [showPopup, setShowPopup] = useState(false);

	function getFormattedDate() {
		let date = new Date(promo.end_date);
		date.setDate(date.getDate() + 1);
		const dateSplit = date.toUTCString().split(" ");
		return dateSplit[1] + " " + dateSplit[2] + " " + dateSplit[3];
	}

	const handleDeletePromo = async () => {
		const rawResponse = await fetch(API_URL + PROMO, {
			method: "DELETE",
			headers: {
				Authorization: localStorage.getItem("accessToken"),
			},
			body: JSON.stringify({
				promotion_id: promo.promotion_id,
			}),
		});
		const content = await rawResponse.json();
		alert(content.message);
	};

	function Stores() {
		const size = promo.storeIDs.length;
		const selectedStores = [];
		const storeItems = [];

		for (let i = 0; i < stores.length; i++) {
			if (promo.storeIDs.includes(stores[i].store_id)) {
				selectedStores.push(stores[i]);
			}
		}

		for (let i = 0; i < size; i++) {
			storeItems.push(
				<div key={"Store" + i}>
					<div className="Buffer__20px" />
					<p className="Text__medium--dark-multiline">
						{selectedStores[i].address}
					</p>
					<div className="Buffer__20px" />
				</div>
			);
			if (i !== size - 1) {
				storeItems.push(<div className="Line" key={"line" + i} />);
			}
		}
		return storeItems;
	}

	return (
		<div className="App">
			<div className="Container__after-header">
				<img className="Image__promo" />
				<div className="Container__large-screen-optimize Container__horizontal-padding-20px">
					<div className="Buffer__20px" />
					<p className="Text__extra-large--dark-multiline">
						{promo.promo_name}
					</p>
					<div className="Buffer__5px" />
					<p className="Text__medium--grey-multiline">
						Until {getFormattedDate()}
					</p>
					<div className="Buffer__30px" />
					<p className="Text__medium--dark-multiline-bold">
						Description
					</p>
					<div className="Buffer__10px" />
					<p className="Text__medium--dark-multiline">
						{promo.details}
					</p>
					<div className="Buffer__30px" />
					<p className="Text__medium--dark-multiline-bold">Stores</p>
					{Stores()}
					<div className="Buffer__110px" />
				</div>
			</div>
			<div className="Container__footer">
				<div className="Buffer__20px" />
				<div className="Container__large-screen-optimize Container__horizontal-padding-20px">
					<div
						className="Toggle__large--primary"
						onClick={() => setShowPopup(true)}
					>
						<p className="Text__medium--light">Delete Promo</p>
					</div>
				</div>
				<div className="Buffer__20px" />
			</div>
			<div className="Container__header Container__horizontal-padding-20px">
				<div className="Container__row">
					<ArrowBackIcon
						className="Toggle__header"
						onClick={() => history.goBack()}
					/>
					<EditIcon
						className="Toggle__header"
						onClick={() => {
							const isEdit = true;
							history.push("/seller/editpromo/", {
								promo,
								stores,
								isEdit,
							});
						}}
					/>
				</div>
			</div>
			{showPopup && (
				<DeleteConfirmation
					setShowPopup={setShowPopup}
					confirmDelete={() => {
						handleDeletePromo();
						history.goBack();
					}}
				/>
			)}
		</div>
	);
}
