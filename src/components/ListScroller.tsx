/**
 * @author Joshua Dierickse <jpcdieri@uwaterloo.ca>
 */

// Imports all dependencies
import React from 'react';
import List from '@mui/material/List';
import LapComponent from './LapComponent';

/**
 * Generates a scrollable list that houses all the lap list items
 *
 * @param timeList - a list of JavaScript objects with key value pairs for absTime (the absolute time) and lapTime (the lap time)
 * @return JSX Element that is the scrollable list
 */
export default function ListScroller(props: { timeList: { absTime: number, lapTime: number }[] }) {
  return (
    <div>

        {/* Adding styling to make list scrollable */}
        <List
            sx={{
                width: "300px",
                maxHeight: "250px",
                overflow: "auto"
            }}
        >

        {/* Creates a lap component for each individual value in the timeList */}
        {props.timeList.map((timeItem, index) => {
            return (
                <LapComponent
                    key={index}
                    lapNumber={index}
                    absTime={timeItem.absTime}
                    lapTime={timeItem.lapTime}
                />
            );
        })}
        </List>
    </div>
  );
}