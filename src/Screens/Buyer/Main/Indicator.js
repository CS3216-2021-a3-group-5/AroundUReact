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
	setSelectedId,
	isSelected,
}) {
	return (
		<Overlay
			anchor={[promo.latitude, promo.longtitude]}
			offset={[15, 45]}
			key={promo.storeId}
		>
			<img
				src={
					isSelected
						? IndicatorSelected
						: getIndicatorIcon(promo.category)
				}
				alt={"Store Indicator: " + promo.category}
				className="Indicator__promo"
				onClick={() => {
					setViewingIndex(0);
					setSelectedId(isSelected ? -1 : promo.storeId);
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
