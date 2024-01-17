import React from 'react';
// import "./style.css"


interface StopWatchProps {
    //time is seconds elapsed
    time: number;
    //size is either "lg" or "sm" or not provided,default is "lg"
    size?: "lg" | "sm"
}

//StopWatch component uses the above interface to define the props it takes in
const StopWatch: React.FC<StopWatchProps> = ({ time, size = "lg" }) => {
    //pad function used to format time by adding required 0s to the seconds and minutes and converting them to string
    const pad = (num: string, size: number): string => {
        // conversion to string
        let s = String(num);
        // addition of 0s
        while (s.length < size) {
            s = `0${s}`;
        }
        return s;
    }
    //formatTime function used to convert time in seconds to a string in the format mm:ss.ss
    const formatTime = (seconds: number): string => {
        //math.floor used to round down minutes to nearest integer
        const clockMinutes = Math.floor(seconds / 60);
        //modulus used to get remainder of seconds divided by 60 which is the seconds which are not part of a minute
        const clockSeconds = seconds % 60;
        //pad function used to format minutes so they always take up 2 digits
        const formattedMinutes = pad(clockMinutes.toFixed(0), 2);
        //pad function used to format seconds so they always take up 5 digits (including the decimal point)
        const formattedSeconds = pad(clockSeconds.toFixed(2), 5);

        return `${formattedMinutes}:${formattedSeconds}`;
    };
    //size is lg is default val and used for the actual stopwatch
    if (size == "lg") {
        return <h1>{formatTime(time)}</h1>;
    } else {
        //size is sm and used for the lap times
        return <h3>{formatTime(time)}</h3>;
    }
};

export default StopWatch;
