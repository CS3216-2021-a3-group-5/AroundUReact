import PromoListItem from "./PromoListItem";
import { Fab } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import { useHistory } from "react-router";

export default function SellerHomeScreen() {
	const history = useHistory();

	return (
		<div className="App">
			<div className="Container_banner--primary">
				<p className="Text_extra-large--light-multiline">Promotions</p>
			</div>
			<div className="Buffer_5px" />
			<div className="Container_large-screen-optimize">
				<PromoListItem />
				<PromoListItem />
				<PromoListItem />
				<PromoListItem />
				<PromoListItem />
			</div>
			<div className="Buffer_50px" />
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
