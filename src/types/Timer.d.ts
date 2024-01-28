export type Timer = {
	time: number | null;
	isRunning: boolean;
	laps: Lap[];
};

type Lap = {
	number: number;
	lapTime: number;
	totalTime: number;
};
