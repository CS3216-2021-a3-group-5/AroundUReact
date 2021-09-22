import { useHistory } from "react-router-dom";

export default function PromoListItem({ promo }) {
	const history = useHistory();

	return (
		<div
			style={{ textDecoration: "none" }}
			onClick={() => {
				console.log(promo);
				history.push("/seller/promo", { promo });
			}}
		>
			<div className="Buffer__20px" />
			<div className="Container__horizontal-padding-20px">
				<div className="Container__row">
					<p className="Text__large--dark">{promo.promo_name}</p>
					<p className="Text__arrow">{">"}</p>
				</div>
			</div>
			<div className="Buffer__20px" />
			<div className="Line" />
		</div>
	);
}
