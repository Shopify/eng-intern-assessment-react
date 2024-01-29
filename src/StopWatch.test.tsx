import React from 'react';

import { fireEvent, render, screen } from '@testing-library/react';

import StopWatch, { formatTime } from './StopWatch';

test('render', () => {
	const { getByText } = render(<StopWatch />);
	expect(getByText('Stopwatch')).not.toBeNull();
});

describe('time formatting', () => {
	test('formats time less than an hour correctly', () => {
		expect(formatTime(0)).toBe('--:--:--');
		expect(formatTime(3000)).toBe('00:30:00');
		expect(formatTime(6000)).toBe('01:00:00');
		expect(formatTime(359999)).toBe('59:59:99');
	});
});

// jest.useFakeTimers();
