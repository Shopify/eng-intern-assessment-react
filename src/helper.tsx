


export const getTime = (ts : number) => {
    let seconds, minutes, hours, ms = 0;
    hours = Math.floor(ts/3600)
    minutes = Math.floor((ts - hours * 3600) / 60)
    seconds = Math.floor(ts - hours * 3600 - minutes * 60)
    ms = parseFloat(((ts - hours * 3600 - minutes * 60 - seconds) * 100).toFixed(2))
    return {hours, minutes, seconds, ms}
}