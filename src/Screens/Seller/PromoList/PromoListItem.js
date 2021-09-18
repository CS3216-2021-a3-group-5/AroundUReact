import { Link } from "react-router-dom";

export default function PromoListItem() {
	return (
		<Link to={"/seller/promo/"} style={{ textDecoration: "none" }}>
			<div className="Buffer_20px" />
			<div className="Container_horizontal-padding-20px">
				<div className="Container_row">
					<p className="Text_large--dark">Promo Name</p>
					<p className="Text_arrow">{">"}</p>
				</div>
			</div>
			<div className="Buffer_20px" />
			<div className="Line" />
		</Link>
	);
}
