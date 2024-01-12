// Takes in the time in seconds and converts it into hh:mm:ss format by returning an Array in the form [hh,mm,ss]
function calculateDisplayTime(timeInSec:number) : Array<string>{
    let hours: number = Math.floor(timeInSec/3600);
    let minutes: number = Math.floor((timeInSec % 3600) / 60);
    let seconds: number = timeInSec % 60

    // Either the hours, minutes or seconds is a single digit number, add 0 to the front of it. Otherwise just convert
    // the number to string
    let displayHours = hours<10 ? `0${hours}`:hours.toString();
    let displayMinutes = minutes<10 ? `0${minutes}`:minutes.toString();
    let displaySeconds = seconds<10 ? `0${seconds}`:seconds.toString();
    return[displayHours,displayMinutes,displaySeconds]
}
export default calculateDisplayTime;