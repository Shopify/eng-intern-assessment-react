// Function to add a leading zero given a number
// ex: num = 1
//     return = 01
// ex: num = 21
//     return = 21
const addLeadingZero = (num: number): string => {
    return `${num < 10 ? '0' : ''}${num}`
}

// Format time to have milisecond pression, up to the hundredth's place
export const formatTime = (timeInMiliseconds: number): string => {
    const hours: number = Math.floor(timeInMiliseconds / (1000 * 60 * 60));
    const minutes: number = Math.floor((timeInMiliseconds % (1000 * 60 * 60)) / (1000 * 60));
    const seconds: number = Math.floor((timeInMiliseconds % (1000 * 60)) / 1000);
    const miliseconds: number = timeInMiliseconds % 100;

    return `${addLeadingZero(hours)}:${addLeadingZero(minutes)}:${addLeadingZero(seconds)}.${addLeadingZero(miliseconds)}`
} 
