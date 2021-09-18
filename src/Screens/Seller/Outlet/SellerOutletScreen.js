import { useHistory } from "react-router";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import EditIcon from "@material-ui/icons/Edit";

export default function SellerOutletScreen({ store }) {
	const history = useHistory();

	function deleteOutlet() {}

	return (
		<div className="App">
			<div className="Container_after_header">
				<div className="Buffer_30px" />
				<div className="Container_large-screen-optimize">
					<div className="Container_horizontal-padding-20px">
						<div className="Buffer_20px" />
						<p className="Text_extra-large--dark-multiline">
							{store.address}
						</p>
						<div className="Buffer_30px" />
						<p className="Text_medium--dark-multiline-bold">
							Opening Hours
						</p>
						<div className="Buffer_10px" />
						<p className="Text_medium--dark-multiline">
							{store.openingHours}
						</p>
						<div className="Buffer_110px" />
					</div>
				</div>
			</div>
			<div className="Container_footer">
				<div className="Buffer_20px" />
				<div className="Container_large-screen-optimize">
					<div className="Container_horizontal-padding-20px">
						<div
							className="Toggle_large--secondary"
							onClick={() => deleteOutlet()}
						>
							<p className="Text_medium--light">Delete Outlet</p>
						</div>
					</div>
				</div>
				<div className="Buffer_20px" />
			</div>
			<div className="Container_header">
				<div className="Container_horizontal-padding-20px">
					<div className="Container_row">
						<ArrowBackIcon
							className="Toggle_header"
							onClick={() => history.goBack()}
						/>
						<EditIcon
							className="Toggle_header"
							onClick={() =>
								history.push("/seller/editoutlet", { store })
							}
						/>
					</div>
				</div>
			</div>
		</div>
	);
}
