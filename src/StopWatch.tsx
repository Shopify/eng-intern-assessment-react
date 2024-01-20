import React, { useState, useEffect } from "react";
import StopWatchButton from "./StopWatchButton";
import { motion } from "framer-motion";

// StopwatchProps to set the type of the props passed to the component
interface StopwatchProps {
	updateTimeshowcase: (lapData: string[]) => void;
}

export default function StopWatch({ updateTimeshowcase }: StopwatchProps) {
	//React State variables to hold the time values
	const [hr, setHr] = useState(0);
	const [min, setMin] = useState(0);
	const [sec, setSec] = useState(0);
	const [ms, setMs] = useState(0);

	//React State variable to hold the current state of the stopwatch
	const [isRunning, setIsRunning] = useState(false);

	//React State variable to hold the list of laps
	const [laps, setLaps] = useState<string[]>([]);

	// The time is constantly updated using the setInterval function. Triggered only when the
	// stop watch is running (isRunning state is set to True) .
	useEffect(() => {
		let interval: NodeJS.Timeout;

		if (isRunning) {
			interval = setInterval(() => {
				setMs((prevMs) => {
					if (prevMs === 99) {
						setSec((prevSec) => {
							if (prevSec === 59) {
								setMin((prevMin) => {
									if (prevMin === 59) {
										setHr((prevHr) => prevHr + 1);
										return 0;
									}
									return prevMin + 1;
								});
								return 0;
							}
							return prevSec + 1;
						});
						return 0;
					}
					return prevMs + 1;
				});
			}, 10);
		}

		return () => clearInterval(interval);
	}, [isRunning]);

	// Update lapData array when the laps state is updated
	useEffect(() => {
		updateTimeshowcase(laps);
	}, [laps]);

	// Helper functions to alter the running state
	const startTiming = () => {
		setIsRunning(true);
	};

	const stopTiming = () => {
		setIsRunning(false);
	};

	const resetTiming = () => {
		setHr(0);
		setMin(0);
		setSec(0);
		setMs(0);
		setIsRunning(false);
		setLaps([]);
	};

	const lapTiming = () => {
		const lapTime = `${hr.toString().padStart(2, "0")}:${min
			.toString()
			.padStart(2, "0")}:${sec.toString().padStart(2, "0")}.${ms
			.toString()
			.padStart(2, "0")}`;
		setLaps((prevLaps) => [lapTime, ...prevLaps]);
	};

	return (
		<motion.div
			layout
			className="text-white m-auto flex flex-col justify-center gap-5 items-center mb-20 bg-[#2a2c3c] rounded-full h-80 w-80 neumorphic-shadow "
		>
			<div className="text-center text-4xl rounded-full bg-[rgb(92,110,245)] neumorphic-invert-shadow p-4">
				{hr.toString().padStart(2, "0")}:
				{min.toString().padStart(2, "0")}:
				{sec.toString().padStart(2, "0")}.
				{ms.toString().padStart(2, "0")}
			</div>
			<div className=" flex justify-center items-center gap-2">
				<StopWatchButton
					label={!isRunning ? "Start" : "Stop"}
					methodCall={!isRunning ? startTiming : stopTiming}
				/>
				<StopWatchButton label={"Lap"} methodCall={lapTiming} />
				<StopWatchButton label={"Reset"} methodCall={resetTiming} />
			</div>
		</motion.div>
	);
}
