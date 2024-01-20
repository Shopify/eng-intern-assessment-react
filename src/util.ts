// Converts time into a human readable format
export function formatTime(time: number) {
    // Compute hours, minutes, seconds, and milliseconds
    const hr = Math.floor(time / 60 / 60 / 1000 % 24)
    const min = Math.floor(time / 60 / 1000 % 60)
    const sec = Math.floor(time / 1000 % 60)
    const ms = Math.floor(time / 10 % 100)

    // Convert time into 00:00:00:00 format
    const formattedHr: string = hr.toString().padStart(2, '0');
    const formattedMin: string = min.toString().padStart(2, '0');
    const formattedSec: string = sec.toString().padStart(2, '0');
    const formattedMs: string = ms.toString().padStart(2, '0');

    return formattedHr + ":" + formattedMin + ":" + formattedSec + ":" + formattedMs
}