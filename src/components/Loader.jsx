export default function Loader() {
	//This is the loader component that is rendered when the status is loading
	return (
		<div className="loader-container flex justify-center items-center">
			<div className="loader"></div>
			<p>
				<span>
					<img src="svgs/logoCat.svg" alt="Loader" />
				</span>
				Fetching Game...
			</p>
		</div>
	);
}
