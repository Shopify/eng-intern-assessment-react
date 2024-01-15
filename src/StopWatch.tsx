import React from "react";
import {
  Heading,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Box,
} from "@chakra-ui/react";
import StopWatchButton from "./StopWatchButton";
import "./app.css";

type Lap = {
  lapId: number;
  lapTime: number;
  totalTime: number;
};

type StopWatchProps = {
  start: boolean;
  setStart: React.Dispatch<React.SetStateAction<boolean>>;
  time: number;
  setTime: React.Dispatch<React.SetStateAction<number>>;
  laps: Lap[];
  setLaps: React.Dispatch<React.SetStateAction<Lap[]>>;
  lapTime: number;
  setLapTime: React.Dispatch<React.SetStateAction<number>>;
};

export default function StopWatch({
  start,
  setStart,
  time,
  setTime,
  laps,
  setLaps,
  lapTime,
  setLapTime,
}: StopWatchProps) {
  const timeify = (time: number) => {
    const hours = Math.floor(time / 360000);
    const minutes = Math.floor((time % 360000) / 6000);
    const seconds = Math.floor((time % 6000) / 100);
    const milliseconds = time % 100;

    return (
      hours.toString().toString().padStart(2, "0") +
      ":" +
      minutes.toString().padStart(2, "0") +
      ":" +
      seconds.toString().padStart(2, "0") +
      ":" +
      milliseconds.toString().padStart(2, "0")
    );
  };

  return (
    <div>
      <div className="stop-watch">{timeify(time)}</div>
      <StopWatchButton
        start={start}
        setStart={setStart}
        setTime={setTime}
        time={time}
        laps={laps}
        setLaps={setLaps}
        lapTime={lapTime}
        setLapTime={setLapTime}
      ></StopWatchButton>
      {laps.length != 0 ? (
        <div className="laps">
          <div>
            <TableContainer>
              <Box overflowY="scroll" maxHeight="300px">
                <Table variant="simple" size={"lg"}>
                  <Thead position={"sticky"}>
                    <Tr>
                      <Th>Lap</Th>
                      <Th>Time</Th>
                      <Th>Total Time</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {laps.map(lap => (
                      <Tr>
                        <Th>{lap.lapId}</Th>
                        <Th>{timeify(lap.lapTime)}</Th>
                        <Th>{timeify(lap.totalTime)}</Th>
                      </Tr>
                    ))}{" "}
                  </Tbody>
                </Table>
              </Box>
            </TableContainer>
          </div>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
}
