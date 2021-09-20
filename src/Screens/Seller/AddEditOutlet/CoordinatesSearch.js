import { useState } from "react";
import TextField from "@material-ui/core/TextField";
import SearchIcon from "@material-ui/icons/Search";

export default function CoordinatesSearch({
	setStoreCoords,
	setShowAddressSelector,
}) {
	const [search, setSearch] = useState("");
	const [addresses, setAddresses] = useState([]);

	async function findResults() {
		if (search.length === 0) {
			return;
		}
		const refinedSearchTerm = search.replace(" ", "+").replace("#", "");
		var url =
			"https://developers.onemap.sg/commonapi/search?searchVal=" +
			refinedSearchTerm +
			"&returnGeom=Y&getAddrDetails=Y&pageNum=1";
		var reply = await fetch(url);
		var data = await reply.json();
		setAddresses(data.results);
	}

	function AddressSelection() {
		const addressItems = [];
		for (let i = 0; i < addresses.length; i++) {
			const address = addresses[i];
			if (address.ROAD_NAME !== "NIL") {
				addressItems.push(
					<div
						onClick={() => {
							setStoreCoords([
								parseFloat(address.LATITUDE),
								parseFloat(address.LONGITUDE),
							]);
							setAddresses([]);
							setShowAddressSelector(false);
						}}
						key={address.LATITUDE + address.LONGITUDE}
					>
						<div className="Buffer__20px" />
						<p className="Text__medium--dark">
							{address.SEARCHVAL}
						</p>
						<div className="Buffer__5px " />
						<p className="Text__small--dark">
							{address.BLK_NO +
								" " +
								address.ROAD_NAME +
								", S" +
								address.POSTAL}
						</p>
						<div className="Buffer__20px" />
					</div>
				);
				if (i !== addresses.length - 1) {
					addressItems.push(<div className="Line" key={"Key" + i} />);
				}
			}
		}

		return addressItems;
	}

	return (
		<div
			className="Container__darken-background"
			onClick={() => setShowAddressSelector(false)}
		>
			<div
				className="Container__popup Container__horizontal-padding-20px"
				onClick={(event) => {
					event.stopPropagation();
				}}
			>
				<div className="Container__row">
					<TextField
						value={search}
						onChange={(event) => setSearch(event.target.value)}
						variant="outlined"
						color="secondary"
						margin="normal"
						fullWidth
						id="search"
						label="Search Address"
						name="search"
						autoFocus
					/>
					<div className="Buffer__20px" />
					<div
						className="Toggle__search"
						onClick={() => findResults()}
					>
						<SearchIcon />
					</div>
				</div>
				<div className="Buffer__20px" />
				{AddressSelection()}
			</div>
		</div>
	);
}
