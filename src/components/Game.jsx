import { useDispatch, useSelector } from "react-redux";
import { analyzeGame, drawCard, startGame } from "../features/game/gameSlice";
import Loader from "./Loader";
import { useEffect, useState } from "react";

function Game() {
	const game = useSelector((store) => store.game);
	const dispatch = useDispatch();
	const card = game.topCard;
	const [show, setShow] = useState(true);

	useEffect(() => {
		const timeoutId = setTimeout(() => {
			setShow(true);
			dispatch(analyzeGame());
		}, 300);

		setShow(false);

		return () => clearTimeout(timeoutId);
	}, [card, dispatch, game.pointer]);

	function handleDraw() {
		dispatch(drawCard(game.email));
	}

	function handleRestart() {
		dispatch(startGame(game.email));
	}

	return (
		<div className="game w-full h-full flex justify-around items-center">
			<div className="max-h-full flex justify-center items-center">
				<div className="shadow-md py-[2rem] px-[2rem] diffuse flex flex-col items-center">
					<h2 className="text-[1.5rem]">Deffuse Cards</h2>
					<img
						src="svgs/defuseCard.svg"
						className=" h-[8rem] w-[8rem]"
						alt="defuse"
					/>
					<h3 className="mb-0">
						{game.deffuseCards > 0 ? game.deffuseCards : "0"}
					</h3>
				</div>
			</div>
			<div className="card_container flex-1 flex justify-center items-center">
				<div className="card">
					{game.cardState === "loading" ? (
						<Loader />
					) : card === "start" ? (
						<h3>Start Game</h3>
					) : (
						<>
							<img src={`svgs/${card}Card.svg`} alt={card} />
							<h3>{card}</h3>
						</>
					)}
				</div>
				<div className="btn_grp flex flex-col justify-center items-center gap-[2rem]">
					<button
						className="btn min-w-[20rem]  bg-[#1098ad] disabled:bg-transparent"
						onClick={handleDraw}
						disabled={!show || game.topCard === "shuffle"}
					>
						{game.pointer < 4 ? "Draw" : "Finish"}
					</button>
					<button
						className="btn min-w-[20rem] bg-green-500 disabled:bg-transparent"
						onClick={handleRestart}
						disabled={game.topCard !== "shuffle"}
					>
						Reshuffle
					</button>
					<button
						className="btn min-w-[20rem] bg-[#ffa94d] disabled:bg-transparent"
						onClick={handleRestart}
					>
						Restart
					</button>
				</div>
			</div>
		</div>
	);
}

export default Game;
