import React from 'react';
import List from '@mui/material/List';
import LapComponent from './LapComponent';

export default function ListScroller(props: { timeList: number[][] }) {
  return (
    <List
        sx={{
            width: "300px",
            overflow: "auto",
            maxHeight: "250px",
        }}
    >
    {props.timeList.map((labTime, index) => {
        return (
            <LapComponent
                key={index}
                lapNumber={index}
                absTime={labTime[0]}
                lapTime={labTime[1]}
            />
        );
    })}
    </List>
  );
}