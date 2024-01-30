// Break down time into components and convert to a string with with 2 padding
export const calculateTime = (time: number) => {
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
	return newTime;
};
