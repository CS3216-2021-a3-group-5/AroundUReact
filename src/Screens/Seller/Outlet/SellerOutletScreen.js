import { useState } from "react";
import { useHistory } from "react-router";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import EditIcon from "@material-ui/icons/Edit";
import DeleteConfirmation from "../../SharedComponents/DeleteConfirmation";
import { API_URL, STORE } from "../../../constants.js";
import { Map, Overlay } from "pigeon-maps";
import IndicatorSelected from "../../../assets/Indicator_Selected.png";
import { getSellerContent } from "../../SharedComponents/SellerInitialization";

export default function SellerOutletScreen({ store }) {
	const history = useHistory();
	const [showPopup, setShowPopup] = useState(false);

	const handleDeleteOutlet = async () => {
		const rawResponse = await fetch(API_URL + STORE, {
			method: "DELETE",
			headers: {
				Authorization: localStorage.getItem("accessToken"),
			},
			body: JSON.stringify({
				store_id: store.store_id,
			}),
		});
		if (rawResponse.status === 200) {
			await getSellerContent();
			history.goBack();
			alert("Deletion success.");
		} else {
			alert("Unable to delete.");
		}
	};

	function openOnGoogleMaps() {
		window.open(
			"https://www.google.com/maps/search/" +
				store.location.lat +
				"," +
				store.location.lon +
				"/@" +
				store.location.lat +
				"," +
				store.location.lon +
				",20z"
		);
	}

	return (
		<div className="App">
			<div className="Container__after-header Container__large-screen-optimize Container__horizontal-padding-20px">
				<div className="Buffer__30px" />
				<p className="Text__extra-large--dark-multiline">
					{store.address}
				</p>
				<div className="Buffer__30px" />
				<p className="Text__medium--dark-multiline-bold">
					Opening Hours
				</p>
				<div className="Buffer__10px" />
				<p className="Text__medium--dark-multiline">
					{store.opening_hours}
				</p>
				<div className="Buffer__20px" />
				<div className="Map__small" onClick={() => openOnGoogleMaps()}>
					<Map
						center={[store.location.lat, store.location.lon]}
						mouseEvents={false}
						touchEvents={false}
						defaultZoom={18}
						minZoom={18}
						maxZoom={19}
					>
						<Overlay
							anchor={[store.location.lat, store.location.lon]}
							offset={[15, 47]}
						>
							<img
								src={IndicatorSelected}
								className="Indicator__promo"
							/>
						</Overlay>
					</Map>
				</div>
			</div>
			<div className="Container__footer">
				<div className="Buffer__20px" />
				<div className="Container__large-screen-optimize Container__horizontal-padding-20px">
					<div
						className="Toggle__large--secondary"
						onClick={() => setShowPopup(true)}
					>
						<p className="Text__medium--light">Delete Outlet</p>
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
							history.push("/seller/editoutlet", {
								store,
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
						handleDeleteOutlet();
					}}
				/>
			)}
		</div>
	);
}
