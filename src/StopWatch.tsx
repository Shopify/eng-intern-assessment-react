import React, { useState, useEffect } from "react";
import StopWatchButton from "./StopWatchButton";
import { motion } from "framer-motion";

interface StopwatchProps {
	updateTimeshowcase: (lapData: string[]) => void;
}

export default function StopWatch({ updateTimeshowcase }: StopwatchProps) {
	const [hr, setHr] = useState(0);
	const [min, setMin] = useState(0);
	const [sec, setSec] = useState(0);
	const [ms, setMs] = useState(0);
	const [isRunning, setIsRunning] = useState(false);
	const [laps, setLaps] = useState<string[]>([]);

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

	useEffect(() => {
		updateTimeshowcase(laps);
	}, [laps]);

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
		setLaps((prevLaps) => [...prevLaps, lapTime]);
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
