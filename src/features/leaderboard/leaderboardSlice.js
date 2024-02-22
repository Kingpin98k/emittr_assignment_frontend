import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
	leaderBoard: [],
	state: "hide",
};

const API = import.meta.env.VITE_API;

export const getLeaderBoard = createAsyncThunk(
	"game/getLeaderBoard",
	async () => {
		const response = await fetch(`${API}/leaderboard`, {
			method: "GET",
		});
		const data = await response.json();
		return data;
	}
);

const leaderboardSlice = createSlice({
	name: "leaderboard",
	initialState,
	reducers: {
		closeLeaderBoard: (state) => {
			state.state = "hide";
		},
		openLeaderBoard: (state) => {
			state.state = "show";
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(getLeaderBoard.fulfilled, (state, action) => {
				state.leaderBoard = action.payload;
				state.state = "show";
			})
			.addCase(getLeaderBoard.rejected, (state) => {
				state.gameState = "error";
			})
			.addCase(getLeaderBoard.pending, (state) => {
				state.gameState = "loading";
			});
	},
});

export const { closeLeaderBoard, openLeaderBoard } = leaderboardSlice.actions;

export default leaderboardSlice.reducer;
