import { useParams } from "react-router";
import { useHistory } from "react-router";
import { API_URL, STORE_FROM_ID } from "../../../constants";
import { useEffect } from "react";

export default function ShareAdapter() {
	const history = useHistory();
	const { ids } = useParams();
	const splitIds = ids.split("&");

	useEffect(() => {
		getValue();
	}, []);

	async function getValue() {
		try {
			const response = await fetch(
				API_URL + STORE_FROM_ID + splitIds[0],
				{
					method: "GET",
				}
			);
			const result = await response.json();
			console.log(result);
			const position = result.stores.promotions.findIndex(
				(promo) => promo.promotion_id == parseInt(splitIds[1])
			);
			if (position === -1) {
				throw "";
			}
			var store = result.stores;
			history.push("/promo/", { store, position });
		} catch {
			history.replace("/");
		}
	}

	return (
		<div className="App Container__center--horizontal">
			<p className="Text__medium--dark">Loading Promo</p>
		</div>
	);
}
