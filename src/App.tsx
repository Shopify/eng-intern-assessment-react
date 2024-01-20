import React, { useState } from "react";
import StopWatch from "./StopWatch";
import Timeshowcase from "./Timeshowcase";

export default function App() {
	// Array to maintain the state of the list of laps
	const [lapData, setLapData] = useState<string[]>([]);

	// Function to update the lapData array, passed as a prop
	const updateTimeshowcase = (lapData: string[]) => {
		setLapData(lapData);
	};

	return (
		<div className="w-full transition-all flex min-h-screen bg-[#2a2c3c]">
			<div className="m-auto p-10 w-2/4">
				<StopWatch updateTimeshowcase={updateTimeshowcase} />
				{lapData.length !== 0 && <Timeshowcase lapData={lapData} />}
			</div>
		</div>
	);
}
