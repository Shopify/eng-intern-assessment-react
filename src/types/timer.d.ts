export type Timer = {
	time: number;
	isRunning: boolean;
	laps: Lap[];
};

type Lap = {
	number: number;
	lapTime: number;
	totalTime: number;
};
