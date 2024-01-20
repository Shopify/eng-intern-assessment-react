import React from "react";
import { motion } from "framer-motion";

interface TimeshowcaseProps {
	lapData: string[];
}

const Timeshowcase = ({ lapData }: TimeshowcaseProps) => {
	return (
		<motion.div
			initial={{ y: 100, opacity: 0 }}
			animate={{ y: 0, opacity: 1 }}
			exit={{ y: 100, opacity: 0 }}
			transition={{ duration: 0.5, delay: 0.2 }}
			className="relative m-auto rounded-lg h-72 w-80 p-2 bg-white border-b-4 border-r-4 border-[rgb(92,110,245)]"
		>
			<h2 className="absolute -top-5 left-1/2 -translate-x-1/2 w-40 bg-[rgb(92,110,245)] border-b-4 border-r-4 border-[#2a2c3c] pl-4 pr-4 pt-1 pb-1 text-white text-center text-xl rounded-lg">
				Lap Table
			</h2>
			<div className="mt-5 h-[240px] overflow-auto">
				{lapData.map((lap, index) => {
					return (
						<motion.div
							initial={{ y: 10, opacity: 0 }}
							animate={{ y: 0, opacity: 1 }}
							transition={{ duration: 0.2 }}
							className="text-center text-xl"
							key={index}
						>
							{index !== 0 && <hr className="m-1" />}
							{lap}
						</motion.div>
					);
				})}
			</div>
		</motion.div>
	);
};

export default Timeshowcase;
