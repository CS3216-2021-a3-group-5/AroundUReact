import { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import EditIcon from "@material-ui/icons/Edit";
import DeleteConfirmation from "../../SharedComponents/DeleteConfirmation";
import { API_URL, PROMO, PROMO_IMAGE } from "../../../constants.js";
import { getSellerContent } from "../../SharedComponents/SellerInitialization";

export default function SellerPromoScreen({ promo }) {
	const history = useHistory();
	const location = useLocation();
	const stores = location.state.stores;

	const [showPopup, setShowPopup] = useState(false);
	const [image, setImage] = useState(null);

	useEffect(() => {
		getImage();
	}, []);

	function getFormattedDate() {
		let date = new Date(promo.end_date);
		date.setDate(date.getDate());
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
		if (rawResponse.status === 200) {
			await getSellerContent();
			history.goBack();
		} else {
			alert("Unable to delete.");
		}
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

	const getImage = async () => {
		if (promo == null) {
			return null;
		}
		const response = await fetch(
			API_URL + PROMO_IMAGE + promo.promotion_id,
			{
				method: "GET",
			}
		);
		const blob = await response.blob();
		const loadedImage = URL.createObjectURL(blob);
		setImage(loadedImage);
	};

	return (
		<div className="App">
			<div className="Container__after-header Container__large-screen-optimize">
				<div className="Container__horizontal-padding-20px">
					<img className="Image__promo" src={image} />
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
								image,
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
					}}
				/>
			)}
		</div>
	);
}
