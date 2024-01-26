import { render, fireEvent, within, getAllByTestId, queryByTestId } from '@testing-library/react';
import React from 'react';
import App from './App';

//Mocks so jest avoids testing css and image
jest.mock('./styles.css', () => {
    return {}
})
jest.mock('../public/Shopify-Logo.png', () => {
    return {}
  })

//Tests for stopwatch
describe('Stopwatch Tests', ()=>{

    it('App starts with start button', async() => {
        const {queryByTestId} = render(<App></App>);
        const startButton = queryByTestId("start-button");
        expect(startButton).toBeTruthy();
        expect(queryByTestId("stop-buttton")).toBeNull();
    });

    it('Start button should become stop button after click', async() => {
        const {queryByTestId} = render(<App></App>);
        const startButton = queryByTestId("start-button");
        fireEvent.click(startButton);
        expect(queryByTestId("stop-button")).toBeTruthy();
        expect(queryByTestId("start-button")).toBeNull();
    });

    it('Lap button should correct number of laps to the list', async()=>{
        const {getByTestId} = render(<App></App>);

        //Number of times lap button is pressed
        const testNumber: number = 3;
        for (let i=0; i<testNumber; i++){
            fireEvent.click(getByTestId("lap-button"));
        };

        //Check if number of laps is correct
        const list = getByTestId("laps");
        const {getAllByRole} = within(list);
        const items = getAllByRole('listitem');
        expect(items.length).toBe(testNumber);
    })

    it('Reset button resets time to 0:00:00:00 and clears laps', async()=>{
        const {queryByTestId} = render(<App></App>);
        const startButton = queryByTestId("start-button");
        const resetButton = queryByTestId("reset-button");
        fireEvent.click(startButton);
        //Number of times lap button is pressed
        const testNumber: number = 3;
        for (let i=0; i<testNumber; i++){
            fireEvent.click(queryByTestId("lap-button"));
        };
        fireEvent.click(resetButton);
        //Check if time has reset
        expect(queryByTestId('stopwatch-time').textContent).toContain("0:00:00:00");
        //Check if laps has cleared
        expect(queryByTestId("laps")).toBeNull();
    })
});

