import React from 'react';

interface StopWatchButtonProps {
    text: string;
    onClick: () => void;
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
    }
};

const StopWatchButton: React.FC<StopWatchButtonProps> = ({ text, onClick }) => {
    return(
        <button style={styles.button} onClick={onClick}>{text}</button>
    )
}

export default StopWatchButton;