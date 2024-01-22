import { createSlice } from '@reduxjs/toolkit'

export interface TimerState {
    running: boolean,
    value: number,
    reference: number,
    face: number
}

const initialState: TimerState = {
    running:false,
    value: 0,
    reference:0,
    face:0,
}

export const timerSlice = createSlice({
    name: 'timer',
    initialState,
    reducers: {
        update: (state) => {
            state.value = (Date.now() - state.reference);
        },
        start: (state) => {
            state.running = true;
            if(state.value == 0){
                state.reference = Date.now();
            }
        },
        stop: (state) => {
            state.running = false;
        },
        reset: (state) => {
            state.value = 0;
            state.reference = Date.now();
        },
        faceChange: (state) =>{
            if (state.face == 1){
                state.face = 0;
            }
            else{
                state.face = 1;
            }
            
        }
    },
})

export const { start, stop, reset, update, faceChange } = timerSlice.actions

export default timerSlice.reducer