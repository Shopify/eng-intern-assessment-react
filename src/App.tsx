import React from "react";
import useStopwatch from "./hooks/useStopwatch";
import { Center, ChakraProvider, Container, VStack } from "@chakra-ui/react";
import "./global.css";
import StopWatch from "./StopWatch";
import StopWatchButton from "./StopWatchButton";

export default function App() {
	const stopwatch = useStopwatch();

	return (
		<ChakraProvider>
			<Center minW="100vw" minH="100vh" bgColor={"black"}>
                <VStack gap={6}>
                    <StopWatch {...stopwatch} />
                    <StopWatchButton {...stopwatch}/>
                </VStack>
			</Center>
		</ChakraProvider>
	);
}
