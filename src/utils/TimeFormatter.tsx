const formatTime = (time: number): string => {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = Math.floor(time % 60);

    return `${formatTimeString(hours)}:${formatTimeString(minutes)}:${formatTimeString(seconds)}`;
};

const formatTimeString = (time: number): string => {
    return String(time).padStart(2, '0')
}

export default formatTime;