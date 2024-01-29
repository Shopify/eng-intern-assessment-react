const formatTime = (timeInMilliseconds: number): string => {
    // converting the recorded time from a value in milliseconds
    // into separate minutes, seconds, and milliseconds values
    const minutes = Math.floor((timeInMilliseconds % 3600000) / 60000);
    const seconds = Math.floor((timeInMilliseconds % 60000) / 1000);
    const milliseconds = Math.floor((timeInMilliseconds % 1000) / 10);

    // ensuring that each time value is displayed in two digits
    // so that the html element has consistent dimensions.
    // if the input value is less than 10, output it with a zero in front of it
    const doubleDigits = (input: number) => {
        const output: string|number = input < 10 ? `0${input}` : input;
        return output;
    };

    // combining the separate time values into a user-friendly format
    return `${doubleDigits(minutes)}:${doubleDigits(seconds)}.${doubleDigits(milliseconds)}`;
}

export default formatTime;