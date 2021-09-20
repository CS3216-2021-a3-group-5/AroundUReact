import { Categories } from "../../constants";

export const testData = [
	{
		store_id: 1,
		address: "21 Choa Chu Kang North 6, 01-44, Singapore 689578",
		location: {
			lat: 1.39704710723121,
			lon: 103.74685004621115
		},
		company_name: "Urban Mobile Yew Tee Point",
		category_name: Categories.ELECTRONICS,
		opening_hours: "10am to 9pm daily",
		range: 1,
		promotions: [
			{
				promotion_id: 1,
				promo_name: "5% Off Repairs",
				end_date: "2021-09-30T00:00:00.000Z",
				details: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Volutpat maecenas volutpat blandit aliquam etiam erat velit scelerisque. Elit at imperdiet dui accumsan. Scelerisque eu ultrices vitae auctor eu augue. Lobortis elementum nibh tellus molestie nunc non. Habitasse platea dictumst vestibulum rhoncus est. A iaculis at erat pellentesque adipiscing commodo elit. Id diam maecenas ultricies mi eget mauris. Lectus arcu bibendum at varius vel pharetra vel turpis nunc. Ullamcorper morbi tincidunt ornare massa eget.",
				storeIDs: [1],
			}
		],
	},
	{
		store_id: 2,
		address: "21 Choa Chu Kang North 6, 01-52/53, Singapore 689578",
		location: {
			lat: 1.3971495932986484,
			lon: 103.74678804883916
		},
		company_name: "Mr Bean - Yew Tee Point",
		category_name: Categories.FOOD,
		opening_hours: "6:30am to 10pm daily",
		range: 1,
		promotions: [
			{
				promotion_id: 1,
				promo_name: "1-for-1 Ice-cream",
				end_date: "2021-10-15T00:00:00.000Z",
				details: "Valid for selected branches only. Ice-cream is only available after 12pm.",
				storeIDs: [2],
			}
		],
	},
	{
		store_id: 3,
		address: "21 Choa Chu Kang North 6, 01-12, Singapore 689578",
		location: {
			lat: 1.397094046274386,
			lon: 103.74653991145861
		},
		company_name: "Yew Mei Fashion",
		category_name: Categories.FASHION,
		opening_hours: "10am to 9pm",
		range: 2,
		promotions: [
			{
				promotion_id: 1,
				promo_name: "Closing down sale",
				end_date: "2021-09-17T00:00:00.000Z",
				details: "Up to 80% off! Dress, shoes and more, lowest price you will find in Singapore.",
				storeIDs: [3],
			},
			{
				promotion_id: 2,
				promo_name: "Internation shoe day sale",
				end_date: "2021-09-18T00:00:00.000Z",
				details: "Buy one get one free for all shoes!",
				storeIDs: [3,10],
			}
		],
	},
	{
		store_id: 4,
		address: "21 Choa Chu Kang North 6, 01-15, Singapore 689578",
		location: {
			lat: 1.3969344285658285,
			lon: 103.74649961997056
		},
		company_name: "Kousei Foot Reflexology",
		category_name: Categories.WELLNESS,
		opening_hours: "10am to 10pm daily",
		range: 3,
		promotions: [
			{
				promotion_id: 1,
				promo_name: "Up to 10% off all packages.",
				end_date: "2021-10-12T00:00:00.000Z",
				details: "8% off all foot reflexology packages, 10% off fish foot spa packages, minimum spend $200.",
				storeIDs: [4],
			}
		],
	},
];
