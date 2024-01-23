import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
import { act } from 'react-dom/test-utils'
import userEvent from "@testing-library/user-event"
import StopWatch from '../src/StopWatch'

describe('StopWatch', () => {
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });

    beforeEach(() => {
        jest.useFakeTimers();       
    });
   
    afterEach(() => {
        jest.clearAllTimers();
    });

    test('initial render is correct', () => {
        render(<StopWatch/>);
    
        expect(screen.getByText('00:00:00:00')).toBeInTheDocument();
        expect(screen.getByText('Start')).toBeInTheDocument();
        expect(screen.getByText('Start')).toBeEnabled();
        expect(screen.getByText('Stop')).toBeInTheDocument();
        expect(screen.getByText('Stop')).toBeDisabled();
        expect(screen.getByText('Reset')).toBeInTheDocument();
        expect(screen.getByText('Reset')).toBeEnabled();
        expect(screen.getByText('Lap')).toBeInTheDocument();
        expect(screen.getByText('Lap')).toBeDisabled();
    });

    test('button functionality when Start is clicked', async () => {
        render(<StopWatch/>);

        await user.click(screen.getByText('Start'));

        expect(screen.getByText('Start')).toBeDisabled();
        expect(screen.getByText('Stop')).toBeEnabled();
        expect(screen.getByText('Reset')).toBeDisabled();
        expect(screen.getByText('Lap')).toBeEnabled();
    });

    test('Start then Stop', async () => {
        render(<StopWatch/>);

        const startButton =  await screen.findByTestId('startButton');
        const stopButton =  await screen.findByTestId('stopButton');
        const time =  await screen.findByTestId('timeDisplay');
        
        await user.click(startButton);

        act(() => {
            jest.advanceTimersByTime(10);  
        });

        await user.click(stopButton);
    
        await waitFor(() => expect(time.textContent).toContain('00:00:00:01'));
        expect(startButton).toBeEnabled();
        expect(stopButton).toBeDisabled();
        expect(screen.getByText('Reset')).toBeEnabled();
        expect(screen.getByText('Lap')).toBeDisabled();
    });

    test('Reset functions properly', async () => {
        render(<StopWatch/>);

        const startButton =  await screen.findByTestId('startButton');
        const stopButton =  await screen.findByTestId('stopButton');
        const resetButton = await screen.findByTestId('resetButton');
        const time =  await screen.findByTestId('timeDisplay');
        
        await user.click(startButton);

        act(() => {
            jest.advanceTimersByTime(10);  
        });

        await user.click(stopButton);

        await waitFor(() => expect(time.textContent).toContain('00:00:00:01'));

        await user.click(resetButton);

        await waitFor(() => expect(time.textContent).toContain('00:00:00:00'));
    });

    test('Lap functions properly', async () => {
        render(<StopWatch/>);

        const startButton =  await screen.findByTestId('startButton');
        const lapButton =  await screen.findByTestId('lapButton');

        await user.click(startButton);

        act(() => {
            jest.advanceTimersByTime(10);  
        });

        await user.click(lapButton);
        
        const lap = screen.getByRole('listitem');
        expect(lap).toHaveTextContent('Lap 1 : 00:00:00:01');
    });

    test('multiple Laps function properly', async () => {
        render(<StopWatch/>);

        const startButton =  await screen.findByTestId('startButton');
        const lapButton =  await screen.findByTestId('lapButton');

        await user.click(startButton);

        act(() => {
            jest.advanceTimersByTime(10);  
        });

        await user.click(lapButton);
        
        const lap = screen.getByRole('listitem');
        expect(lap).toHaveTextContent('Lap 1 : 00:00:00:01');

        act(() => {
            jest.advanceTimersByTime(10);  
        });

        await user.click(lapButton);

        const laps = screen.getAllByRole('listitem');
        expect(laps[0]).toHaveTextContent('Lap 1 : 00:00:00:01');
        expect(laps[1]).toHaveTextContent('Lap 2 : 00:00:00:02');
    });
});
