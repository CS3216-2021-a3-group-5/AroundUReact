import { useHistory } from "react-router";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import EditIcon from "@material-ui/icons/Edit";

export default function SellerOutletScreen({ store }) {
	const history = useHistory();

	function deleteOutlet() {}

	return (
		<div className="App">
			<div className="Container__after-header Container__large-screen-optimize Container__horizontal-padding-20px">
				<div className="Buffer__30px" />
				<p className="Text__extra-large--dark-multiline">
					{store.address}
				</p>
				<div className="Buffer__30px" />
				<p className="Text__medium--dark-multiline-bold">
					Opening Hours
				</p>
				<div className="Buffer__10px" />
				<p className="Text__medium--dark-multiline">
					{store.opening_hours}
				</p>
				<div className="Buffer__110px" />
			</div>
			<div className="Container__footer">
				<div className="Buffer__20px" />
				<div className="Container__large-screen-optimize Container__horizontal-padding-20px">
					<div
						className="Toggle__large--secondary"
						onClick={() => deleteOutlet()}
					>
						<p className="Text__medium--light">Delete Outlet</p>
					</div>
				</div>
				<div className="Buffer__20px" />
			</div>
			<div className="Container__header Container__horizontal-padding-20px">
				<div className="Container__row">
					<ArrowBackIcon
						className="Toggle__header"
						onClick={() => history.goBack()}
					/>
					<EditIcon
						className="Toggle__header"
						onClick={() => {
							const isEdit = true;
							history.push("/seller/editoutlet", {
								store,
								isEdit,
							});
						}}
					/>
				</div>
			</div>
		</div>
	);
}
