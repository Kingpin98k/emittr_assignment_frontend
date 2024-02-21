import { useDispatch, useSelector } from "react-redux";
import { closeLeaderBoard } from "../features/leaderboard/leaderboardSlice";

function Leaderboard() {
	const leaderboard = useSelector((state) => state.leaderboard);

	const dispatch = useDispatch();

	return (
		<div className="flex flex-col gap-4">
			<h2>Leaderboard</h2>
			<div className=" flex flex-col gap-[2rem] h-[25rem] w-[50rem] overflow-y-scroll text-[3rem] px-4">
				{leaderboard.leaderBoard.map((entry, index) => (
					<div key={index} className="flex justify-between border-b-2">
						<span>{entry.Member}</span>
						<span>{entry.Score}</span>
					</div>
				))}
			</div>
			<button
				className="btn bg-red-600 hover:bg-transparent"
				onClick={() => {
					dispatch(closeLeaderBoard());
				}}
			>
				Close
			</button>
		</div>
	);
}

export default Leaderboard;
