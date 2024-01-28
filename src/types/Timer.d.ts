type Timer = {
	time: number | null;
	isRunning: boolean;
	laps: Lap[];
};

type Lap = {
	time: number;
};
