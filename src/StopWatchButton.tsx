import React, {createRef, useCallback, useEffect, useRef} from 'react'
import {Simulate} from "react-dom/test-utils";
import keyPress = Simulate.keyPress;

interface IStopWatchButtonProps{
    useTimer: boolean,
    useTimerHandler: (param:boolean) => void,
    resetHandler: () => void,
    lapHandler: () => void
    lapsEmpty: boolean
}
export default function StopWatchButton(props:IStopWatchButtonProps) {
    const {useTimer, useTimerHandler, resetHandler, lapHandler, lapsEmpty} = props;
    const useTimerRef = useRef<HTMLButtonElement>();
    const resetRef = useRef<HTMLButtonElement>();
    const lapRef = useRef<HTMLButtonElement>();

    useEffect(() => {
        const keyHandler = (e:KeyboardEvent)=>{
            console.log(`key:${e.code}`);
            switch (e.code){
                case "Space":
                    useTimerRef.current.click();
                    e.preventDefault();
                    return;
                case "KeyR":
                    resetRef.current.click();
                    return;
                case "KeyL":
                    lapRef.current.click();
                    return;
            }
        }
        document.addEventListener("keydown", keyHandler);

        return(()=>{
            document.removeEventListener("keydown", keyHandler);
        })
    }, []);

    return(
        <div className={"flex flex-row justify-center gap-6 w-[300px]"}>
            <button ref={useTimerRef} className={"p-2 border-2 rounded-md"} onClick={()=> {
                useTimerHandler(!useTimer);
            }}>{useTimer ? "Pause" : "Start"}</button>
            <button ref={resetRef} className={"p-2 border-2 rounded-md"} onClick={()=> resetHandler()}>Reset</button>
            <button ref={lapRef} className={"p-2 border-2 rounded-md"} onClick={lapHandler} disabled={!useTimer}>Lap</button>
        </div>
    )
}