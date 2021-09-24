import {
	API_URL,
	USER_STORE_INFO,
	USER_PROMOTION_INFO,
	USER_INFO,
} from "../../constants";

export async function getSellerContent() {
	if (localStorage.getItem("accessToken") === null) return;
	await getPromotions();
	await getStores();
	await getProfile();
}

export async function getPromotions() {
	const rawResponse = await fetch(API_URL + USER_PROMOTION_INFO, {
		method: "GET",
		headers: {
			Authorization: localStorage.getItem("accessToken"),
		},
	});
	const content = await rawResponse.json();
	const stringedJson = JSON.stringify(content.promotions);
	if (rawResponse.status === 200) {
		localStorage.setItem("promos", stringedJson);
	}
}

export async function getStores() {
	const rawResponse = await fetch(API_URL + USER_STORE_INFO, {
		method: "GET",
		headers: {
			Authorization: localStorage.getItem("accessToken"),
		},
	});
	const content = await rawResponse.json();
	const stringedJson = JSON.stringify(content.stores);
	if (rawResponse.status === 200) {
		localStorage.setItem("stores", stringedJson);
	}
}

export async function getProfile() {
	const rawResponse = await fetch(API_URL + USER_INFO, {
		method: "GET",
		headers: {
			Authorization: localStorage.getItem("accessToken"),
		},
	});
	const content = await rawResponse.json();
	if (rawResponse.status === 200) {
		const newProfile = {
			email: content.email,
			category: content.category,
			company_name: content.company_name,
			contact_number: content.contact_number,
		};
		localStorage.setItem("profile", JSON.stringify(newProfile));
	}
}
