import { time } from "console";


function calculateTimer(timeInSeconds: number): Array<number|string> {
   let hours: number = Math.floor(timeInSeconds/3600);
   let minutes: number = Math.floor((timeInSeconds - (hours*3600))
   /60);
   let seconds: number = timeInSeconds - (hours * 3600) - (minutes*60);


   let hoursFormat = hours < 10 ? `0${hours}`: hours;


   return [hoursFormat, minutes, seconds];
}


export default calculateTimer;