import React, { useState, useEffect } from "react";
import "./StopWatch.scss";
import "../StopWatchButton/StopWatchButton";
import StopWatchButton from "../StopWatchButton/StopWatchButton";

export default function StopWatch() {
	// The time to be displayed
	const [time, setTime] = useState<number>(0);
	// The condition that starts & stop the timer
	const [isRunning, setIsRunning] = useState<boolean>(false);
	// Sets lap start time
	const [startTime, setStartTime] = useState<number | undefined>(undefined);
	// The condition for Laps component to be displayed
	const [isShowing, setIsShowing] = useState<boolean>(false);

	//Initialize lap array
	const [laps, setLaps] = useState<number[]>([]);

	// Changes the time displayed every 10ms when isRunning is true
	useEffect(() => {
		let intervalId: number | NodeJS.Timer;
		if (isRunning) {
			intervalId = setInterval(() => {
				setTime(time + 10);
			}, 10);
		}
		return () => clearInterval(intervalId);
	}, [isRunning, time]);

	//calculate hours, minutes, seconds, and milliseconds with Math.floor
	const hours: number = Math.floor(time / 3600000);
	const minutes: number = Math.floor((time % 3600000) / 60000);
	const seconds: number = Math.floor((time % 60000) / 1000);
	const milliseconds: number = Math.floor(time % 1000);

	// Starts the timer and retrieves start time in ms
	const startRunning = () => {
		setIsRunning(true);
		const getStartTime: number | DateConstructor = Date.now();
		console.log("START TIME: ", getStartTime);
		setStartTime(getStartTime);
	};

	// Stops timer, records stop time, and adds the duration of interval to laps array
	const stopRunning = () => {
		setIsRunning(false);
		const stopTime: number | DateConstructor = Date.now();
		console.log("STOP TIME: ", stopTime);
		const lapTime: number | DateConstructor = stopTime - startTime;
		console.log("LAP TIME: ", lapTime);
		setLaps([...laps, lapTime]);
	};

	//Toggles display for laps component
	const showLaps = () => {
		setIsShowing(!isShowing);
	};

	// Resets timer
	const resetTime = () => setTime(0);

	return (
		<div className="display">
			<div className="display__container">
				<div className="display__time">
					{hours.toString().padStart(2, "0")}:
				</div>
				<div className="display__time">
					{minutes.toString().padStart(2, "0")}:
				</div>
				<div className="display__time">
					{seconds.toString().padStart(2, "0")}:
				</div>
				<div className="display__time">
					{milliseconds.toString().slice(0, 2).padStart(2, "0")}
				</div>
			</div>
			<div className="button__container">
				{/* Start/Stop button - possibly make this an if stmt */}
				<StopWatchButton
					text={isRunning ? "STOP" : "START"}
					className={
						isRunning ? "button--stop" : "button--start"
					}
					clickHandler={isRunning ? stopRunning : startRunning}
				/>
				{/* Reset button */}
				<StopWatchButton
					text={"RESET"}
					className={"button--reset"}
					clickHandler={resetTime}
				/>
				{/* Lap button */}
				<StopWatchButton
					text={"LAPS"}
					className={"button--lap"}
					clickHandler={showLaps}
				/>
			</div>

			{isShowing && (
				<div className="laps">
					<h3 className="laps__title">LAPS</h3>
					{laps.map((lap, index) => {
						//calculate minutes, seconds, and milliseconds with Math.floor
						const milliseconds: number = Math.floor(
							lap % 1000
						);
						const seconds: number = Math.floor(
							(lap % 60000) / 1000
						);
						const minutes: number = Math.floor(
							(lap % 3600000) / 60000
						);
						const hours: number = Math.floor(lap / 3600000);

						return (
							<div key={index} className="laps__item">
								<p className="laps__label">
									LAP {index + 1}
								</p>
								<p className="laps__time">
									{hours === 0
										? ""
										: `${hours
												.toString()
												.padStart(
													2,
													"0"
												)}hrs `}
									{""}
									{minutes === 0
										? ""
										: `${minutes
												.toString()
												.padStart(
													2,
													"0"
												)} min `}{" "}
									{seconds === 0
										? ""
										: `${seconds
												.toString()
												.padStart(
													2,
													"0"
												)} sec `}{" "}
									{milliseconds
										.toString()
										.slice(0, 2)
										.padStart(2, "0")}{" "}
									ms
								</p>
							</div>
						);
					})}
				</div>
			)}
		</div>
	);
}
