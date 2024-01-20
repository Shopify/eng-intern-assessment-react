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
		/**
		 *
		 * Reusable buttom component for the stopwatch
		 * Props:
		 * 	label: text that showcases the function of the button, and is used to style them accordingly
		 *  methodCall: function that is called when the button is clicked
		 *
		 */
		<button
			onClick={methodCall}
			className={` transition font-bold rounded-3xl h-16 w-16 bg-[#2a2c3c] neumorphic-invert-shadow active:scale-95 border-0 ease-in-out duration-100
			${
				label === "Start"
					? "text-green-500 border-4 border-green-500 hover:bg-[#3c5e39]"
					: label === "Stop"
					? "text-red-500 border-4 border-red-500 hover:bg-[#6a2d2d]"
					: label === "Lap"
					? "text-yellow-500 border-4 border-yellow-500 hover:bg-[#5a602b]"
					: `text-[rgb(92,110,245)] border-4 border-[rgb(92,110,245)] hover:bg-[rgb(65,75,151)]`
			}`}
		>
			{label}
		</button>
	);
}
