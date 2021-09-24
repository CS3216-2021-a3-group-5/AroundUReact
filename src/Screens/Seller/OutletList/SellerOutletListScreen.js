import OutletListItem from "./OutletListItem";
import { Fab } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import { useState } from "react";
import { useHistory } from "react-router";

export default function SellerOutletListScreen() {
	const [stores] = useState(getStores());
	const history = useHistory();

	function getStores() {
		const result = localStorage.getItem("stores");
		if (result === null) return [];
		return JSON.parse(result);
	}

	function Outlets() {
		const itemArray = [];
		if (stores == null) {
			return;
		}
		stores.forEach((store) => {
			itemArray.push(
				<OutletListItem store={store} key={"Store" + store.store_id} />
			);
		});
		return itemArray;
	}

	return (
		<div className="App">
			<div className="Container__banner--secondary">
				<p className="Text__extra-large--light-multiline">Outlets</p>
			</div>
			<div className="Buffer__5px" />
			<div className="Container__large-screen-optimize">{Outlets()}</div>
			<div className="Buffer__110px" />
			<div className="Fab">
				<Fab
					color="secondary"
					aria-label="add"
					onClick={() => {
						history.push("/seller/addoutlet");
					}}
				>
					<AddIcon />
				</Fab>
			</div>
		</div>
	);
}
