import { Dispatch, SetStateAction } from 'react';

export interface StopWatchProps {
    isStopped: boolean;
    time: number;
    setTime: Dispatch<SetStateAction<number>>;
}

export interface StopWatchButtonProps {
    isStopped: boolean;
    setIsStopped: Dispatch<SetStateAction<boolean>>;
    time: number;
    setTime: Dispatch<SetStateAction<number>>;
    setLaps: Dispatch<SetStateAction<number[]>>;
    setMinTime: Dispatch<SetStateAction<number>>;
    setMaxTime: Dispatch<SetStateAction<number>>;
    setCalculatedLapTimes: Dispatch<SetStateAction<number[]>>;

}
  