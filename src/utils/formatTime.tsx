const padWithZero = (value: number): string => value.toString().padStart(2, '0') // pads so that all units of time are 2 digits

const formatTime = (time: number): string => { // formats the time to minutes, seconds and milliseconnds
    const milliseconds = padWithZero(Math.floor((time % 1000) / 10))
    const seconds = padWithZero(Math.floor((time / 1000) % 60))
    const minutes = padWithZero(Math.floor((time / (1000 * 60)) % 60))

    return `${minutes} : ${seconds} : ${milliseconds}`
}

export default formatTime
