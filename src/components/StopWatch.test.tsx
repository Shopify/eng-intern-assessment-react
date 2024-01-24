import React from 'react'
import { render, fireEvent, screen, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
import StopWatch from './StopWatch'

describe('StopWatch Component', () => {

    test('start and stop buttons switch correctly', () => {
        const { getByText } =  render(<StopWatch />)
    
        const startButton = getByText('Start')  

        // Click the Start button
        fireEvent.click(startButton)
       
        const stopButton = getByText('Stop')
        expect(stopButton).toBeInTheDocument()
    
        // Click the Stop button
        fireEvent.click(stopButton)
        expect(startButton).toBeInTheDocument()
    })

    test('lap and reset buttons switch correctly', () => {
        const { getByText } = render(<StopWatch />)

        const startButton = getByText('Start') 
        // Click the Start button
        fireEvent.click(startButton)

        const lapButton = getByText('Lap')
        expect(lapButton).toBeInTheDocument()

        const stopButton = getByText('Stop')
        // Click the Stop button
        fireEvent.click(stopButton)
    
        const resetButton = getByText('Reset')
        expect(resetButton).toBeInTheDocument()
        // Click the reset button
        fireEvent.click(resetButton)
        
    });

    test('should reset the timer', async () => {
        render(<StopWatch />)
        const startButton = screen.getByText(/start/i)
        fireEvent.click(startButton);

        const stopButton = screen.getByText(/stop/i)
        fireEvent.click(stopButton);

        // Reset the timer
        const resetButton = screen.getByText(/reset/i)
        fireEvent.click(resetButton)

        // Check if the timer is reset
        expect(screen.getByText('00.00')).toBeInTheDocument()
    });

    test('should record laps', async () => {
        render(<StopWatch />);
        const startButton = screen.getByText(/start/i)
        fireEvent.click(startButton)

        const lapButton = screen.getByText(/lap/i)

        // Record a lap
        fireEvent.click(lapButton)
        // check if the lap is recorded
        expect(screen.getByText(/lap 1/i)).toBeInTheDocument()

        // Record another lap
        fireEvent.click(lapButton)
        expect(screen.getByText(/lap 2/i)).toBeInTheDocument()
    });
});
