import { configureStore } from "@reduxjs/toolkit";
import gameReducer from "./features/game/gameSlice";
import leaderboardReducer from "./features/leaderboard/leaderboardSlice";

const store = configureStore({
	reducer: {
		game: gameReducer,
		leaderboard: leaderboardReducer,
	},
});

export default store;
