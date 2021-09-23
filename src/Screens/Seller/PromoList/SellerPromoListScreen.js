import PromoListItem from "./PromoListItem";
import { Fab } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import {
	API_URL,
	USER_PROMOTION_INFO,
	USER_STORE_INFO,
} from "../../../constants.js";

export default function SellerHomeScreen() {
	const [promos, setPromos] = useState();
	const [stores, setStores] = useState();

	const history = useHistory();

	useEffect(() => {
		handlePromoList();
		handleOutletList();
	}, []);

	const handlePromoList = async () => {
		const rawResponse = await fetch(API_URL + USER_PROMOTION_INFO, {
			method: "GET",
			headers: {
				Authorization: localStorage.getItem("accessToken"),
			},
		});
		const content = await rawResponse.json();
		console.log(content);
		if (rawResponse.status === 200) {
			setPromos(content.promotions);
		} else {
			alert(content.message);
		}
	};

	function Promos() {
		const itemArray = [];
		if (promos == null) {
			console.log("no promotions");
			return;
		}
		promos.forEach((promo) => {
			itemArray.push(<PromoListItem promo={promo} stores={stores} />);
		});
		return itemArray;
	}

	const handleOutletList = async () => {
		const rawResponse = await fetch(API_URL + USER_STORE_INFO, {
			method: "GET",
			headers: {
				Authorization: localStorage.getItem("accessToken"),
			},
		});
		const content = await rawResponse.json();
		if (rawResponse.status === 200) {
			setStores(content.stores);
		} else {
			alert(content.message);
		}
	};

	return (
		<div className="App">
			<div className="Container__banner--primary">
				<p className="Text__extra-large--light-multiline">Promotions</p>
			</div>
			<div className="Buffer__5px" />
			<div className="Container__large-screen-optimize">{Promos()}</div>
			<div className="Buffer__50px" />
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
