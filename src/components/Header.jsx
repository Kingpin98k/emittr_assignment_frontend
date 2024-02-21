import { useDispatch } from "react-redux";
import { getLeaderBoard } from "../features/leaderboard/leaderboardSlice";

function Header() {
	const dispatch = useDispatch();
	return (
		<header className="app-header">
			<div
				className="flex justify-center items-center cursor-pointer"
				onClick={() => {
					window.location.reload();
				}}
			>
				<img
					src="/svgs/logoCat.svg"
					className="h-[5rem] w-[3rem]"
					alt="Cat card"
				/>
				<h2 className="mb-0 text-[3rem]">Exploding Kittens</h2>
			</div>
			<div
				className="flex gap-3 text-[2rem] cursor-pointer ring-1 ring-white rounded-md px-3 hover:bg-orange-400 transition-all duration-200"
				onClick={() => dispatch(getLeaderBoard())}
			>
				Leaderboard
			</div>
		</header>
	);
}

export default Header;
