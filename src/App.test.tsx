import React from 'react';
import { act, render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import App from './App';

describe('stopwatch', () => {
	test('renders with initial state', () => {
		render(<App />);

		expect(screen.getByTestId('stopwatch-time')).toHaveTextContent(
			'00:00:00.00'
		);
		expect(screen.getByText('Start')).toBeInTheDocument();
		expect(screen.getByText('Reset')).toBeInTheDocument();

		expect(screen.queryByTestId('stopwatch-laps')).not.toContainElement(
			document.querySelector('.lap-entry')
		);
	});

	test('starts on button click and updates buttons accordingly', async () => {
		jest.useFakeTimers();

		render(<App />);

		fireEvent.click(screen.getByText('Start'));

		await act(async () => {
			jest.advanceTimersByTime(1000);
		});

		expect(screen.getByTestId('stopwatch-time')).toHaveTextContent(
			'00:00:01.00'
		);

		expect(screen.getByText('Stop')).toBeInTheDocument();
		expect(screen.getByText('Lap')).toBeInTheDocument();

		jest.useRealTimers();
	});

	test('stops on button click and updates buttons accordingly', async () => {
		jest.useFakeTimers();

		render(<App />);

		fireEvent.click(screen.getByText('Start'));

		await act(async () => {
			jest.advanceTimersByTime(1000);
		});

		jest.useRealTimers();

		fireEvent.click(screen.getByText('Stop'));

		expect(screen.getByTestId('stopwatch-time')).toHaveTextContent(
			'00:00:01.00'
		);

		jest.useFakeTimers();

		await act(async () => {
			jest.advanceTimersByTime(1000);
		});

		// Since the stopwatch is stopped, the displayed time should remain the same.
		expect(screen.getByTestId('stopwatch-time')).toHaveTextContent(
			'00:00:01.00'
		);

		expect(screen.getByText('Start')).toBeInTheDocument();
		expect(screen.getByText('Reset')).toBeInTheDocument();

		jest.useRealTimers();
	});

	test('resets state on button click', async () => {
		jest.useFakeTimers();

		render(<App />);

		fireEvent.click(screen.getByText('Start'));

		await act(async () => {
			jest.advanceTimersByTime(1000);
		});

		jest.useRealTimers();

		fireEvent.click(screen.getByText('Stop'));
		fireEvent.click(screen.getByText('Reset'));

		expect(screen.getByTestId('stopwatch-time')).toHaveTextContent(
			'00:00:00.00'
		);
		expect(screen.queryByTestId('stopwatch-laps')).not.toContainElement(
			document.querySelector('.lap-entry')
		);
	});

	test('records and updates laps on button click', async () => {
		jest.useFakeTimers();

		render(<App />);

		fireEvent.click(screen.getByText('Start'));

		await act(async () => {
			jest.advanceTimersByTime(1000);
		});

		fireEvent.click(screen.getByText('Lap'));

		expect(screen.queryByTestId('stopwatch-laps')).toContainElement(
			screen.getAllByText('00:00:01.00')[1]
		);

		fireEvent.click(screen.getByText('Lap'));

		jest.useRealTimers();
	});
});
