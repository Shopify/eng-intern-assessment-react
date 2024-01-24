import { createSlice } from '@reduxjs/toolkit'
import { Console } from 'console';

export interface TimerState {
	running: boolean,
	value: number,
	reference: number,
	face: number,
	laps: Array<number>
}

const initialState: TimerState = {
	running: false,
	value: 0,
	reference: 0,
	face: 0,
	laps: [],
}

export const timerSlice = createSlice({
	name: 'timer',
	initialState,
	reducers: {
		update: (state) => {
			state.value = Date.now() - state.reference;
		},
		start: (state) => {
			state.reference = Date.now() - state.value;
			state.running = true;
		},
		stop: (state) => {
			state.running = false;
		},
		reset: (state) => {
			state.value = 0;
			state.reference = Date.now();
			state.laps = [];
		},
		lap: (state) => {
			console.log(state.value);
			state.laps.push(state.value);
			state.laps.forEach((lap) => { console.log(lap) });
		},
		faceChange: (state) => {
			if (state.face == 2) {
				state.face = 0;
			}
			else {
				state.face += 1;
			}

		}
	},
})

export const { start, stop, reset, update, faceChange, lap } = timerSlice.actions

export default timerSlice.reducer