import { Avatar } from "@material-ui/core";

export default function PromoListItem({ store, openPromo }) {
	const promoItems = [];
	const size = store.promos.length;
	for (let i = 0; i < size; i++) {
		promoItems.push(
			<div
				onClick={() => openPromo(store, i)}
				key={"Item" + store.storeId + "/" + i}
			>
				<div className="Buffer__20px" />
				<div className="Container__horizontal-padding-20px">
					<div className="Container__row">
						<p className="Text__medium--dark">
							{store.promos[i].promoName}
						</p>
						<p className="Text__arrow">{">"}</p>
					</div>
				</div>
				<div className="Buffer__20px" />
			</div>
		);
		if (i !== size - 1) {
			promoItems.push(<div className="Line" key={"line" + i} />);
		}
	}
	return (
		<div
			className="Container__horizontal-padding-20px"
			key={"Listing" + store.storeId}
		>
			<div className="Container__home-store-listing">
				<div className="Container__home-store-header Container__horizontal-padding-20px">
					<div className="Buffer__10px" />
					<div className="Container__row">
						<Avatar src="" />
						<div className="Buffer__20px" />
						<div className="Container__column">
							<p className="Text__medium--dark">
								{store.sellerName}
							</p>
							<div className="Buffer__5px" />
							<p className="Text__small--dark">
								{store.range} min
							</p>
						</div>
					</div>
					<div className="Buffer__10px" />
				</div>
				<div className="Line" />
				{promoItems}
			</div>

			<div className="Buffer__20px" />
		</div>
	);
}
