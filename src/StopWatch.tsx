import React from 'react'

type TimerProps = {
    time: number;
};

export default function StopWatch({ time }: TimerProps) {
    const [min, setMin] = React.useState<number>(0);
    const [sec, setSec] = React.useState<number>(0);
    const makeTimeForm = (time: number): void => {
        if (time < 60) {
            setMin(0);
            setSec(time);
        } else {
            let min = Math.floor(time / 60);
            let sec = time - min * 60;
            setSec(sec);
            setMin(min);
        }
    };
    React.useEffect((): void => {
        makeTimeForm(time);
    }, [time]);

    return (
        <div>
            <span className="time">{min}</span>
            <span className="unit">min</span>
            <span className="time right">{sec}</span>
            <span className="unit">sec</span>
        </div>
    );
}
