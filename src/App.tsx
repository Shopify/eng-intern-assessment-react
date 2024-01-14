import React from "react";
import { Center, ChakraProvider, Container, VStack } from "@chakra-ui/react";
import "./global.css";
import StopWatch from "./StopWatch";

export default function App() {
	return (
		<ChakraProvider>
			<Center minW="100vw" minH="100vh" bgColor={"black"}>
				<VStack gap={6}>
					<StopWatch />
				</VStack>
			</Center>
		</ChakraProvider>
	);
}
