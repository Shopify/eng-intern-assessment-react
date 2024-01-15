import React from 'react';

interface StopWatchButtonProps {
    onPress: (event: React.MouseEvent<HTMLButtonElement>) => void;
    label: string
}

export default function StopWatchButton({ onPress, label }: StopWatchButtonProps) {
    return(
        <div>
            <button onClick={onPress}>{label}</button>
        </div>
    );
}
