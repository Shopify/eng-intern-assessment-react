import React from 'react';

interface StopwatchButtonProps {
    onStart: () => void;
    onStop: () => void;
    onReset: () => void;
    onLap: () => void;
}

const styles: { [key: string]: React.CSSProperties } = {
    button: {
        marginBottom: '5vh',
        marginTop: '5vh',
        borderRadius: '20px',
        width: '20%',
        minHeight: '35px',
        backgroundColor: '#CCCCCC',
        border: 'none'
    },

    buttonsContainer: {
        width: '40vw',
        justifyContent: 'space-between',
        display: 'flex'
    }
};

const StopWatchButton: React.FC<StopWatchButtonProps> = ({ onStart, onStop, onReset, onLap }) => {
    return(
        <div style={styles.buttonsContainer}>
            <button style={styles.button} onClick={onStart}>Start</button>
            <button style={styles.button} onClick={onStop}>Stop</button>
            <button style={styles.button} onClick={onReset}>Reset</button>
            <button style={styles.button} onClick={onLap}>Lap</button>
        </div>
    )
}

export default StopWatchButton;