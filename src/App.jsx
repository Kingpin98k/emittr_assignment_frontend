import { useSelector } from "react-redux";
import Header from "./components/Header";
import Main from "./components/Main";
import Auth from "./components/Auth";
import Loader from "./components/Loader";
import Error from "./components/Error";
import Game from "./components/Game";
import Ready from "./components/Ready";
import Finished from "./components/Finished";
import Leaderboard from "./components/Leaderboard";

function App() {
	const game = useSelector((store) => store.game);
	const leaderBoard = useSelector((store) => store.leaderboard);

	return (
		<div className="app">
			<Header />
			{leaderBoard.state === "show" ? (
				<Leaderboard />
			) : (
				<Main>
					{game.gameState === "auth" && <Auth />}
					{game.gameState === "loading" && <Loader />}
					{game.gameState === "error" && <Error />}
					{game.gameState === "playing" && <Game />}
					{game.gameState === "ready" && <Ready />}
					{game.gameState === "finished" && <Finished />}
				</Main>
			)}
		</div>
	);
}

export default App;
