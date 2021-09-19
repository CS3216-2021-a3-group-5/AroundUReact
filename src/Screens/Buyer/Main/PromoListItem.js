import { Avatar } from "@material-ui/core";

export default function PromoListItem({ store, openPromo }) {
	const promoItems = [];
	for (let i = 0; i < store.promos.length; i++) {
		promoItems.push(
			<div onClick={() => openPromo(store, i)}>
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
				<div className="Line" />
			</div>
		);
	}
	return (
		<div key={"Listing" + store.storeId}>
			<div className="Container__home-store-listing Container__horizontal-padding-20px">
				<div className="Buffer__20px" />
				<div className="Container__row">
					<Avatar src="" />
					<div className="Buffer__20px" />
					<div className="Container__column">
						<p className="Text__large--dark">{store.sellerName}</p>
						<p className="Text__medium--dark">{store.range} min</p>
					</div>
				</div>
				<div className="Buffer__20px" />
			</div>
			<div className="Line" />
			{promoItems}
		</div>
	);
}
