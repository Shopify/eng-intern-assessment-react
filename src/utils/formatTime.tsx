// format the time into minutes, seconds and milliseconds

export const formatTime = (time: number) => {
    const minutes = Math.floor(time / (60 * 1000)) % 60;
    const seconds = Math.floor(time / (1000)) % 60;
    const milliseconds = Math.floor(time) % 1000;

    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;
    const formattedmilliseconds = milliseconds < 100 ? milliseconds < 10 ? `00${milliseconds}` : `0${milliseconds}` : milliseconds;

    return `${formattedMinutes}:${formattedSeconds}:${formattedmilliseconds}`;
  };