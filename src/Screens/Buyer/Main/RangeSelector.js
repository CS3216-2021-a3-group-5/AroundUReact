import { TextField, MenuItem } from "@material-ui/core";

export default function RangeSelector({ range, setRange }) {
	return (
		<TextField
			fullWidth
			select
			label="Range"
			variant="outlined"
			value={range}
			onChange={(event) => setRange(event.target.value)}
		>
			{RangeItems()}
		</TextField>
	);
}

function RangeItems() {
	return [
		<MenuItem key="5" value={5}>
			≤5 mins
		</MenuItem>,
		<MenuItem key="10" value={10}>
			≤10 mins
		</MenuItem>,
		<MenuItem key="15" value={15}>
			≤15 mins
		</MenuItem>,
	];
}
