import { useParams } from "react-router";
import { useEffect } from "react";

export default function ShareAdapter() {
	const { promotion_id } = useParams();

	useEffect(() => {
		// Pull promo from server and redirect to promo screen
	}, []);

	return (
		<div className="App Container__center--horizontal">
			<p className="Text__medium--dark">Loading Promo {promotion_id}</p>
		</div>
	);
}
