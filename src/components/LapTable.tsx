import React from "react";
import { Table, Tbody, Td, Th, Thead, Tr, Box } from "@chakra-ui/react";
import formatTime from "../utils/formatTime";
import LapTableInterface from "../interfaces/LapTableProps";

export default function LapTable({ lapTimes }: LapTableInterface) {
  return (
    <Box
      position='absolute'
      top='25%'
      right='14rem'
      width='20%'
      display='flex'
      alignItems='center'
      justifyContent='center'
      zIndex='modal'
      maxHeight='55vh' // Set the max height to limit the overlay size
      overflowY='auto' // Add vertical scrollbar if needed
      padding={6}
      background='rgba(255, 255, 255, 0.1)'
      border='1px solid rgba(255, 255, 255, 0.2)'
      borderRadius={30}
    >
      <Table variant='simple' size='sm' colorScheme='blue' data-testid='lap-table'>
        <Thead>
          <Tr>
            <Th position='sticky' top='0'>
              Lap Number
            </Th>
            <Th position='sticky' top='0'>
              Lap Time
            </Th>
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
    </Box>
  );
}
