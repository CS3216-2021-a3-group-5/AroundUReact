import { Categories } from "../../constants";

export const testData = [
	{
		latitude: 1.39704710723121,
		longtitude: 103.74685004621115,
		address: "21 Choa Chu Kang North 6, 01-44, Singapore 689578",
		sellerName: "Urban Mobile Yew Tee Point",
		storeId: 1,
		openingHours: "10:30am to 9pm daily",
		category: Categories.ELECTRONICS,
		range: 6,
		endDate: Date(),
		promos: [
			{
				promotion_id: 1,
				promo_name: "5% Off Repairs",
				details:
					"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Volutpat maecenas volutpat blandit aliquam etiam erat velit scelerisque. Elit at imperdiet dui accumsan. Scelerisque eu ultrices vitae auctor eu augue. Lobortis elementum nibh tellus molestie nunc non. Habitasse platea dictumst vestibulum rhoncus est. A iaculis at erat pellentesque adipiscing commodo elit. Id diam maecenas ultricies mi eget mauris. Lectus arcu bibendum at varius vel pharetra vel turpis nunc. Ullamcorper morbi tincidunt ornare massa eget.",
			},
		],
	},
	{
		latitude: 1.3971495932986484,
		longtitude: 103.74678804883916,
		address: "21 Choa Chu Kang North 6, 01-52/53, Singapore 689578",
		sellerName: "Mr Bean - Yew Tee Point",
		storeId: 2,
		openingHours: "6:30am to 10pm daily",
		category: Categories.FOOD,
		range: 1,
		endDate: Date(),
		promos: [
			{
				promotion_id: 1,
				promo_name: "1-for-1 Ice-cream",
				details:
					"Valid for selected branches only. Ice-cream is only available after 12pm.",
			},
		],
	},
	{
		latitude: 1.397094046274386,
		longtitude: 103.74653991145861,
		address: "21 Choa Chu Kang North 6, 01-12, Singapore 689578",
		sellerName: "Yew Mei Fashion",
		storeId: 3,
		openingHours: "10am to 9pm",
		category: Categories.FASHION,
		range: 2,
		endDate: Date(),
		promos: [
			{
				promotion_id: 1,
				promo_name: "Closing down sale",
				details:
					"Up to 80% off! Dress, shoes and more, lowest price you will find in Singapore.",
			},
			{
				promotion_id: 2,
				promo_name: "Internation shoe day sale",
				details: "Buy one get one free for all shoes!",
			},
		],
	},
	{
		latitude: 1.3969344285658285,
		longtitude: 103.74649961997056,
		address: "21 Choa Chu Kang North 6, 01-15, Singapore 689578",
		sellerName: "Kousei Foot Reflexology",
		storeId: 4,
		openingHours: "10am to 10pm daily",
		category: Categories.WELLNESS,
		range: 3,
		endDate: Date(),
		promos: [
			{
				promotion_id: 1,
				promo_name: "Up to 10% off all packages.",
				details:
					"8% off all foot reflexology packages, 10% off fish foot spa packages, minimum spend $200.",
			},
		],
	},
];
