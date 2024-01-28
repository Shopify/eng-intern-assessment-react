export type Timer = {
	time: number;
	isRunning: boolean;
	laps: Lap[];
};

type Lap = {
	number: number;
	totalTime: number;
};
