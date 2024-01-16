import React from "react";
import { Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import formatTime from "../utils/formatTime";
import LapTableInterface from "../interfaces/LapTableInterface";

export default function LapTable({ lapTimes }: LapTableInterface) {
  return (
    <Table variant='simple' size='sm'>
      <Thead>
        <Tr>
          <Th>Lap Number</Th>
          <Th isNumeric>Lap Time</Th>
        </Tr>
      </Thead>
      <Tbody>
        {lapTimes.map(lap => (
          <Tr key={lap.lapNumber}>
            <Td>{lap.lapNumber}</Td>
            <Td isNumeric>{formatTime(lap.lapTime)}</Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
}
