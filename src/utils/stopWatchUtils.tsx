export const formatTime = (time: number) => {
    const seconds = time % 60;
    const minutes = Math.floor((time / 60) % 60);
    const hours = Math.floor(time / 3600);

    const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    const formattedHours = hours < 10 ? `0${hours}` : hours;

    return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
};