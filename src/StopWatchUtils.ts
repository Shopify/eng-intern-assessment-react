export function calculateTime(time: number) {
    // minutes calculation
    const hours = Math.floor((time / (1000 * 60 * 60)) % 60);

    // minutes calculation
    const minutes = Math.floor((time / (1000 * 60)) % 60);

    // seconds calculation
    const seconds = Math.floor((time / 1000) % 60);

    // milliseconds calculation
    const milliseconds = (time / 10) % 1000;

    return `${("0" + hours.toString()).slice(-2)}:${("0" + minutes.toString()).slice(-2)}:${("0" + seconds.toString()).slice(-2)}:${("0" + milliseconds.toString()).slice(-2)}`
}

