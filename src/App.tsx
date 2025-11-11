import React, { useState, useEffect } from 'react';
import { makeTimeForm, StopWatch } from './StopWatch';
import StopWatchButton from './StopWatchButton';
import { Button, Flex, Table, Typography, Card } from 'antd';
import type { TableProps } from 'antd';

const { Title } = Typography;

interface DataType {
    key: number;
    lap: number;
    timing: string;
}

export default function App() {
    const [currentTime, setTime] = useState<number>(0);
    const [timer, setTimer] = useState<number | undefined>(undefined);
    const [laps, setLaps] = useState<number[]>([]);
    const [lastLapTime, setLastLapTime] = useState(0);
    const [isLapClicked, setIsLapClicked] = useState(false);

    const start = () => {
        if (timer) clearInterval(timer);
        const newTimer = window.setInterval(() => {
            setTime((prevTime) => prevTime + 10);
        }, 10);
        setTimer(newTimer);
    };

    const stop = () => {
        if (timer) clearInterval(timer);
        setTimer(undefined);
    };

    const reset = () => {
        setIsLapClicked(false);
        setLaps([]);
        if (timer) clearInterval(timer);
        setTime(0);
        setTimer(undefined);
    };

    const recordLap = () => {
        const lapTime = currentTime - lastLapTime;
        setLaps([...laps, lapTime]);
        setLastLapTime(currentTime);
    };

    const columns: TableProps<DataType>['columns'] = [
        {
            title: 'Lap',
            dataIndex: 'lap',
            key: 'lap',
            render: (text, record) => <span data-testid={`lap-time-${record.lap}`}>{text}</span>,
        },
        {
            title: 'Timing',
            dataIndex: 'timing',
            key: 'timing',
            render: (text) => <span>{text}</span>,
        },
    ];

    const lapData: DataType[] = laps.map((lapTime, index) => ({
        key: index,
        lap: index + 1,
        timing: makeTimeForm(lapTime),
    }));

    const DisplayLap: React.FC = () => (
        <Table
            columns={columns}
            dataSource={lapData}
            bordered
            title={() => 'Stopwatch lap recording'}
        />
    );

    useEffect(() => {
        return () => {
            if (timer) clearInterval(timer);
        };
    }, [timer]);

    const handleLapClick = () => {
        setIsLapClicked(true);
        recordLap();
    };

    const baseStyle: React.CSSProperties = {
        width: "90%",
        alignItems: 'center',
        margin: "3rem"
    };

    return (
        <>
            <Flex gap="middle" vertical style={baseStyle}>
                <Flex vertical={true}>
                    <Title level={2} style={{ marginBottom: '1em' }}>
                        Welcome to my Stopwatch Application
                    </Title>

                    <div>
                        <Card style={{ width: 550, marginBottom: '2em' }}>
                            <Title style={{ textAlign: "center" }}>
                                <StopWatch time={currentTime} />
                            </Title>
                        </Card>
                        <Flex wrap="wrap" justify='space-evenly' align='center' style={{ marginBottom: "2em" }}>
                            <Button type="primary" size="large"><StopWatchButton title={"Start"} onClick={start} /></Button>
                            <Button type="primary" size="large"><StopWatchButton title={"Stop"} onClick={stop} /></Button>
                            <Button danger size="large"><StopWatchButton title={"Reset"} onClick={reset} /></Button>
                            <Button size="large"><StopWatchButton title="Lap" onClick={handleLapClick} /></Button>
                        </Flex>
                        {isLapClicked && <DisplayLap />}
                    </div>
                </Flex>
            </Flex>
        </>
    )
}
