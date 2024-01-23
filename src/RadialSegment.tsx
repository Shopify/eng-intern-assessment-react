import React, { useState } from 'react';
import { CircularProgressbar, CircularProgressbarWithChildren, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import './custom.css';
type Props = {
    time: number;
    width: number;
}


export default function RadialSegment({ time, width }: Props) {

    // States for tracking time of next minute and second for radial progress animation
    const [nextMinute, setNextMinute] = useState(6000);
    const [nextSecond, setNextSecond] = useState(100);

    // Calculating time increments
    const minutes = Math.floor((time % 360000) / 6000);
    const seconds = Math.floor((time % 6000) / 100);
    const miliseconds = time % 100 / 10;

    // Building string of time
    const timeString = minutes + " : " + seconds + " : " + miliseconds;

    // If timer is reset
    if (time === 0 && nextSecond > 100) {
        // Reset next minute and second states
        setNextMinute(6000);
        setNextSecond(100);
    }

    // If time increments are met
    if (time == nextSecond) {
        // Increment nextSecond state
        setNextSecond(nextSecond + 100);
    }
    if (time == nextMinute) {
        setNextMinute(nextMinute + 6000);
    }

    // Calculate radial value for mins and secs
    const minValue = (time - (nextMinute - 6000)) / 6000;
    const secValue = (time - (nextSecond - 100)) / 100;

    // Set initial width of CircularProgressBar
    let radialWidth = 35;

    // If screen width is under 60% of 1080, increase radialWidth
    if ((width / 1080) < 0.6) radialWidth = 60;

    return (
        // Wrapper div
        <div style={{ width: radialWidth + "%", margin: "auto" }} data-testid="radial_element" >
            {/* CirculatProgressbarWithChildren for seconds to have nested radial bars */}
            <CircularProgressbarWithChildren  strokeWidth={8} value={secValue} maxValue={0.9} text={timeString} styles={buildStyles({
                // Rotation of path and trail, in number of turns (0-1)
                rotation: 0.5,

                // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
                strokeLinecap: 'butt',

                // Text size
                textSize: '16px',

                // How long animation takes to go from one percentage to another, in seconds
                pathTransitionDuration: secValue === 0 || secValue === 1 ? 0 : 0.15,

                // Color of radial trail
                trailColor: 'none',
            })} >
                {/* Width here needs to be (100 - 2 * strokeWidth)%  for good looking nesting*/}
                <div style={{ width: "84%" }}>
                    {/* Interior CircularProgressbar for minutes */}
                    <CircularProgressbar strokeWidth={8} value={minValue} maxValue={1} styles={buildStyles({
                        // Rotation of path and trail, in number of turns (0-1)
                        rotation: 0.5,

                        // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
                        strokeLinecap: 'butt',

                        // How long animation takes to go from one percentage to another, in seconds
                        pathTransitionDuration: minValue === 0 || minValue === 1 ? 0 : 0.15,

                        // Color of radial trail
                        trailColor: 'none',
                    })} />
                </div>
            </CircularProgressbarWithChildren>
        </div>
    )
}