import { Flex, ListItem, OrderedList, Text } from "@chakra-ui/react";
import React from "react";

interface Props {
  timePassed: string;
  laps: string[];
}

export default function StopWatch({ timePassed, laps }: Props) {
  return (
    <Flex bgColor={"grey.50"} direction="column" gap={2} align="center">
      <Text fontSize={20}>{timePassed}</Text>
      <Text fontWeight={"bold"}>Lap Times</Text>
      <OrderedList spacing={2}>
        {laps.map((lap, index) => {
          return <ListItem key={index}>{lap}</ListItem>;
        })}
      </OrderedList>
    </Flex>
  );
}
