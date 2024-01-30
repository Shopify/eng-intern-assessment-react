import React, {createRef, useCallback, useEffect, useRef} from 'react'
import { FaPlay } from "react-icons/fa";
import { FaPause } from "react-icons/fa";
import { GrPowerReset } from "react-icons/gr";
import { RxLapTimer } from "react-icons/rx";

interface IStopWatchButtonProps {
    useTimer: boolean,
    useTimerHandler: (param: boolean) => void,
    resetHandler: () => void,
    lapHandler: () => void,
    lapsEmpty: boolean
}

const TimerButton = React.forwardRef<HTMLButtonElement, { onClick: () => void, useTimer: boolean }>(({ onClick, useTimer }, ref) => (
    <button ref={ref}
            className={`p-2 rounded-md w-20 ${useTimer ? 'bg-btn-yellow' : 'bg-btn-green'} 
                    transition-all duration-200`}
            onClick={onClick}>
        <span className={`flex flex-row gap-2 items-center`}>
            {useTimer ? <FaPause /> : <FaPlay />}
            {useTimer ? "Pause" : "Start"}
        </span>
    </button>
));

const LapResetButton = React.forwardRef<HTMLButtonElement, { onClick: () => void, useTimer: boolean, isLapButton: boolean }>(({ onClick, useTimer, isLapButton }, ref) => (
    <button ref={ref}
            className={`p-2 rounded-md w-20 ${isLapButton ? 'bg-btn-grey' : 'bg-btn-red'}`}
            onClick={onClick}
            disabled={isLapButton && !useTimer}>
        <span className={`flex flex-row gap-2 items-center`}>
            {isLapButton ? <RxLapTimer /> : <GrPowerReset />}
            {isLapButton ? 'Lap' : 'Reset'}
        </span>
    </button>
));

export default function StopWatchButton({ useTimer, useTimerHandler, resetHandler, lapHandler, lapsEmpty }: IStopWatchButtonProps) {
    const useTimerRef = useRef<HTMLButtonElement>(null);
    const resetRef = useRef<HTMLButtonElement>(null);
    const lapRef = useRef<HTMLButtonElement>(null);

    useEffect(() => {
        const keyHandler = (e: KeyboardEvent) => {
            console.log(`key:${e.code}`);
            switch (e.code) {
                case "Space":
                    useTimerRef.current?.click();
                    break;
                case "KeyR":
                    resetRef.current?.click();
                    break;
                case "KeyL":
                    lapRef.current?.click();
                    break;
            }
        };

        document.addEventListener("keydown", keyHandler);
        return () => document.removeEventListener("keydown", keyHandler);
    }, []);

    return (
        <div className={"flex flex-row justify-center gap-6 w-[300px] text-white"}>
            <TimerButton
                ref={useTimerRef}
                onClick={() => useTimerHandler(!useTimer)}
                useTimer={useTimer}
                aria-label={useTimer ? "Pause Timer" : "Start Timer"}
            />
            {useTimer ? (
                <LapResetButton
                    ref={lapRef}
                    onClick={lapHandler}
                    useTimer={useTimer}
                    isLapButton={true}
                    aria-label="Record Lap Time"
                />
            ) : (
                <LapResetButton
                    ref={resetRef}
                    onClick={resetHandler}
                    useTimer={useTimer}
                    isLapButton={false}
                    aria-label="Reset Timer"
                />
            )}
        </div>
    );
}
interface IKeystrokeButtonProps{
    keyCode: string
}
export function KeystrokeButton(props:IKeystrokeButtonProps) {
    const {keyCode} = props;
    return (
        <div aria-label={`${keyCode} button`} className=" text-xs h-7 w-fit text-center m-0 p-1 px-2 shadow-sm rounded-md border-2 cursor-pointer text-gray-300 bg-gray-600">
            {keyCode}
        </div>
    )
}