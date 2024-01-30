import React, { useState, useEffect } from 'react';

type TimerProps = {
    time: number;
};

const makeTimeForm = (milliseconds: number): string => {
    const hours = Math.floor(milliseconds / 3600000);
    const minutes = Math.floor((milliseconds % 3600000) / 60000);
    const seconds = Math.floor((milliseconds % 60000) / 1000);
    const millisecondsPart = milliseconds % 1000; // 只获取当前秒的毫秒部分

    const formattedHours = hours.toString().padStart(2, '0');
    const formattedMinutes = minutes.toString().padStart(2, '0');
    const formattedSeconds = seconds.toString().padStart(2, '0');
    const formattedMilliseconds = millisecondsPart.toString().padStart(3, '0');

    return `${formattedHours}:${formattedMinutes}:${formattedSeconds}.${formattedMilliseconds}`;
};

export function StopWatch({ time }: TimerProps) {
    const [formattedTime, setFormattedTime] = useState('00:00:00.000'); // 初始化格式化的时间字符串

    useEffect(() => {
        setFormattedTime(makeTimeForm(time));
    }, [time]);

    // 在组件中显示格式化后的时间
    return (
        <div data-testid="stopwatch-display">
            {formattedTime}
        </div>
    );
};

export { makeTimeForm };