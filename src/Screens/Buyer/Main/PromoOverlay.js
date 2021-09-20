import { Overlay } from "pigeon-maps";
import NavigateBeforeRoundedIcon from "@material-ui/icons/NavigateBeforeRounded";
import NavigateNextRoundedIcon from "@material-ui/icons/NavigateNextRounded";

export default function PromoOverlay({
	store,
	viewingIndex,
	setViewingIndex,
	openPromo,
}) {
	if (store.promos.length < 1) return;
	var pageIndex = Math.min(store.promos.length - 1, viewingIndex);
	const promo = store.promos[pageIndex];
	return (
		<Overlay
			anchor={[store.latitude, store.longtitude]}
			offset={[15, 310]}
			key={store.storeId + "overlay"}
		>
			<div className="Container__promo-overlay">
				<div
					className="Image__promo-overlay"
					onClick={() => {
						openPromo(store, pageIndex);
					}}
				/>
				<div className="Container__padding-10px">
					<div
						onClick={() => {
							openPromo(store, pageIndex);
						}}
					>
						<p className="Text__large--dark">{store.sellerName}</p>
						<div className="Buffer__5px" />
						<p className="Text__medium--dark">{promo.promo_name}</p>
						<div className="Buffer__5px" />
						<p className="Text__overlay-details">{promo.details}</p>
					</div>
					<div className="Buffer__5px" />
					<div className="Container__row">
						<NavigateBeforeRoundedIcon
							onClick={() => {
								if (viewingIndex > 0) {
									setViewingIndex(viewingIndex - 1);
								}
							}}
						/>
						<p className="Text__small--dark">
							{pageIndex + 1} / {store.promos.length}
						</p>
						<NavigateNextRoundedIcon
							onClick={() => {
								if (viewingIndex < store.promos.length - 1) {
									setViewingIndex(viewingIndex + 1);
								}
							}}
						/>
					</div>
				</div>
			</div>
		</Overlay>
	);
}
