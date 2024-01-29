import React from "react";
import {
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
} from "@chakra-ui/react";
import { useStopWatchContext } from "./Context";

export default function StopWatch() {
  const { laps, formatTime } = useStopWatchContext();
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      marginTop="48px"
      height="50vh"
    >
      {laps.length > 0 ? (
        <TableContainer overflowY="scroll">
          <Table variant="simple" color="white" width="500px">
            <Thead>
              <Tr>
                <Th color="white">Lap</Th>
                <Th color="white">Time</Th>
                <Th color="white">Total Time</Th>
              </Tr>
            </Thead>
            <Tbody>
              {laps.map((lap: number, i: number) => {
                const previousTime = i > 0 ? laps[i - 1] : 0;
                return (
                  <Tr key={i}>
                    <Td>{i + 1}</Td>
                    <Td>{formatTime(lap - previousTime)}</Td>
                    <Td>{formatTime(lap)}</Td>
                  </Tr>
                );
              })}
            </Tbody>
          </Table>
        </TableContainer>
      ) : (
        <></>
      )}
    </Box>
  );
}
