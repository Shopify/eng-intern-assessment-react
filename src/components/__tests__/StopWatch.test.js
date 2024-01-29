import React from 'react'
import {fireEvent, render, screen, act} from '@testing-library/react'
import StopWatch from '../StopWatch'
import '@testing-library/jest-dom'


describe('StopWatch', () => { 
    // Mock timers using jest
    jest.useFakeTimers();

    it('renders the stopwatch in the default state', () => { 
        render(<StopWatch />)

        expect(screen.getByRole('button', { name: 'Start'})).toBeInTheDocument()
        expect(screen.getByRole('button', { name: 'Lap' })).toBeInTheDocument()
        expect(screen.queryByText('00:00.00')).toBeInTheDocument()
    })

    it('starts and stops the stopwatch', () => { 
        render(<StopWatch/>)

        const startButton = screen.getByRole('button', { name: 'Start'})
        fireEvent.click(startButton)
        
        for (let i = 0; i < 30; i++) {
            act(() => {
                jest.advanceTimersByTime(10);
            });
        }
        const stopButton = screen.getByRole('button', { name: 'Stop'})
        fireEvent.click(stopButton)

        expect(screen.queryByText('00:00.30')).toBeInTheDocument()
    })


    it('resets stopwatch', () => { 
        render(<StopWatch/>)

        const startButton = screen.getByRole('button', { name: 'Start'})
        fireEvent.click(startButton)
        act(() => {
            jest.advanceTimersByTime(10);
        });
        const stopButton = screen.getByRole('button', { name: 'Stop'})
        fireEvent.click(stopButton)
        const resetButton = screen.getByRole('button', { name: 'Reset'})
        fireEvent.click(resetButton)

        expect(screen.queryByText('00:00.00')).toBeInTheDocument()

    })

      it('records and displays lap time', () => {
        render(<StopWatch/>)

        const startButton = screen.getByRole('button', { name: 'Start'})
        fireEvent.click(startButton)
        act(() => {
            jest.advanceTimersByTime(10);
        });
        const lapButton = screen.getByRole('button', { name: 'Lap'})
        fireEvent.click(lapButton)
        const stopButton = screen.getByRole('button', { name: 'Stop'})
        fireEvent.click(stopButton)

        expect(screen.queryByText('00:00.00')).not.toBeInTheDocument()
        expect(screen.getByText(/lap 1/i)).toBeInTheDocument()
        expect(screen.getAllByText(/00:00.01/i)[1]).toBeInTheDocument()

      });
})



