import PromoListItem from "./PromoListItem";
import { Fab } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import { useState } from "react";
import { useHistory } from "react-router";

export default function SellerPromoListScreen() {
	const [promos, setPromos] = useState(getPromos());
	const [stores, setStores] = useState(getStores());

	const history = useHistory();

	function getPromos() {
		const result = localStorage.getItem("promos");
		if (result === null) {
			setTimeout(() => {
				const result = localStorage.getItem("promos");
				if (result !== null) {
					setPromos(JSON.parse(result));
				}
			}, 1000);
			return [];
		}
		return JSON.parse(result);
	}

	function getStores() {
		const result = localStorage.getItem("stores");
		if (result === null) {
			setTimeout(() => {
				const result = localStorage.getItem("stores");
				if (result !== null) {
					setStores(JSON.parse(result));
				}
			}, 1000);
			return [];
		}
		return JSON.parse(result);
	}

	function Promos() {
		const itemArray = [];
		if (promos == null) {
			return;
		}
		promos.forEach((promo) => {
			itemArray.push(
				<PromoListItem
					promo={promo}
					stores={stores}
					key={promo.promotion_id}
				/>
			);
		});
		return itemArray;
	}

	return (
		<div className="App">
			<div className="Container__banner--primary">
				<p className="Text__extra-large--light-multiline">Promotions</p>
			</div>
			<div className="Buffer__5px" />
			<div className="Container__large-screen-optimize">{Promos()}</div>
			<div className="Buffer__110px" />
			<div
				className="Fab"
				onClick={() => {
					history.push("/seller/addpromo", { stores });
				}}
			>
				<Fab color="primary" aria-label="add">
					<AddIcon />
				</Fab>
			</div>
		</div>
	);
}
