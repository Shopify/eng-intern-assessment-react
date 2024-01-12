import React from "react";
import StopWatch from "./StopWatch";
import "./index.css";

export default function App() {
	return (
		<div className="flex flex-col items-center pt-60 h-svh w-full">
			<StopWatch />
		</div>
	);
}
