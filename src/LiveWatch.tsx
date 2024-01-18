import React from "react"
import "./stylesheets/LiveWatch.css"

interface LiveWatchProps{
    currentSecond : React.MutableRefObject<any>
    totalSecond: React.MutableRefObject<any>
}

export default function LiveWatch({
    currentSecond,
    totalSecond
    }:LiveWatchProps) {
    return (
        <div className="body">
            <div className="clock">
                <div className="watch">
                    <div ref={currentSecond} className="second" id="second">
                        <div className="curr"/>
                    </div>
                    <div ref={totalSecond} className="totalsecond" id="totalsecond">
                        <div className="total"/>
                    </div>
                </div>
            </div>
        </div>
    )
}