export function getFormattedTime(timestamp:number, showMs:boolean = false) : string {
    const now = new Date(timestamp);
    const hours = String(now.getUTCHours()).padStart(2, '0');
    const minutes = String(now.getUTCMinutes()).padStart(2, '0');
    const seconds = String(now.getUTCSeconds()).padStart(2, '0');
    const milliseconds = String(now.getUTCMilliseconds()).padStart(2, '0').slice(0, 2);
    return `${hours}:${minutes}:${seconds}${showMs? `.${milliseconds}`:''}`;
}

export function getMilliseconds(timestamp:number){
    const now = new Date(timestamp);
    return String(now.getUTCMilliseconds()).padStart(2, '0').slice(0, 2);
}