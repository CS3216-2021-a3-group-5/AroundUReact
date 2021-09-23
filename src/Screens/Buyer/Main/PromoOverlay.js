import { Overlay } from "pigeon-maps";
import NavigateBeforeRoundedIcon from "@material-ui/icons/NavigateBeforeRounded";
import NavigateNextRoundedIcon from "@material-ui/icons/NavigateNextRounded";

export default function PromoOverlay({
	store,
	viewingIndex,
	setViewingIndex,
	openPromo,
	image,
}) {
	if (store.promotions.length < 1) return;
	var pageIndex = Math.min(store.promotions.length - 1, viewingIndex);
	const promo = store.promotions[pageIndex];

	return (
		<Overlay
			anchor={[store.location.lat, store.location.lon]}
			offset={[15, 310]}
			key={store.storeId + "overlay"}
		>
			<div className="Container__promo-overlay">
				<img
					className="Image__promo-overlay"
					src={image}
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
						<p className="Text__large--dark">
							{store.company_name}
						</p>
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
							{pageIndex + 1} / {store.promotions.length}
						</p>
						<NavigateNextRoundedIcon
							onClick={() => {
								if (
									viewingIndex <
									store.promotions.length - 1
								) {
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
