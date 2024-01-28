import React from "react";
import StopWatch from "./components/StopWatch/StopWatch";
import "./App.scss";

export default function App() {
	return (
		<div className="main">
			<header className="main__header">
				<h1>STOPWATCH</h1>
			</header>
			<StopWatch />
			<footer className="main__footer">Danielle Leung 2024</footer>
		</div>
	);
}
