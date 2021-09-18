import { Avatar } from "@material-ui/core";

export default function PromoListItem({ store, openPromo }) {
	const promoItems = [];
	for (let i = 0; i < store.promos.length; i++) {
		promoItems.push(
			<div onClick={() => openPromo(store, i)}>
				<div className="Buffer_20px" />
				<div className="Container_horizontal-padding-20px">
					<div className="Container_row">
						<p className="Text_medium--dark">
							{store.promos[i].promoName}
						</p>
						<p className="Text_arrow">{">"}</p>
					</div>
				</div>
				<div className="Buffer_20px" />
				<div className="Line" />
			</div>
		);
	}
	return (
		<div key={"Listing" + store.storeId}>
			<div className="Container_home-store-listing Container_horizontal-padding-20px">
				<div className="Buffer_20px" />
				<div className="Container_row">
					<Avatar src="" />
					<div className="Buffer_20px" />
					<div className="Container_column">
						<p className="Text_large--dark">{store.sellerName}</p>
						<p className="Text_medium--dark">{store.range} min</p>
					</div>
				</div>
				<div className="Buffer_20px" />
			</div>
			<div className="Line" />
			{promoItems}
		</div>
	);
}
