import React, { useState, useEffect } from 'react';
import { makeTimeForm, StopWatch } from './StopWatch';
import StopWatchButton from './StopWatchButton';
import { Button, Flex, Table, Typography, Card } from 'antd';
import type { TableProps } from 'antd';

const { Title } = Typography;

export default function App() {
    const [currentTime, setTime] = useState<number>(0);
    const [timer, setTimer] = useState<number | undefined>(undefined);
    const [laps, setLaps] = useState<number[]>([]);
    const [lastLapTime, setLastLapTime] = useState(0); // State to store the time of the last lap

    // Function to start the timer
    const start = () => {
        if (timer) clearInterval(timer);
        const newTimer = window.setInterval(() => {
            setTime(prevTime => prevTime + 10);
        }, 10);
        setTimer(newTimer);
    };

    // Function to stop the timer
    const stop = () => {
        if (timer) clearInterval(timer);
        setTimer(undefined);
    };

    // Function to reset the timer
    const reset = () => {
        setIsLapClicked(false); // 隐藏 DisplayLap 组件
        setLaps([]); // 清除圈次数据
        if (timer) {
            clearInterval(timer);
        }
        setTime(0);  // 重置时间
        setTimer(undefined);  // 清除计时器
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

    const recordLap = () => {
        const lapTime = currentTime - lastLapTime; // Calculate lap time
        setLaps([...laps, lapTime]); // Store the lap time
        setLastLapTime(currentTime); // Update the last lap time to current time
    };

    // Prepare lap data for the table
    const lapData: DataType[] = laps.map((lapTime, index) => ({
        key: index,
        lap: index + 1,
        timing: makeTimeForm(lapTime),
    }));

    // Lap List Component using Table
    const DisplayLap: React.FC = () =>
        <Table
            columns={columns}
            dataSource={lapData}
            bordered
            title={() => 'Stopwatch lap recording'}
        />

    // Use useEffect to clean up the interval on unmount
    useEffect(() => {
        return () => {
            if (timer) clearInterval(timer);
        };
    }, [timer]);

    const [isLapClicked, setIsLapClicked] = useState(false);
    // “Lap”按钮的点击处理函数
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
            <Flex gap="middle" vertical style={{ ...baseStyle }}>
                <Flex vertical={true} >

                    <Typography.Title level={2} style={{ marginBottom: '1em' }}>
                        Welcome to my Stopwatch Application
                    </Typography.Title>

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
                            <Button size="large"> <StopWatchButton title="Lap" onClick={handleLapClick} /></Button>
                        </Flex>
                        {isLapClicked && <DisplayLap />}
                    </div>
                </Flex>
            </Flex>
        </>
    )
}

