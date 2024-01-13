import {
	Box,
	Heading,
	Table,
	TableCaption,
	TableContainer,
	Tbody,
	Td,
	Th,
	Thead,
	Tr,
} from "@chakra-ui/react";
import React from "react";

interface LapsProps {
	laps: number[];
}

export default function Laps({ laps }: LapsProps) {
	return (
		<TableContainer bgColor="white" rounded="xl" p={4} h='50vh' maxHeight="50vh" overflowY='auto'>
			<Heading>Laps</Heading>
			<Table overflowY='auto'>
				<Thead>
					<Tr>
						<Th>Lap Number</Th>
						<Th>Time (hh:mm:ss)</Th>
						<Th>Difference</Th>
					</Tr>
				</Thead>
				<Tbody data-testid="lap-list">
					{laps.map((lap, index) => {
						const seconds = lap;
                        const displaySeconds = seconds % 60;
						const totalMinutes = Math.floor(seconds / 60);
						const minutes = totalMinutes % 60;
						const hours = Math.floor(totalMinutes / 60);

                        const prevSeconds = index === 0 ? 0 : laps[index - 1];
                        const prevDiff = lap - prevSeconds;
						const prevDisplaySeconds = prevDiff % 60;
						const prevTotalMinutes = Math.floor(prevDiff / 60);
						const prevMinutes = prevTotalMinutes % 60;
						const prevHours = Math.floor(prevTotalMinutes / 60);

						return (
							<Tr key={index}>
								<Td>{index + 1}</Td>
								<Td>
                                {hours.toString().padStart(2, '0')}:{minutes.toString().padStart(2, '0')}:{displaySeconds.toString().padStart(2, '0')}
								</Td>
								<Td>
									{index === 0 ? '-' : `${prevHours.toString().padStart(2, '0')}:${prevMinutes.toString().padStart(2, '0')}:${prevDisplaySeconds.toString().padStart(2, '0')}`}
								</Td>
							</Tr>
						);
					})}
				</Tbody>
			</Table>
		</TableContainer>
	);
}
