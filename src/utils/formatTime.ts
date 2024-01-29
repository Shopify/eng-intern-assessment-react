export const formatTime = (time: number): string => {
    // 1 unit of time is equal to 10 ms 
    if (time < 0) {
        return ''
    }
    const hours = Math.floor(time / 360000);
    const minutes = Math.floor((time % 360000) / 6000);
    const seconds = Math.floor((time % 6000) / 100);
    const ms = Math.floor(time % 100)

    let result = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${ms.toString().padStart(2, '0')}`

    // only append hour to the time displayed if reached
    if (hours > 0) {
        result = `${hours.toString().padStart(2, '0')}:${result}`
    }

    return result
}