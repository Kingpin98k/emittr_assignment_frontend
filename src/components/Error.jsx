function Error() {
	return (
		<div className="">
			<h2>Game could not be continued due to an error</h2>
			<button
				className="btn bg-red-500 hover:bg-transparent"
				onClick={() => {
					window.location.reload();
				}}
			>
				Go Back
			</button>
		</div>
	);
}

export default Error;
