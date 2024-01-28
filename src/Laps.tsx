import React from "react";
import { format } from "date-fns";
import Grid from "@mui/material/Grid";

interface LapsProps {
  //   time: number;
  laps: number[];
  min: number;
  max: number;
}

export default function Laps({ laps, min, max }: LapsProps) {
  return laps.length > 0 ? (
    <div className="laps">
      {laps.map((t, index) => (
        <li
          key={index}
          style={{
            color: index === min ? "green" : index === max ? "red" : "black",
          }}
        >
          <Grid container spacing={6} justifyContent="space-around">
            <Grid
              item
              xs={3}
              alignItems="center"
              display="flex"
              justifyContent="center"
              alignSelf="center"
            >{`Lap: ${index}`}</Grid>

            <Grid
              item
              xs={3}
              alignItems="center"
              display="flex"
              justifyContent="center"
              alignSelf="center"
            >
              {t < 3600000
                ? format(new Date(t), "mm:ss.SS")
                : format(new Date(t), "hh:mm:ss.SS")}
            </Grid>
          </Grid>
        </li>
      ))}
    </div>
  ) : (
    <div></div>
  );
}
