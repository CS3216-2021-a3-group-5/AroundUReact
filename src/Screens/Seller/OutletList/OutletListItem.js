import { useHistory } from "react-router-dom";

export default function OutletListItem({ store }) {
	const history = useHistory();

	return (
		<div
			style={{ textDecoration: "none" }}
			onClick={() => {
				history.push("/seller/outlet", { store });
			}}
		>
			<div className="Buffer__20px" />
			<div className="Container__horizontal-padding-20px">
				<div className="Container__row">
					<div className="Container__column">
						<p className="Text__large--dark">{store.address}</p>
						<div className="Buffer__5px " />
						<p className="Text__medium--grey-multiline">
							{store.openingHours}
						</p>
					</div>
					<p className="Text__arrow">{">"}</p>
				</div>
			</div>
			<div className="Buffer__20px" />
			<div className="Line" />
		</div>
	);
}
