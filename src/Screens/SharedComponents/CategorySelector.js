import { TextField, MenuItem } from "@material-ui/core";
import { Categories } from "../../constants";

export default function CategorySelector({
	category,
	setCategory,
	includeAll,
}) {
	return (
		<TextField
			fullWidth
			select
			label="Category"
			variant="outlined"
			value={category}
			onChange={(event) => setCategory(event.target.value)}
		>
			{includeAll
				? [
						<MenuItem key="all" value={"all"}>
							All
						</MenuItem>,
						CategoryItems(),
				  ]
				: CategoryItems()}
		</TextField>
	);
}

function CategoryItems() {
	return [
		<MenuItem key={Categories.WELLNESS} value={Categories.WELLNESS}>
			{Categories.WELLNESS}
		</MenuItem>,
		<MenuItem key={Categories.ELECTRONICS} value={Categories.ELECTRONICS}>
			{Categories.ELECTRONICS}
		</MenuItem>,
		<MenuItem key={Categories.FASHION} value={Categories.FASHION}>
			{Categories.FASHION}
		</MenuItem>,
		<MenuItem key={Categories.FOOD} value={Categories.FOOD}>
			{Categories.FOOD}
		</MenuItem>,
		<MenuItem key={Categories.OTHERS} value={Categories.OTHERS}>
			{Categories.OTHERS}
		</MenuItem>,
	];
}
