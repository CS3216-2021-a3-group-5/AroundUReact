import OutletListItem from "./OutletListItem";
import { Fab } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { API_URL, USER_STORE_INFO } from "../../../constants.js";

export default function SellerOutletListScreen() {
	const [stores, setStores] = useState();
	const history = useHistory();

	useEffect(() => {
		handleOutletList();
	}, []);

	const handleOutletList = async () => {
		const rawResponse = await fetch(API_URL + USER_STORE_INFO, {
			method: "GET",
			headers: {
				Authorization: localStorage.getItem("accessToken"),
			},
		});
		const content = await rawResponse.json();
		console.log(content);
		if (rawResponse.status === 200) {
			setStores(content.stores);
		} else {
			alert(content.message);
		}
	};

	function Outlets() {
		const itemArray = [];
		if (stores == null) {
			return;
		}
		stores.forEach((store) => {
			itemArray.push(<OutletListItem store={store} />);
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
			<div className="Buffer__50px" />
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
