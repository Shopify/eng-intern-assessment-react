import React from 'react';


type ButtonProps = {
    title: string;
    time?: number;
    onClick: (time?: number) => void;
};

export default function StopWatchButton({ title, time, onClick }: ButtonProps) {
    return (
        <span className={"button"} onClick={() => onClick(time)}>
            {title}
        </span>
    );
}








