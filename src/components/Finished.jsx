import { useDispatch, useSelector } from "react-redux";
import { startGame } from "../features/game/gameSlice";

function Finished() {
	const game = useSelector((state) => state.game);

	const dispatch = useDispatch();

	function handleReset() {
		dispatch(startGame(game.email));
	}

	return (
		<div className="flex flex-col gap-4">
			<div>
				<h2>
					{game.bombCards <= game.deffuseCards
						? "Yey you won the game !"
						: "You lost, try again !"}
				</h2>
				<button
					className="btn bg-sky-500 hover:bg-transparent"
					onClick={handleReset}
				>
					New Game
				</button>
			</div>
			<div>
				<h3>Email: {game.email}</h3>
				<h3>High Score: {game.currentHighScore}</h3>
			</div>
		</div>
	);
}

export default Finished;
