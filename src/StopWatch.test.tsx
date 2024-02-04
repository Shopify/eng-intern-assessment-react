import React from 'react';

import {
	act,
	fireEvent,
	queryByRole,
	render,
	screen,
} from '@testing-library/react';

import StopWatch, { formatTime } from './StopWatch';

test('render', () => {
	const { getByRole } = render(<StopWatch />);
	expect(getByRole('main')).not.toBeNull();
});

describe('time formatting', () => {
	test('formats time correctly', () => {
		expect(formatTime(0)).toBe('--:--:--');
		expect(formatTime(3000)).toBe('00:30:00');
		expect(formatTime(6000)).toBe('01:00:00');
		expect(formatTime(359999)).toBe('59:59:99');
		expect(formatTime(360000)).toBe('1h 00:00:00');
	});
});

describe('testing timer', () => {
	beforeEach(() => {
		jest.useFakeTimers();
	});

	test('timer start on start click', () => {
		const intervalSpy = jest.spyOn(global, 'setInterval');
		render(<StopWatch />);

		const startBtn = screen.getByRole('button', { name: 'Start' });
		act(() => {
			fireEvent.click(startBtn);
			jest.advanceTimersByTime(1000);
		});
		expect(intervalSpy).toHaveBeenCalledTimes(1);
	});

	test('stops timer on stop click', () => {
		const intervalSpy = jest.spyOn(global, 'setInterval');

		render(<StopWatch />);

		const startBtn = screen.getByRole('button', { name: 'Start' });
		act(() => {
			fireEvent.click(startBtn);
			jest.advanceTimersByTime(1000);
		});
		expect(intervalSpy).toHaveBeenCalledTimes(1);
		const stopBtn = screen.getByRole('button', { name: 'Stop' });
		act(() => {
			fireEvent.click(stopBtn);
			jest.advanceTimersByTime(3000);
		});
		expect(intervalSpy).toHaveBeenCalledTimes(1);
	});

	test('reset timer on reset click', () => {
		const intervalSpy = jest.spyOn(global, 'setInterval');

		const { getByRole } = render(<StopWatch />);

		const startBtn = screen.getByRole('button', { name: 'Start' });
		act(() => {
			fireEvent.click(startBtn);
			jest.advanceTimersByTime(1000);
		});
		expect(intervalSpy).toHaveBeenCalledTimes(1);
		const resetBtn = screen.getByRole('button', { name: 'Reset' });
		act(() => {
			fireEvent.click(resetBtn);
		});
		expect(getByRole('heading', { level: 2 }).textContent).toBe('--:--:--');
	});
});
