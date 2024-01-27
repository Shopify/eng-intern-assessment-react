import { render, fireEvent, within, act, getByText, queryByText, queryByRole, screen, waitFor} from '@testing-library/react';
import React from 'react';
import App from '../src/App';

//Using fake timers to test stopwatch time
jest.useFakeTimers();

//Mocks so jest avoids testing css and image
jest.mock('../src/css/app.css', () => {
    return {};
})
jest.mock('../src/css/stopwatch.css', () => {
    return {};
})

//Tests for stopwatch app
describe('Stopwatch Tests', ()=>{

    //Check initial button state
    it('App starts with start button', async() => {
        const {queryByTestId} = render(<App></App>);
        const startButton = queryByTestId("start-stop-button");
        expect(startButton).toBeTruthy();
    });

    it('Timer shows 1 millisecond after start and stop', async() => {
        const {queryByTestId} = render(<App></App>);
        const timeButton = queryByTestId("start-stop-button");
        fireEvent.click(timeButton);
        act(()=>{
            jest.advanceTimersByTime(10);
        })
        fireEvent.click(timeButton);
        expect(queryByTestId('time-string').textContent).toContain("00:00:00:01");
    });

    it('Lap button should not add to list if timer is zero', async()=>{
        const {getByTestId} = render(<App></App>);

        const testNumber: number = 3;
        for (let i=0; i<testNumber; i++){
            fireEvent.click(getByTestId("lap-button"));
        };
        await waitFor(() => {
            expect(screen.queryAllByRole('listitem').length).toBe(0);
        })
        
    })

    it('Lap button records 2 laps correctly', async()=>{
        const {getByTestId} = render(<App></App>);
        fireEvent.click(getByTestId('start-stop-button'));
        const testNumber: number = 2;
        for (let i=0; i<testNumber; i++){
            fireEvent.click(getByTestId("lap-button"));
        };
        await waitFor(() => {
            const items = screen.getAllByRole('listitem');
            expect(items.length).toBe(2);
        });
        
    })

    it('Reset button resets time to 0:00:00:00 and clears laps', async()=>{
        const {queryByTestId} = render(<App></App>);
        const startButton = queryByTestId("start-stop-button");
        const resetButton = queryByTestId("reset-button");
        fireEvent.click(startButton);
        act(()=>{
            jest.advanceTimersByTime(1000);
        })

        const testNumber: number = 3;
        for (let i=0; i<testNumber; i++){
            fireEvent.click(queryByTestId("lap-button"));
        };
        fireEvent.click(resetButton);

        expect(queryByTestId('time-string').textContent).toContain("0:00:00:00");
        expect(screen.queryAllByRole('listitem').length).toBe(0);

    })
});
