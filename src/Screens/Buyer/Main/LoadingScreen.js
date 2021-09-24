import { CircularProgress } from "@material-ui/core";

export default function LoadingScreen() {
	return (
		<div className="Container__darken-background Container__horizontal-padding-20px">
			<p className="Text__medium--light">
				Please wait while we search for deals AroundU
			</p>
			<div className="Buffer__20px" />
			<CircularProgress />
		</div>
	);
}
