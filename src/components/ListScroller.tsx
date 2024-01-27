import React from 'react';
import List from '@mui/material/List';
import LapComponent from './LapComponent';

export default function ListScroller(props: { timeList: { absTime: number, lapTime: number }[] }) {
  return (
    <List
        sx={{
            width: "300px",
            overflow: "auto",
            maxHeight: "250px",
        }}
    >
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
  );
}