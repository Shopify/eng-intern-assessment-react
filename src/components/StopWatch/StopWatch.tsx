import React from "react";
import "./StopWatch.scss";
import "../StopWatchButton/StopWatchButton";
import StopWatchButton from "../StopWatchButton/StopWatchButton";

export default function StopWatch() {
	// display time elapsed
	// display laps when the user clicks the lap button

	return (
		<div>
			<div className="display-container">
				<div></div>
			</div>
			<div className="button-container">
				{/* Start/Stop button */}
				<StopWatchButton />
				{/* Reset button */}
				<StopWatchButton />
				{/* Lap button */}
				<StopWatchButton />
			</div>
		</div>
	);
}
