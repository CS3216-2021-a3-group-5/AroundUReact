import { useHistory } from "react-router-dom";

export default function PromoListItem({ promo, stores }) {
	const history = useHistory();

	return (
		<div
			style={{ textDecoration: "none" }}
			onClick={() => {
				history.push("/seller/promo", { promo, stores });
			}}
		>
			<div className="Buffer__20px" />
			<div className="Container__horizontal-padding-20px Container__row">
				<p className="Text__large--dark">{promo.promo_name}</p>
				<p className="Text__arrow">{">"}</p>
			</div>
			<div className="Buffer__20px" />
			<div className="Line" />
		</div>
	);
}
