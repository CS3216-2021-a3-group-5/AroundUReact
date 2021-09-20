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
		console.log("hello2");
		console.log(localStorage.getItem("accessToken"));
		const rawResponse = await fetch(API_URL + USER_STORE_INFO, {
			method: "GET",
			headers: {
				Authorization: localStorage.getItem("accessToken"),
			},
		});
		console.log("hello2");
		console.log(rawResponse);
		/* 		const content = await rawResponse.json();
		console.log(content);
		console.log(rawResponse);
		if (rawResponse.status === 200) {
			setStores(content);
		} else {
			alert(content.message);
		} */
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

const testDataStores = [
	{
		storeId: 1,
		address: "21 Choa Chu Kang North 6, 01-44, Singapore 689578",
		latitude: 1.39704710723121,
		longtitude: 103.74685004621115,
		openingHours: "10:30am to 9pm daily",
	},
	{
		storeId: 2,
		address: "1 Jelebu Rd, Singapore 677743",
		latitude: 1.3801446363034873,
		longtitude: 103.76430889753605,
		openingHours: "11:00am to 9pm daily",
	},
];
