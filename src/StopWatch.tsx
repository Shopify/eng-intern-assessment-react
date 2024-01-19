import React from 'react'
import StopWatchButton from './StopWatchButton'
export default function StopWatch() {
    return (
        <div className="container">
            <div className="watch">
                <div className="outer-circle">
                    <div className="inner-circle">
                        <span className="text minute">0 :</span>
                        <span className="text sec">&nbsp; 0 :</span>
                        <span className="text msec">&nbsp; 0</span>
                    </div>
                </div>
                <StopWatchButton/>
            </div>
           
        </div>
    )
}