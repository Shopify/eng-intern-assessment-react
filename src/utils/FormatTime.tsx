// Function to add a leading zero given a number
// ex: num = 1
//     return = 01
// ex: num = 21
//     return = 21
const addLeadingZero = (num: number): string => {
    return `${num < 10 ? '0' : ''}${num}`
}

export const formatTime = (timeInSeconds: number): string => {
    const hours: number = Math.floor(timeInSeconds / 3600);
    const minutes: number = Math.floor((timeInSeconds % 3600) / 60);
    const seconds: number = timeInSeconds % 60;

    return `${addLeadingZero(hours)}:${addLeadingZero(minutes)}:${addLeadingZero(seconds)}`
} 
