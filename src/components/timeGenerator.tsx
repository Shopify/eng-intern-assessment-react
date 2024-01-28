/**
 * @author Joshua Dierickse <jpcdieri@uwaterloo.ca>
 */

/**
 * Takes in the time in seconds and formats it into a string to be displayed nicely in a HH:MM:SS.ss format
 *
 * @param time - the time in seconds
 * @return formatted string
 */
export default function timeGenerator(time: number) {
    var timeString: String = "";
    if (time >= 3600) {
        timeString = Math.floor(time / 3600) + ":";
    }
    if (time >= 3600 && Math.floor((time / 60) % 60) < 10) {
        timeString = timeString + "0";
    }
    if (time >= 60) {
        timeString = timeString + Math.floor((time / 60) % 60).toString() + ":";
    }
    if (time >= 60 && time % 60 < 10) {
        timeString = timeString + "0";
    }
    timeString = timeString + (time % 60).toFixed(2);
    return timeString;
}