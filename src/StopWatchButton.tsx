import React from 'react';
import { ButtonType, StopWatchButtonProps } from './StopWatch';

export default function StopWatchButton({ type, onClick }: StopWatchButtonProps) {
    return (
        <div className='button' onClick={onClick}>
            {type}
        </div>
    );
}