export function getFormattedTime(timestamp:number) : string {
    const now = new Date(timestamp);
    const hours = String(now.getUTCHours()).padStart(2, '0');
    const minutes = String(now.getUTCMinutes()).padStart(2, '0');
    const seconds = String(now.getUTCSeconds()).padStart(2, '0');
    const ms = String(now.getUTCMilliseconds()).padStart(2, '0').slice(0,2);
    return `${hours}:${minutes}:${seconds}:${ms}`;
}