import React from 'react';

import { fireEvent, render, screen } from '@testing-library/react';

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

jest.useFakeTimers();

describe('timer tests', () => {});
