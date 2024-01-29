const formatTime = (timeInMilliseconds: number): string => {
    const minutes = Math.floor((timeInMilliseconds % 3600000) / 60000);
    const seconds = Math.floor((timeInMilliseconds % 60000) / 1000);
    const milliseconds = Math.floor((timeInMilliseconds % 1000) / 10);

    const doubleDigits = (input: number) => {
        const output: string|number = input < 10 ? `0${input}` : input;
        return output;
    };

    return `${doubleDigits(minutes)}:${doubleDigits(seconds)}.${doubleDigits(milliseconds)}`;
}

export default formatTime;