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
			<div className="Container_promo-overlay">
				<div
					className="Image_promo-overlay"
					onClick={() => {
						openPromo(store, pageIndex);
					}}
				/>
				<div className="Container_padding-10px">
					<div
						onClick={() => {
							openPromo(store, pageIndex);
						}}
					>
						<p className="Text_large--dark">{store.sellerName}</p>
						<div className="Buffer_5px" />
						<p className="Text_medium--dark">{promo.promoName}</p>
						<div className="Buffer_5px" />
						<p className="Text_overlay-description">
							{promo.description}
						</p>
					</div>
					<div className="Buffer_5px" />
					<div className="Container_row">
						<NavigateBeforeRoundedIcon
							onClick={() => {
								if (viewingIndex > 0) {
									setViewingIndex(viewingIndex - 1);
								}
							}}
						/>
						<p className="Text_small--dark">
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
