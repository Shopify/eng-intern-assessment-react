import React from "react";

interface StopWatchButtonProps {
	label: string;
	methodCall: () => void;
}
export default function StopWatchButton({
	label,
	methodCall,
}: StopWatchButtonProps) {
	return (
		<button
			onClick={methodCall}
			className={` transition font-bold rounded-3xl h-16 w-16 bg-[#2a2c3c] hover:bg-[#303243] neumorphic-invert-shadow active:scale-95 border-0 ease-in-out duration-100
            ${
				label === "Start"
					? "text-green-500 border-4 border-green-500"
					: label === "Stop"
					? "text-red-500 border-4 border-red-500"
					: label === "Lap"
					? "text-yellow-500 border-4 border-yellow-500"
					: `text-[rgb(92,110,245)] border-4 border-[rgb(92,110,245)]`
			}`}
		>
			{label}
		</button>
	);
}
