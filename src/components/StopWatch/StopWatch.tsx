import React, { useState, useEffect } from "react";
import "./StopWatch.scss";
import "../StopWatchButton/StopWatchButton";
import StopWatchButton from "../StopWatchButton/StopWatchButton";

export default function StopWatch() {
	// Store time in milliseconds
	const [time, setTime] = useState<number>(0);
	// Store time in readable format
	type timeStruct = {
		hours: string;
		minutes: string;
		seconds: string;
		milliseconds: string;
	};
	const [displayTime, setDisplayTime] = useState<timeStruct>({
		hours: "00",
		minutes: "00",
		seconds: "00",
		milliseconds: "00",
	});
	// The condition that starts & stop the timer
	const [isRunning, setIsRunning] = useState<boolean>(false);
	// Store lap start time
	const [startTime, setStartTime] = useState<number | undefined>(undefined);
	// The condition for Laps component to be displayed
	const [isShowing, setIsShowing] = useState<boolean>(false);
	//Initialize lap array
	const [laps, setLaps] = useState<number[]>([]);

	//Calculate time from DateConstructor and convert to a string with with 2 padding
	type calculateFunction = (a: number) => timeStruct;
	const calculateTime: calculateFunction = (time: number) => {
		const hours: string = Math.floor(time / 3600000)
			.toString()
			.padStart(2, "0");
		const minutes: string = Math.floor((time % 3600000) / 60000)
			.toString()
			.padStart(2, "0");
		const seconds: string = Math.floor((time % 60000) / 1000)
			.toString()
			.padStart(2, "0");
		const milliseconds: string = Math.floor(time % 1000)
			.toString()
			.slice(0, 2)
			.padStart(2, "0");

		const newTime = { hours, minutes, seconds, milliseconds };
		console.log(newTime);

		return newTime;
	};

	//Change the time displayed every 10ms when isRunning is true
	useEffect(() => {
		let intervalId: number | NodeJS.Timer;
		if (isRunning) {
			intervalId = setInterval(() => {
				setTime(time + 10);
			}, 10);
		}
		const newDisplayTime: timeStruct = calculateTime(time);
		setDisplayTime(newDisplayTime);
		return () => clearInterval(intervalId);
	}, [isRunning, time]);

	// Starts the timer and retrieves start time in ms
	function startRunning() {
		setIsRunning(true);
		const getStartTime: number | DateConstructor = Date.now();
		setStartTime(getStartTime);
	}

	// Stops timer, records stop time, and adds the duration of interval to laps array
	function stopRunning() {
		setIsRunning(false);
		const stopTime: number | DateConstructor = Date.now();
		const lapTime: number | DateConstructor = stopTime - startTime;
		setLaps([...laps, lapTime]);
	}

	//Toggles display for laps component
	function showLaps() {
		setIsShowing(!isShowing);
	}

	// Resets timer
	function resetTime() {
		setTime(0);
	}

	return (
		<div className="display">
			<div className="display__container">
				<div className="display__time">{displayTime.hours}:</div>
				<div className="display__time">{displayTime.minutes}:</div>
				<div className="display__time">{displayTime.seconds}:</div>
				<div className="display__time">
					{displayTime.milliseconds}
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
						const lapTime: timeStruct = calculateTime(lap);

						return (
							<div key={index} className="laps__item">
								<p className="laps__label">
									LAP {index + 1}
								</p>
								<p className="laps__time">
									{lapTime.hours === "00"
										? ""
										: `${lapTime.hours} hrs `}
									{lapTime.minutes === "00"
										? ""
										: `${lapTime.minutes} min `}{" "}
									{lapTime.seconds === "00"
										? ""
										: `${lapTime.seconds} sec `}{" "}
									{lapTime.milliseconds} ms
								</p>
							</div>
						);
					})}
				</div>
			)}
		</div>
	);
}
