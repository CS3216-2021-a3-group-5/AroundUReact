import { Overlay } from "pigeon-maps";
import { Categories } from "../../../constants";

import IndicatorSelected from "../../../assets/Indicator_Selected.png";
import IndicatorFood from "../../../assets/Indicator_Food.png";
import IndicatorFashion from "../../../assets/Indicator_Fashion.png";
import IndicatorElectronics from "../../../assets/Indicator_Electronics.png";
import IndicatorBeautyWellness from "../../../assets/Indicator_Beauty_Wellness.png";
import IndicatorOthers from "../../../assets/Indicator_Others.png";

export default function Indicator({
	promo,
	setViewingIndex,
	getOverlayImage,
	setSelectedId,
	isSelected,
}) {
	return (
		<Overlay
			anchor={[promo.location.lat, promo.location.lon]}
			offset={[15, 45]}
			key={promo.store_id}
		>
			<img
				src={
					isSelected
						? IndicatorSelected
						: getIndicatorIcon(promo.category_name)
				}
				alt={"Store Indicator: " + promo.category_name}
				className="Indicator__promo"
				onClick={() => {
					setViewingIndex(0);
					setSelectedId(isSelected ? -1 : promo.store_id);
					getOverlayImage(
						isSelected ? null : promo.promotions[0].promotion_id
					);
				}}
			/>
		</Overlay>
	);
}

function getIndicatorIcon(category) {
	switch (category) {
		case Categories.FOOD:
			return IndicatorFood;
		case Categories.FASHION:
			return IndicatorFashion;
		case Categories.ELECTRONICS:
			return IndicatorElectronics;
		case Categories.WELLNESS:
			return IndicatorBeautyWellness;
		default:
			return IndicatorOthers;
	}
}
