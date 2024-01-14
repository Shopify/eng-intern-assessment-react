import { Box, HStack, Heading, VStack } from "@chakra-ui/react";
import React from "react";
import useStopwatch from "./hooks/useStopwatch";
import StopWatchButton from "./StopWatchButton";
import Laps from "./Laps";
import { useFormattedTime } from "./hooks/useFormattedTime";

export default function StopWatch() {
	const stopwatch = useStopwatch();
	const time = stopwatch.time;

	// Getting formatted time
	const { h, m, s } = useFormattedTime(time);

	return (
		<VStack>
			<HStack>
				<Box bgColor={"white"} p={2} rounded="xl">
					<Heading size="3xl">
						{h.toString().padStart(2, "0")}:
						{m.toString().padStart(2, "0")}:
						{s.toString().padStart(2, "0")}
					</Heading>
				</Box>
			</HStack>
			<StopWatchButton {...stopwatch} />
			<Laps {...stopwatch} />
		</VStack>
	);
}
