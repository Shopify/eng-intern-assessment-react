import { createSlice } from '@reduxjs/toolkit'

// using redux toolkit for state management for the stopwatch
export interface TimerState {
	running: boolean,
	value: number,
	laptime: number,
	lapsum:number,
	reference: number,
	face: number,
	laps: Array<number>
}

// initialize the timer state
const initialState: TimerState = {
	running: false,
	value: 0,
	laptime:0,
	lapsum:0,
	reference: 0,
	face: 0,
	laps: [],
}

export const timerSlice = createSlice({
	name: 'timer',
	initialState,
	reducers: {
		update: (state) => {
			// on update, calculate running time based on current - reference
			state.value = Date.now() - state.reference;
			// have current laptime displayed
			state.laptime = state.value-state.lapsum;
			
		},

		start: (state) => {
			// set the reference for when the stopwatch began and set running to true
			state.reference = Date.now() - state.value;
			state.running = true;
		},

		stop: (state) => {
			// set running to false
			state.running = false;
		},

		reset: (state) => {
			// reset all values and set the reference to now
			// keep the running state as it was, if reset while running, start timer again from 0
			state.value = 0;
			state.laptime = 0;
			state.lapsum = 0;
			state.reference = Date.now();
			state.laps = [];
		},

		lap: (state) => {
			// add new laptime to the front of the list (adding to front for ease of use when mapping)
			// keeping tract of lumpsum to have current running lap time
			state.laps.unshift(state.laptime);
			state.lapsum+=state.laptime;
		},

		faceChange: (state) => {
			// changing the face of the watch
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