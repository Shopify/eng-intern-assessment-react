export function formatTime(time: number): string {
    return `${("0" + Math.floor(time / 3600000)).slice(-2)}:${("0" + Math.floor((time % 3600000) / 60000)).slice(-2)}:${("0" + Math.floor((time % 60000) / 1000)).slice(-2)}:${("0" + Math.floor((time % 1000) / 10)).slice(-2)}`;
}