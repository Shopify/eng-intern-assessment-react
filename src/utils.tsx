export function splitTime(ms: number) {

    const hours = Math.floor(ms / 3600000); // 3600000 milliseconds in an hour
    ms %= 3600000;
    const minutes = Math.floor(ms / 60000); // 60000 milliseconds in a minute
    ms %= 60000;
    const seconds = Math.floor(ms / 1000);
    const milliseconds = ms % 1000;

    return [String(hours).padStart(1, '0'),
    String(minutes).padStart(2, '0'),
    String(seconds).padStart(2, '0'),
    String(milliseconds).padStart(2, '0').slice(0,2)]
    
};

export function timeToString(ms: number) {

    const hours = Math.floor(ms / 3600000); // 3600000 milliseconds in an hour
    ms %= 3600000;
    const minutes = Math.floor(ms / 60000); // 60000 milliseconds in a minute
    ms %= 60000;
    const seconds = Math.floor(ms / 1000);
    const milliseconds = ms % 1000;

    return `${String(hours).padStart(1, '0')}:`+
    `${String(minutes).padStart(2, '0')}:`+
    `${String(seconds).padStart(2, '0')}.`+
    `${String(milliseconds).padStart(2, '0').slice(0,2)}`
    
};