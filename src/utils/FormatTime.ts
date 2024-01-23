export const formatTime = (time: number) => {
    // 0 is padded to account for where the time does not have 2 digits (e.g. 8 -> 08)
    // slice is used to ensure only 2 digits are used
    const hours = ("0" + Math.floor(time / (60 * 60 * 1000))).slice(-2);
    const minutes = ("0" + Math.floor((time / (60 * 1000)) % 60)).slice(-2);
    const seconds = ("0" + Math.floor((time / 1000) % 60)).slice(-2);
    const ms = ("0" + Math.floor((time / 10) % 100)).slice(-2);

    return `${hours}:${minutes}:${seconds}.${ms}`;
  };
