
// Props for StopWatchLap componenet
export interface StopWatchLapProps {

    // time of lap in miliseconds
    time: number;

    // display time of lap in Min:Sec:Milisec
    displayTime?: string;

    // details/meaning of a lap
    details?: LapDetails
};


// Details of a lap and its meaning
interface LapDetails {

};
