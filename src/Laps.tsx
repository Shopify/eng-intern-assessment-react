import React from "react";
import moment from 'moment';
import Grid from "@mui/material/Grid";

export interface LapsProps {
  laps: number[];
  min: number;
  max: number;
}

export default function Laps({ laps, min, max }: LapsProps) {
  // Used a grid layout from MUI to format the laps.
  return laps.length > 0 ? (
    <div className="laps">
      {laps.map((t, index) => (
        <li
          key={index}
          className="lap"
          style={{
            color: index === min ? "green" : index === max ? "red" : "black",
          }}
          data-testid={`lap-${index + 1}`}
        >
          <Grid container spacing={6} justifyContent="space-around">
            <Grid
              item
              xs={3}
              alignItems="center"
              display="flex"
              justifyContent="center"
              alignSelf="center"
              fontWeight={300}
            >{`Lap ${index + 1}`}</Grid>

            <Grid
              item
              xs={3}
              alignItems="center"
              display="flex"
              justifyContent="center"
              alignSelf="center"
            >
              {t < 3600000 ? moment.utc(t).format("mm:ss.SS") : moment.utc(t).format("HH:mm:ss.SS")}
            </Grid>
          </Grid>
        </li>
      ))}
    </div>
  ) : (
    <div></div>
  );
}
