import React from "react";
import { Typography, Divider, Box } from "@mui/material";
import "../styles/stopwatch.css";
import getWinningLaps from "../helpers/getWinningLaps";
import formatTime from "../helpers/formatTime";

interface StopWatchLapsType {
  time: number;
  curLap: number;
  laps: number[];
}
export default function StopWatchLaps({
  time,
  curLap,
  laps,
}: StopWatchLapsType) {
  const { gold, silver, bronze } = getWinningLaps(laps);
  return (
    <Box className="stopwatch-laps">
      <Typography className="stopwatch-time">
        {/* Display current lap only when stopwatch has began running */}
        {time > 0 && (
          <>
            <Divider />
            <Box display="flex" justifyContent="space-between" margin="5px">
              <Box>Lap {laps.length + 1}</Box>
              <Box>{formatTime(curLap)}</Box>
            </Box>
          </>
        )}
        {/* Display all laps from most to least recent, highlighting top 3 laps */}
        {laps.map((timestamp, i) => (
          <Box key={i} data-testid={i}>
            <Divider />
            <Box
              display="flex"
              justifyContent="space-between"
              margin="5px"
              sx={{
                backgroundColor:
                  laps.length && i === gold
                    ? "#ffffc2"
                    : i === silver
                    ? "#e9e9e9"
                    : i === bronze
                    ? "#f4e8dc"
                    : "",
              }}
            >
              <Box>
                Lap {laps.length - i}{" "}
                {laps.length
                  ? i === gold
                    ? "🥇"
                    : i === silver
                    ? "🥈"
                    : i === bronze
                    ? "🥉"
                    : ""
                  : ""}
              </Box>
              <Box>{formatTime(timestamp)}</Box>
            </Box>
          </Box>
        ))}
      </Typography>
    </Box>
  );
}
