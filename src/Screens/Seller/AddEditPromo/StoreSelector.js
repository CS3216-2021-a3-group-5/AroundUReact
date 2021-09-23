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
				<div className="Buffer__20px" />
				<div className="Container__row">
					<div className="Container__column">
						<p className="Text__medium--dark">{store.address}</p>
						<div className="Buffer__5px " />
						<p className="Text__small--dark">
							{store.opening_hours}
						</p>
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
				<div className="Buffer__20px" />
			</div>
		);
		if (i !== stores.length - 1) {
			storeItems.push(<div className="Line" key={"key" + i} />);
		}
	}

	return storeItems;
}
