import React, { useState, useEffect } from 'react';
import StopWatch from './StopWatch';
import StopWatchButton from './StopWatchButton';
import { Button, Flex, Divider, List, Table } from 'antd';
import type { TableProps } from 'antd';


function MyApp() {
    const [time, setTime] = useState<number>(0);
    const [laps, setLaps] = useState<number[]>([]);
    const [timer, setTimer] = useState<number | undefined>(undefined);

    // Function to start the timer
    const start = () => {
        if (timer) clearInterval(timer);
        const newTimer = window.setInterval(() => {
            setTime(prevTime => prevTime + 1);
        }, 1000);
        setTimer(newTimer);
    };

    // Function to stop the timer
    const stop = () => {
        if (timer) clearInterval(timer);
        setTimer(undefined);
    };

    // Function to reset the timer
    const reset = () => {
        if (timer) clearInterval(timer);
        setTime(0);
        setTimer(undefined);
    };

    interface DataType {
        key: number;
        lap: number;
        timing: string;
    }

    const columns: TableProps<DataType>['columns'] = [
        {
            title: 'Lap',
            dataIndex: 'lap',
            key: 'lap',
        },
        {
            title: 'Timing',
            dataIndex: 'timing',
            key: 'timing',
        }]

    // Function to record a lap
    const recordLap = () => {
        setLaps([...laps, time]);
    };


    // Prepare lap data for the table
    const lapData: DataType[] = laps.map((lapTime, index) => ({
        key: index,
        lap: index + 1,
        timing: `${lapTime} seconds`,
    }));

    // Lap List Component using Table
    const DisplayLap: React.FC = () => <Table columns={columns} dataSource={lapData} />;

    // Use useEffect to clean up the interval on unmount
    useEffect(() => {
        return () => {
            if (timer) clearInterval(timer);
        };
    }, [timer]);

    return (
        <div>
            <h1>Welcome to my Stopwatch Application</h1>
            <div>
                <div className="timer-wrapper">
                    <StopWatch time={time} />
                    <Flex gap="small" wrap="wrap">
                        <Button type="primary"><StopWatchButton title={"Start"} onClick={start} /></Button>
                        <Button type="primary"><StopWatchButton title={"Stop"} onClick={stop} /></Button>
                        <Button type="primary"><StopWatchButton title="Reset" onClick={reset} /></Button>
                        <Button> <StopWatchButton title="Lap" onClick={recordLap} /></Button>
                    </Flex>
                    <DisplayLap />
                </div>
            </div>
        </div>
    );
}

export default function App() {
    return (
        <div>
            <MyApp />
        </div>
    );
}
