import {
	Heading,
	Table,
	TableContainer,
	Tbody,
	Td,
	Th,
	Thead,
	Tr,
} from "@chakra-ui/react";
import React from "react";
import { useFormattedTime } from "./hooks/useFormattedTime";

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
						
						// Getting formatted for current lap
						const { h, m, s } = useFormattedTime(lap);
                        const prevSeconds = index === 0 ? 0 : laps[index - 1];
                        const prevDiff = lap - prevSeconds;
						// Getting formatted time for pervious lap
						const { h: prevH, m: prevM, s: prevS } = useFormattedTime(prevDiff);

						return (
							<Tr key={index}>
								<Td>{index + 1}</Td>
								<Td>
                                {h.toString().padStart(2, '0')}:{m.toString().padStart(2, '0')}:{s.toString().padStart(2, '0')}
								</Td>
								<Td>
									{index === 0 ? '-' : `${prevH.toString().padStart(2, '0')}:${prevM.toString().padStart(2, '0')}:${prevS.toString().padStart(2, '0')}`}
								</Td>
							</Tr>
						);
					})}
				</Tbody>
			</Table>
		</TableContainer>
	);
}
