import React from "react"
import "./stylesheets/LiveWatch.css"

interface LiveWatchProps{
    maintainCurr : number
    maintainTotal: number
}

export default function LiveWatch({
    maintainCurr,
    maintainTotal
    }:LiveWatchProps) {
    return (
        <div className="body">
            <div className="clock">
                <div className="watch">
                    <div 
                    className="second" 
                    id="second" 
                    style={{ transform: `rotateZ(${maintainCurr}deg)` }}>
                        <div className="curr"/>
                    </div>
                    <div 
                    className="totalsecond" 
                    id="totalsecond"
                    style={{ transform: `rotateZ(${maintainTotal}deg)` }}>
                        <div className="total"/>
                    </div>
                </div>
            </div>
        </div>
    )
}