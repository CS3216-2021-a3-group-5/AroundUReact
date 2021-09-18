import Checkbox from "@material-ui/core/Checkbox";

export default function StoreSelector({
	stores,
	selectedStoreIds,
	setSelectedStoreIds,
}) {
	const storeItems = [];
	for (let i = 0; i < stores.length; i++) {
		const store = stores[i];
		storeItems.push(
			<div key={store.storeId}>
				<div className="Buffer_20px" />

				<div className="Container_row">
					<div className="Container_column">
						<p className="Text_medium--dark">{store.address}</p>
						<div className="Buffer_5px " />
						<p className="Text_small--dark">{store.openingHours}</p>
					</div>
					<Checkbox
						defaultChecked={selectedStoreIds[i]}
						color="primary"
						onChange={(event) => {
							const updatedArray = selectedStoreIds;
							updatedArray[i] = event.target.checked;
							setSelectedStoreIds(updatedArray);
						}}
						key={"checkbox" + store.storeId}
					/>
				</div>
				<div className="Buffer_20px" />
			</div>
		);
		if (i != stores.length - 1) {
			storeItems.push(<div className="Line" key={"key" + i} />);
		}
	}

	return storeItems;
}
