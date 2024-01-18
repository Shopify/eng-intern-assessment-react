import React from "react"
import "./stylesheets/LiveWatch.css"


// Props to receive information from App.tsx.
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

            {/* 
            Used to store the watch, total second hand, and current second hand 
            components. 
            */}
            <div className="clock">

                {/* The watch component is used to display the actual stopwatch. */}
                <div className="watch">


                    {/*
                    This second hand component renders for the current lap time and 
                    is orange. The second hand is updated by setting the rotation to 
                    (Math.floor((currentTime + 1) % 60)) * 6 degrees. 
                    */}
                    <div 
                    className="second" 
                    id="second" 
                    style={{ transform: `rotateZ(${maintainCurr}deg)` }}>
                        <div className="curr"/>
                    </div>


                    {/*
                    This second hand component renders for the current lap time 
                    and is blue. The second hand is updated by setting the rotation
                    to (Math.floor((totalTime + 1) % 60)) * 6 degrees. 
                    */}
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