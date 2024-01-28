import React, { useState, useEffect } from "react";
import "./StopWatch.scss";
import "../StopWatchButton/StopWatchButton";
import StopWatchButton from "../StopWatchButton/StopWatchButton";

export default function StopWatch() {
	//define state variables to store: time(number) and isRunning (boolean) and startTime
	const [time, setTime] = useState<number>(0);
	const [isRunning, setIsRunning] = useState<boolean>(false);
	const [startTime, setStartTime] = useState<number | undefined>(undefined);
	//Initialize lap array
	let laps: number[] = [];

	//define useEffect function to start a lap
	//initiate variable "intervalId: number"
	//if (isRunning) then use setInterval to increase time counter every millisecond
	//clear Interval
	//dependency of isRunning and time
	useEffect(() => {
		let intervalId: number | NodeJS.Timer;
		if (isRunning) {
			intervalId = setInterval(() => {
				setTime(time + 10);
			}, 10);
		}
		return () => clearInterval(intervalId);
	}, [isRunning, time]);

	//calculate minutes, seconds, and milliseconds with Math.floor
	const hours: number = Math.floor(time / 3600000);
	const minutes: number = Math.floor((time % 3600000) / 60000);
	const seconds: number = Math.floor((time % 60000) / 1000);
	const milliseconds: number = Math.floor(time % 1000);

	//Define a function Start
	//that changes isRunning to true
	//obtains date.now() updates startTime
	const startRunning = () => {
		setIsRunning(true);
		const getStartTime: number | DateConstructor = Date.now();
		console.log(getStartTime);
		setStartTime(getStartTime);
	};

	//Define a function Stop
	//that changes isRunning to false
	//obtains date.now()
	//define a variable intervalTime to be date.now() minus startTime
	//add intervalTime to laps array with [...laps, intervalTime]

	const stopRunning = () => {
		setIsRunning(false);
		const stopTime: number | DateConstructor = Date.now();
		console.log(stopTime);
		const lapTime: number | DateConstructor = stopTime - startTime;
		laps = [...laps, lapTime];
	};

	//define getLaps function
	//that iterates over lap array to display minutes, seconds, and ms of each item
	const showLaps = () => {
		laps.map((lap) => {
			return (
				<>
					<div>LAPS</div>
				</>
			);
		});
	};

	//define reset function
	//that updates setTime to 0
	const resetTime = () => setTime(0);

	return (
		<div className="display">
			<div className="display__container">
				<p className="display__time">
					{hours}:{minutes.toString().padStart(2, "0")}:
					{seconds.toString().padStart(2, "0")}:
					{milliseconds.toString().slice(0, 2).padStart(2, "0")}
				</p>

				{/* <div className="display__time">{hours}</div>
				<span>:</span>
				<div className="display__time">{minutes}</div>
				<span>:</span>
				<div className="display__time">{seconds}</div>
				<span>:</span>
				<div className="display__time">{milliseconds}</div> */}
			</div>
			<div className="button__container">
				{/* Start/Stop button - possibly make this an if stmt */}
				<StopWatchButton
					text={isRunning ? "Stop" : "Start"}
					className={
						isRunning ? "button--stop" : "button--start"
					}
					clickHandler={isRunning ? stopRunning : startRunning}
				/>
				{/* Reset button */}
				<StopWatchButton
					text={"Reset"}
					className={"button--reset"}
					clickHandler={resetTime}
				/>
				{/* Lap button */}
				<StopWatchButton
					text={"Lap"}
					className={"button--lap"}
					clickHandler={showLaps}
				/>
			</div>
		</div>
	);
}
