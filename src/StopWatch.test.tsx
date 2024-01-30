import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import StopWatch from './StopWatch';


describe(StopWatch, () => {
	// Test that the StopWatch component is rendered
	it('stopwatch displays correct initial time', () => {
		const { getByTestId } = render(<StopWatch />);
		const timeElement = getByTestId('time').textContent;
		expect(timeElement).toBe('00:00.000s');
	})

	// Test that the start button increments the time by 10 milliseconds on click
	it('time should increment by 10 milliseconds if the start button is clicked', async () => {
		const { getByRole, getByTestId } = render(<StopWatch />);
		const startButton = getByRole('button', { name: 'Start' });
		fireEvent.click(startButton);

		// Wait for the updated time to reflect in the DOM
		await waitFor(() => {
			const timeElement = getByTestId('time');
			expect(timeElement.textContent).toMatch(/00:00.\d{3}s/);
		});
	});

	// Test that the reset button rests the time to on click
	it('time should be reset to 0 if the reset button is clicked', async () => {
		const { getByRole, getByTestId } = render(<StopWatch />);
		// Click the Start button
		const startButton = getByRole('button', { name: 'Start' });
		fireEvent.click(startButton);

		// Wait for the timer to increment
		await waitFor(() => {
			const timeElement = getByTestId('time').textContent;
			expect(timeElement).toMatch(/00:00.\d{3}s/);
		});

		// Click the Reset button
		const resetButton = getByRole('button', { name: 'Reset' });
		fireEvent.click(resetButton);
	
		const timeAfterReset = getByTestId('time').textContent;
	
		// Check that the time is reset to 0
		expect(timeAfterReset).toBe('00:00.000s');
	});

	// Test that the stop button click stops the timer
	it('timer should stop if the stop button is clicked', async () => {
		const { getByRole, getByTestId } = render(<StopWatch />);
		const startButton = getByRole('button', { name: 'Start' });
		const stopButton = getByRole('button', { name: 'Stop' });
		// Click the Start button
		fireEvent.click(startButton);

		// Wait for the timer to increment
		await waitFor(() => {
			const timeElement = getByTestId('time');
			expect(timeElement.textContent).toMatch(/00:00.\d{3}s/);
		});

		// Click the Stop button
		fireEvent.click(stopButton);

		const timeAfterStop = getByTestId('time').textContent;

		// Wait to ensure the timer doesn't change further
		await waitFor(() => {
			const timeElement = getByTestId('time');
			expect(timeElement.textContent).toBe(timeAfterStop);
		});
	});

	// Test that the timer records laps
	it('timer should add lap if the lap button is clicked', async () => {
		const { getByRole, getByTestId } = render(<StopWatch />);
		const startButton = getByRole('button', { name: 'Start' });
		const lapButton = getByRole('button', { name: 'Lap' });

		// Click the start button
		fireEvent.click(startButton);

		// Wait for the timer to increment
		await waitFor(() => {
			const timeElement = getByTestId('time');
			expect(timeElement.textContent).toMatch(/00:00.\d{3}s/);
		});

		// Click the lap button
		fireEvent.click(lapButton);
		
		// Check that the lap is added to list of laps
		const laps = getByTestId('laps');
		expect(laps.children.length).toBe(1);
	});
})