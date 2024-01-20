import {expect, test} from '@jest/globals';
import {fireEvent, render, screen} from '@testing-library/react';
import StopWatch from '../../components/stop-watch/StopWatch';
import { StopWatchProps } from '../../props/StopWatchProps';
import React from 'react';

const MAX_LAPS_DISPLAY_NUM = 5;

const testTitleInputOnly: StopWatchProps =  {
    title: 'Test Title',
};

const testCorrectFullInput: StopWatchProps =  {
    title: 'Test Correct Full Input',
    time: 100,
    timelaps: [{time: 50, displayTime: "00:00:05"}],
};

const testMaxLapInput: StopWatchProps =  {
    title: 'Test Max Laps Rendered',
    time: 172,
    timelaps: [{time: 420, displayTime: "00:04:20"}, {time: 7777, displayTime: "02:17:77"},
    {time: 250, displayTime: "00:02:50"}, {time: 300, displayTime: "00:03:00"},
    {time: 1000, displayTime: "00:10:00"}, {time: 2250, displayTime: "00:22:50"}],
};

describe('StopWatch UI Tests', () => {
    test('should render correctly', () => {
        const wrapper = render(<StopWatch title={testTitleInputOnly.title} />);

        expect(wrapper).toBeDefined();

        const titleElement = screen.getByText(String(testTitleInputOnly.title));
        
        // Testing title
        expect(titleElement).toBeDefined();
        expect(titleElement.textContent).toEqual(testTitleInputOnly.title);

        // Testing time
        const timer = screen.getByTitle('timer');

        expect(timer).toBeDefined();
        expect(timer.textContent).toEqual("00:00:00");

        // Testing Buttons
        const start = screen.getByTitle('Start');
        const stop = screen.getByTitle('Stop');
        const reset = screen.getByTitle('Reset');
        const lap = screen.getByTitle('Lap');

        expect(start).toBeDefined();
        expect(stop).toBeDefined();
        expect(reset).toBeDefined();
        expect(lap).toBeDefined();

        // Testing timelaps
        const timelaps = screen.getByTitle('laps');

        expect(timelaps).toBeDefined();
        expect(timelaps.childNodes.length).toEqual(0);
    });
    test('should render correct props', () => {
        const wrapper = render(<StopWatch title={testCorrectFullInput.title} 
            time={testCorrectFullInput.time} timelaps={testCorrectFullInput.timelaps}/>);

        expect(wrapper).toBeDefined();

        // Testing Props
        const timer = screen.getByTitle('timer');
        const timelaps = screen.getByTitle('laps');

        expect(timer).toBeDefined();
        expect(timer.textContent).toEqual("00:00:10");

        // Test if lap and correct display time appears
        expect(timelaps).toBeDefined();
        expect(timelaps.childNodes.length).toEqual(1);
        expect(timelaps.childNodes[0]).toBeDefined();
        expect(timelaps.getElementsByTagName('h2')[0].textContent)
        .toEqual(testCorrectFullInput.timelaps[0].displayTime);
    });
    test('should limit number of laps', () => {
        const wrapper = render(<StopWatch title={testMaxLapInput.title} 
            time={testMaxLapInput.time} timelaps={testMaxLapInput.timelaps}/>);

        expect(wrapper).toBeDefined();

        // Testing laps
        const timelaps = screen.getByTitle('laps');

        expect(timelaps).toBeDefined();
        expect(timelaps.childNodes.length).toEqual(MAX_LAPS_DISPLAY_NUM);
        expect(timelaps.getElementsByTagName('h2')[0].textContent)
        .toEqual(testMaxLapInput.timelaps[5].displayTime);
    });
});

describe('StopWatch Function Tests', () => {
    let originalTime: String;
    beforeEach(() => {
        // render StopWatch component before each test
        render(<StopWatch title={testTitleInputOnly.title} />);
        originalTime = screen.getByTitle('timer').textContent;
    });

    test('StopWatch Start Functionality', () => {
        expect(originalTime).toEqual("00:00:00");

        const startButton = screen.getByTitle('Start');
        expect(startButton).toBeDefined();

        fireEvent.click(startButton); // click start button 

        // wait 1 second for timer to run
        setTimeout(() => {
            const clickOnceTime = screen.getByTitle('timer').textContent;
            expect(clickOnceTime).not.toEqual(originalTime);

            fireEvent.click(startButton);

            // Clicking start should not stop the timer
            setTimeout(() => {
                const clickTwiceTime = screen.getByTitle('timer').textContent;
                expect(clickTwiceTime).not.toEqual(clickOnceTime);
            }, 1000);
        }, 1000);
    });

    test('StopWatch Stop Functionality', () => {
        const startButton = screen.getByTitle('Start');
        const stopButton = screen.getByTitle('Stop');

        expect(startButton).toBeDefined();
        expect(stopButton).toBeDefined();

        fireEvent.click(startButton); // click start button 

        // wait 1 second for timer to run
        setTimeout(() => {
            fireEvent.click(stopButton); // click stop button

            const stopButtonTime = screen.getByTitle('timer').textContent;
            expect(stopButtonTime).not.toEqual(originalTime);

            // Clicking start should not stop the timer
            setTimeout(() => {
                const afterStopTime = screen.getByTitle('timer').textContent;
                expect(afterStopTime).toEqual(stopButtonTime);
            }, 1000);
        }, 1000);
    });

    test('StopWatch Reset Functionality', () => {
        const startButton = screen.getByTitle('Start');
        const resetButton = screen.getByTitle('Reset');

        expect(startButton).toBeDefined();
        expect(resetButton).toBeDefined();

        fireEvent.click(startButton); // click start button 

        // wait 1 second for timer to run
        setTimeout(() => {
            const clickOnceTime = screen.getByTitle('timer').textContent;
            expect(clickOnceTime).not.toEqual(originalTime);

            fireEvent.click(resetButton); // click reset button

            const resetTime = screen.getByTitle('timer').textContent;
            expect(resetTime).toEqual(originalTime);

            // Check that reset button stops timer
            setTimeout(() => {
                const afterResetTime = screen.getByTitle('timer').textContent
                expect(afterResetTime).toEqual(originalTime);
            }, 1000);
        }, 1000);
    });

    test('StopWatch Lap Functionality', () => {
        const startButton = screen.getByTitle('Start');
        const lapButton = screen.getByTitle('Lap');
        const stopButton = screen.getByTitle('Stop');

        expect(startButton).toBeDefined();
        expect(lapButton).toBeDefined();
        expect(stopButton).toBeDefined();

        const startingLaps = screen.getByTitle('laps');

        expect(startingLaps).toBeDefined();
        expect(startingLaps.childNodes.length).toEqual(0);

        // Add a lap at originalTime
        fireEvent.click(lapButton); // click on lap button

        const clickedOnceLaps = screen.getByTitle('laps');

        expect(clickedOnceLaps).toBeDefined();
        expect(clickedOnceLaps.childNodes.length).toEqual(1);
        expect(clickedOnceLaps.childNodes[0].textContent).toEqual(originalTime);

        fireEvent.click(startButton); // click on start button

         // wait 1 second for timer to run
        setTimeout(() => {
            fireEvent.click(stopButton); // click on stop button
            fireEvent.click(lapButton); // click on lap button

            const afterStopTime = screen.getByTitle('timer').textContent;
            expect(afterStopTime).not.toEqual(originalTime);

            const clickedTwiceLaps = screen.getByTitle('laps');
            expect(clickedTwiceLaps).toBeDefined();
            expect(clickedTwiceLaps.childNodes.length).toEqual(2);
            expect(clickedTwiceLaps.childNodes[1].textContent).toEqual(afterStopTime);
        }, 1000);
    });
});

