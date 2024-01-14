/**
 * A helper hook to format time in seconds to hours, minutes and seconds
 * @param time time in seconds
 * @returns an object of hours, minutes, seconds
 */
export const useFormattedTime = (time: number) => {
    const seconds = time;
	const displaySeconds = seconds % 60; // how many seconds are left after removing the minutes
	const totalMinutes = Math.floor(seconds / 60); // how many minutes are in the total seconds
	const minutes = totalMinutes % 60; // how many minutes are left after removing the hours
	const hours = Math.floor(totalMinutes / 60); // how many hours are in the total minutes

    return {
        h: hours,
        m: minutes,
        s: displaySeconds
    }
}