import { Box, HStack, Heading, VStack } from "@chakra-ui/react";
import React from "react";
import useStopwatch from "./hooks/useStopwatch";
import StopWatchButton from "./StopWatchButton";
import Laps from "./Laps";

export default function StopWatch() {
	const stopwatch = useStopwatch();
	const time = stopwatch.time;

	const seconds = time;
	const displaySeconds = seconds % 60;
	const totalMinutes = Math.floor(seconds / 60);
	const minutes = totalMinutes % 60;
	const hours = Math.floor(totalMinutes / 60);

	return (
		<VStack>
			<HStack>
				<Box bgColor={"white"} p={2} rounded="xl">
					<Heading size="3xl">
						{hours.toString().padStart(2, "0")}:{minutes.toString().padStart(2, "0")}:{displaySeconds.toString().padStart(2, "0")}
					</Heading>
				</Box>
			</HStack>
			<StopWatchButton {...stopwatch} />
			<Laps {...stopwatch} />
		</VStack>
	);
}
