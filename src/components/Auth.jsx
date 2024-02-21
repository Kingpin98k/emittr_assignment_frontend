import { useState } from "react";
import { useDispatch } from "react-redux";
import { getCurrentGame } from "../features/game/gameSlice";

function Auth() {
	const [email, setEmail] = useState("");

	const dispatch = useDispatch();

	function handleAuth(e) {
		e.preventDefault();

		dispatch(getCurrentGame(email));

		setEmail("");
	}

	return (
		<div className="auth h-full">
			<form
				onSubmit={handleAuth}
				className="min-w-md w-[25rem] h-[10rem] mx-auto p-4 rounded-lg shadow-md flex flex-col flex-nowrap items-center justify-between"
			>
				<input
					type="email"
					placeholder="Give your email to start the game"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					className="block w-full px-4 py-2 border rounded-md mb-4 focus:outline-none bg-inherit text-white font-semibold"
				/>
				<button
					type="submit"
					className="w-full transition-all duration-300 bg-theme text-white py-2 px-4 rounded-md hover:bg-accent focus:outline-none hover:bg-green-500"
				>
					Start Game
				</button>
			</form>
		</div>
	);
}

export default Auth;
