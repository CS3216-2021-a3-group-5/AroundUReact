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
			<div className="Buffer_20px" />
			<div className="Container_horizontal-padding-20px">
				<div className="Container_row">
					<div className="Container_column">
						<p className="Text_large--dark">{store.address}</p>
						<div className="Buffer_5px " />
						<p className="Text_medium--grey-multiline">
							{store.openingHours}
						</p>
					</div>
					<p className="Text_arrow">{">"}</p>
				</div>
			</div>
			<div className="Buffer_20px" />
			<div className="Line" />
		</div>
	);
}
