// calculates time in milliseconds to string hrs/min/sec format
export function calculateTime(time: number) {
    
    const hours = Math.floor((time / (1000 * 60 * 60)) % 60);
    const minutes = Math.floor((time / (1000 * 60)) % 60);
    const seconds = Math.floor((time / 1000) % 60);
    const milliseconds = (time / 10) % 1000;

    return `${("0" + hours.toString()).slice(-2)}:${("0" + minutes.toString()).slice(-2)}:${("0" + seconds.toString()).slice(-2)}:${("0" + milliseconds.toString()).slice(-2)}`
}

