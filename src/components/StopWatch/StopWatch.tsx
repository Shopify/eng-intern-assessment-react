import React from "react";
import "./StopWatch.scss";
import "../StopWatchButton/StopWatchButton";
import StopWatchButton from "../StopWatchButton/StopWatchButton";

export default function StopWatch() {
	//Initialize lap array
	//define state variables to store: time(number) and isRunning (boolean) and startTime

	//define useEffect function to start a lap
	//initiate variable "intervalId: number"
	//if (isRunning) then use setInterval to increase time counter every millisecond
	//clear Interval
	//dependency of isRunning and time

	//calculate minutes, seconds, and milliseconds with Math.floor

	//Define a function Start
	//that changes isRunning to true
	//obtains date.now() updates startTime

	//Define a function Stop
	//that changes isRunning to false
	//obtains date.now()
	//define a variable intervalTime to be date.now() minus startTime
	//add intervalTime to laps array with [...laps, intervalTime]

	//define getLaps function
	//that iterates over lap array to display minutes, seconds, and ms of each item

	//define reset function
	//that updates setTime to 0

	return (
		<div>
			<div className="display__container">
				<div className="display__minutes"></div>
				<div className="display__seconds"></div>
				<div className="display__milliseconds"></div>
			</div>
			<div className="button-container">
				{/* Start/Stop button */}
				<StopWatchButton text={} className={} clickHandler={} />
				{/* Reset button */}
				<StopWatchButton text={} className={} clickHandler={} />
				{/* Lap button */}
				<StopWatchButton text={} className={} clickHandler={} />
			</div>
		</div>
	);
}
