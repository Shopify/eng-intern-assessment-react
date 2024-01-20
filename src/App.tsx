import {
  Grid,
  List,
  ListItem,
  ListItemText,
  ListSubheader,
} from "@mui/material";
import React, { useCallback, useState, useEffect } from "react";
import StopWatch from "./StopWatch";
import StopWatchButton from "./StopWatchButton";
import formatTime from "./util";

export default function App() {
  const [isStarted, setIsStarted] = useState<boolean>(false);
  const [time, setTime] = useState<number>(0);
  const [lapsList, setLapsList] = useState<number[]>([]);
  const start = useCallback(() => {
    setIsStarted(true);
  }, []);
  const stop = useCallback(() => {
    setIsStarted(false);
  }, []);
  const reset = useCallback(() => {
    setIsStarted(false);
    setTime(0);
    setLapsList([]);
  }, []);
  const lap = useCallback(() => {
    // add the a new time to the lap list
    setLapsList([time, ...lapsList]);
  }, [time]);
  useEffect(() => {
    let interval: string | NodeJS.Timeout;
    if (isStarted) {
      interval = setInterval(() => setTime((prev_time) => prev_time + 10), 10);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval); //clean up effect
  }, [isStarted]);
  return (
    <Grid
      container
      spacing={4}
      direction="column"
      justifyContent="center"
      alignItems="center"
      sx={{ minHeight: "100vh" }}
    >
      <Grid item>
        <StopWatch time_value={time} />
      </Grid>
      <Grid item>
        <StopWatchButton
          isStarted={isStarted}
          start={start}
          stop={stop}
          lap={lap}
          reset={reset}
        />
      </Grid>
      <Grid item>
        <List sx={{ overflow: "auto", height: 200, width: 200, boxShadow: 2 }}>
          <ListSubheader>Laps</ListSubheader>
          {lapsList.map((lap) => {
            const format_time_arr: string[] = formatTime(lap);
            const time_string: string = `${format_time_arr[0]}: ${format_time_arr[1]}: ${format_time_arr[2]}`;
            return (
              <ListItem>
                <ListItemText primary={time_string} />
              </ListItem>
            );
          })}
        </List>
      </Grid>
    </Grid>
  );
}
