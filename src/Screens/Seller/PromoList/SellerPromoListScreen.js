import PromoListItem from "./PromoListItem";
import { Fab } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import { useHistory } from "react-router";

export default function SellerHomeScreen() {
	const history = useHistory();

	return (
		<div className="App">
			<div className="Container__banner--primary">
				<p className="Text__extra-large--light-multiline">Promotions</p>
			</div>
			<div className="Buffer__5px" />
			<div className="Container__large-screen-optimize">
				<PromoListItem />
				<PromoListItem />
				<PromoListItem />
				<PromoListItem />
				<PromoListItem />
			</div>
			<div className="Buffer__50px" />
			<div
				className="Fab"
				onClick={() => {
					history.push("/seller/addpromo");
				}}
			>
				<Fab color="primary" aria-label="add">
					<AddIcon />
				</Fab>
			</div>
		</div>
	);
}
