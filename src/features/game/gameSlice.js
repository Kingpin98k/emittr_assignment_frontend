/*eslint-disable*/
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
const initialState = {
	pointer: -1,
	email: "",
	currentHighScore: 0,
	/*
		loading => currentGame is being fetched from the server
		playing => currentGame is ready to be played
		error => there was an error fetching the currentGame
		ready => the game is ready to be played
		finished => the game is over
	*/
	gameState: "auth",
	cardState: "loaded",
	topCard: "start",
	deffuseCards: 0,
	bombCards: 0,
};

const API = import.meta.env.VITE_API;

export const drawCard = createAsyncThunk("game/drawCard", async (email) => {
	const response = await fetch(`${API}/drawCard/${email}`, {
		method: "POST",
	});
	const data = await response.json();
	return data;
});

export const startGame = createAsyncThunk("game/startGame", async (email) => {
	const response = await fetch(`${API}/startGame/${email}`, {
		method: "POST",
	});
	const data = await response.json();
	return data;
});

export const getCurrentGame = createAsyncThunk(
	"game/getCurrentGame",
	async (email) => {
		const response = await fetch(`${API}/currentGame/${email}`, {
			method: "GET",
		});
		const data = await response.json();
		return data;
	}
);

const gameSlice = createSlice({
	name: "game",
	initialState,
	reducers: {
		analyzeGame: (state) => {
			if (state.deffuseCards < 0) {
				state.gameState = "finished";
			}
		},
		resumeGame: (state) => {
			state.gameState = "playing";
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(getCurrentGame.fulfilled, (state, action) => {
				state.pointer = action.payload.pointer;
				state.deffuseCards =
					action.payload.deffuseCards - action.payload.bombCards;
				state.email = action.payload.email;
				state.topCard = action.payload.topCard;
				state.currentHighScore = action.payload.currentHighScore;
				state.gameState = state.pointer === -2 ? "finished" : "ready";
			})
			.addCase(getCurrentGame.rejected, (state, action) => {
				if (action.error.message === "nil") {
					state.gameState = "ready";
				} else {
					state.gameState = "error";
				}
			})
			.addCase(getCurrentGame.pending, (state) => {
				state.gameState = "loading";
			})
			.addCase(startGame.fulfilled, (state, action) => {
				state.pointer = action.payload.pointer;
				state.deffuseCards =
					action.payload.deffuseCards - action.payload.bombCards;
				state.email = action.payload.email;
				state.topCard = action.payload.topCard;
				state.currentHighScore = action.payload.currentHighScore;
				state.gameState = "playing";
			})
			.addCase(startGame.rejected, (state) => {
				state.gameState = "error";
			})
			.addCase(startGame.pending, (state) => {
				state.gameState = "loading";
			})
			.addCase(drawCard.fulfilled, (state, action) => {
				state.pointer = action.payload.pointer;
				state.topCard = action.payload.topCard;
				state.gameState = state.pointer === -2 ? "finished" : "playing";
				state.deffuseCards =
					action.payload.deffuseCards - action.payload.bombCards;
				state.currentHighScore = action.payload.currentHighScore;
				state.cardState = "loaded";
			})
			.addCase(drawCard.rejected, (state) => {
				state.gameState = "error";
			})
			.addCase(drawCard.pending, (state) => {
				state.cardState = "loading";
			});
	},
});

export const { resumeGame, analyzeGame } = gameSlice.actions;

export default gameSlice.reducer;
