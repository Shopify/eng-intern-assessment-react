import React, { useState, useEffect } from 'react';
import { CircularProgressbar, CircularProgressbarWithChildren, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import './custom.css';
type Props = {
    time: number;
    width: number;
}


export default function RadialSegment({ time, width }: Props) {


    const [nextMinute, setNextMinute] = useState(6000);
    const [nextSecond, setNextSecond] = useState(100);

    const minutes = Math.floor((time % 360000) / 6000);
    const seconds = Math.floor((time % 6000) / 100);
    const miliseconds = time % 100 / 10;
    const timeString = minutes + " : " + seconds + " : " + miliseconds;

    if (time === 0 && nextSecond > 100){
        //console.log("reset");
        setNextMinute(6000);
        setNextSecond(100);
    }

    if (time == nextSecond) {
        //console.log("nextSecond is now: ", nextSecond + 100);
        setNextSecond(nextSecond + 100);
    }
    if (time == nextMinute) {
        setNextMinute(nextMinute + 6000);
    }
    //console.log(time);
    // console.log(time + 100);
    //console.log("value: ", value);

    const minValue = (time - (nextMinute - 6000)) / 6000;
    const secValue = (time - (nextSecond - 100)) / 100;

    console.log(width);
    console.log(((width / 1080) * 100));

    let radialWidth = 35;

    if ((width / 1080) < 0.6) radialWidth = 60;

    return (
        <div style={{width: radialWidth + "%", margin: "auto"}}>
            {/*             <CircularProgressbarWithChildren strokeWidth={8} value={minValue} maxValue={1} text={`${minValue * 100}%`} styles={buildStyles({
 */}
            <CircularProgressbarWithChildren strokeWidth={8} value={secValue} maxValue={0.9} text={timeString} styles={buildStyles({
                // Rotation of path and trail, in number of turns (0-1)
                rotation: 0.5,

                // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
                strokeLinecap: 'butt',

                // Text size
                textSize: '16px',
                // How long animation takes to go from one percentage to another, in seconds

                pathTransitionDuration: secValue === 0 || secValue === 1 ? 0 : 0.15,

                // Can specify path transition in more detail, or remove it entirely
                //  pathTransition: 'none',
                //pathTransition: value === 0 ? "none" : "stroke-dashoffset 0.05s ease 0s"


                // Colors
                //pathColor: `rgba(62, 152, 199, ${value / 100})`,
                //textColor: '#f88',
                
                trailColor: 'none',
                //backgroundColor: '#3e98c7',
            })} >
                {/*           Width here needs to be (100 - 2 * strokeWidth)% 
 */}
                <div style={{ width: "84%" }}>
                    <CircularProgressbar strokeWidth={8} value={minValue} maxValue={1} styles={buildStyles({
                        // Rotation of path and trail, in number of turns (0-1)
                        rotation: 0.5,

                        // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
                        strokeLinecap: 'butt',
                        // Text size
                        //textSize: '16px',
                        // How long animation takes to go from one percentage to another, in seconds

                        pathTransitionDuration: minValue === 0 || minValue === 1 ? 0 : 0.15,

                        // Can specify path transition in more detail, or remove it entirely
                        //  pathTransition: 'none',
                        //pathTransition: value === 0 ? "none" : "stroke-dashoffset 0.05s ease 0s"

                        
                        // Colors
                        //pathColor: `rgba(62, 152, 199, ${value / 100})`,
                        //textColor: '#f88',
                        trailColor: 'none',
                        //backgroundColor: '#3e98c7',
                    })} />
                </div>
            </CircularProgressbarWithChildren>
            
        </div>
    )
}