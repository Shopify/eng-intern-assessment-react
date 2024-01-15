export const formatTime = (time: number) => {
	const minutes = Math.floor(time / 60000);
 	const seconds = Math.floor((time % 60000) / 1000);
	const milliseconds = Math.floor((time % 1000) / 10)

	const formattedMinutes = minutes.toString().padStart(2, '0')
	const formattedSeconds = seconds.toString().padStart(2, '0')
	const formattedMilliseconds = milliseconds.toString().padStart(2, '0')

	return `${formattedMinutes}:${formattedSeconds}:${formattedMilliseconds}`;
};
