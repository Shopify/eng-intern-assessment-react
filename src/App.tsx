import React, { useEffect, useState } from 'react';
import './CSS Files/App.css';
import calculateTimer from './Helper/CalculateTimer';
import StopWatchButton from './StopWatchButton';
import StopWatch from './StopWatch';

// Main app component for stopwatch functionality
const App: React.FC = () => {
    // State for tracking time in seconds
    const [timeInSeconds, setTimeInSeconds] = useState<number>(0);
    // State for formatted time array [hours, minutes, seconds]
    const [timerArray, setTimerArray] = useState<Array<number|string>>([]);
    // Stores lap times for lap button
    const [laps, setLaps] = useState<Array<string>>([]);

    useEffect(() => {
        let timeArray: Array<number|string> = calculateTimer(timeInSeconds);
        setTimerArray(timeArray);
    }, [timeInSeconds]);
    
    // Define the handleLap function
    const handleLap = () => {
        const lapTime = timerArray.join(":");
        setLaps(oldLaps => [...oldLaps, lapTime]);
    };
    
    // Return the JSX for your component
    return (
        <main>
            <StopWatch timerArray={timerArray} />
            <StopWatchButton 
                setTimeInSeconds={setTimeInSeconds} 
                handleLap={handleLap} 
            />
            {/* Display recorded laps */}
            <div className="lap-times">
                {laps.map((lap, index) => (
                    <div key={index}>Lap {index + 1}: {lap}</div>
                ))}
            </div>
        </main>           
    );
};

export default App;
