import React from 'react'

type Props = {
    text: string;
    setValue?: React.Dispatch<React.SetStateAction<boolean|number>>;
    time?: number;
    setLaps?: React.Dispatch<React.SetStateAction<number[]>>;
};

type StrToFuncMap = {
    [key: string]: () => void;
};

export default function StopWatchButton(props: Props) {
    const maxLaps = 5;

    const buttonMap: StrToFuncMap = {
        "Start": () => {
            props.setValue(true);
        }, 
        "Stop": () => {
            props.setValue(false);
        }, 
        "Reset": () => {
            props.setValue(0); 
        }, 
        "Lap": () => {
            // props.setLaps((prevLaps) => [...prevLaps, props.time]);
            props.setLaps((prevLaps) => {
                if (prevLaps.length < maxLaps) {
                  // Add lap if there is space
                  return [...prevLaps, props.time];
                } else {
                  // Replace the earliest lap with the newest lap
                  const updatedLaps = [...prevLaps];
                  updatedLaps.shift();
                  updatedLaps.push(props.time);
                  return updatedLaps;
                }
            });
        }
    };

    let onClick = function() {
        buttonMap[props.text]();
    };

    return(
        <button onClick={onClick}>{props.text}</button>
    );
}