const getMilliseconds = (timeInMilliseconds: number) =>
    timeInMilliseconds % 1000;

const getSeconds = (timeInMilliseconds: number) =>
    Math.floor((timeInMilliseconds / 1000) % 60);

const getMinutes = (timeInMilliseconds: number) =>
    Math.floor((timeInMilliseconds / (1000 * 60)) % 60);

const formatTime = (timeInMilliseconds: number) => {
    const minutes = getMinutes(timeInMilliseconds);
    const seconds = getSeconds(timeInMilliseconds);
    const milliseconds = getMilliseconds(timeInMilliseconds);

    const formattedMinutes = String(minutes).padStart(2, "0");
    const formattedSeconds = String(seconds).padStart(2, "0");
    const formattedMilliseconds = String(milliseconds)
        .padStart(3, "0")
        .slice(0, 2);

    return `${formattedMinutes}:${formattedSeconds}.${formattedMilliseconds}`;
};

export { formatTime, getMilliseconds, getSeconds, getMinutes };
