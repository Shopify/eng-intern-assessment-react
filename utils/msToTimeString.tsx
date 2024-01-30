export function msToTimeString(time : number) {
    const min = Math.floor(time / (1000 * 60));
    const sec = Math.floor((time % (1000 * 60)) / 1000);
    const milisec = time % 1000;

    return `${padTimeString(min)}:${padTimeString(sec)}:${padTimeString(milisec/10)}`
}

const padTimeString = (time: number) => {
    return time.toString().padStart(2,"0");
}