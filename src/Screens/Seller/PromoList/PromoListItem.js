import { Link } from "react-router-dom";

export default function PromoListItem() {
	return (
		<Link to={"/seller/promo/"} style={{ textDecoration: "none" }}>
			<div className="Buffer__20px" />
			<div className="Container__horizontal-padding-20px">
				<div className="Container__row">
					<p className="Text__large--dark">Promo Name</p>
					<p className="Text__arrow">{">"}</p>
				</div>
			</div>
			<div className="Buffer__20px" />
			<div className="Line" />
		</Link>
	);
}
