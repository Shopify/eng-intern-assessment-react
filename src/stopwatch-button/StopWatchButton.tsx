import React, {CSSProperties, ReactNode, useMemo} from 'react';
import './styles.css'

type StopWatchButtonProps = {
    onClick: () => void;
    color?: string;
    children?: ReactNode;
};

export default function StopWatchButton({ onClick, color, children }: StopWatchButtonProps) {
    const colorStyles = useMemo((): CSSProperties => {
        return {
            // backgroundColor: color,
        }
    }, [color])
    return (
        <button className="stopwatchButton" onClick={onClick} style={colorStyles}>
            {children}
        </button>
    );
}

StopWatchButton.defaultProps = {
    children: [],
    color: '#999999',
};
