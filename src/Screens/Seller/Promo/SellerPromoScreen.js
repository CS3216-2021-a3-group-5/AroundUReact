import { useHistory, useLocation } from "react-router-dom";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import EditIcon from "@material-ui/icons/Edit";
import { Categories } from "../../../constants";

export default function SellerPromoScreen({ promo }) {
	const history = useHistory();
	const data = getData();
	const location = useLocation();

	function getData() {
		return testData;
	}

	function getFormattedDate() {
		const dateSplit = new Date(data.deadline).toUTCString().split(" ");
		return dateSplit[1] + " " + dateSplit[2] + " " + dateSplit[3];
	}

	function deletePromo() {}

	function Stores() {
		const stores = location.state.stores;
		const size = promo.storeIDs.length;
		const selectedStores = [];
		const storeItems = [];

		console.log(`promo 11: ${promo}`);
		console.log(`stores 11: ${stores[0]}`);
		console.log(promo.storeIDs);

		for (let i = 0; i < stores.length; i++) {
			if (promo.storeIDs.includes(stores[i].store_id)) {
				selectedStores.push(stores[i]);
			}
		}

		for (let i = 0; i < size; i++) {
			storeItems.push(
				<div key={"Store" + i}>
					<div className="Buffer__20px" />
					<p className="Text__medium--dark-multiline">
						{selectedStores[i].address}
					</p>
					<div className="Buffer__20px" />
				</div>
			);
			if (i !== size - 1) {
				storeItems.push(<div className="Line" key={"line" + i} />);
			}
		}
		return storeItems;
	}

	return (
		<div className="App">
			<div className="Container__after-header">
				<img className="Image__promo" />
				<div className="Container__large-screen-optimize Container__horizontal-padding-20px">
					<div className="Buffer__20px" />
					<p className="Text__extra-large--dark-multiline">
						{promo.promo_name}
					</p>
					<div className="Buffer__5px" />
					<p className="Text__medium--grey-multiline">
						Until {getFormattedDate()}
					</p>
					<div className="Buffer__30px" />
					<p className="Text__medium--dark-multiline-bold">
						Description
					</p>
					<div className="Buffer__10px" />
					<p className="Text__medium--dark-multiline">
						{promo.details}
					</p>
					<div className="Buffer__30px" />
					<p className="Text__medium--dark-multiline-bold">Stores</p>
					{Stores()}
					<div className="Buffer__110px" />
				</div>
			</div>
			<div className="Container__footer">
				<div className="Buffer__20px" />
				<div className="Container__large-screen-optimize Container__horizontal-padding-20px">
					<div
						className="Toggle__large--primary"
						onClick={() => deletePromo()}
					>
						<p className="Text__medium--light">Delete Promo</p>
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
						onClick={() =>
							history.push("/seller/editpromo/", { data })
						}
					/>
				</div>
			</div>
		</div>
	);
}

// For testing

const testData = {
	category: Categories.ELECTRONICS,
	storeName: "Urban Mobile",
	promotion_id: 1,
	promo_name: "5% Off Repairs",
	deadline: Date(),
	stores: [
		{
			storeId: 1,
			address: "21 Choa Chu Kang North 6, 01-44, Singapore 689578",
			openingHours: "10:30am to 9pm daily",
		},
	],
	details:
		"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Volutpat maecenas volutpat blandit aliquam etiam erat velit scelerisque. Elit at imperdiet dui accumsan. Scelerisque eu ultrices vitae auctor eu augue. Lobortis elementum nibh tellus molestie nunc non. Habitasse platea dictumst vestibulum rhoncus est. A iaculis at erat pellentesque adipiscing commodo elit. Id diam maecenas ultricies mi eget mauris. Lectus arcu bibendum at varius vel pharetra vel turpis nunc. Ullamcorper morbi tincidunt ornare massa eget.",
};
