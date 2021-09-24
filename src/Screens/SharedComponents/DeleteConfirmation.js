export default function DeleteConfirmation({ setShowPopup, confirmDelete }) {
	return (
		<div
			className="Container__darken-background"
			onClick={() => setShowPopup(false)}
		>
			<div
				className="Container__popup--small Container__center--horizontal"
				onClick={(event) => {
					event.stopPropagation();
				}}
			>
				<div className="Buffer__20px" />
				<p className="Text__medium--dark-multiline">
					Are you sure you want to delete?
				</p>
				<div className="Buffer__20px" />
				<div className="Line" />
				<div className="Container__row">
					<div
						className="Toggle__halfwidth--left"
						onClick={() => setShowPopup(false)}
					>
						<p className="Text__medium--dark-multiline">Cancel</p>
					</div>
					<div className="Line--vertical" />
					<div
						className="Toggle__halfwidth--right"
						onClick={() => {
							setShowPopup(false);
							confirmDelete();
						}}
					>
						<p className="Text__medium--dark-multiline">Confirm</p>
					</div>
				</div>
			</div>
		</div>
	);
}
