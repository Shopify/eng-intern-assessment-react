const formatTime = (time: number) => {
    // Converting time into hours, minutes, seconds, and milliseconds
    const milliseconds = time % 1000;
    const seconds = Math.floor(time / 1000) % 60;
    const minutes = Math.floor(time / 60000) % 60;
    const hours = Math.floor(time / 3600000);
    const pad = (num: number) => num.toString().padStart(2, '0');
    return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}.${Math.floor(milliseconds / 100)}`;
};

export default formatTime;