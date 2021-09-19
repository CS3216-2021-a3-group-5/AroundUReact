import { useHistory } from "react-router-dom";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import EditIcon from "@material-ui/icons/Edit";

export default function SellerPromoScreen() {
	const history = useHistory();
	const data = getData();

	function getData() {
		return testData;
	}

	function getFormattedDate() {
		const dateSplit = new Date(data.deadline).toUTCString().split(" ");
		return dateSplit[1] + " " + dateSplit[2] + " " + dateSplit[3];
	}

	function deletePromo() {}

	function Stores() {
		const storeItems = [];
		const size = data.stores.length;
		for (let i = 0; i < size; i++) {
			storeItems.push(
				<div key={"Store" + i}>
					<div className="Buffer__20px" />
					<p className="Text__medium--dark-multiline">
						{data.stores[i].address}
					</p>
					<div className="Buffer__20px" />
				</div>
			);
			if (i != size - 1) {
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
						{data.promoName}
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
						{data.description}
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

const Categories = {
	WELLNESS: "Beauty & Wellness",
	ELECTRONICS: "Electronics",
	FOOD: "Food",
	FASHION: "Fashion",
	OTHERS: "Others",
};

// For testing

const testData = {
	category: Categories.ELECTRONICS,
	storeName: "Urban Mobile",
	promoId: 1,
	promoName: "5% Off Repairs",
	deadline: Date(),
	stores: [
		{
			storeId: 1,
			address: "21 Choa Chu Kang North 6, 01-44, Singapore 689578",
			openingHours: "10:30am to 9pm daily",
		},
	],
	description:
		"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Volutpat maecenas volutpat blandit aliquam etiam erat velit scelerisque. Elit at imperdiet dui accumsan. Scelerisque eu ultrices vitae auctor eu augue. Lobortis elementum nibh tellus molestie nunc non. Habitasse platea dictumst vestibulum rhoncus est. A iaculis at erat pellentesque adipiscing commodo elit. Id diam maecenas ultricies mi eget mauris. Lectus arcu bibendum at varius vel pharetra vel turpis nunc. Ullamcorper morbi tincidunt ornare massa eget.",
};
