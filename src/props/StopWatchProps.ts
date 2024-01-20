
// Properties for the StopWatch component
export interface StopWatchProps {

    // id of the stopwatch
    id?: number;

    // stopwatch name
    title: String;

    // current time of the stopwatch
    time?: number;

    // laps the stopwatch has made
    timelaps?: Array<{displayTime?: string, time: number}>;
};


