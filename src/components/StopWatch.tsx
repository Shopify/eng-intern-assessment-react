import React from 'react'

export default function StopWatch() {

    return(
        <div className="container-fluid">
            <div id="stopwatch" className="row text-center mt-3 align-items-center">
                <div className="col-sm">
                    <span id="hours">00</span>:<span id="minutes">00</span>:<span id="seconds">00</span>.<span id="milliseconds">00</span>
                </div>
            </div>
        </div>)
}